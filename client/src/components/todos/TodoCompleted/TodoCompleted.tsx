import { BsArrowReturnLeft, BsXLg } from "react-icons/bs";
import { Modal } from "@components/ui";
import "./TodoCompleted.scss";

import { CompletedTasksProps } from "../types";

// Hooks
import useTaskServices from "../useTodoServices";

const TodoCompleted: React.FC<CompletedTasksProps> = (props) => {
  const { isShown, onToggle, tasks } = props;
  const { onCompleteTask } = useTaskServices();

  const completedTasks = tasks?.map((item) => (
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
    <Modal title="My completed tasks" isOpen={isShown} onToggle={onToggle}>
      <div className="completed-tasks">
        <ul className="completed-tasks__list">
          {completedTasks}
          {!completedTasks.length && <p>No completed task to show</p>}
        </ul>
      </div>
    </Modal>
  );
};

export default TodoCompleted;
