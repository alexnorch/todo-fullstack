import { ConfirmDialog } from "@features/ui";
import useCategoryServices from "../useCategoryServices";

interface CategoryDeletingProps {
  id: string;
  isDeleting: boolean;
  onConfirmToggle: () => void;
}

const CategoryDeleting: React.FC<CategoryDeletingProps> = (props) => {
  const { id, isDeleting, onConfirmToggle } = props;
  const { onDeleteCategory } = useCategoryServices();

  return (
    <ConfirmDialog
      onToggle={onConfirmToggle}
      submitter={() => onDeleteCategory(id)}
      isOpen={isDeleting}
      text="Are you sure you want to delete this category?"
    />
  );
};

export default CategoryDeleting;
