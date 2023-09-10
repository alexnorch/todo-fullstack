import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  initialState,
  name: "tasks",
  reducers: {
    getTasks: (state, action) => {},
    addNewTask: (state, action: PayloadAction<any>) => {
      //   state.userCategories.push();
    },
    updateTask: (state, action: PayloadAction<any>) => {
      // state.userCategories = state.userCategories.filter(
      //     (category) => category._id !== action.payload
      //   );
    },
    deleteTask: (state, action: PayloadAction<any>) => {
      //   state.data = [
      //     ...state.data.filter((item) => item._id !== action.payload._id),
      //     action.payload,
      //   ];
    },
  },
});

export const { getTasks, addNewTask, updateTask, deleteTask } =
  taskSlice.actions;

export default taskSlice.reducer;
