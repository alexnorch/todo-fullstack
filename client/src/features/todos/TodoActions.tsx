import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";

interface TodoActionsProps {
  onChange: () => void;
  onDelete: () => void;
}

const TodoActions: React.FC<TodoActionsProps> = ({ onDelete, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);
  return (
    <div className="todo-actions">
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="todo-actions__btn"
      >
        <BsThreeDotsVertical />
      </button>
      {showMenu && (
        <ul ref={menuRef} className="todo-actions__menu">
          <li className="todo-actions__menu__item" onClick={onDelete}>
            Remove
          </li>
          <li className="todo-actions__menu__item" onClick={onChange}>
            Edit
          </li>
        </ul>
      )}
    </div>
  );
};

export default TodoActions;
