import { BsThreeDotsVertical, BsTrashFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

import { useState, useRef } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import "./ActionsMenu.scss";

interface ActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ onDelete, onEdit }) => {
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
    <div className="actions-menu">
      <button onClick={onToggle} className="actions-menu__btn">
        <BsThreeDotsVertical />
      </button>
      {isShown && (
        <ul ref={nodeRef} className="actions-menu__list">
          <li
            className="actions-menu__item"
            onClick={() => {
              onDelete();
              onHide();
            }}
          >
            Delete
            <BsTrashFill />
          </li>
          <li
            className="actions-menu__item"
            onClick={() => {
              onEdit();
              onHide();
            }}
          >
            Edit
            <AiOutlineEdit />
          </li>
        </ul>
      )}
    </div>
  );
};

export default ActionsMenu;
