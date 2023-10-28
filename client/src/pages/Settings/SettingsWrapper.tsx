import { Outlet } from "react-router-dom";
import { UserPhoto, UserNav, UserInfo } from "@components/user";
import { PageHeading } from "@components/ui";

const SettingsWrapper = () => {
  return (
    <>
      <PageHeading title="Settings" subtitle="Adjust Your Profile" />
      <div className="settings">
        <div className="settings__left">
          <div className="user-details">
            <UserPhoto />
            <UserInfo />
          </div>
          <UserNav />
        </div>
        <div className="settings__right">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SettingsWrapper;
