import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";

import { capitalizeFirstLetter } from "../helpers";
import { PageHeading } from "@components/ui";
import {
  TodoNew,
  TodoNav,
  TodoCompleted,
  TodoList,
  useTodoServices,
} from "@components/todos";

export default function Tasks() {
  const [showCompleted, setShowCompeted] = useState<boolean>(false);
  const { getTasksByCategory } = useTodoServices();
  const { category } = useParams();

  const onToggleCompletedTasks = () => setShowCompeted((prev) => !prev);

  const inCompletedTasks = getTasksByCategory({ category, isCompleted: false });
  const completedTasks = getTasksByCategory({ category, isCompleted: true });

  return (
    <>
      <Link className="page-link" to="/categories">
        <span className="page-link__icon">
          <IoIosArrowDropleft />
        </span>
        <span className="page-link__text">Categories</span>
      </Link>

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
