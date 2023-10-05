import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "@features/ui";
import { CategoryForm, useCategoryServices } from "@features/categories";
import { ChangeEvent } from "types";
import "./CategoryNew.scss";

const CategoryNew = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const { onAddCategory } = useCategoryServices();

  const toggleModal = () => setIsModal((prev) => !prev);
  const onColorChange = (e: ChangeEvent) => setColor(e.target.value);
  const onTitleChange = (e: ChangeEvent) => setTitle(e.target.value);
  const onSubmit = () => onAddCategory({ title, color });

  return (
    <>
      <div onClick={toggleModal} className="new-category-btn">
        <AiOutlinePlus />
      </div>
      <Modal
        title="Create new category"
        isOpen={isModal}
        onToggle={toggleModal}
        submitter={onSubmit}
      >
        <CategoryForm
          onTitleChange={onTitleChange}
          onColorChange={onColorChange}
          title={title}
          color={color}
        />
      </Modal>
    </>
  );
};

export default CategoryNew;
