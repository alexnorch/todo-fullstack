import { useState } from "react";
import { TextField, ColorPicker } from "../../ui";

const NewCategory = () => {
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");

  return (
    <form className="new-category-form">
      <TextField
        label="Please provide a title of category"
        value={title}
        placeholder="Category title"
        onChange={(e: any) => setTitle(e.target.value)}
      />
      <ColorPicker
        labelText="Please chose the color"
        color={color}
        setColor={(e: any) => setColor(e.target.value)}
      />
    </form>
  );
};

export default NewCategory;
