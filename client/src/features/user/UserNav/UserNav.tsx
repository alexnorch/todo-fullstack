import { NavLink } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import "./UserNav.scss";

const UserNav = () => {
  return (
    <ul className="user-nav">
      <li className="user-nav__item">
        <NavLink className="user-nav__link" to="/settings" end>
          <span className="user-nav__icon">
            <RiLockPasswordLine />
          </span>
          Details
        </NavLink>
      </li>
      <li className="user-nav__item">
        <NavLink className="user-nav__link" to="password">
          <span className="user-nav__icon">
            <RiLockPasswordLine />
          </span>
          Change Password
        </NavLink>
      </li>
    </ul>
  );
};

export default UserNav;
