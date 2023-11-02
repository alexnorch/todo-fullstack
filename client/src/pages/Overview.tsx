import { useState } from "react";
import { useSelector } from "react-redux";
import { allTasks } from "@store/selectors/tasksSelectors";

import { OverviewStats, OverviewTasks } from "@components/overview";
import { TodoFilter } from "@components/todos";
import { filterTasks } from "@components/todos/utils";
import { PageHeading } from "@components/ui";
import { FilterType, IFilterOptions } from "@components/todos/types";

const filterOptions: IFilterOptions[] = [
  { title: "All tasks", filterType: "all" },
  { title: "Completed tasks", filterType: "completed" },
  { title: "Incomplete tasks", filterType: "incomplete" },
];

const Overview = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const tasksList = useSelector(allTasks);
  const filteredTasks = filterTasks(tasksList, activeFilter);

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
