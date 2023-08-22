import { useState, useRef } from "react";
import { IconButton, Button } from "../../ui";
import { BsThreeDotsVertical } from "react-icons/bs";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { CategoryActionsProps } from "../types";

const CategoryActions: React.FC<CategoryActionsProps> = ({
  onTitleEdit,
  onTitleDelete,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    isShown: showMenu,
    nodeRef: actionsRef,
    onHide: () => setShowMenu(false),
  });

  return (
    <div className="category-card__actions">
      <IconButton onClick={() => setShowMenu((prev) => !prev)}>
        <BsThreeDotsVertical />
      </IconButton>
      {showMenu && (
        <div ref={actionsRef} className="category-card__actions__options">
          <Button
            variant="transparent"
            onClick={() => {
              onTitleEdit();
              setShowMenu(false);
            }}
          >
            Edit
          </Button>
          <Button
            variant="transparent"
            onClick={() => {
              onTitleDelete();
              setShowMenu(false);
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryActions;
