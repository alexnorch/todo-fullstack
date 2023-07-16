import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const tempTasks = [
  { text: "Clean the house", id: "1", completed: false },
  { text: "Wash the dishes", id: "2", completed: false },
];

const categories = [
  { title: "Freelance", color: "#f07857" },
  { title: "Personal", color: "#4fb06d" },
  { title: "Hobby", color: "#bf2c34" },
];

interface AppState {
  user: {} | null;
  token: string | null;
  categories: {}[] | [];
  todos: ITodo[];
  tempCategories: { title: string; color: string }[];
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
  token: null,
  categories: [],
  todos: [],
  tempCategories: [],
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
} = appSlice.actions;

export default appSlice.reducer;
