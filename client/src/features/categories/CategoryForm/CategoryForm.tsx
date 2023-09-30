import { TextField, ColorPicker } from "@features/ui";
import { ChangeEvent } from "types";
import "./CategoryForm.scss";

interface CategoryFormProps {
  title: string;
  color: string;
  onTitleChange: (e: ChangeEvent) => void;
  onColorChange: (e: ChangeEvent) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = (props) => {
  const { title, color, onTitleChange, onColorChange } = props;
  return (
    <div className="category-form">
      <TextField
        label="New Category Name"
        placeholder="New Category Name"
        value={title}
        onChange={onTitleChange}
      />
      <ColorPicker
        labelText="New Category Color"
        color={color}
        setColor={onColorChange}
      />
    </div>
  );
};

export default CategoryForm;
