import { Button, PageHeading } from "@components/ui";

interface AuthHeadingProps {
  isLoginForm: boolean;
  onToggleLoginForm: () => void;
}

const AuthHeading: React.FC<AuthHeadingProps> = ({
  isLoginForm,
  onToggleLoginForm,
}) => {
  return isLoginForm ? (
    <>
      <PageHeading
        title="Hello Again!"
        subtitle="Welcome back! Please enter your details"
      />
      <span> Don't have an account?</span>
      <Button variant="transparent" onClick={onToggleLoginForm}>
        Register
      </Button>
    </>
  ) : (
    <>
      <PageHeading
        title="Are your new here?"
        subtitle="Please, fill up the form to create your first account"
      />
      <span> Already have an account?</span>
      <Button variant="transparent" onClick={onToggleLoginForm}>
        Log In
      </Button>
    </>
  );
};

export default AuthHeading;
