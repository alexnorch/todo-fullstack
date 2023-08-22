import { useState } from "react";
import useCategoryServices from "../useCategoryServices";
import CategoryMenu from "./CategoryActions";
import { capitalizeFirstLetter } from "../../../helpers";

import { Modal } from "../../ui";
import CategoryForm from "./CategoryForm";

const CategoryItem: React.FC<any> = ({ tasks, color, categoryName, _id }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [action, setAction] = useState<"delete" | "update" | null>(null);
  const [newCategoryTitle, setNewCategoryTitle] =
    useState<string>(categoryName);
  const [newCategoryColor, setNewCategoryColor] = useState<string>(color);

  const { onDeleteCategory, onUpdateCategory } = useCategoryServices();
  const onModalToggle = () => {
    setIsModal((prev) => !prev);
  };

  const onSubmit = () => {
    if (action === "update") {
      onUpdateCategory(_id, {
        title: newCategoryTitle,
        color: newCategoryColor,
      });
    }

    if (action === "delete") {
      onDeleteCategory(_id);
    }

    onModalToggle();
  };

  const modalTitle =
    action === "update"
      ? "Updating the category data"
      : `Deleting the category ${categoryName}`;

  const modalContent =
    action === "update" ? (
      <CategoryForm
        setTitle={(e: any) => setNewCategoryTitle(e.target.value)}
        setColor={(e: any) => setNewCategoryColor(e.target.value)}
        title={newCategoryTitle}
        color={newCategoryColor}
      />
    ) : (
      <p>Are your sure you want to delete this category?</p>
    );

  return (
    <>
      <li
        style={{ borderBottom: `10px solid ${color}` }}
        className="category-card"
      >
        <CategoryMenu
          onTitleDelete={() => {
            setAction("delete");
            onModalToggle();
          }}
          onTitleEdit={() => {
            setAction("update");
            onModalToggle();
          }}
        />
        <div className="category-card__body">
          <h3 className="category-card__title">
            {capitalizeFirstLetter(categoryName)}
          </h3>
          <hr />
          <p className="category-card__text">All tasks: {tasks.length}</p>
        </div>
      </li>
      <Modal
        isOpen={isModal}
        onToggle={onModalToggle}
        title={modalTitle}
        submitter={onSubmit}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default CategoryItem;
