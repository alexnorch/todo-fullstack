import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/appSlice";

// Icons
import { IoExitOutline } from "react-icons/io5";

// Components
import { Button } from "../../features/ui";
import { UserDetails, UserPassword, UserPhoto } from "../../features/user";

export default function Profile() {
  const dispatch = useDispatch();

  const onLogoutUser = () => {
    dispatch(logoutUser());
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="user-container">
      <div className="user-left">
        <UserPhoto />
        <div className="user-left__logout">
          <Button onClick={onLogoutUser} variant="transparent">
            Log out
          </Button>
        </div>
      </div>
      <div className="user-right">
        <UserDetails />
        <UserPassword />
      </div>
    </div>
  );
}
