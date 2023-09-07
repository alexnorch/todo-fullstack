import { useEffect, useRef } from "react";
import Menu from "../Menu/Menu";
import { Logo } from "../../ui";
import "./Aside.scss";

const Aside: React.FC = () => {
  const asideRef = useRef<HTMLElement>(null);

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

  return (
    <aside ref={asideRef} className="aside">
      <Logo />
      <Menu />
    </aside>
  );
};

export default Aside;
