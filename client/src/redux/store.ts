import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { localStorageMiddleware } from "./middlewares";
import appSlice from "./appSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
  middleware: [...getDefaultMiddleware(), localStorageMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
