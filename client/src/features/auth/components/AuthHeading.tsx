import { Button } from "../../ui";

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
            <Button variant="transparent" onClick={onToggleLoginForm}>
              Register
            </Button>
          </p>
        </>
      ) : (
        <>
          <h1>Are your new here?</h1>
          <p>Please, fill up the form to create your first account</p>
          <p>
            <span> Already have an account?</span>
            <Button variant="transparent" onClick={onToggleLoginForm}>
              Log In
            </Button>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthHeading;
