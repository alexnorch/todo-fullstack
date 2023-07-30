import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Components
import TodoList from "../components/TodoList";
import NewTodo from "../components/NewTodo";
import Modal from "../components/Modal";
import TodoItem from "../components/TodoItem";
import TaskNavigation from "../components/TaskNavigation";

export default function Tasks() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.app.data);
  const { category } = useParams();

  // Displays only uncompleted tasks and tasks that refers to the specific category
  const inCompletedTasks = userData
    .filter((item) => item.categoryName === category)
    .map((item) => ({
      ...item,
      tasks: [...item.tasks.filter((task) => !task.completed)],
    }))[0].tasks;

  const completedTasks = userData
    .filter((item) => item.categoryName === category)
    .map((item) => ({
      ...item,
      tasks: [...item.tasks.filter((task) => task.completed)],
    }))[0].tasks;

  return (
    <>
      <NewTodo />
      <TodoList tasks={inCompletedTasks} />
      <TaskNavigation />
      <div>
        Completed tasks: {completedTasks.length}
        <button onClick={() => setIsModal(true)}>Show completed tasks</button>
      </div>
      <Modal
        title="Completed tasks"
        isOpen={isModal}
        onToggle={() => setIsModal((prev) => !prev)}
      >
        Completed tasks:
        {completedTasks.map((item) => (
          <TodoItem key={item._id} {...item} />
        ))}
      </Modal>
    </>
  );
}
