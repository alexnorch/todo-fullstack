import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";

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
  const allTasks = useSelector((state: RootState) => state.tasks.allTasks);
  const filteredTasks = filterTasks(allTasks, activeFilter);

  const dispatch = useDispatch();

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
