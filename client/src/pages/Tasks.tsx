import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Features todo

import {
  TodoNew,
  TodoNavigation,
  TodoCompleted,
  TodoList,
} from "../features/todos";

// UI components
import { Modal } from "../features/ui";

export default function Tasks() {
  const [showCompleted, setShowCompeted] = useState<boolean>(false);
  const [showTemplates, setShowTemplates] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.app.data);
  const { category } = useParams();

  // Displays only uncompleted tasks and tasks that refers to the specific category
  const inCompletedTasks = userData
    .filter((item) => item.categoryName === category)
    .map((item) => ({
      ...item,
      tasks: [...item.tasks.filter((task) => !task.completed)],
    }))[0];

  console.log(inCompletedTasks);
  // Displays only completed tasks for CompletedTask component
  const completedTasks = userData
    .filter((item) => item.categoryName === category)
    .map((item) => ({
      ...item,
      tasks: [...item.tasks.filter((task) => task.completed)],
    }))[0].tasks;

  const onToggleCompletedTasks = () => setShowCompeted((prev) => !prev);
  const onToggleTemplates = () => setShowTemplates((prev) => !prev);

  return (
    <>
      <TodoNew />
      <TodoList data={inCompletedTasks} />
      <TodoNavigation
        completedTasksLength={completedTasks.length}
        showCompleted={onToggleCompletedTasks}
      />

      <Modal
        title={`${category} | Completed tasks`}
        isOpen={showCompleted}
        onToggle={onToggleCompletedTasks}
      >
        <TodoCompleted tasks={completedTasks} />
      </Modal>
    </>
  );
}
