import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRef } from "react";

// Components
import Aside from "../components/Aside";
import Alert from "../components/UI/Alert";

export default function Main() {
  const { isAlert } = useSelector((state: RootState) => state.app);
  const nodeRef = useRef(null);

  return (
    <main className="app">
      <Aside />
      <div className="app-content">
        <Outlet />
      </div>
      <CSSTransition
        nodeRef={nodeRef}
        classNames="alert-transition"
        timeout={500}
        in={isAlert}
      >
        <Alert />
      </CSSTransition>
    </main>
  );
}
