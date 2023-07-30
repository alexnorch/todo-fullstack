import { Link, useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Icons
import { IoMdSettings, IoIosList, IoMdAddCircleOutline } from "react-icons/io";

const Menu = () => {
  const { data } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();

  const renderCategories = () => {
    return data?.length !== 0 ? (
      data.map(({ categoryName, color, _id }) => (
        <li key={_id} className="menu__list__link">
          <span
            className="menu__list__span"
            style={{ backgroundColor: color }}
          ></span>
          <Link to={`tasks/${categoryName?.toLocaleLowerCase()}`}>
            {categoryName}
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
    <div className="menu">
      <div className="menu__category">
        <h2 className="menu__category__title">
          <IoIosList />
          <Link to="/">Today tasks</Link>
        </h2>
        <ul className="menu__list">{renderCategories()}</ul>
      </div>
      <div className="menu__category">
        <h2 className="menu__category__title">
          <IoMdSettings />
          <Link to="/settings">Settings</Link>
        </h2>
      </div>
    </div>
  );
};

export default Menu;
