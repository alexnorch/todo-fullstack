import useForm from "../useForm";
import { Input, Button } from "../../ui";

const RegisterForm = () => {
  const { errors, values, onChange, validation } = useForm({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const onSubmit = () => {
    validation();
  };
  return (
    <form className="auth__form">
      <Input
        errorMessage={errors.name}
        name="name"
        placeholder="Your name"
        value={values.name}
        onChange={onChange}
      />
      <Input
        errorMessage={errors.email}
        name="email"
        placeholder="Your email"
        value={values.email}
        onChange={onChange}
      />
      <Input
        errorMessage={errors.password}
        type="password"
        name="password"
        placeholder="Your password"
        value={values.password}
        onChange={onChange}
      />
      <Input
        errorMessage={errors.confirmPassword}
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
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
