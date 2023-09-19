import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../helpers";
import { AppState, AlertProps, CategoryInterface } from "../types";

const initialState: AppState = {
  token: getFromLocalStorage("accessToken") || null,
  alertType: "info",
  alertText: null,
  isAlert: false,
};

export const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.token = action.payload;
    },
    showAlert: (state, action: PayloadAction<AlertProps>) => {
      state.isAlert = true;
      state.alertText = action.payload.text;
      state.alertType = action.payload.type;
    },
    hideAlert: (state, action: PayloadAction) => {
      state.isAlert = false;
      state.alertText = null;
    },

    logoutUser: (state) => {
      state.token = null;
    },
  },
});

export const { setAccessToken, showAlert, hideAlert, logoutUser } =
  appSlice.actions;

export default appSlice.reducer;
