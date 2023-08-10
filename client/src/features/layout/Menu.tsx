import { Link, useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { capitalizeFirstLetter } from "../../helpers";

// Icons
import {
  IoMdSettings,
  IoIosList,
  IoMdAddCircleOutline,
  IoMdPodium,
} from "react-icons/io";

const Menu = () => {
  const { data } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();

  const renderCategories = () => {
    return data?.length !== 0 ? (
      data.map(({ categoryName, _id, color }) => (
        <li key={_id} className="category-list__item">
          <span
            style={{ backgroundColor: color }}
            className="category-list__item__dot"
          ></span>
          <Link to={`tasks/${categoryName?.toLocaleLowerCase()}`}>
            {capitalizeFirstLetter(categoryName)}
          </Link>
        </li>
      ))
    ) : (
      <button onClick={() => navigate("/settings")} className="add-category">
        <IoMdAddCircleOutline className="add-category__icon" />
        <span>New category</span>
      </button>
    );
  };

  return (
    <ul className="menu">
      <li className="menu__item">
        <span className="menu__item__icon">
          <IoMdPodium />
        </span>
        <p className="menu__item__text">
          <Link className="menu__item__link" to="/">
            Overview
          </Link>
        </p>
      </li>
      <li className="menu__item">
        <span className="menu__item__icon">
          <IoMdSettings />
        </span>
        <p className="menu__item__text">
          <Link className="menu__item__link" to="/settings">
            Settings
          </Link>
        </p>
      </li>
      <li className="menu__item categories">
        <span className="menu__item__icon">
          <IoIosList />
        </span>
        <ol className="category-list">
          <p className="menu__item__text">My categories:</p>
          {renderCategories()}
        </ol>
      </li>
      <div className="menu__category">
        <ul className="menu__list"></ul>
      </div>
    </ul>
  );
};

export default Menu;
