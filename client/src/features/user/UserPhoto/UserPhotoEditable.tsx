import UserPhotoDisplay from "./UserPhotoDisplay";
import { AiOutlineCamera } from "react-icons/ai";
import "./UserPhotoEditable.scss";

interface UserPhotoEditableProps {
  onNewPhoto: () => void;
}

const UserPhotoEditable: React.FC<UserPhotoEditableProps> = ({
  onNewPhoto,
}) => {
  return (
    <div className="user-photo-editor">
      <UserPhotoDisplay />
      <span onClick={onNewPhoto} className="user-photo-editor__icon">
        <AiOutlineCamera />
      </span>
    </div>
  );
};

export default UserPhotoEditable;
