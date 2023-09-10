import { useState } from "react";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../helpers";
import useTaskServices from "../features/todos/useTodoServices";
import { TodoNew, TodoNav, TodoCompleted, TodoList } from "../features/todos";

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
      <PageHeading title={category} />
      <TodoNew />
      <TodoList tasks={inCompletedTasks} />
      <TodoNav
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

const PageHeading = (title: any) => {
  return (
    <div className="page-heading">
      <p className="page-heading__subtitle">Current category</p>
      <h1 className="page-heading__title">{capitalizeFirstLetter(title!)}</h1>
    </div>
  );
};
