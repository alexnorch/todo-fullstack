import { useState } from "react";
import "./AuthContent.scss";
import { AuthHeading, RegisterForm, LoginForm } from "..";

const AuthContent = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const onToggleLoginForm = () => setIsLoginForm((prev) => !prev);

  return (
    <div className="auth-content">
      <div className="auth-content__inner">
        <AuthHeading
          isLoginForm={isLoginForm}
          onToggleLoginForm={onToggleLoginForm}
        />
        {isLoginForm ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthContent;
