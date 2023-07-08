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

// .button {
//   cursor: pointer;
//   padding: 15px 0;
//   border: none;
//   box-shadow: 5px 5px 27px 0px rgba(0, 0, 0, 0.64);
//   color: #eee;
//   outline: none;
//   background-color: var(--purple);
//   transition: all 0.3s ease;
//   width: 100%;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 5px;

//   &.rounded {
//     border-radius: 10px;
//   }

//   &.red {
//     background-color: var(--red);
//   }

//   &.black {
//     background-color: var(--black);
//   }

//   &:hover {
//     transform: translateY(-5px);
//   }

//   svg {
//     font-size: 20px;
//   }
// }
