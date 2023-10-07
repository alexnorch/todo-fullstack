import { ConfirmDialog } from "@features/ui";

interface ITodoItemDeleting {
  isDeleting: boolean;
  onDeletingToggle: () => void;
  onDeleteTodo: () => void;
}

const TodoItemDeleting: React.FC<ITodoItemDeleting> = (props) => {
  const { isDeleting, onDeleteTodo, onDeletingToggle } = props;

  return (
    <ConfirmDialog
      isOpen={isDeleting}
      onToggle={onDeletingToggle}
      text="Are you sure you want to delete this task?"
      submitter={onDeleteTodo}
    />
  );
};

export default TodoItemDeleting;
