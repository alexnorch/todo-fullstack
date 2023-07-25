export interface AppState {
  user: UserInfo | null;
  token: string | null;
  data: UserData[];
  alertType: "danger" | "success" | "info";
  alertText: string | null;
  isAlert: boolean;
}

export interface UserData {
  _id: string;
  categoryName: string;
  color: string;
  tasks: TaskItem[];
}

export interface CategoryInterface {
  categoryName: string;
  color: string;
  _id: string;
  tasks: TaskItem[];
}

export interface UserInfo {
  email: string;
  id: string;
  name: string;
  photo: string;
}

export interface TaskItem {
  _id: string;
  title: string;
  completed: boolean;
  category: string;
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
