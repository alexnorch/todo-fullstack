import { addZeroToNumber } from "helpers";
import "./OverviewStats.scss";

interface OverviewStatsProps {
  allTasksCount: number;
  inCompleteCount: number;
  completedCount: number;
}

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

const OverviewStats: React.FC<OverviewStatsProps> = ({
  allTasksCount,
  inCompleteCount,
  completedCount,
}) => {
  return (
    <section className="overview-stats">
      <OverviewStatsCard title="All tasks" count={allTasksCount} />
      <OverviewStatsCard title="Completed tasks" count={inCompleteCount} />
      <OverviewStatsCard title="Uncompleted tasks" count={completedCount} />
    </section>
  );
};

export default OverviewStats;
