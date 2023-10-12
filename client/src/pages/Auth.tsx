import { AuthContent, AuthPicture } from "@features/auth";
import { Alert } from "@features/ui";

const Auth = () => {
  return (
    <div className="auth">
      <AuthPicture />
      <AuthContent />
      <Alert />
    </div>
  );
};

export default Auth;
