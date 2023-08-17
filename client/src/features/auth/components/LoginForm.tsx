import { Input } from "../../ui";

// Custom hooks
import useForm from "../useForm";
import useAuth from "../useAuth";

const LoginForm = () => {
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
      <Input
        type="password"
        name="password"
        errorMessage={errors.password}
        placeholder="Your password"
        value={values.password}
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

export default LoginForm;
