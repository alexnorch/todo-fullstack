import { ChangeEvent } from "../../types";

export interface CategoryActionsProps {
  onTitleEdit: () => void;
  onTitleDelete: () => void;
}

export interface CategoryFormProps {
  title: string;
  setTitle: (e: ChangeEvent) => void;
  setColor: (e: ChangeEvent) => void;
  color: string;
  onChangeValue?: (e: ChangeEvent) => void;
}
