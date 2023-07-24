enum ButtonPalette {
  red = "red",
  black = "black",
  purple = "purple",
}

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactElement;
  palette?: ButtonPalette;
}

const Button: React.FC<ButtonProps> = ({ children, icon }) => {
  return (
    <button className={"styles.button"}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
