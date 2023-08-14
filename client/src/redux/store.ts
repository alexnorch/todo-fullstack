import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { localStorageMiddleware, autoHideAlertMiddleware } from "./middlewares";
import appSlice from "./appSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
  middleware: [
    ...getDefaultMiddleware(),
    localStorageMiddleware,
    autoHideAlertMiddleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
