import { InputProps } from "../../types";

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  onChange,
  value,
  errorMessage,
  name,
  type,
  onKeyUp,
  handleBlur,
}) => {
  let classes = "input-group__input";

  if (errorMessage) {
    classes = classes + " invalid";
  }

  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        onBlur={handleBlur}
        onKeyUp={onKeyUp}
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
