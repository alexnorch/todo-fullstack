import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { TextField, Button } from "@components/ui";
import { ChangeEvent } from "types";
import { UserEmailConfirmation, useUserServices } from "@components/user";

import { AiOutlineCheckCircle } from "react-icons/ai";

const UserDetails = () => {
  const user = useSelector((state: RootState) => state.user);
  const [userValues, setUserValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const { changeUserInfo } = useUserServices();

  const submitHandler = (e: any) => {
    e.preventDefault();

    changeUserInfo(userValues);
  };

  const onChangeValue = ({ target: { name, value } }: ChangeEvent) => {
    setUserValues((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="settings-section">
      <h3 className="settings-section__heading">User Information</h3>
      <form onSubmit={submitHandler} className="settings-section__form">
        <TextField
          name="firstName"
          label="First Name"
          placeholder="First Name"
          value={userValues.firstName}
          onChange={onChangeValue}
        />

        <TextField
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          value={userValues.lastName}
          onChange={onChangeValue}
        />

        <TextField
          type="text"
          label="Gender"
          placeholder="Gender"
          value="male"
          onChange={() => alert("test")}
        />

        {user.isEmailConfirmed ? (
          <TextField
            name="email"
            disabled={user.isEmailConfirmed}
            type="email"
            label="E-mail address"
            placeholder="E-mail address"
            value={userValues.email}
            onChange={onChangeValue}
            adornment={
              <div className="adornment-icon">
                <AiOutlineCheckCircle />
              </div>
            }
          />
        ) : (
          <UserEmailConfirmation
            onChange={onChangeValue}
            email={userValues.lastName}
            isEmailConfirmed={user.isEmailConfirmed}
          />
        )}
        <div className="settings-section__bottom">
          <Button variant="outline">Update info</Button>
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
