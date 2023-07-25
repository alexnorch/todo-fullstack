import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";

// Components
import Menu from "../components/Menu";
import Alert from "../components/UI/Alert";

export default function Main() {
  const { isAlert } = useSelector((state: RootState) => state.app);

  return (
    <main className="app">
      <aside className="menu">
        <Menu />
      </aside>
      <div className="app__right">
        <Outlet />
      </div>
      <CSSTransition classNames="alert-transition" timeout={500} in={isAlert}>
        <Alert />
      </CSSTransition>
    </main>
  );
}
