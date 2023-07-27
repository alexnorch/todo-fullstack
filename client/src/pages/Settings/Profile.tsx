import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Components
import Input from "../../components/UI/Input";

export default function Profile() {
  const { email, name, photo } = useSelector(
    (state: RootState) => state.app.user
  )!;
  const [userEmail, setUserEmail] = useState<string>(email);
  const [userName, setUserName] = useState<string>(name);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  return (
    <div className="user-settings">
      <div className="user-settings__left">
        <div className="user-settings__picture">
          <img
            className="user-settings__picture__img"
            src={photo}
            alt="User image"
          />
        </div>
        <button>Change picture</button>
        <button>Delete picture</button>
      </div>
      <div className="user-settings__right">
        <section className="user-settings__section">
          <h3 className="user-settings__heading">User Information</h3>
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
        </section>
        <section className="user-settings__section">
          <h3 className="user-settings__heading">Change Password</h3>
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
        </section>
      </div>
    </div>
  );
}
