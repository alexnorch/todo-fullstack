import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { addZeroToNumber } from "helpers";
import "./OverviewStats.scss";

interface IOverviewStatsCard {
  title: string;
  count: number;
}

const OverviewStatsCard: React.FC<IOverviewStatsCard> = ({ title, count }) => {
  return (
    <div className="overview-stats__column">
      <p className="overview-stats__count">{addZeroToNumber(count)}</p>
      <h3 className="overview-stats__text">{title}</h3>
    </div>
  );
};

const OverviewStats = () => {
  const allTasks = useSelector((state: RootState) => state.tasks.allTasks);
  const completedTasks = allTasks.filter((task) => task.completed);
  const incompleteTasks = allTasks.filter((task) => !task.completed);

  return (
    <section className="overview-stats">
      <OverviewStatsCard title="All tasks" count={allTasks.length} />
      <OverviewStatsCard
        title="Completed tasks"
        count={completedTasks.length}
      />
      <OverviewStatsCard
        title="Uncompleted tasks"
        count={incompleteTasks.length}
      />
    </section>
  );
};

export default OverviewStats;
