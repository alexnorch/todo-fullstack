import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Components
import Menu from "../components/Menu";
import Alert from "../components/UI/Alert";
import Modal from "../components/Modal";

export default function Main() {
  const { isAlert } = useSelector((state: RootState) => state.app);
  const [isModalCategory, setIsModalCategory] = useState<boolean>(false);

  return (
    <main className="app">
      <aside className="menu">
        <Menu createNewCategory={() => setIsModalCategory(true)} />
      </aside>
      <div className="app__right">
        <Outlet />
      </div>
      <Modal
        isOpen={isModalCategory}
        title="New category"
        onToggle={() => setIsModalCategory((prev) => !prev)}
      >
        <div>Test</div>
      </Modal>
      <CSSTransition classNames="alert-transition" timeout={500} in={isAlert}>
        <Alert />
      </CSSTransition>
    </main>
  );
}
