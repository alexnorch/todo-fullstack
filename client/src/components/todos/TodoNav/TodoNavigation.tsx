import { HiCheckCircle } from "react-icons/hi";
import { TaskNavigationProps } from "../types";
import "./TodoNav.scss";

const TodoNav: React.FC<TaskNavigationProps> = (props) => {
  const { showCompleted, completedTasksLength } = props;
  return (
    <div className="task-navigation">
      <button onClick={showCompleted} className="task-navigation__btn">
        <HiCheckCircle />
        <span className="task-navigation__span">
          {completedTasksLength ? completedTasksLength : 0}
        </span>
      </button>
    </div>
  );
};

export default TodoNav;
