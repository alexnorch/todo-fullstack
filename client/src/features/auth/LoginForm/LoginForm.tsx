import { useState } from "react";
import { TextField, IconButton, Button } from "@features/ui";
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
    <form autoComplete="nope" className="auth__form">
      <TextField
        label="E-mail address"
        name="email"
        value={values.email}
        onChange={onChange}
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        errorMessage={errors.password}
        value={values.password}
        onChange={onChange}
        adornment={
          <IconButton onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </IconButton>
        }
      />
      <div className="auth__bottom">
        <Button variant="primary" type="button" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
