import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "@components/ui";
import { CategoryForm, useCategoryServices } from "@components/categories";
import "./CategoryNew.scss";

interface ICategory {
  title: string;
  color: string;
}

const CategoryNew: React.FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { onAddCategory } = useCategoryServices();

  const toggleModal = () => setIsModal((prev) => !prev);

  const handleSubmit = ({ title, color }: ICategory) => {
    onAddCategory({ title, color });
    toggleModal();
  };

  return (
    <>
      <div onClick={toggleModal} className="new-category-btn">
        <AiOutlinePlus />
      </div>
      <Modal
        title="Create new category"
        isOpen={isModal}
        onToggle={toggleModal}
      >
        <CategoryForm submitForm={handleSubmit} />
      </Modal>
    </>
  );
};

export default CategoryNew;
