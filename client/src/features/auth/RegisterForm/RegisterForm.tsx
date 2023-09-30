import useForm from "../useForm";
import { TextField, Button } from "../../ui";

const RegisterForm = () => {
  const { errors, values, onChange, validation } = useForm({
    password: "",
    confirmPassword: "",
    email: "",
  });

  const onSubmit = () => {
    validation();
  };
  return (
    <form className="auth__form">
      <TextField
        errorMessage={errors.email}
        name="email"
        label="E-Mail address"
        value={values.email}
        onChange={onChange}
      />
      <TextField
        errorMessage={errors.password}
        type="password"
        name="password"
        label="Password"
        value={values.password}
        onChange={onChange}
      />
      <TextField
        errorMessage={errors.confirmPassword}
        type="password"
        name="confirmPassword"
        label="Confirm password"
        value={values.confirmPassword}
        onChange={onChange}
      />
      <div className="auth__bottom">
        <button type="button" onClick={onSubmit} className="auth__btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
