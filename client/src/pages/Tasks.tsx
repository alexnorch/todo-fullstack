import { useState } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { capitalizeFirstLetter } from "../helpers";
import useTaskServices from "../features/todos/useTodoServices";

// Features todo

import {
  TodoNew,
  TodoNavigation,
  TodoCompleted,
  TodoList,
} from "../features/todos/components";

export default function Tasks() {
  const [showCompleted, setShowCompeted] = useState<boolean>(false);
  const { getTaskByCategory } = useTaskServices();
  const { category } = useParams();

  const onToggleCompletedTasks = () => setShowCompeted((prev) => !prev);

  const completedTasks = getTaskByCategory({
    category,
    isCompleted: true,
  });

  const inCompletedTasks = getTaskByCategory({
    category,
    isCompleted: false,
  });

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
      <TodoNavigation
        completedTasksLength={completedTasks.length}
        showCompleted={onToggleCompletedTasks}
      />
      <TodoCompleted
        onToggle={onToggleCompletedTasks}
        isActive={showCompleted}
        tasks={completedTasks}
      />
    </>
  );
}
