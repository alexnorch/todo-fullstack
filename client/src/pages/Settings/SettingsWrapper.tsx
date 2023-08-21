import { Outlet, NavLink } from "react-router-dom";

const SettingsWrapper: React.FC<any> = (props) => {
  return (
    <div className="settings">
      <h1 className="settings__heading">Settings</h1>
      <ul className="settings__nav">
        <li className="settings__nav__item">
          <NavLink
            to="."
            className={({ isActive }) =>
              isActive ? "settings__nav__link active" : "settings__nav__link"
            }
          >
            Profile
          </NavLink>
        </li>
        <li className="settings__nav__item">
          <NavLink
            to="categories"
            className={({ isActive }) =>
              isActive ? "settings__nav__link active" : "settings__nav__link"
            }
          >
            Categories
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default SettingsWrapper;
