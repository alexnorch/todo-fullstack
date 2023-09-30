import { useState } from "react";
import useCategoryServices from "../useCategoryServices";
import { Modal, TextField, ColorPicker } from "@features/ui";
import { CategoryForm } from "@features/categories";
import { ChangeEvent } from "types";

interface CategoryEditProps {
  id: string;
  categoryName: string;
  categoryColor: string;
  isEditing: boolean;
  onModalToggle: () => void;
}

const CategoryEditing: React.FC<CategoryEditProps> = (props) => {
  const { categoryColor, categoryName, id, isEditing, onModalToggle } = props;
  const [newTitle, setNewTitle] = useState<string>(categoryName);
  const [newColor, setNewColor] = useState<string>(categoryColor);
  const { onUpdateCategory } = useCategoryServices();

  const onUpdate = () => {
    onUpdateCategory(id, {
      title: newTitle,
      color: newColor,
    });

    onModalToggle();
  };

  return (
    <Modal
      isOpen={isEditing}
      onToggle={onModalToggle}
      title="Editing the category"
      submitter={onUpdate}
    >
      <CategoryForm
        title={newTitle}
        color={newColor}
        onTitleChange={(e: ChangeEvent) => setNewTitle(e.target.value)}
        onColorChange={(e: ChangeEvent) => setNewColor(e.target.value)}
      />
    </Modal>
  );
};

export default CategoryEditing;
