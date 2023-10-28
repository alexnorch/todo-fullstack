import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TaskItem } from "types";
import { getFromLocalStorage } from "helpers";

interface TasksState {
  allTasks: TaskItem[];
}

const initialState: TasksState = {
  allTasks: getFromLocalStorage("tasks") || [],
};

const taskSlice = createSlice({
  initialState,
  name: "tasks",
  reducers: {
    initializeTasks: (state, action: PayloadAction<any>) => {
      state.allTasks = action.payload;
    },
    addNewTask: (state, action: any) => {
      state.allTasks.push(action.payload);
    },
    updateTask: (state, action: any) => {
      state.allTasks = state.allTasks.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }

        return item;
      });
    },
    removeTask: (state, action: PayloadAction<TaskItem>) => {
      state.allTasks = state.allTasks.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const { initializeTasks, addNewTask, updateTask, removeTask } =
  taskSlice.actions;

export default taskSlice.reducer;
