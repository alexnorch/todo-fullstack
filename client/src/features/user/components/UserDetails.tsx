import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { TextField, Input, Button } from "../../ui";
import { ChangeEvent } from "../../../types";

const UserDetails = () => {
  const user = useSelector((state: RootState) => state.app.user);
  const [userName, setUserName] = useState(user!.name);
  const [userEmail, setUserEmail] = useState(user!.email);

  return (
    <section className="settings__section">
      <h3 className="settings__section__heading">User Information</h3>
      <hr />
      <form className="settings__section__form">
        <TextField
          type="email"
          label="Your email"
          placeholder="Your E-mail Address"
          value={userEmail}
          onChange={(e: ChangeEvent) => setUserEmail(e.target.value)}
          adornment={<Button variant="primary">Confirm</Button>}
        />
        <Input
          label="Your Full Name"
          placeholder="Your Full Name"
          value={userName}
          onChange={(e: ChangeEvent) => setUserName(e.target.value)}
        />
      </form>
      <div className="settings__section__button">
        <Button variant="outline">Change info</Button>
      </div>
    </section>
  );
};

export default UserDetails;
