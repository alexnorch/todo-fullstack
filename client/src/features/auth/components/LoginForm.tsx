import { useState } from "react";
import { Input, TextField, IconButton } from "../../ui";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// Custom hooks
import useForm from "../useForm";
import useAuth from "../useAuth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { values, onChange, validation, errors } = useForm({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const onSubmit = () => {
    if (!validation()) return;

    login(values.email, values.password);
  };

  return (
    <form className="auth__form">
      <Input
        name="email"
        errorMessage={errors.email}
        placeholder="Your email"
        value={values.email}
        onChange={onChange}
      />
      <TextField
        type={showPassword ? "text" : "password"}
        name="password"
        errorMessage={errors.password}
        placeholder="Your password"
        value={values.password}
        onChange={onChange}
        adornment={
          <IconButton onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </IconButton>
        }
      />
      <div className="auth__bottom">
        <button type="button" onClick={onSubmit} className="auth__btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
