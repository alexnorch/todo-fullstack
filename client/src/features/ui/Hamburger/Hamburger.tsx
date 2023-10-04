import { GiHamburgerMenu } from "react-icons/gi";
import "./Hamburger.scss";

const Hamburger: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="hamburger">
      <GiHamburgerMenu onClick={onClick} />
    </div>
  );
};

export default Hamburger;
