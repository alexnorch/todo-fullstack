export interface CategoryActionsProps {
  onTitleEdit: () => void;
  onTitleDelete: () => void;
}

export interface CategoryFormProps {
  title: string;
  setTitle: (e: any) => void;
  setColor: (e: any) => void;
  color: string;
  onChangeValue?: (e: any) => void;
}
