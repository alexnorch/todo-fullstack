import { useState } from "react";
import { IconButton, Modal } from "@features/ui";
import { CategoryForm, useCategoryServices } from "@features/categories";
import { ChangeEvent } from "types";
import { AiOutlinePlus } from "react-icons/ai";

const CategoryAdd = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [categoryColor, setCategoryColor] = useState<string>("#000000");
  const { onAddCategory } = useCategoryServices();
  const toggleModal = () => setIsModal((prev) => !prev);

  const onSubmit = () => {
    onAddCategory({ title: categoryTitle, color: categoryColor });
  };

  return (
    <>
      <div className="new-category-btn">
        <IconButton onClick={toggleModal}>
          <AiOutlinePlus />
        </IconButton>
      </div>
      <Modal
        title="Create new category"
        isOpen={isModal}
        onToggle={toggleModal}
        submitter={onSubmit}
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
};

export default CategoryAdd;
