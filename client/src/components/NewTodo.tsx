import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../redux/appSlice";

const NewTodo = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (value.length > 1) {
      const data = {
        text: value,
        id: Math.random().toString(),
        completed: false,
      };

      dispatch(addNewTodo(data));
      setValue("");
    }
  };

  return (
    <div className="new-task">
      <form onSubmit={onSubmit} className="new-task__wrapper">
        <span className="new-task__wrapper__span"></span>
        <span className="new-task__wrapper__span"></span>
        <span className="new-task__wrapper__span"></span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="new-task__wrapper__input"
          type="text"
          placeholder="What is your next task?"
        />
      </form>
    </div>
  );
};

export default NewTodo;

// If user doesn't have any categories he cannot create new task
