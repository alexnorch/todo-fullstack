import { Link } from "react-router-dom";
import { CategoriesList } from "@features/categories";
import { Hamburger } from "@features/ui";

import "./Menu.scss";

// Icons
import { IoMdSettings, IoIosList } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";

const Menu = () => {
  return (
    <ul className="menu">
      <li className="menu__item">
        <span className="menu__icon">
          <AiOutlineHome />
        </span>
        <p className="menu__text">
          <Link className="menu__link" to="/">
            Overview
          </Link>
        </p>
      </li>

      <li className="menu__item menu-categories">
        <span className="menu__icon">
          <IoIosList />
        </span>
        <p className="menu__text">My categories</p>
        <CategoriesList />
      </li>

      <li className="menu__item menu-settings">
        <span className="menu__icon">
          <IoMdSettings />
        </span>
        <p className="menu__text">
          <Link className="menu__link" to="/settings">
            Settings
          </Link>
        </p>
      </li>
    </ul>
  );
};

export default Menu;
