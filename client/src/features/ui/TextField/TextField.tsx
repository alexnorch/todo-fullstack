import "./TextField.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  errorMessage?: string;
  adornment?: React.ReactNode;
}

const TextField: React.FC<InputProps> = (props) => {
  const {
    label,
    onChange,
    value,
    errorMessage,
    name,
    type,
    adornment,
    disabled,
  } = props;

  let inputClasses = "text-field__input";
  let labelClasses = "text-field__label";

  if (disabled) inputClasses += " disabled";
  if (value) labelClasses += " text-field__label_active";

  return (
    <div className="text-field">
      <div className={inputClasses}>
        <input
          required
          type={type}
          name={name}
          onChange={onChange}
          value={value}
        />
        <label className={labelClasses}>{label}</label>
        {adornment && <div className="text-field__adornment">{adornment}</div>}
      </div>
      {errorMessage && <p className="text-field__error">{errorMessage}</p>}
    </div>
  );
};

export default TextField;
