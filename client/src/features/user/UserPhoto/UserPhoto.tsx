import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { FileUploader, Button } from "../../ui";
import "./UserPhoto.scss";

const UserPhoto = () => {
  const user = useSelector((state: RootState) => state.app.user);

  return (
    <>
      <div className="user-image">
        <img className="user-image__img" src={user!.photo} alt="User image" />
      </div>
      <div className="user-image__buttons">
        <Button variant="outline">Delete picture</Button>
        <FileUploader text="Import new image" />
      </div>
    </>
  );
};

export default UserPhoto;
