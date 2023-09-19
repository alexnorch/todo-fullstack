import { useSelector } from "react-redux";
import moment from "moment";
import { RootState } from "../redux/store";

import { OverviewStats, OverviewTasks } from "@features/overview";

const Overview = () => {
  const currentDate = moment(Date.now()).format("MMMM Do");
  const user = useSelector((state: RootState) => state.user);

  const allTasks = useSelector((state: RootState) => state.tasks.allTasks);
  const completedTasks = allTasks.filter((task) => task.completed);
  const incompleteTasks = allTasks.filter((task) => !task.completed);

  return (
    <div className="overview">
      <div className="page-heading">
        <h1 className="page-heading__title">Hello {user!.name}</h1>
        <h2 className="page-heading__subtitle">Today is {currentDate}</h2>
      </div>

      <OverviewStats
        allTasksCount={allTasks.length}
        completedCount={completedTasks.length}
        inCompleteCount={incompleteTasks.length}
      />

      <OverviewTasks
        completedTasks={completedTasks}
        incompleteTasks={incompleteTasks}
      />
    </div>
  );
};

export default Overview;
