import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { OverviewStats, OverviewTasks } from "@features/overview";
import { TodoFilter } from "@features/todos";
import { filterTasks } from "@features/todos/utils";
import { PageHeading } from "@features/ui";

const filterOptions = [
  { name: "All tasks", dataTab: "all" },
  { name: "Completed tasks", dataTab: "completed" },
  { name: "Incomplete tasks", dataTab: "incomplete" },
];

const Overview = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const allTasks = useSelector((state: RootState) => state.tasks.allTasks);
  const filteredTasks = filterTasks(allTasks, activeFilter);

  const onChangeFilter = (e: any) => {
    const targetFilter = e.target.getAttribute("data-tabName");
    setActiveFilter(targetFilter);
  };

  return (
    <div className="overview">
      <PageHeading title="Overview" subtitle="Seeing it All in One Place" />
      <OverviewStats />
      <TodoFilter
        activeFilter={activeFilter}
        onChangeFilter={onChangeFilter}
        filters={filterOptions}
      />
      <OverviewTasks tasks={filteredTasks} />
    </div>
  );
};

export default Overview;
