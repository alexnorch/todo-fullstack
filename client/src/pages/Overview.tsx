import { useSelector } from "react-redux";
import moment from "moment";
import { RootState } from "../redux/store";
import { addZeroToNumber } from "../helpers";
import { TodoReadOnly } from "../features/todos";
import useTodoServices from "../features/todos/useTodoServices";
import { TaskItem } from "../types";

const OverviewStatsCard: React.FC<{ title: string; count: number }> = ({
  title,
  count,
}) => {
  return (
    <div className="overview-stats__column">
      <p className="overview-stats__count">{addZeroToNumber(count)}</p>
      <h3 className="overview-stats__text">{title}</h3>
    </div>
  );
};

const OverviewTasksBlock: React.FC<{
  title: string;
  tasks: React.ReactNode;
}> = ({ title, tasks }) => {
  return (
    <div className="overview-tasks__block">
      <h2 className="overview-tasks__heading">{title}</h2>
      <div className="overview-tasks__container">{tasks}</div>
    </div>
  );
};

const Overview = () => {
  const currentDate = moment(Date.now()).format("MMMM Do");
  const { user } = useSelector((state: RootState) => state.app);
  const { allTasks, completedTasks, uncompletedTasks } = useTodoServices();

  const mapTasksToComponents = (tasks: TaskItem[]) =>
    tasks.map((task) => <TodoReadOnly key={task._id} {...task} />);

  return (
    <div className="overview">
      <div className="page-heading">
        <h1 className="page-heading__title">Hello {user!.name}</h1>
        <h2 className="page-heading__subtitle">Today is {currentDate}</h2>
      </div>

      <section className="overview-stats">
        <OverviewStatsCard title="All tasks" count={allTasks.length} />
        <OverviewStatsCard
          title="Completed tasks"
          count={completedTasks.length}
        />
        <OverviewStatsCard
          title="Uncompleted tasks"
          count={uncompletedTasks.length}
        />
      </section>
      <section className="overview-tasks">
        <OverviewTasksBlock
          title="Uncompleted tasks"
          tasks={mapTasksToComponents(uncompletedTasks)}
        />
        <OverviewTasksBlock
          title="Completed tasks"
          tasks={mapTasksToComponents(completedTasks)}
        />
      </section>
    </div>
  );
};

export default Overview;
