import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import useCustomAxios from "@hooks/useCustomAxios";
import { ChangeEvent } from "../../../types";
import { TextField, IconButton, Button } from "@features/ui";
import useUserServices from "../useUserServices";

const UserPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { onPasswordChange } = useUserServices();

  const onSubmit = (e: any) => {
    e.preventDefault();
    onPasswordChange({ oldPassword, newPassword, confirmPassword });
  };

  return (
    <section className="settings__section">
      <h3 className="section-heading">Change Password</h3>
      <form onSubmit={onSubmit} className="settings-form">
        <TextField
          type={showPassword ? "text" : "password"}
          label="Old Password"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e: ChangeEvent) => setOldPassword(e.target.value)}
          adornment={
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
          }
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label="New password"
          placeholder="New password"
          value={newPassword}
          onChange={(e: ChangeEvent) => setNewPassword(e.target.value)}
          adornment={
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
          }
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label="Confirm New Password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e: ChangeEvent) => setConfirmPassword(e.target.value)}
          adornment={
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </IconButton>
          }
        />
        <div className="settings-form__button">
          <Button variant="outline">Change password</Button>
        </div>
      </form>
    </section>
  );
};

export default UserPassword;
