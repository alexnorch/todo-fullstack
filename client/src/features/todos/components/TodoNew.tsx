import { useState } from "react";
import { useParams } from "react-router-dom";
import useTaskServices from "../useTodoServices";

const NewTodo = () => {
  const [title, setTitle] = useState("");
  const { category } = useParams();
  const { onCreateTask } = useTaskServices();

  const clearInput = () => setTitle("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    onCreateTask(title, category, clearInput);
    setTitle("");
  };

  return (
    <div className="new-task">
      <form onSubmit={onSubmit} className="new-task__wrapper">
        <span className="new-task__wrapper__span"></span>
        <span className="new-task__wrapper__span"></span>
        <span className="new-task__wrapper__span"></span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="new-task__wrapper__input"
          type="text"
          placeholder="What is your next task?"
        />
      </form>
    </div>
  );
};

export default NewTodo;
