import { BsThreeDotsVertical } from "react-icons/bs";

interface TodoActionsProps {
  onToggle: () => void;
  onChange: () => void;
  onDelete: () => void;
  isActive: boolean;
}

const TodoActions: React.FC<TodoActionsProps> = ({
  onToggle,
  onDelete,
  onChange,
  isActive,
}) => {
  return (
    <div className="todo-actions">
      <button onClick={onToggle} className="todo-actions__btn">
        <BsThreeDotsVertical />
      </button>
      {isActive && (
        <ul className="todo-actions__menu">
          <li onClick={onDelete}>Remove</li>
          <li onClick={onChange}>Edit</li>
        </ul>
      )}
    </div>
  );
};

export default TodoActions;
