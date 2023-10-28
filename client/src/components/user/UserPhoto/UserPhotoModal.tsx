import { useState } from "react";
import { Modal, FileUploader } from "@components/ui";
import { UserPhotoDisplay, useUserServices } from "@components/user";
import "./UserPhotoModal.scss";

interface UserPhotoModalProps {
  isNewPhoto: boolean;
  onToggle: () => void;
}

const UserPhotoModal: React.FC<UserPhotoModalProps> = ({
  isNewPhoto,
  onToggle,
}) => {
  const [newImageSrc, setNewImageSrc] = useState<string | null>("");
  const [newImageFile, setNewImageFile] = useState(null);
  const { changeUserImage } = useUserServices();

  const onImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.onload = (e: any) => {
        setNewImageSrc(e.target.result);
        setNewImageFile(file);
      };

      reader.readAsDataURL(file);
    } else {
      setNewImageSrc(null);
      setNewImageFile(null);
    }
  };

  const onNewImageSubmit = () => {
    changeUserImage(newImageFile);
    onToggle();
  };

  return (
    <Modal
      submitter={onNewImageSubmit}
      onToggle={onToggle}
      isOpen={isNewPhoto}
      title="Selecting new image"
    >
      <div className="user-photo-modal">
        <UserPhotoDisplay newImageSrc={newImageSrc} />
        <div className="user-photo-modal__uploader">
          <FileUploader
            accepts="images/*"
            onChange={onImageChange}
            text="Upload image"
          />
          <p className="user-photo-modal__text">
            Please choose a new image for your profile
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default UserPhotoModal;
