import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { OverviewStats, OverviewTasks } from "@features/overview";
import { TodoFilter } from "@features/todos";
import { filterTasks } from "@features/todos/utils";
import { PageHeading } from "@features/ui";
import { FilterType, IFilterOptions } from "@features/todos/types";

const filterOptions: IFilterOptions[] = [
  { title: "All tasks", filterType: "all" },
  { title: "Completed tasks", filterType: "completed" },
  { title: "Incomplete tasks", filterType: "incomplete" },
];

const Overview = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const allTasks = useSelector((state: RootState) => state.tasks.allTasks);
  const filteredTasks = filterTasks(allTasks, activeFilter);

  return (
    <>
      <PageHeading title="Overview" subtitle="Seeing it All in One Place" />
      <OverviewStats />
      <TodoFilter
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <OverviewTasks tasks={filteredTasks} />
    </>
  );
};

export default Overview;
