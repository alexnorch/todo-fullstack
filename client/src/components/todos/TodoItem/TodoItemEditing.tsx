import { Modal, TextField } from "@components/ui";
import { ChangeEvent } from "types";
import "./TodoItemEditing.scss";

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
      <div className="todo-editing">
        <TextField label="New Title" value={value} onChange={onChange} />
      </div>
    </Modal>
  );
};

export default TodoItemEditing;
