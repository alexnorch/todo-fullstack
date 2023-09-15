import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { capitalizeFirstLetter } from "../../../helpers";

import "./Menu.scss";

// Icons
import {
  IoMdSettings,
  IoIosList,
  IoMdAddCircleOutline,
  IoMdPodium,
} from "react-icons/io";

const Menu = () => {
  const categories = useSelector(
    (state: RootState) => state.categories.allCategories
  );

  const navigate = useNavigate();

  const renderCategories = () => {
    if (!categories || categories.length === 0) {
      return (
        <button onClick={() => navigate("/settings")} className="add-category">
          <IoMdAddCircleOutline className="add-category__icon" />
          <span>New category</span>
        </button>
      );
    }

    return (
      <ol className="menu-categories__list">
        <p className="menu__text">My categories:</p>
        {categories.map(({ title, _id, color }) => (
          <li key={_id} className="menu-categories__item">
            <span
              style={{ backgroundColor: color }}
              className="menu-categories__dot"
            ></span>
            <Link
              className="menu-categories__link"
              to={`tasks/${title?.toLocaleLowerCase()}`}
            >
              {capitalizeFirstLetter(title)}
            </Link>
          </li>
        ))}
      </ol>
    );
  };

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
        {renderCategories()}
      </li>
    </ul>
  );
};

export default Menu;
