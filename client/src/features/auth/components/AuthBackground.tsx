import backgroundImage from "../../../assets/images/auth.svg";

const AuthBackground = () => {
  return (
    <div className="auth__left">
      <img
        className="auth__image"
        src={backgroundImage}
        alt="background image"
      />
    </div>
  );
};

export default AuthBackground;
