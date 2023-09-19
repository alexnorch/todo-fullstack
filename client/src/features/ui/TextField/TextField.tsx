import "./TextField.scss";

export interface InputProps {
  label?: string;
  placeholder: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  onChange: any;
  value: string;
  errorMessage?: string;
  adornment?: React.ReactNode;
}

const TextField: React.FC<InputProps> = ({
  label,
  placeholder,
  onChange,
  value,
  errorMessage,
  name,
  type,
  adornment,
  disabled,
}) => {
  let labelClass = "text-field__label";
  let inputClasses = "text-field__input";

  if (value.length > 0) labelClass += " visible";
  if (disabled) inputClasses += " disabled";

  return (
    <div className="text-field">
      <label className={labelClass}>{value.length > 0 && label}</label>
      <div className={inputClasses}>
        <input
          required
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {adornment && <div className="text-field__adornment">{adornment}</div>}
      </div>
      <p className="text-field__error">{errorMessage}</p>
    </div>
  );
};

export default TextField;
