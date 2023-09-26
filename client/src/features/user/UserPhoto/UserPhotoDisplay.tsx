import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import "./UserPhotoDisplay.scss";

interface UserPhotoDisplayProps {
  newImageSrc?: string | null;
}

const UserPhotoDisplay: React.FC<UserPhotoDisplayProps> = ({ newImageSrc }) => {
  const user = useSelector((state: RootState) => state.user);

  const url = newImageSrc ? newImageSrc : `/uploads/user_photos/${user.photo}`;

  return (
    <div className="user-photo">
      <img className="user-photo__img" src={url} alt="User image" />
    </div>
  );
};

export default UserPhotoDisplay;
