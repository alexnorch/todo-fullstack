export type CategoryType = string | undefined;

export interface TaskItem {
  _id: string;
  title: string;
  completed: boolean;
  category: string;
  color: string;
}

export interface CompletedTasksProps {
  tasks: TaskItem[];
  onToggle: () => void;
  isActive: boolean;
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
