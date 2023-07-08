interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

interface ContainerProps {
  children: React.ReactNode;
}

interface CheckboxProps {
  onCheck: () => void;
  checked: boolean;
}
