import { useState } from "react";
import { useParams } from "react-router-dom";

import { capitalizeFirstLetter } from "../helpers";
import { PageHeading } from "@features/ui";
import {
  TodoNew,
  TodoNav,
  TodoCompleted,
  TodoList,
  useTodoServices,
} from "@features/todos";

export default function Tasks() {
  const [showCompleted, setShowCompeted] = useState<boolean>(false);
  const { getTasksByCategory } = useTodoServices();
  const { category } = useParams();

  const onToggleCompletedTasks = () => setShowCompeted((prev) => !prev);

  const inCompletedTasks = getTasksByCategory({ category, isCompleted: false });
  const completedTasks = getTasksByCategory({ category, isCompleted: true });

  return (
    <>
      <PageHeading
        title={capitalizeFirstLetter(category!)}
        subtitle="Current category"
      />
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
