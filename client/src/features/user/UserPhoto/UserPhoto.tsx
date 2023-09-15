import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/appSlice";
import { RootState } from "../../../redux/store";
import { FileUploader, Button } from "../../ui";
import "./UserPhoto.scss";

const UserPhoto = () => {
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const onLogoutUser = () => {
    dispatch(logoutUser());
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="user-left">
      <div className="user-image">
        <img className="user-image__img" src={user!.photo} alt="User image" />
      </div>
      <div className="user-image__buttons">
        <Button variant="outline">Delete picture</Button>
        <FileUploader text="Import new image" />
      </div>
      <div className="user-left__logout">
        <Button onClick={onLogoutUser} variant="transparent">
          Log out
        </Button>
      </div>
    </div>
  );
};

export default UserPhoto;
