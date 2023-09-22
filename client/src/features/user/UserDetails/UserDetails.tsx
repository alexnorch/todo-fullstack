import { useState } from "react";
import { useSelector } from "react-redux";
import useUserServices from "../useUserServices";
import { RootState } from "../../../redux/store";
import { TextField, Button } from "@features/ui";
import { ChangeEvent } from "../../../types";

import { AiOutlineCheckCircle } from "react-icons/ai";

const UserDetails = () => {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const { changeUserInfo } = useUserServices()

  const submitHandler = (e: any) => {
    e.preventDefault()

    if (name && email) {
      changeUserInfo({ name, email })
    }
  }

  const emailInputAdornment = user.isEmailConfirmed 
  ? (
    <div className="adornment-icon">
      <AiOutlineCheckCircle />
    </div>
  ) : (
    <Button variant="transparent">Confirm</Button>
  );

  return (
    <section className="settings__section">
      <h3 className="section-heading">User Information</h3>
      <form onSubmit={submitHandler} className="settings-form">
        <TextField
          disabled={user.isEmailConfirmed}
          type="email"
          label="E-mail address"
          placeholder="E-mail address"
          value={email}
          onChange={(e: ChangeEvent) => setEmail(e.target.value)}
          adornment={emailInputAdornment}
        />
        <TextField
          label="Full Name"
          placeholder="Full Name"
          value={name}
          onChange={(e: ChangeEvent) => setName(e.target.value)}
        />
        <div className="settings-form__button">
          <Button variant="outline">Submit changes</Button>
        </div>
      </form>
    </section>
  );
};

export default UserDetails;
