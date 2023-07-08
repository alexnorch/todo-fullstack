import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Icons
import { IoMdSettings } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";

import personImage from "../assets/images/person.png";

const Menu = () => {
  const categories = useSelector(
    (state: RootState) => state.todo.tempCategories
  );

  const links = categories.map((link, i) => (
    <li key={i} className="menu__list__link">
      <span
        className="menu__list__dot"
        style={{ backgroundColor: link.color }}
      ></span>
      <Link to={link.title.toLocaleLowerCase()}>{link.title}</Link>
    </li>
  ));

  return (
    <>
      <div className="menu__top">
        <div className="menu__top__image">
          <img src={personImage} alt="Profile Image" />
        </div>
        <div className={"styles.info"}>
          <h3 className={"styles.heading"}>Oleksandr Harashchenko</h3>
        </div>
      </div>
      <div className="menu__middle">
        <div className="menu__middle__category">
          <h2 className="menu__middle__title">
            <FaTasks />
            <Link to="/tasks">Today tasks</Link>
          </h2>
          <ul className="menu__list">{links}</ul>
        </div>
        <div className="menu__middle__category">
          <h2 className="menu__middle__title">
            <IoMdSettings />
            <Link to="/settings">Settings</Link>
          </h2>
        </div>
      </div>
      <div className="menu__bottom">
        <button className="menu__bottom__btn">
          <GrLogout />
          <span>Log out</span>
        </button>
      </div>
    </>
  );
};

export default Menu;
