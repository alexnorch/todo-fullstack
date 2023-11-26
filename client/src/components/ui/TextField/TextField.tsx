import "./TextField.scss";
import { UseFormRegister } from "react-hook-form/dist/types";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  adornment?: React.ReactNode;

  register?: any;
  validationOptions?: any;
  errors?: any;
}

const TextField: React.FC<InputProps> = (props) => {
  const {
    label,
    value,
    type,
    adornment,
    disabled,
    register,
    validationOptions,
    errors,
  } = props;

  let inputClasses = "text-field__input";
  let labelClasses = "text-field__label";

  if (disabled) inputClasses += " disabled";
  if (value) labelClasses += " text-field__label_active";

  return (
    <div className="text-field">
      <div className={inputClasses}>
        <input type={type} />
        <label className={labelClasses}>{label}</label>
        {adornment && <div className="text-field__adornment">{adornment}</div>}
      </div>
      {errors && <p className="auth__errorMsg">{errors.message}</p>}
    </div>
  );
};

export default TextField;
