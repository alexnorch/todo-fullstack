import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

// Icons
import { CgProfile } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { BsPalette } from "react-icons/bs";

export default function Wrapper() {
  const navLinks = [
    { title: "Profile", path: "/settings", icon: <CgProfile /> },
    { title: "Categories", path: "categories", icon: <BiCategory /> },
    { title: "Theme", path: "theme", icon: <BsPalette /> },
  ];

  const renderLinks = navLinks.map((link, i) => (
    <li className="settings__nav__item" key={i}>
      <Link className="settings__nav__link" to={link.path}>
        {link.icon}
        <span>{link.title}</span>
      </Link>
    </li>
  ));
  return (
    <div className="settings">
      <ul className="settings__nav">{renderLinks}</ul>
      <Outlet />
    </div>
  );
}
