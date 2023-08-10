import { getButtonClasses } from "../../helpers";

interface ButtonProps {
  onClick?: () => void;
  variant: "outline" | "primary" | "transparent";
  children: React.ReactNode;
  icon?: React.ReactElement;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  variant,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={getButtonClasses(variant)}>
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
