interface ITodo {
  _id: string;
  title: string;
  completed: boolean;
  category: {
    _id: string;
    title: string;
    color: string;
  };
}

interface ContainerProps {
  children: React.ReactNode;
}

interface CheckboxProps {
  onCheck: () => void;
  checked: boolean;
}
