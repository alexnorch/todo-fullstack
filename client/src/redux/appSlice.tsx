import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CategoryInterface {
  title: string;
  color: string;
  _id: string;
}

interface AppState {
  user: {} | null;
  token: string | null;
  categories: CategoryInterface[] | [];
  todos: ITodo[];
  alertType: "danger" | "success" | "info";
  alertText: string | null;
  isAlert: boolean;
}

interface AuthPayload {
  token: string;
  user: {};
  tasks: [];
  categories: [];
}

interface IAlert {
  text: string;
  type: "danger" | "success" | "info";
}

const initialState: AppState = {
  user: null,
  token: JSON.parse(localStorage.getItem("accessToken")!) || null,
  categories: [],
  todos: [],
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
    clearUserData: (state, action: PayloadAction) => {
      state = initialState;
    },
    addNewTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    setTodoChecked: (state, action: PayloadAction<string>) => {
      state.todos.map((item) => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
    },
    loginUser: (state, action: PayloadAction<AuthPayload>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.todos = action.payload.tasks;
      state.categories = action.payload.categories;
    },
    logoutUser: (state) => {
      state = initialState;
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
