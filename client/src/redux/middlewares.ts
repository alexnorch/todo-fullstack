import { Middleware } from "@reduxjs/toolkit";
import { addToLocalStorage } from "../helpers";

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    const { user, categories, tasks } = state.app;

    addToLocalStorage("userData", { categories, tasks });
    addToLocalStorage("userInfo", user);

    return result;
  };
