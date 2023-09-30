import { TodoReadOnly } from "@features/todos";
import { TaskItem } from "types";
import "./OverviewTasks.scss";

const OverviewTasks: React.FC<{ tasks: TaskItem[] }> = ({ tasks }) => {
  return (
    <div className="overview-tasks">
      {tasks.length === 0 && <p>There is no tasks</p>}
      {tasks.map((item) => (
        <TodoReadOnly {...item} />
      ))}
    </div>
  );
};

export default OverviewTasks;
