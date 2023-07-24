import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../helpers";

interface CategoryInterface {
  title: string;
  color: string;
  _id: string;
}

interface AppState {
  user: UserInfo | null;
  token: string | null;
  categories: CategoryInterface[] | [];
  todos: ITodo[];
  alertType: "danger" | "success" | "info";
  alertText: string | null;
  isAlert: boolean;
}

interface UserData {
  tasks: ITodo[];
  categories: CategoryInterface[];
}

interface UserInfo {
  email: string;
  id: string;
  name: string;
}

interface AuthPayload {
  token: string;
  userData: UserData;
  userInfo: UserInfo;
}

interface IAlert {
  text: string;
  type: "danger" | "success" | "info";
}

const initialState: AppState = {
  user: getFromLocalStorage("userInfo") || null,
  token: getFromLocalStorage("accessToken") || null,
  categories: getFromLocalStorage("userData")?.categories || [],
  todos: getFromLocalStorage("userData")?.tasks || [],
  alertType: "info",
  alertText: null,
  isAlert: false,
};

export const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<IAlert>) => {
      state.isAlert = true;
      state.alertText = action.payload.text;
      state.alertType = action.payload.type;
    },
    hideAlert: (state, action: PayloadAction) => {
      state.isAlert = false;
      state.alertText = null;
    },
    addNewTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item._id !== action.payload);
    },
    setTodoChecked: (state, action: PayloadAction<string>) => {
      state.todos.map((item) => {
        if (item._id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
    },
    loginUser: (state, action: PayloadAction<AuthPayload>) => {
      const { token, userData, userInfo } = action.payload;
      state.token = token;
      state.user = userInfo;
      state.todos = userData.tasks;
      state.categories = userData.categories;
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      state.todos = [];
      state.categories = [];
    },
    extractFromLocalStorage: (state) => {
      state.user = getFromLocalStorage("userInfo") || null;
      state.token = getFromLocalStorage("accessToken") || null;
      state.categories = getFromLocalStorage("userData")?.categories || [];
      state.todos = getFromLocalStorage("userData")?.tasks;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  showAlert,
  addNewTodo,
  removeTodo,
  setTodoChecked,
  loginUser,
  hideAlert,
  logoutUser,
} = appSlice.actions;

export default appSlice.reducer;
