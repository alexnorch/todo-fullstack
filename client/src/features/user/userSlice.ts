import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  id: "",
  name: "",
  photo: "",
  //  isEmailConfirmed
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
  },
});

// confirmEmail, updateUser, setPhoto

export const { initializeUser } = userSlice.actions;

export default userSlice.reducer;
