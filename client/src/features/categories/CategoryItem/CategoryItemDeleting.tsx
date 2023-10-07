import { ConfirmDialog } from "@features/ui";

interface ICategoryItemDeleting {
  isDeleting: boolean;
  onDeletingToggle: () => void;
  onDelete: () => void;
}

const CategoryItemDeleting: React.FC<ICategoryItemDeleting> = (props) => {
  const { isDeleting, onDeletingToggle, onDelete } = props;
  return (
    <ConfirmDialog
      onToggle={onDeletingToggle}
      submitter={onDelete}
      isOpen={isDeleting}
      text="Are you sure you want to delete this category?"
    />
  );
};

export default CategoryItemDeleting;
