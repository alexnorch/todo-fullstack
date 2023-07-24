import axios, { AxiosError } from "axios";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "./../assets/images/auth.svg";
import { CSSTransition } from "react-transition-group";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser, showAlert } from "../redux/appSlice";
import { RootState } from "../redux/store";

// Components
import Input from "../components/UI/Input";
import Alert from "../components/UI/Alert";

// helpers
import { addToLocalStorage } from "../helpers";

// Hooks
import useForm from "../hooks/useForm";

export default function Login() {
  const { values, onChange, validation, errors } = useForm({
    email: "",
    password: "",
  });

  const { isAlert } = useSelector((state: RootState) => state.app);
  const nodeRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    if (!validation()) return;
    const { email, password } = values;

    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });

      dispatch(loginUser(data));

      addToLocalStorage("accessToken", data.token);
      addToLocalStorage("userInfo", data.userInfo);
      addToLocalStorage("userData", data.userData);

      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        dispatch(showAlert({ type: "danger", text: errorMessage }));
      } else {
        throw err;
      }
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
      <CSSTransition
        nodeRef={nodeRef}
        in={isAlert}
        classNames="alert-transition"
        timeout={500}
      >
        <Alert ref={nodeRef} />
      </CSSTransition>
    </div>
  );
}
