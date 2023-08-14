import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logoutUser } from "../../redux/appSlice";

// Icons
import { IoExitOutline } from "react-icons/io5";

// Components
import Input from "../ui/Input";
import Button from "../ui/Button";
import FileUploader from "../ui/FileUploader";

export default function Profile() {
  const { email, name, photo } = useSelector(
    (state: RootState) => state.app.user
  )!;
  const [userEmail, setUserEmail] = useState<string>(email);
  const [userName, setUserName] = useState<string>(name);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch();

  return (
    <div className="user-settings">
      <div className="user-settings__left">
        <div className="user-settings__left__picture">
          <img
            className="user-settings__left__picture__img"
            src={photo}
            alt="User image"
          />
        </div>
        <div className="user-settings__left__buttons">
          <Button variant="outline">Delete picture</Button>
          <FileUploader text="Import new image" />
        </div>
        <div className="user-settings__logout">
          <Button
            onClick={() => dispatch(logoutUser())}
            icon={<IoExitOutline />}
            variant="transparent"
          >
            Log out
          </Button>
        </div>
      </div>
      <div className="user-settings__right">
        <section className="settings__section">
          <h3 className="settings__section__heading">User Information</h3>
          <hr />
          <form className="settings__section__form">
            <Input
              label="Your e-mail"
              placeholder="Your email"
              value={userEmail}
              onChange={(e: any) => setUserEmail(e.target.value)}
            />
            <Input
              label="Your Full Name"
              placeholder="Your email"
              value={userName}
              onChange={(e: any) => setUserName(e.target.value)}
            />
          </form>
          <div className="settings__section__button">
            <Button variant="outline">Change info</Button>
          </div>
        </section>
        <section className="settings__section">
          <h3 className="settings__section__heading">Change Password</h3>
          <hr />
          <form className="settings__section__form">
            <Input
              type="password"
              label="Old Password"
              placeholder="Please provide your current password"
              value={oldPassword}
              onChange={(e: any) => setOldPassword(e.target.value)}
            />
            <Input
              type="password"
              label="New password"
              placeholder="Provide your new password"
              value={newPassword}
              onChange={(e: any) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
            />
          </form>
          <div className="settings__section__button">
            <Button variant="outline">Change password</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
