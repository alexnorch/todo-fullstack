import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ITodoState {
  todos: ITodo[];
  backgroundImage: string;
  tempCategories: { title: string; color: string }[];
}

const initialState: ITodoState = {
  todos: [
    { text: "Clean the house", id: "1", completed: false },
    { text: "Wash the dishes", id: "2", completed: false },
  ],
  backgroundImage:
    "https://www.wallpaperflare.com/static/653/291/779/landscape-nature-carpathians-mountains-wallpaper.jpg",
  tempCategories: [
    { title: "Freelance", color: "#f07857" },
    { title: "Personal", color: "#4fb06d" },
    { title: "Hobby", color: "#bf2c34" },
  ],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNewTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    setNewBackground: (state, action: PayloadAction<string>) => {
      state.backgroundImage = action.payload;
    },
    setTodoChecked: (state, action: PayloadAction<string>) => {
      state.todos.map((item) => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewTodo, removeTodo, setNewBackground, setTodoChecked } =
  counterSlice.actions;

export default counterSlice.reducer;
