import { Link } from "react-router-dom";
import { CategoriesList } from "@features/categories";

import "./Menu.scss";

// Icons
import { IoMdSettings, IoIosList, IoMdPodium } from "react-icons/io";

const Menu = () => {
  return (
    <ul className="menu">
      <li className="menu__item">
        <span className="menu__icon">
          <IoMdPodium />
        </span>
        <p className="menu__text">
          <Link className="menu__link" to="/">
            Overview
          </Link>
        </p>
      </li>
      <li className="menu__item">
        <span className="menu__icon">
          <IoMdSettings />
        </span>
        <p className="menu__text">
          <Link className="menu__link" to="/settings">
            Settings
          </Link>
        </p>
      </li>
      <li className="menu__item menu-categories">
        <span className="menu__icon">
          <IoIosList />
        </span>
        <div>
          <CategoriesList />
        </div>
      </li>
    </ul>
  );
};

export default Menu;
