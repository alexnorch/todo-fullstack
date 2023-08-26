import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { FileUploader, Button } from "../../ui";

const UserPhoto = () => {
  const user = useSelector((state: RootState) => state.app.user);
  return (
    <>
      <div className="user-settings__left__picture">
        <img
          className="user-settings__left__picture__img"
          src={user!.photo}
          alt="User image"
        />
      </div>
      <div className="user-settings__left__buttons">
        <Button variant="outline">Delete picture</Button>
        <FileUploader text="Import new image" />
      </div>
    </>
  );
};

export default UserPhoto;
