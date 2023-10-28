import { TaskItem } from "types";

export const filterTasks = (tasks: TaskItem[], activeTab: string) => {
  switch (activeTab) {
    case "all":
      return tasks;
    case "completed":
      return tasks.filter((task) => task.completed);
    case "incomplete":
      return tasks.filter((task) => !task.completed);
    default:
      return tasks;
  }
};
