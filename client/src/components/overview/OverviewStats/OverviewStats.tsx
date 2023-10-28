import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { OverviewStatsCard } from "@components/overview";

import "./OverviewStats.scss";

const OverviewStats = () => {
  const allTasks = useSelector((state: RootState) => state.tasks.allTasks);
  const allLength = allTasks.length;
  const completedLength = allTasks.filter((task) => task.completed).length;
  const incompleteLength = allTasks.filter((task) => !task.completed).length;

  return (
    <section className="overview-stats">
      <OverviewStatsCard title="All tasks" count={allLength} />
      <OverviewStatsCard title="Completed tasks" count={completedLength} />
      <OverviewStatsCard title="Uncompleted tasks" count={incompleteLength} />
    </section>
  );
};

export default OverviewStats;
