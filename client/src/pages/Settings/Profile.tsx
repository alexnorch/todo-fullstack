import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/appSlice";

// Icons
import { IoExitOutline } from "react-icons/io5";

// Components
import { Button } from "../../features/ui";
import {
  UserDetails,
  UserPassword,
  UserPhoto,
} from "../../features/user/components";

export default function Profile() {
  const dispatch = useDispatch();

  const onLogoutUser = () => {
    dispatch(logoutUser());
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="user-settings">
      <div className="user-settings__left">
        <UserPhoto />
        <div className="user-settings__logout">
          <Button
            onClick={onLogoutUser}
            icon={<IoExitOutline />}
            variant="transparent"
          >
            Log out
          </Button>
        </div>
      </div>
      <div className="user-settings__right">
        <UserDetails />
        <UserPassword />
      </div>
    </div>
  );
}
