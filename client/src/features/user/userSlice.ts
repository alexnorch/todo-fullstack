import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "helpers";

const userObj = getFromLocalStorage("userDetails");

const initialState = {
  email: userObj.email || "",
  id: userObj.id || "",
  name: userObj.name || "",
  photo: userObj.photo || "",
  isEmailConfirmed: false,
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
    },
    userUpdate: (state, action: PayloadAction<any>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.photo = action.payload.photo;
    } ,
    confirmEmail: (state) => {
      state.isEmailConfirmed = true;
    },
  },
});

export const { initializeUser, confirmEmail, userUpdate } = userSlice.actions;

export default userSlice.reducer;
