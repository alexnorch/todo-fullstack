import { useSelector } from "react-redux";
import "./UserPhotoDisplay.scss";
import { user } from "@store/selectors/userSelectors";

interface UserPhotoDisplayProps {
  newImageSrc?: string | null;
}

const UserPhotoDisplay: React.FC<UserPhotoDisplayProps> = ({ newImageSrc }) => {
  const userDetails = useSelector(user);

  const url = newImageSrc
    ? newImageSrc
    : `/uploads/user_photos/${userDetails.photo}`;

  return (
    <div className="user-photo">
      <img className="user-photo__img" src={url} alt="User image" />
    </div>
  );
};

export default UserPhotoDisplay;
