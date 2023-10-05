import { useEffect, useRef, useState } from "react";
import Menu from "../Menu/Menu";
import { Logo, Hamburger } from "@features/ui";
import "./Aside.scss";

const Aside = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const asideElem = asideRef.current!;

    const onResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);

    const addActiveClass = () => asideElem.classList.add("active");
    const removeActiveClass = () => asideElem.classList.remove("active");

    if (width > 992) {
      asideElem.addEventListener("mouseenter", addActiveClass);
      asideElem.addEventListener("mouseleave", removeActiveClass);
    }

    return () => {
      asideElem.removeEventListener("mouseenter", addActiveClass);
      asideElem.removeEventListener("mouseleave", removeActiveClass);
      window.removeEventListener("resize", onResize);
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
        <Hamburger onToggle={onMenuToggle} />
      </div>
      <Menu onToggle={onMenuToggle} />
    </aside>
  );
};

export default Aside;
