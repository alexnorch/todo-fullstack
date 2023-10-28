import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { localStorageMiddleware, autoHideAlertMiddleware } from "./middlewares";

// Reducers
import userSlice from "@components/user/userSlice";
import categorySlice from "@components/categories/categorySlice";
import todoSlice from "@components/todos/todoSlice";
import appSlice from "./appSlice";

// Redux saga

const rootReducer = combineReducers({
  tasks: todoSlice,
  categories: categorySlice,
  app: appSlice,
  user: userSlice,
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
