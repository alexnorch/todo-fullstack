import { Link } from "react-router-dom";
import backgroundImage from "./../assets/images/auth.svg";
import { useNavigate } from "react-router-dom";

// Components
import Input from "../components/UI/Input";

// Hooks
import useForm from "../hooks/useForm";

export default function Login() {
  const { values, onChange, validation, errors } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = () => {
    if (validation()) {
      localStorage.setItem("user", "test");
    }
  };
  return (
    <div className="auth">
      <div className="auth__left">
        <img className="auth__image" src={backgroundImage} alt="" />
      </div>
      <div className="auth__right">
        <div className="auth__content">
          <div className="auth__heading">
            <h1>Hello Again!</h1>
            <p>Welcome back! Please enter your details</p>
            <p>
              <span> Don't have an account?</span>
              <Link className="auth__link" to="/register">
                Register
              </Link>
            </p>
          </div>
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
        </div>
      </div>
    </div>
  );
}
