import "./TextField.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  adornment?: React.ReactNode;
  register?: any;
  validationOptions?: any;
  errors?: any;
}

const TextField: React.FC<InputProps> = ({
  label,
  value,
  type,
  adornment,
  disabled,
  register,
  errors,
  name,
  onChange,
}) => {
  let inputClasses = "text-field__input";
  let labelClasses = "text-field__label";

  if (disabled) inputClasses += " disabled";
  if (value) labelClasses += " text-field__label_active";

  return (
    <div className="text-field">
      <div className={inputClasses}>
        {register ? (
          <input {...register(name)} type={type} />
        ) : (
          <input value={value} type={type} onChange={onChange} />
        )}
        <label className={labelClasses}>{label}</label>
        {adornment && <div className="text-field__adornment">{adornment}</div>}
      </div>
      {errors && <p className="auth__errorMsg">{errors.message}</p>}
    </div>
  );
};

export default TextField;
