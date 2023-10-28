import moment from "moment";
import "./UserInfo.scss";
import { RootState } from "@store/store";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.user);
  const registrationDate = moment(user.registerDate).format("DD MMM YYYY");

  return (
    <div className="user-info">
      <h3 className="user-info__name">
        {user.firstName} {user.lastName}
      </h3>
      <p className="user-info__registered">Member since {registrationDate}</p>
    </div>
  );
};

export default UserInfo;
