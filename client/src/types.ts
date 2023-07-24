export interface AppState {
  user: UserInfo | null;
  token: string | null;
  categories: CategoryInterface[];
  tasks: TaskItem[];
  alertType: "danger" | "success" | "info";
  alertText: string | null;
  isAlert: boolean;
}

export interface CategoryInterface {
  title: string;
  color: string;
  _id: string;
}

export interface UserData {
  tasks: TaskItem[];
  categories: CategoryInterface[];
}

export interface UserInfo {
  email: string;
  id: string;
  name: string;
}

export interface TaskItem {
  _id: string;
  title: string;
  completed: boolean;
  category: {
    _id: string;
    title: string;
    color: string;
  };
}

export interface InputProps {
  placeholder: string;
  name?: string;
  type?: string;
  onChange: any;
  value: string;
  errorMessage?: string;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  handleBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export interface AuthPayload {
  token: string;
  userData: UserData;
  userInfo: UserInfo;
}

export interface AlertProps {
  text: string;
  type: "danger" | "success" | "info";
}

export interface ContainerProps {
  children: React.ReactNode;
}

export interface CheckboxProps {
  onCheck: () => void;
  checked: boolean;
}
