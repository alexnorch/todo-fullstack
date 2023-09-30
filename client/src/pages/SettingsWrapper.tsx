import { Outlet } from "react-router-dom";
import { UserPhoto, UserNav, UserInfo } from "@features/user";
import { PageHeading } from "@features/ui";

const SettingsWrapper = () => {
  return (
    <div className="settings">
      <PageHeading title="Settings" subtitle="Adjust Your Profile" />
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
  );
};

export default SettingsWrapper;
