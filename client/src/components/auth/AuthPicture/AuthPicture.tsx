import backgroundImage from "../../../assets/images/auth.svg";
import "./AuthPicture.scss";

const AuthBackground = () => {
  return (
    <div className="auth-picture">
      <img
        className="auth-picture__img"
        src={backgroundImage}
        alt="background image"
      />
    </div>
  );
};

export default AuthBackground;
