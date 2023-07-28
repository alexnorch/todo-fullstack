interface ButtonProps {
  onClick?: () => void;
  variant: "outline" | "primary";
  children: React.ReactNode;
  icon?: React.ReactElement;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  variant,
  onClick,
}) => {
  let buttonClasses =
    variant === "primary" ? "btn btn--primary" : "btn btn--outline";

  return (
    <button onClick={onClick} className={buttonClasses}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
