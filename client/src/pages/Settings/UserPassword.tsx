import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { ChangeEvent } from "types";
import { TextField, IconButton, Button } from "@components/ui";
import { useUserServices } from "@components/user";

interface IIsVisible {
  old: boolean;
  new: boolean;
  confirm: boolean;
  [key: string]: boolean;
}

const UserPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isVisible, setIsVisible] = useState<IIsVisible>({
    old: false,
    new: false,
    confirm: false,
  });

  const { onPasswordChange } = useUserServices();

  const onVisibleToggle = (passwordType: string) => {
    setIsVisible((prev: IIsVisible) => ({
      ...prev,
      [passwordType]: !prev[passwordType],
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    onPasswordChange({ oldPassword, newPassword, confirmPassword });
  };

  return (
    <div className="settings-section">
      <h3 className="settings-section__heading">Change Password</h3>
      <form onSubmit={onSubmit} className="settings-section__form passwords">
        <TextField
          type={isVisible.old ? "text" : "password"}
          label="Old Password"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e: ChangeEvent) => setOldPassword(e.target.value)}
          adornment={
            <IconButton onClick={() => onVisibleToggle("old")}>
              {isVisible.old ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
          }
        />
        <TextField
          name="new"
          type={isVisible.new ? "text" : "password"}
          label="New password"
          placeholder="New password"
          value={newPassword}
          onChange={(e: ChangeEvent) => setNewPassword(e.target.value)}
          adornment={
            <IconButton onClick={() => onVisibleToggle("new")}>
              {isVisible.new ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
          }
        />
        <TextField
          name="confirm"
          type={isVisible.confirm ? "text" : "password"}
          label="Confirm New Password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e: ChangeEvent) => setConfirmPassword(e.target.value)}
          adornment={
            <IconButton onClick={() => onVisibleToggle("confirm")}>
              {isVisible.confirm ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
          }
        />
        <div className="settings-section__bottom">
          <Button variant="outline">Change password</Button>
        </div>
      </form>
    </div>
  );
};

export default UserPassword;
