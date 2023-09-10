import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { AuthContent, AuthBackground } from "@features/auth";
import { Alert } from "@features/ui";

const Auth = () => {
  const { isAlert } = useSelector((state: RootState) => state.app);
  const nodeRef = useRef(null);

  return (
    <div className="auth">
      <AuthBackground />
      <div className="auth__right">
        <AuthContent />
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
};

export default Auth;
