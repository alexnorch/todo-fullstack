import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../../helpers";
import { AppState, AlertProps } from "../../types";

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
    hideAlert: (state) => {
      state.isAlert = false;
      state.alertText = null;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setAccessToken, showAlert, hideAlert, logout } =
  appSlice.actions;

export default appSlice.reducer;
