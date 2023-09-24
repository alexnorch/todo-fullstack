import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "redux/appSlice";
import Menu from "../Menu/Menu";
import { Logo, IconButton } from "@features/ui";
import { CiLogout } from 'react-icons/ci'
import "./Aside.scss";

const Aside: React.FC = () => {
  const asideRef = useRef<HTMLElement>(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const asideElem = asideRef.current!;

    const addActiveClass = () => asideElem.classList.add("active");
    const removeActiveClass = () => asideElem.classList.remove("active");

    asideElem.addEventListener("mouseenter", addActiveClass);
    asideElem.addEventListener("mouseleave", removeActiveClass);

    return () => {
      asideElem.removeEventListener("mouseenter", addActiveClass);
      asideElem.removeEventListener("mouseleave", removeActiveClass);
    };
  }, []);

  const logoutHandler = () => dispatch(logout())

  return (
    <aside ref={asideRef} className="aside">
      <Logo />
      <Menu />
      <IconButton onClick={logoutHandler}>
        <CiLogout />
      </IconButton>
    </aside>
  );
};

export default Aside;
