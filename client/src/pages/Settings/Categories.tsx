import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ChangeEvent } from "../../types";
import useCategoryServices from "@features/categories/useCategoryServices";

// Components
import { Modal, IconButton } from "@ui";
import { CategoriesList, CategoryForm } from "@features/categories";

export default function Categories() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [categoryColor, setCategoryColor] = useState<string>("#000000");
  const { onAddCategory } = useCategoryServices();

  const toggleModal = () => setIsModal((prev) => !prev);

  return (
    <>
      <CategoriesList />
      <div className="new-category-btn">
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
        <CategoryForm
          onTitleChange={(e: ChangeEvent) => setCategoryTitle(e.target.value)}
          onColorChange={(e: ChangeEvent) => setCategoryColor(e.target.value)}
          title={categoryTitle}
          color={categoryColor}
        />
      </Modal>
    </>
  );
}
