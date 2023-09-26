import { useState } from "react";
import { useSelector } from "react-redux";
import useAlert from "@hooks/useAlert";
import useUserServices from "../useUserServices";
import { RootState } from "../../../redux/store";
import { TextField, Button } from "@features/ui";
import { ChangeEvent } from "../../../types";

import { AiOutlineCheckCircle } from "react-icons/ai";

const UserDetails = () => {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const { changeUserInfo } = useUserServices();
  const { showInfoAlert } = useAlert();

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (name && email) {
      changeUserInfo({ name, email });
    }
  };

  const confirmHandler = () => {
    showInfoAlert(
      "Confirmation link was successfully sent to your e-mail address"
    );
  };

  const emailInputAdornment = user.isEmailConfirmed ? (
    <div className="adornment-icon">
      <AiOutlineCheckCircle />
    </div>
  ) : (
    <Button type="button" onClick={confirmHandler} variant="transparent">
      Confirm
    </Button>
  );

  return (
    <section className="settings__section">
      <h3 className="section-heading">User Information</h3>
      <form onSubmit={submitHandler} className="settings-form">
        <TextField
          label="First Name"
          placeholder="First Name"
          value="Oleksandr"
          onChange={(e: ChangeEvent) => setName(e.target.value)}
        />

        <TextField
          label="Last Name"
          placeholder="Last Name"
          value="Harashchenko"
          onChange={(e: ChangeEvent) => setName(e.target.value)}
        />

        <TextField
          type="text"
          label="Gender"
          placeholder="Gender"
          value="male"
          onChange={(e: ChangeEvent) => setEmail(e.target.value)}
        />

        <TextField
          disabled={user.isEmailConfirmed}
          type="email"
          label="E-mail address"
          placeholder="E-mail address"
          value={email}
          onChange={(e: ChangeEvent) => setEmail(e.target.value)}
          adornment={emailInputAdornment}
        />

        <div className="settings-form__button">
          <Button variant="outline">Submit changes</Button>
        </div>
      </form>
    </section>
  );
};

export default UserDetails;
