import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { TaskItem } from "types";

import { TodoReadOnly } from "@features/todos";
import { filterTasks } from "@features/todos/utils";
import { OverviewTabs } from "@features/overview";

const tabs = [
  { name: "All tasks", dataTab: "all" },
  { name: "Completed tasks", dataTab: "completed" },
  { name: "Incomplete tasks", dataTab: "incomplete" },
];

const TaskList: React.FC<{ tasks: TaskItem[] }> = ({ tasks }) => (
  <div className="overview-tabs__content">
    {tasks.map((task) => (
      <TodoReadOnly key={task._id} {...task} />
    ))}
  </div>
);

const OverviewTodos = () => {
  const [activeTab, setActiveTab] = useState("all");
  const allTasks = useSelector((state: RootState) => state.tasks.allTasks);
  const filteredTasks = filterTasks(allTasks, activeTab);

  const onTabChange = (e: any) => {
    const clickedTab = e.target.getAttribute("data-tabName");
    setActiveTab(clickedTab);
  };

  return (
    <div className="overview-tabs">
      <OverviewTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        tabs={tabs}
      />

      <div className="overview-tabs__content">
        <TaskList tasks={filteredTasks} />
      </div>
    </div>
  );
};

export default OverviewTodos;
