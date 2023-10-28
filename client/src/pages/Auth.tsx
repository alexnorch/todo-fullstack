import { AuthContent, AuthPicture } from "@components/auth";
import { Alert } from "@components/ui";

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
