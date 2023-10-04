import { useEffect, useRef } from "react";
import Menu from "../Menu/Menu";
import { Logo, Hamburger } from "@features/ui";
import "./Aside.scss";

const Aside: React.FC = () => {
  const asideRef = useRef<HTMLElement>(null);
  const width = window.innerWidth;

  useEffect(() => {
    const asideElem = asideRef.current!;

    const addActiveClass = () => asideElem.classList.add("active");
    const removeActiveClass = () => asideElem.classList.remove("active");

    if (width > 992) {
      asideElem.addEventListener("mouseenter", addActiveClass);
      asideElem.addEventListener("mouseleave", removeActiveClass);
    }

    return () => {
      asideElem.removeEventListener("mouseenter", addActiveClass);
      asideElem.removeEventListener("mouseleave", removeActiveClass);
    };
  }, [width]);

  const onMenuToggle = () => {
    if (asideRef.current) {
      asideRef.current.classList.toggle("active-mobile");
    }
  };

  return (
    <aside ref={asideRef} className="aside">
      <div className="aside__top">
        <Logo />
        <Hamburger onClick={onMenuToggle} />
      </div>
      <Menu />
    </aside>
  );
};

export default Aside;
