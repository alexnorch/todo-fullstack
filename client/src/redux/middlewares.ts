import { Middleware } from "@reduxjs/toolkit";
import { showAlert, hideAlert } from "./appSlice";
import { addToLocalStorage } from "../helpers";

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    const { user, data } = state.app;

    addToLocalStorage("userData", data);
    addToLocalStorage("userInfo", user);

    return result;
  };

export const autoHideAlertMiddleware: Middleware = (store) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (next) => (action) => {
    if (showAlert.match(action)) {
      const { duration = 3000 } = action.payload;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      next(action);

      timeoutId = setTimeout(() => {
        store.dispatch(hideAlert());
      }, duration);
    } else {
      next(action);
    }
  };
};
