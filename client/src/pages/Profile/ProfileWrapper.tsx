import { Outlet, NavLink } from "react-router-dom";
import { UserPhoto } from "@features/user";

const ProfileWrapper = () => {
  return (
    <div className="profile">
      <div className="profile__left">
        <ul className="profile-nav">
          <li className="profile-nav__item">
            <NavLink to=".">Details</NavLink>
          </li>
          <li className="profile-nav__item">
            <NavLink to="password">Password</NavLink>
          </li>
        </ul>
        <UserPhoto />
      </div>
      <div className="profile__right">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileWrapper;
