import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logoutUser } from "../redux/appSlice";
import { useNavigate } from "react-router-dom";

// Icons
import { IoMdSettings } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";

import personImage from "../assets/images/person.png";

const Menu: React.FC = () => {
  const { data, user } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(data);

  const renderCategories = () => {
    if (data?.length !== 0) {
      return data.map(({ categoryName, color, _id }) => (
        <li key={_id} className="menu__list__link">
          <span
            className="menu__list__dot"
            style={{ backgroundColor: color }}
          ></span>
          <Link to={`tasks/${categoryName?.toLocaleLowerCase()}`}>
            {categoryName}
          </Link>
        </li>
      ));
    }

    return (
      <button
        onClick={() => navigate("/settings/categories")}
        className="add-category"
      >
        <IoMdAddCircleOutline className="add-category__icon" />
        <span>New category</span>
      </button>
    );
  };

  const onLogoutUser = () => {
    localStorage.clear();
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="menu__top">
        <div className="menu__top__image">
          <img src={user?.photo} alt="Profile Image" />
        </div>
        <div className={"styles.info"}>
          <h3 className={"styles.heading"}>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="menu__middle">
        <div className="menu__middle__category">
          <h2 className="menu__middle__title">
            <FaTasks />
            <Link to="/">Today tasks</Link>
          </h2>
          <ul className="menu__list">{renderCategories()}</ul>
        </div>
        <div className="menu__middle__category">
          <h2 className="menu__middle__title">
            <IoMdSettings />
            <Link to="/settings">Settings</Link>
          </h2>
        </div>
      </div>
      <div className="menu__bottom">
        <button onClick={onLogoutUser} className="menu__bottom__btn">
          <GrLogout />
          <span>Log out</span>
        </button>
      </div>
    </>
  );
};

export default Menu;
