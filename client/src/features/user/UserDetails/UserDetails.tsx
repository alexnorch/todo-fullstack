import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { TextField, Button } from "@features/ui";
import { ChangeEvent } from "../../../types";
import { UserEmailConfirmation, useUserServices } from "@features/user";

import { AiOutlineCheckCircle } from "react-icons/ai";

const UserDetails = () => {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const { changeUserInfo } = useUserServices();

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (name && email) {
      changeUserInfo({ name, email });
    }
  };

  const onChangeName = (e: ChangeEvent) => setName(e.target.value);
  const onChangeEmail = (e: ChangeEvent) => setEmail(e.target.value);

  const emailAdornment = (
    <div className="adornment-icon">
      <AiOutlineCheckCircle />
    </div>
  );

  return (
    <section className="settings__section">
      <h3 className="settings__heading">User Information</h3>
      <form onSubmit={submitHandler} className="settings-form">
        <div className="settings-form__wrapper">
          <TextField
            label="First Name"
            placeholder="First Name"
            value={name}
            onChange={onChangeName}
          />

          <TextField
            label="Last Name"
            placeholder="Last Name"
            value={name}
            onChange={onChangeName}
          />

          <TextField
            type="text"
            label="Gender"
            placeholder="Gender"
            value="male"
            onChange={onChangeEmail}
          />

          {user.isEmailConfirmed ? (
            <TextField
              disabled={user.isEmailConfirmed}
              type="email"
              label="E-mail address"
              placeholder="E-mail address"
              value={email}
              onChange={onChangeEmail}
              adornment={emailAdornment}
            />
          ) : (
            <UserEmailConfirmation
              onChange={onChangeEmail}
              email={email}
              isEmailConfirmed={user.isEmailConfirmed}
            />
          )}
        </div>
        <div className="settings-form__button">
          <Button variant="outline">Update info</Button>
        </div>
      </form>
    </section>
  );
};

export default UserDetails;
