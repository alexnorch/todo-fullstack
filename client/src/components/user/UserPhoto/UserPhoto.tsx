import { useState } from "react";
import { UserPhotoEditable, UserPhotoModal } from "@components/user";

const UserPhoto = () => {
  const [isNewPhoto, setIsNewPhoto] = useState(false);

  const onNewPhoto = () => {
    setIsNewPhoto((prev) => !prev);
  };

  return (
    <>
      <UserPhotoEditable onNewPhoto={onNewPhoto} />
      <UserPhotoModal isNewPhoto={isNewPhoto} onToggle={onNewPhoto} />
    </>
  );
};

export default UserPhoto;
