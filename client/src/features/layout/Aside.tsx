import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/appSlice";
import { GrLogout } from "react-icons/gr";

// Components
import Menu from "./Menu";

const Aside: React.FC = () => {
  const dispatch = useDispatch();

  const onLogoutUser = () => {
    localStorage.clear();
    dispatch(logoutUser());
  };

  return (
    <aside className="aside">
      <div className="logo">
        Logo
        {/* <img className="logo__img" src={logo} alt="logo" /> */}
      </div>
      <Menu />
      <div className="aside__logout">
        <button onClick={onLogoutUser} className="menu__bottom__btn">
          <GrLogout />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Aside;
