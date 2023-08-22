import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userCategories: [],
};

const categorySlice = createSlice({
  initialState,
  name: "categories",
  reducers: {
    createCategory: (state, action: PayloadAction<any>) => {
      //   state.userCategories.push();
    },
    deleteCategory: (state, action: PayloadAction<any>) => {
      // state.userCategories = state.userCategories.filter(
      //     (category) => category._id !== action.payload
      //   );
    },
    updateCategory: (state, action: PayloadAction<any>) => {
      //   state.data = [
      //     ...state.data.filter((item) => item._id !== action.payload._id),
      //     action.payload,
      //   ];
    },
  },
});

export const { createCategory, deleteCategory, updateCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
