import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";

import { capitalizeFirstLetter } from "../helpers";
import { PageHeading } from "@components/ui";
import {
  TodoNew,
  TasksCompleted,
  TodoList,
  useTodoServices,
} from "@components/todos";

export default function Tasks() {
  const { getTasksByCategory } = useTodoServices();
  const { category } = useParams();

  const inCompletedTasks = getTasksByCategory({ category, isCompleted: false });

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
      <TasksCompleted />
    </>
  );
}
