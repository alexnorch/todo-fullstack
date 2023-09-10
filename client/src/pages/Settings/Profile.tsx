import { UserDetails, UserPassword, UserPhoto } from "@features/user";

export default function Profile() {
  return (
    <div className="user-container">
      <UserPhoto />
      <div className="user-right">
        <UserDetails />
        <UserPassword />
      </div>
    </div>
  );
}
