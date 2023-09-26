import "./IconButton.scss";

interface IconButtonProps {
  onClick: (e?: any) => void;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick} className="icon-btn">
      {children}
    </button>
  );
};

export default IconButton;
