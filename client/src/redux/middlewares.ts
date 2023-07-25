import { Middleware } from "@reduxjs/toolkit";
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
