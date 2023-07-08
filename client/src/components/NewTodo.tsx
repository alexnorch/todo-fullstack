import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../redux/todoSlice";

// Components
import Modal from "./Modal";
import Input from "./UI/Input";

const NewTodo = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

      setErrorMessage("");
    } else {
      setErrorMessage("Cannot be empty an empty string");
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
