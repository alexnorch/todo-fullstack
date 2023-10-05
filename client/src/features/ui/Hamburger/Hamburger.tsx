import { GiHamburgerMenu } from "react-icons/gi";
import "./Hamburger.scss";

interface IHamburger {
  onToggle: () => void;
}

const Hamburger: React.FC<IHamburger> = ({ onToggle }) => {
  return (
    <div onClick={onToggle} className="hamburger">
      <GiHamburgerMenu />
    </div>
  );
};

export default Hamburger;
