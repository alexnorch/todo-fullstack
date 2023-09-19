import { Middleware } from "@reduxjs/toolkit";
import { showAlert, hideAlert } from "./appSlice";
import { addToLocalStorage } from "../helpers";

export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    const tasks = state.tasks.allTasks;
    const categories = state.categories.allCategories;
    const user = state.user;

    addToLocalStorage("userDetails", user);
    addToLocalStorage("categories", categories);
    addToLocalStorage("tasks", tasks);

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
