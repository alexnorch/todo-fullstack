import { Link } from "react-router-dom";

import Input from "../features/ui/Input";
import backgroundImage from "../assets/images/auth.svg";

import useForm from "../hooks/useForm";

export default function Register() {
  const { errors, values, onChange, validation } = useForm({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const onSumbit = () => {
    validation();
  };

  return (
    <div className="auth">
      <div className="auth__left register">
        <div className="auth__content">
          <div className="auth__heading">
            <h1>Are your new here?</h1>
            <p>Please, fill up the form to create your first account</p>
            <p>
              <span> Already have an account?</span>
              <Link className="auth__link" to="/login">
                Log In
              </Link>
            </p>
          </div>
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
              <button type="button" onClick={onSumbit} className="auth__btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="auth__right register">
        <img className="auth__image register" src={backgroundImage} alt="" />
      </div>
    </div>
  );
}
