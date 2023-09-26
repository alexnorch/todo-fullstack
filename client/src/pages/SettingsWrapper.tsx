import { Outlet } from "react-router-dom";
import { UserPhoto, UserNav, UserInfo } from "@features/user";

const SettingsWrapper = () => {
  return (
    <>
      <div className="settings">
        <div className="page-heading">
          <h1 className="page-heading__title">Settings</h1>
          <h2 className="page-heading__subtitle">Adjust Your Profile</h2>
        </div>
        <div className="settings__content">
          <div className="settings__left">
            <UserPhoto />
            <UserInfo />
            <UserNav />
          </div>
          <div className="settings__right">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsWrapper;
