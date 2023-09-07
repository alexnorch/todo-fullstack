import { TextField, ColorPicker } from "../../ui";
import { CategoryFormProps } from "../types";
import "./CategoryForm.scss";

const CategoryForm: React.FC<CategoryFormProps> = ({
  title,
  color,
  setColor,
  setTitle,
}) => {
  return (
    <form className="new-category-form">
      <TextField
        label="Please provide a title of category"
        value={title}
        placeholder="Category title"
        onChange={setTitle}
      />
      <ColorPicker
        labelText="Please chose the color"
        color={color}
        setColor={setColor}
      />
    </form>
  );
};

export default CategoryForm;
