// Icons
import { HiCheckCircle } from "react-icons/hi";

interface TaskNavigationProps {
  showCompleted: () => void;
  completedTasksLength: number;
}

const TaskNavigation: React.FC<TaskNavigationProps> = ({
  showCompleted,
  completedTasksLength,
}) => {
  return (
    <div className="task-navigation">
      <button onClick={showCompleted} className="task-navigation__btn">
        <HiCheckCircle />
        <span className="task-navigation__btn__span">
          {completedTasksLength ? completedTasksLength : 0}
        </span>
      </button>
    </div>
  );
};

export default TaskNavigation;
