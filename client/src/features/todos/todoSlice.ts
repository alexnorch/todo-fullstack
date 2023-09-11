import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  initialState,
  name: "tasks",
  reducers: {
    addNewTask: (state, action: PayloadAction<any>) => {
      const { category } = action.payload;

      // state.tasks = state.tasks.map((item) => {
      //   if (item.categoryName === category) {
      //     return {
      //       ...item,
      //       tasks: [...item.tasks, action.payload],
      //     };
      //   }
      //   return item;
      // });
    },
    updateTask: (state, action: PayloadAction<any>) => {
      // const { category, _id } = action.payload;
      // state.data = state.data.map((item) => {
      //   if (item.categoryName === category) {
      //     return {
      //       ...item,
      //       tasks: [
      //         ...item.tasks.filter((task) => task._id !== _id),
      //         action.payload,
      //       ],
      //     };
      //   }
      //   return item;
      // });
    },
    deleteTask: (state, action: PayloadAction<any>) => {
      // const { category, _id } = action.payload;
      // state.data = state.data.map((item) => {
      //   if (item.categoryName === category) {
      //     return {
      //       ...item,
      //       tasks: item.tasks.filter((task) => task._id !== _id),
      //     };
      //   }
      //   return item;
      // });
    },
  },
});

export const { addNewTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
