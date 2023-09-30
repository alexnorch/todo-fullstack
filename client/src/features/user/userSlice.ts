import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "helpers";

const userLocalStorage = getFromLocalStorage("userDetails");

const initialState = {
  email: userLocalStorage?.email || "",
  id: userLocalStorage?.id || "",
  name: userLocalStorage?.name || "",
  photo: userLocalStorage?.photo || "",
  isEmailConfirmed: userLocalStorage?.isEmailConfirmed || false,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    initializeUser: (state, action: PayloadAction<any>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.photo = action.payload.photo;
      state.isEmailConfirmed = action.payload.isEmailConfirmed;
    },
    userUpdate: (state, action: PayloadAction<any>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.photo = action.payload.photo;
      state.isEmailConfirmed = action.payload.isEmailConfirmed;
    },
  },
});

export const { initializeUser, userUpdate } = userSlice.actions;

export default userSlice.reducer;
