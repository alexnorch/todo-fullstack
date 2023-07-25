import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../helpers";
import { TaskItem, AppState, AlertProps, CategoryInterface } from "../types";

const initialState: AppState = {
  user: getFromLocalStorage("userInfo") || null,
  token: getFromLocalStorage("accessToken") || null,
  data: getFromLocalStorage("userData") || [],
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
      const { category } = action.payload;

      state.data = state.data.map((item) => {
        if (item.categoryName === category) {
          return {
            ...item,
            tasks: [...item.tasks, action.payload],
          };
        }
        return item;
      });
    },
    addCategory: (state, action: PayloadAction<CategoryInterface>) => {
      state.data.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(
        (category) => category._id !== action.payload
      );
    },
    removeTodo: (state, action: PayloadAction<TaskItem>) => {
      const { category, _id } = action.payload;

      state.data = state.data.map((item) => {
        if (item.categoryName === category) {
          return {
            ...item,
            tasks: item.tasks.filter((task) => task._id !== _id),
          };
        }

        return item;
      });
    },
    loginUser: (state, action: PayloadAction<any>) => {
      const { token, userData, userInfo } = action.payload;
      state.token = token;
      state.user = userInfo;
      state.data = userData;
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      state.data = [];
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
