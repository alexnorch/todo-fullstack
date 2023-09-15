import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState {
  allCategories: any[];
}

const initialState: CategoriesState = {
  allCategories: [],
};

const categorySlice = createSlice({
  initialState,
  name: "categories",
  reducers: {
    initializeCategories: (state, action: PayloadAction<any>) => {
      state.allCategories = action.payload;
    },
    updateCategory: (state, action: any) => {
      state.allCategories = state.allCategories.map((item) => {
        if (item._id === action.payload._id) return action.payload;
        return item;
      });
    },

    addCategory: (state, action: any) => {
      state.allCategories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.allCategories = state.allCategories.filter(
        (category) => category._id !== action.payload
      );
    },
  },
});

export const {
  initializeCategories,
  updateCategory,
  addCategory,
  deleteCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
