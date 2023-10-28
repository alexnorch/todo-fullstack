import { useState } from "react";
import { ChangeEvent } from "types";
import "./CategoryItem.scss";

import {
  CategoryItemContent,
  CategoryItemDeleting,
  CategoryItemEditing,
  useCategoryServices,
} from "@components/categories";

const CategoryItem: React.FC<any> = ({ color, title, _id }) => {
  const { onUpdateCategory, onDeleteCategory } = useCategoryServices();

  const [newTitle, setNewTitle] = useState(title);
  const [newColor, setNewColor] = useState(color);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onDeletingToggle = () => setIsDeleting(!isDeleting);
  const onEditingToggle = () => setIsEditing(!isEditing);

  const onChangeTitle = (e: ChangeEvent) => setNewTitle(e.target.value);
  const onChangeColor = (e: ChangeEvent) => setNewColor(e.target.value);

  const handleUpdateCategory = () => {
    onUpdateCategory(_id, {
      title: newTitle,
      color: newColor,
    });

    onEditingToggle();
  };

  const handleDeleteCategory = () => {
    onDeleteCategory(_id);
  };

  return (
    <>
      <CategoryItemContent
        color={color}
        title={title}
        onDeleting={onDeletingToggle}
        onEditing={onEditingToggle}
      />

      <CategoryItemDeleting
        isDeleting={isDeleting}
        onDeletingToggle={onDeletingToggle}
        onDelete={handleDeleteCategory}
      />

      <CategoryItemEditing
        newTitle={newTitle}
        newColor={newColor}
        isEditing={isEditing}
        onEditTodo={handleUpdateCategory}
        onEditingToggle={onEditingToggle}
        onChangeColor={onChangeColor}
        onChangeTitle={onChangeTitle}
      />
    </>
  );
};

export default CategoryItem;
