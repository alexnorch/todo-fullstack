import { useState } from "react";
import { Modal, IconButton } from "../../features/ui";
import { AiOutlinePlus } from "react-icons/ai";

// Components
import {
  CategoriesContainer,
  NewCategory,
} from "../../features/categories/components";

export default function Categories() {
  const [isModal, setIsModal] = useState<boolean>(false);
  return (
    <div className="categories-settings">
      <CategoriesContainer />
      <div className="new-category">
        <IconButton onClick={() => setIsModal(true)}>
          <AiOutlinePlus />
        </IconButton>
      </div>
      <Modal
        title="Create new category"
        isOpen={isModal}
        onToggle={() => setIsModal((prev) => !prev)}
      >
        <NewCategory />
      </Modal>
    </div>
  );
}
