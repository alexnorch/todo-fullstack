import { TodoReadOnly } from "@features/todos";
import { TaskItem } from "types";
import "./OverviewTasks.scss";

interface OverviewTasksProps {
  incompleteTasks: TaskItem[];
  completedTasks: TaskItem[];
}

interface OverviewTasksBlockProps {
  title: string;
  tasks: React.ReactNode;
}

const OverviewTasksBlock: React.FC<OverviewTasksBlockProps> = ({
  title,
  tasks,
}) => {
  return (
    <div className="overview-tasks__block">
      <h2 className="overview-tasks__heading">{title}</h2>
      <div className="overview-tasks__container">{tasks}</div>
    </div>
  );
};

const OverviewTasks: React.FC<OverviewTasksProps> = ({
  incompleteTasks,
  completedTasks,
}) => {
  const mapTasksToComponents = (tasks: TaskItem[]) =>
    tasks.map((task) => <TodoReadOnly key={task._id} {...task} />);

  return (
    <section className="overview-tasks">
      <OverviewTasksBlock
        title="Incomplete tasks"
        tasks={mapTasksToComponents(incompleteTasks)}
      />
      <OverviewTasksBlock
        title="Completed tasks"
        tasks={mapTasksToComponents(completedTasks)}
      />
    </section>
  );
};

export default OverviewTasks;
