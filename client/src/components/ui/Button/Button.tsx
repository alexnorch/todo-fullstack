import { getButtonClasses } from "../../../helpers";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "outline" | "primary" | "transparent";
  size?: "sm" | "md" | "lg";
  type?: "reset" | "submit" | "button";
}

const getButtonSize = (size: string) => {
  switch (size) {
    case "sm":
      return { padding: "10px 20px" };
    case "sm":
      return { padding: "20px 25px" };
    default:
      return { padding: "25px 30px" };
  }
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  onClick,
  disabled,
  type,
  size = "sm",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      style={getButtonSize(size)}
      onClick={onClick}
      className={getButtonClasses(variant)}
    >
      {children}
    </button>
  );
};

export default Button;
