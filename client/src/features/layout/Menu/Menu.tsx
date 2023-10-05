import { Link } from "react-router-dom";
import "./Menu.scss";

// Icons
import { IoMdSettings, IoIosList } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";

const links = [
  { path: "/", title: "Overview", icon: <AiOutlineHome /> },
  { path: "/categories", title: "My tasks", icon: <IoIosList /> },
  { path: "/settings", title: "Settings", icon: <IoMdSettings /> },
];

interface IMenuItem {
  path: string;
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

const MenuItem: React.FC<IMenuItem> = (props) => {
  const { path, icon, title, onClick } = props;

  let classes = "menu__item";

  if (title.toLowerCase() === "settings") {
    classes += " menu-settings";
  }

  return (
    <li onClick={onClick} className={classes}>
      <Link className="menu__link" to={path}>
        <span className="menu__icon">{icon}</span>
        <p className="menu__text">{title}</p>
      </Link>
    </li>
  );
};

const Menu: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const renderedLinks = links.map((link, i) => (
    <MenuItem onClick={onToggle} key={i} {...link} />
  ));

  return <ul className="menu">{renderedLinks}</ul>;
};

export default Menu;
