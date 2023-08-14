import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { capitalizeFirstLetter } from "../helpers";
import useTaskServices from "../features/todos/useTaskServices";

// Features todo

import {
  TodoNew,
  TodoNavigation,
  TodoCompleted,
  TodoList,
} from "../features/todos";

export default function Tasks() {
  const [showCompleted, setShowCompeted] = useState<boolean>(false);
  const { getTaskByCategory } = useTaskServices();
  const { category } = useParams();
  const nodeRef = useRef<HTMLDivElement>(null);

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
      <h1>Current category - {capitalizeFirstLetter(category!)}</h1>
      <TodoNew />
      <TodoList tasks={inCompletedTasks} />
      <TodoNavigation
        completedTasksLength={completedTasks.length}
        showCompleted={onToggleCompletedTasks}
      />
      <CSSTransition
        unmountOnExit
        timeout={1000}
        in={showCompleted}
        classNames="completed-tasks"
        nodeRef={nodeRef}
      >
        <TodoCompleted
          onToggle={onToggleCompletedTasks}
          isActive={showCompleted}
          ref={nodeRef}
          tasks={completedTasks}
        />
      </CSSTransition>
    </>
  );
}
