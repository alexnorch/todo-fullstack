import { useState } from "react";
import { useParams } from "react-router-dom";

import { capitalizeFirstLetter } from "../helpers";
import useTaskServices from "@features/todos/useTodoServices";
import { TodoNew, TodoNav, TodoCompleted, TodoList } from "@features/todos";

export default function Tasks() {
  const [showCompleted, setShowCompeted] = useState<boolean>(false);
  const { getTasksByCategory } = useTaskServices();
  const { category } = useParams();

  const onToggleCompletedTasks = () => setShowCompeted((prev) => !prev);

  const inCompletedTasks = getTasksByCategory({ category, isCompleted: false });
  const completedTasks = getTasksByCategory({ category, isCompleted: true });

  return (
    <>
      <div className="page-heading">
        <p className="page-heading__subtitle">Current category</p>
        <h1 className="page-heading__title">
          {capitalizeFirstLetter(category!)}
        </h1>
      </div>
      <TodoNew />
      <TodoList tasks={inCompletedTasks} />
      <TodoNav
        completedTasksLength={completedTasks.length}
        showCompleted={onToggleCompletedTasks}
      />
      <TodoCompleted
        tasks={completedTasks}
        onToggle={onToggleCompletedTasks}
        isShown={showCompleted}
      />
    </>
  );
}
