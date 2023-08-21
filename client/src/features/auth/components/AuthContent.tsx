import { useState } from "react";
// Components
import { AuthHeading, RegisterForm, LoginForm } from ".";

const AuthContent = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const renderedForm = isLoginForm ? <LoginForm /> : <RegisterForm />;
  const onToggleLoginForm = () => setIsLoginForm((prev) => !prev);

  return (
    <div className="auth__content">
      <div className="auth__heading">
        <AuthHeading
          isLoginForm={isLoginForm}
          onToggleLoginForm={onToggleLoginForm}
        />
      </div>
      {renderedForm}
    </div>
  );
};

export default AuthContent;
