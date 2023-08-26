export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type AlertTypes = "danger" | "success" | "info";

export interface AppState {
  user: UserInfo | null;
  token: string | null;
  data: UserData[];
  alertType: AlertTypes;
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
  color: string;
}

export interface InputProps {
  label?: string;
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
  duration?: number;
  text: string;
  type: AlertTypes;
}

export interface ContainerProps {
  children: React.ReactNode;
}

export interface CheckboxProps {
  onCheck: () => void;
  checked: boolean;
}
