// Icons
import { HiTemplate, HiCheckCircle } from "react-icons/hi";

const TaskNavigation = () => {
  return (
    <div className="task-navigation">
      <button className="task-navigation__btn">
        <HiTemplate />
      </button>
      <button className="task-navigation__btn">
        <HiCheckCircle />
      </button>
    </div>
  );
};

export default TaskNavigation;
