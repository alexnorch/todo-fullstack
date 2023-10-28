export type CategoryType = string | undefined;

export interface TaskItem {
  _id: string;
  title: string;
  completed: boolean;
  category: string;
  color: string;
}

export type FilterType = "all" | "completed" | "incomplete";

export interface IFilterOptions {
  title: string;
  filterType: FilterType;
}

export interface CompletedTasksProps {
  tasks: TaskItem[];
  onToggle: () => void;
  isShown: boolean;
}

export interface TaskNavigationProps {
  showCompleted: () => void;
  completedTasksLength: number;
}

export interface IUserData {
  title: string;
  completed: boolean;
}

export interface GetTasksParams {
  category: CategoryType;
  isCompleted: boolean;
}
