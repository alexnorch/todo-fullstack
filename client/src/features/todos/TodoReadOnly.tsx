import { TaskItem } from "./types";
import { AiOutlineCheckCircle } from "react-icons/ai";

const TodoReadOnly: React.FC<TaskItem> = ({ title, completed, color }) => {
  console.log(color);
  return (
    <li style={{ borderLeft: `7px solid ${color}` }} className="tasks__task">
      <div className="tasks__task__content">
        <div className="tasks__task__content__left">
          <p className="tasks__task__content__text">{title}</p>
        </div>
        {completed && (
          <AiOutlineCheckCircle className="tasks__task__content__icon" />
        )}
      </div>
    </li>
  );
};

export default TodoReadOnly;
