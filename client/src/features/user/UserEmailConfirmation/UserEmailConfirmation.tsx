import { useEffect, useState } from "react";
import { TextField, Button } from "@features/ui";
import { ChangeEvent } from "types";
import useAlert from "@hooks/useAlert";
import { useUserServices } from "@features/user";

interface IUserEmailConfirmation {
  email: string;
  isEmailConfirmed: boolean | undefined;
  onChange: (e: ChangeEvent) => void;
}

const initialTimeout = localStorage.getItem("emailTimeout") || "";

const UserEmailConfirmation: React.FC<IUserEmailConfirmation> = (props) => {
  const { isEmailConfirmed, email, onChange } = props;
  const [isConfirming, setIsConfirming] = useState(Boolean(initialTimeout));
  const { showInfoAlert, showSuccessAlert } = useAlert();
  const { getUser } = useUserServices();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const savedTimeout = localStorage.getItem("emailTimeout");

    if (savedTimeout) {
      const time = parseInt(savedTimeout) - Date.now();

      if (time > 0) {
        timeout = setTimeout(() => {
          setIsConfirming(false);
          localStorage.removeItem("emailTimeout");
        }, time);
      } else {
        setIsConfirming(false);
        localStorage.removeItem("emailTimeout");
      }
    } else {
      setIsConfirming(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    getUser();

    if (isEmailConfirmed) {
      showSuccessAlert("E-mail address was successfully confirmed");
    }
  }, []);

  const confirmHandler = () => {
    const timeoutTime = (Date.now() + 1000 * 10).toString();

    showInfoAlert(
      "Confirmation link was successfully sent to your e-mail address"
    );

    localStorage.setItem("emailTimeout", timeoutTime);
    setIsConfirming(true);
  };

  const inputAdornment = (
    <Button
      disabled={isConfirming}
      type="button"
      onClick={confirmHandler}
      variant="transparent"
    >
      Confirm
    </Button>
  );

  return (
    <TextField
      disabled={isEmailConfirmed}
      type="email"
      label="E-mail address"
      placeholder="E-mail address"
      value={email}
      onChange={onChange}
      adornment={inputAdornment}
    />
  );
};

export default UserEmailConfirmation;
