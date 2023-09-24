import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { FileUploader, Button } from "../../ui";
import useUserServices from "../useUserServices";

import "./UserPhoto.scss";

const UserPhoto = () => {
  const user = useSelector((state: RootState) => state.user);
  const currentImage = `/uploads/user_photos/${user.photo}`
  const [image, setImage] = useState(currentImage)
  const [newImage, setNewImage] = useState(null)
  const { changeUserImage } = useUserServices()

  useEffect(() => {

    return () => {
      setImage(currentImage)
    }
  }, [])

  const dispatch = useDispatch();

  const onImageChange = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    if (file) {
      reader.onload = (e: any) => {
        setImage(e.target.result)
        setNewImage(file)
      }
  
      reader.readAsDataURL(file);
    } else {
      setImage(currentImage)
      setNewImage(null)
    }
  }

  const onImageSubmit = () => {
    changeUserImage(newImage)
  }

  return (
    <div className="user-left">
      <div className="user-image">
        <img 
          className="user-image__img" 
          src={image} 
          alt="User image" />
      </div>
      <div className="user-image__buttons">
        <FileUploader
          accepts='images/*' 
          onChange={onImageChange} 
          text="Upload image" />
        <Button 
          disabled={!newImage} 
          onClick={onImageSubmit} 
          variant="primary">Change Image</Button>
      </div>
    </div>
  );
};

export default UserPhoto;
