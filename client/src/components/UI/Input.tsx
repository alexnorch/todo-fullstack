interface InputProps {
  placeholder: string;
  name?: string;
  type?: string;
  onChange: any;
  value: string;
  errorMessage?: string;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  handleBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
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
      <label className="input-group__label">{errorMessage}</label>
    </div>
  );
};

export default Input;
