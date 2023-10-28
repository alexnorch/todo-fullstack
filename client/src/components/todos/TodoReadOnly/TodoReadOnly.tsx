import { TaskItem } from "../types";
import { AiOutlineCheckCircle } from "react-icons/ai";

const TodoReadOnly: React.FC<TaskItem> = ({ title, completed, color }) => {
  return (
    <li style={{ borderLeft: `7px solid ${color}` }} className="task">
      <div className="task__content">
        <div className="task__left">
          <p className="task__text">{title}</p>
        </div>
        {completed && <AiOutlineCheckCircle className="task__icon" />}
      </div>
    </li>
  );
};

export default TodoReadOnly;
