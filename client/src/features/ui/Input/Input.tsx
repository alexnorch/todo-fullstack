import { InputProps } from "../../../types";
import "./Input.scss";

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  onChange,
  value,
  errorMessage,
  name,
  type,
}) => {
  let classes = "input-group__input";

  if (errorMessage) {
    classes = classes + " invalid";
  }

  return (
    <div className="input-group">
      <label className="input-group__label">{label}</label>
      <input
        type={type}
        name={name}
        className={classes}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <span className="input-group__label">{errorMessage}</span>
    </div>
  );
};

export default Input;
