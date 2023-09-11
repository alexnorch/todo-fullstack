import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { TextField, Button } from "../../ui";
import { ChangeEvent } from "../../../types";

const UserDetails = () => {
  const user = useSelector((state: RootState) => state.app.user);
  const [userName, setUserName] = useState(user!.name);
  const [userEmail, setUserEmail] = useState(user!.email);

  return (
    <section className="settings__section">
      <h3 className="section-heading">User Information</h3>
      <form className="settings-form">
        <TextField
          type="email"
          label="E-mail address"
          placeholder="E-mail address"
          value={userEmail}
          onChange={(e: ChangeEvent) => setUserEmail(e.target.value)}
          adornment={<Button variant="transparent">Confirm</Button>}
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