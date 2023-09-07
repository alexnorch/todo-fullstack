import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useCategoryServices from "../useCategoryServices";
import { capitalizeFirstLetter } from "../../../helpers";
import { ChangeEvent } from "../../../types";
import "./CategoryItem.scss";

import { Modal, ActionsMenu } from "../../ui";
import { CategoryForm } from "../";

type CategoryAction = "delete" | "update" | null;

const CategoryItem: React.FC<any> = ({ tasks, color, categoryName, _id }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [categoryAction, setCategoryAction] = useState<CategoryAction>(null);
  const [newTitle, setNewTitle] = useState<string>(categoryName);
  const [newColor, setNewColor] = useState<string>(color);
  const alertType = useSelector((state: RootState) => state.app.alertType);

  const { onDeleteCategory, onUpdateCategory } = useCategoryServices();
  const onModalToggle = () => setIsModal((prev) => !prev);

  const updatingModalTitle = "Updating the category data";
  const deletingModalTitle = `Deleting the category ${categoryName}`;

  const onSubmit = () => {
    switch (categoryAction) {
      case "update":
        onUpdateCategory(_id, {
          title: newTitle,
          color: newColor,
        });
      case "delete":
        if (categoryAction === "delete") {
          onDeleteCategory(_id);
        }
    }

    if (alertType !== "danger") {
      onModalToggle();
    }
  };

  // If the user clicks "Update" button, it will generate a form for creating a new category in Modal component, otherwise
  // it will show a confirm message for deleting the chosen category

  const getModalContent = () => {
    if (categoryAction === "update") {
      return (
        <CategoryForm
          setTitle={(e: ChangeEvent) => setNewTitle(e.target.value)}
          setColor={(e: ChangeEvent) => setNewColor(e.target.value)}
          title={newTitle}
          color={newColor}
        />
      );
    } else if (categoryAction === "delete") {
      return <p>Are your sure you want to delete this category?</p>;
    }

    return null;
  };

  return (
    <>
      <div
        style={{ borderBottom: `10px solid ${color}` }}
        className="category-column"
      >
        <div className="category-column__actions">
          <ActionsMenu
            onDelete={() => {
              setCategoryAction("delete");
              onModalToggle();
            }}
            onEdit={() => {
              setCategoryAction("update");
              onModalToggle();
            }}
          />
        </div>
        <div className="category-column__body">
          <h3 className="category-column__title">
            {capitalizeFirstLetter(categoryName)}
          </h3>
          <hr />
          <p className="category-column__text">All tasks: {tasks.length}</p>
        </div>
      </div>
      <Modal
        isOpen={isModal}
        onToggle={onModalToggle}
        title={
          categoryAction === "update" ? updatingModalTitle : deletingModalTitle
        }
        submitter={onSubmit}
      >
        {getModalContent()}
      </Modal>
    </>
  );
};

export default CategoryItem;
