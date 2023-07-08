interface InputProps {
  placeholder: string;
  name?: string;
  type?: string;
  onChange: any;
  value: string;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
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
      <input
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
