import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  completedTodos: [],
};

const taskSlice = createSlice({
  initialState,
  name: "categories",
  reducers: {
    getTodos: (state, action) => {},
    addTodo: (state, action: PayloadAction<any>) => {
      //   state.userCategories.push();
    },
    updateTodo: (state, action: PayloadAction<any>) => {
      // state.userCategories = state.userCategories.filter(
      //     (category) => category._id !== action.payload
      //   );
    },
    deleteTodo: (state, action: PayloadAction<any>) => {
      //   state.data = [
      //     ...state.data.filter((item) => item._id !== action.payload._id),
      //     action.payload,
      //   ];
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = taskSlice.actions;

export default taskSlice.reducer;
