import { ChangeEvent } from "../../types";

interface ColorPickerProps {
  setColor: (e: ChangeEvent) => void;
  color: string;
  labelText: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  setColor,
  labelText,
}) => {
  return (
    <div className="color-picker">
      <span>{labelText}</span>
      <label className="color-picker__label">
        <input
          onChange={setColor}
          value={color}
          className="color-picker__input"
          type="color"
        />
        {color}
      </label>
    </div>
  );
};

export default ColorPicker;
