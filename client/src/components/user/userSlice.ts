import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "helpers";

const userStorage = getFromLocalStorage("userDetails");

const initialState = {
  email: userStorage?.email || "",
  id: userStorage?.id || "",
  firstName: userStorage?.firstName || "",
  lastName: userStorage?.lastName || "",
  photo: userStorage?.photo || "",
  registerDate: userStorage?.registerDate || "",
  isEmailConfirmed: userStorage?.isEmailConfirmed || false,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    initializeUser: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    userUpdate: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { initializeUser, userUpdate } = userSlice.actions;

export default userSlice.reducer;
