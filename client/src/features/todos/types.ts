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
