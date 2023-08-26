import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useRef } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";

interface TodoActionsProps {
  onEdit: () => void;
  onRemove: () => void;
}

const TodoActions: React.FC<TodoActionsProps> = ({ onRemove, onEdit }) => {
  const [isShown, setIsShown] = useState(false);
  const nodeRef = useRef<HTMLUListElement>(null);

  const onHide = () => setIsShown(false);
  const onToggle = () => setIsShown((prev) => !prev);

  useOutsideClick({
    isShown,
    nodeRef,
    onHide,
  });

  return (
    <div className="todo-actions">
      <button onClick={onToggle} className="todo-actions__btn">
        <BsThreeDotsVertical />
      </button>
      {isShown && (
        <ul ref={nodeRef} className="todo-actions__menu">
          <li
            className="todo-actions__menu__item"
            onClick={() => {
              onRemove();
              onHide();
            }}
          >
            Remove
          </li>
          <li
            className="todo-actions__menu__item"
            onClick={() => {
              onEdit();
              onHide();
            }}
          >
            Edit
          </li>
        </ul>
      )}
    </div>
  );
};

export default TodoActions;
