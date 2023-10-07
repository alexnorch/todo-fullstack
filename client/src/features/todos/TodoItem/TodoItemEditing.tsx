import { Modal, TextField } from "@features/ui";
import { ChangeEvent } from "types";

interface ITodoEditing {
  onTodoEdit: () => void;
  onToggle: () => void;
  onChange: (e: ChangeEvent) => void;
  isEditing: boolean;
  value: string;
}

const TodoItemEditing: React.FC<ITodoEditing> = (props) => {
  const { value, isEditing, onToggle, onTodoEdit, onChange } = props;
  return (
    <Modal
      submitter={onTodoEdit}
      onToggle={onToggle}
      title="Editing the task"
      isOpen={isEditing}
    >
      <TextField label="New Title" value={value} onChange={onChange} />
    </Modal>
  );
};

export default TodoItemEditing;
