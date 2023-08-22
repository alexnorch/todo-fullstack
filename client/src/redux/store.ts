import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { localStorageMiddleware, autoHideAlertMiddleware } from "./middlewares";

// Reducers
import categorySlice from "../features/categories/categorySlice";
import todoSlice from "../features/todos/todoSlice";
import appSlice from "./appSlice";

const rootReducer = combineReducers({
  todo: todoSlice,
  categories: categorySlice,
  app: appSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware(),
    localStorageMiddleware,
    autoHideAlertMiddleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
