import { TaskItem } from "./types";

const TodoReadOnly: React.FC<TaskItem> = ({ title, completed, color }) => {
  console.log(color);
  return (
    <li style={{ borderLeft: `7px solid ${color}` }} className="tasks__task">
      <div className="tasks__task__content">
        <div className="tasks__task__content__left">
          <p className="tasks__task__content__text">{title}</p>
        </div>
      </div>
    </li>
  );
};

export default TodoReadOnly;
