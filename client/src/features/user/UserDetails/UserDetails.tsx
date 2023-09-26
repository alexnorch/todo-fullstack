import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAlert from "@hooks/useAlert";
import useUserServices from "../useUserServices";
import { RootState } from "../../../redux/store";
import { TextField, Button } from "@features/ui";
import { ChangeEvent } from "../../../types";

import { AiOutlineCheckCircle } from "react-icons/ai";

const initialTimeout = localStorage.getItem("emailTimeout") || "";

const UserDetails = () => {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isEmailConfirming, setIsEmailConfirming] = useState(
    Boolean(initialTimeout)
  );

  const { changeUserInfo } = useUserServices();
  const { showInfoAlert } = useAlert();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const savedTimeout = localStorage.getItem("emailTimeout");

    if (savedTimeout) {
      const time = parseInt(savedTimeout) - Date.now();

      if (time > 0) {
        timeout = setTimeout(() => {
          setIsEmailConfirming(false);
          localStorage.removeItem("emailTimeout");
        }, time);
      } else {
        setIsEmailConfirming(false);
        localStorage.removeItem("emailTimeout");
      }
    } else {
      setIsEmailConfirming(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (name && email) {
      changeUserInfo({ name, email });
    }
  };

  const confirmHandler = () => {
    const timeoutTime = (Date.now() + 1000 * 10).toString();

    showInfoAlert(
      "Confirmation link was successfully sent to your e-mail address"
    );

    localStorage.setItem("emailTimeout", timeoutTime);
    setIsEmailConfirming(true);
  };

  const emailInputAdornment = user.isEmailConfirmed ? (
    <div className="adornment-icon">
      <AiOutlineCheckCircle />
    </div>
  ) : (
    <Button
      disabled={isEmailConfirming}
      type="button"
      onClick={confirmHandler}
      variant="transparent"
    >
      Confirm
    </Button>
  );

  return (
    <section className="settings__section">
      <h3 className="settings__heading">User Information</h3>
      <form onSubmit={submitHandler} className="settings-form">
        <div className="settings-form__wrapper">
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
        </div>
        <div className="settings-form__button">
          <Button variant="outline">Update info</Button>
        </div>
      </form>
    </section>
  );
};

export default UserDetails;
