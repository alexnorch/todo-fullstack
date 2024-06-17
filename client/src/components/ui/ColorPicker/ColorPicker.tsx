import { ChangeEvent } from "../../../types";
import "./ColorPicker.scss";

export interface ColorPickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: any;
}
const ColorPicker: React.FC<ColorPickerProps> = ({ name, label, register }) => {
  return (
    <div className="color-picker">
      <span>{label}</span>
      <label className="color-picker__label">
        <input
          {...register(name)}
          className="color-picker__input"
          type="color"
        />
      </label>
    </div>
  );
};

export default ColorPicker;
