import { TaskItem } from "types";
import { TodoItem } from "@components/todos";
import "./OverviewTasks.scss";

const OverviewTasks: React.FC<{ tasks: TaskItem[] }> = ({ tasks }) => {
  return (
    <div className="overview-tasks">
      {tasks.length === 0 && <p>There is no tasks</p>}
      {tasks.map((item) => (
        <TodoItem
          _id={item._id}
          key={item._id}
          completed={item.completed}
          title={item.title}
          color={item.color}
          category={item.category}
        />
      ))}
    </div>
  );
};

export default OverviewTasks;
