import "./IconButton.scss";

interface IIconButton {
  onClick: (e?: any) => void;
  children: React.ReactNode;
}

const IconButton: React.FC<IIconButton> = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick} className="icon-btn">
      {children}
    </button>
  );
};

export default IconButton;
