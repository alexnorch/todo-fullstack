import { Outlet, NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => (
  <li className="settings-nav__item">
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "settings-nav__link settings-nav__link_active"
          : "settings-nav__link"
      }
    >
      {children}
    </NavLink>
  </li>
);

const SettingsWrapper = () => {
  return (
    <div className="settings">
      <h1 className="page-title">Settings</h1>
      <ul className="settings-nav">
        <NavItem to=".">Profile</NavItem>
        <NavItem to="categories">Categories</NavItem>
      </ul>
      <Outlet />
    </div>
  );
};

export default SettingsWrapper;
