import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { OverviewStatsCard } from "@components/overview";
import { allTasks } from "@store/selectors/tasksSelectors";

import "./OverviewStats.scss";

const OverviewStats = () => {
  const tasksList = useSelector(allTasks);
  const allLength = tasksList.length;
  const completedLength = tasksList.filter((task) => task.completed).length;
  const incompleteLength = tasksList.filter((task) => !task.completed).length;

  return (
    <section className="overview-stats">
      <OverviewStatsCard title="All tasks" count={allLength} />
      <OverviewStatsCard title="Completed tasks" count={completedLength} />
      <OverviewStatsCard title="Uncompleted tasks" count={incompleteLength} />
    </section>
  );
};

export default OverviewStats;
