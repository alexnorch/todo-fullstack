import { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { Modal } from "@components/ui";
import { BsArrowReturnLeft } from "react-icons/bs";
import useTodoServices from "../useTodoServices";
import "./TasksCompleted.scss";

const TasksCompleted = () => {
  const { category } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getTasksByCategory, onCompleteTask } = useTodoServices();
  const tasksList = getTasksByCategory({ category, isCompleted: true });

  const onModalToggle = () => setIsModalOpen((prev) => !prev);

  const completedTasksList = tasksList.map((item) => (
    <li key={item._id} className="completed-tasks__item">
      <p className="completed-tasks__text">{item.title}</p>
      <button
        onClick={() => onCompleteTask(item._id, item)}
        className="completed-tasks__btn"
      >
        <BsArrowReturnLeft />
      </button>
    </li>
  ));

  return (
    <>
      <div className="task-navigation">
        <button onClick={onModalToggle} className="task-navigation__btn">
          <HiCheckCircle />
          <span className="task-navigation__span">
            {tasksList.length ? tasksList.length : 0}
          </span>
        </button>
      </div>

      <Modal
        title="My completed tasks"
        isOpen={isModalOpen}
        onToggle={onModalToggle}
      >
        <div className="completed-tasks">
          <ul className="completed-tasks__list">
            {completedTasksList}
            {!completedTasksList.length && <p>No completed task to show</p>}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default TasksCompleted;
