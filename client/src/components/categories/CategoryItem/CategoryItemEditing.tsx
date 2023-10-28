import { Modal } from "@components/ui";
import { CategoryForm } from "@components/categories";
import { ChangeEvent } from "types";

interface ICategoryItemEditing {
  newTitle: string;
  newColor: string;
  isEditing: boolean;
  onEditingToggle: () => void;
  onEditTodo: () => void;
  onChangeTitle: (e: ChangeEvent) => void;
  onChangeColor: (e: ChangeEvent) => void;
}

const CategoryItemEditing: React.FC<ICategoryItemEditing> = ({
  newTitle,
  newColor,
  isEditing,
  onEditingToggle,
  onEditTodo,
  onChangeColor,
  onChangeTitle,
}) => {
  return (
    <Modal
      isOpen={isEditing}
      onToggle={onEditingToggle}
      title="Editing the category"
      submitter={onEditTodo}
    >
      <CategoryForm
        title={newTitle}
        color={newColor}
        onTitleChange={onChangeTitle}
        onColorChange={onChangeColor}
      />
    </Modal>
  );
};

export default CategoryItemEditing;
