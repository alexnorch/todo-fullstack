interface AuthHeadingProps {
  isLoginForm: boolean;
  onToggleLoginForm: () => void;
}

const AuthHeading: React.FC<AuthHeadingProps> = ({
  isLoginForm,
  onToggleLoginForm,
}) => {
  return (
    <div className="auth__heading">
      {isLoginForm ? (
        <>
          <h1>Hello Again!</h1>
          <p>Welcome back! Please enter your details</p>
          <p>
            <span> Don't have an account?</span>
            <button onClick={onToggleLoginForm}> Register</button>
          </p>
        </>
      ) : (
        <>
          <h1>Are your new here?</h1>
          <p>Please, fill up the form to create your first account</p>
          <p>
            <span> Already have an account?</span>
            <button onClick={onToggleLoginForm}>Login</button>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthHeading;
