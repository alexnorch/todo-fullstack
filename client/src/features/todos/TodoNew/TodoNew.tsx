import { useState } from "react";
import { useParams } from "react-router-dom";
import useTaskServices from "../useTodoServices";
import { FormEvent } from "../../../types";
import "./TodoNew.scss";

const TodoNew = () => {
  const [title, setTitle] = useState("");
  const { category } = useParams();
  const { onCreateTask } = useTaskServices();

  const clearInput = () => setTitle("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onCreateTask(title, category, clearInput);
    setTitle("");
  };

  return (
    <div className="new-task">
      <form onSubmit={onSubmit} className="new-task__form">
        <span className="new-task__span"></span>
        <span className="new-task__span"></span>
        <span className="new-task__span"></span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="new-task__input"
          type="text"
          placeholder="What is your next task?"
        />
      </form>
    </div>
  );
};

export default TodoNew;
