import { useState } from "react";
import { Modal, IconButton } from "../../features/ui";
import { AiOutlinePlus } from "react-icons/ai";

// Components
import {
  CategoriesContainer,
  NewCategory,
} from "../../features/categories/components";
import useCategoryServices from "../../features/categories/useCategoryServices";

export default function Categories() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [categoryColor, setCategoryColor] = useState<string>("#000000");
  const { onAddCategory } = useCategoryServices();

  const toggleModal = () => setIsModal((prev) => !prev);

  return (
    <div className="categories-settings">
      <CategoriesContainer />

      <div className="new-category">
        <IconButton onClick={toggleModal}>
          <AiOutlinePlus />
        </IconButton>
      </div>

      <Modal
        title="Create new category"
        isOpen={isModal}
        onToggle={toggleModal}
        submitter={() =>
          onAddCategory({ title: categoryTitle, color: categoryColor })
        }
      >
        <NewCategory
          setTitle={(e: any) => setCategoryTitle(e.target.value)}
          setColor={(e: any) => setCategoryColor(e.target.value)}
          title={categoryTitle}
          color={categoryColor}
        />
      </Modal>
    </div>
  );
}
