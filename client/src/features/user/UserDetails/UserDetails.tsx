import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { TextField, Button } from "@features/ui";
import { ChangeEvent } from "../../../types";

import { AiOutlineCheckCircle } from "react-icons/ai";

const UserDetails = () => {
  const user = useSelector((state: RootState) => state.user);

  const [userName, setUserName] = useState(user!.name);
  const [userEmail, setUserEmail] = useState(user!.email);

  const emailInputAdornment = user.isEmailConfirmed ? (
    <div className="adornment-icon">
      <AiOutlineCheckCircle />
    </div>
  ) : (
    <Button variant="transparent">Confirm</Button>
  );

  return (
    <section className="settings__section">
      <h3 className="section-heading">User Information</h3>
      <form className="settings-form">
        <TextField
          disabled={user.isEmailConfirmed}
          type="email"
          label="E-mail address"
          placeholder="E-mail address"
          value={userEmail}
          onChange={(e: ChangeEvent) => setUserEmail(e.target.value)}
          adornment={emailInputAdornment}
        />
        <TextField
          label="Full Name"
          placeholder="Full Name"
          value={userName}
          onChange={(e: ChangeEvent) => setUserName(e.target.value)}
        />
        <div className="settings-form__button">
          <Button variant="outline">Change info</Button>
        </div>
      </form>
    </section>
  );
};

export default UserDetails;
