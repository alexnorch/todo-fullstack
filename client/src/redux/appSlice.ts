import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../helpers";
import { TaskItem, AppState, AlertProps, AuthPayload } from "../types";
import fakeData from "./data";

const initialState: AppState = {
  user: getFromLocalStorage("userInfo") || null,
  token: getFromLocalStorage("accessToken") || null,
  categories: getFromLocalStorage("userData")?.categories || [],
  tasks: getFromLocalStorage("userData")?.tasks || [],
  alertType: "info",
  alertText: null,
  isAlert: false,
};

export const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertProps>) => {
      state.isAlert = true;
      state.alertText = action.payload.text;
      state.alertType = action.payload.type;
    },
    hideAlert: (state, action: PayloadAction) => {
      state.isAlert = false;
      state.alertText = null;
    },
    addNewTodo: (state, action: PayloadAction<TaskItem>) => {
      state.tasks.push(action.payload);
    },
    addCategory: (
      state,
      action: PayloadAction<{
        title: string;
        color: string;
        _id: string;
      }>
    ) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((item) => item._id !== action.payload);
    },
    loginUser: (state, action: PayloadAction<AuthPayload>) => {
      const { token, userData, userInfo } = action.payload;
      state.token = token;
      state.user = userInfo;
      state.tasks = userData.tasks;
      state.categories = userData.categories;
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      state.tasks = [];
      state.categories = [];
    },
  },
});

export const {
  showAlert,
  addNewTodo,
  removeTodo,
  loginUser,
  hideAlert,
  logoutUser,
  deleteCategory,
  addCategory,
} = appSlice.actions;

export default appSlice.reducer;
