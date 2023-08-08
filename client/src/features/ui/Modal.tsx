import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  submitter?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onToggle,
  title,
  submitter,
}) => {
  const modalContent = isOpen && (
    <div className="modal">
      <div className="modal__inner">
        <div className="modal__header">
          <h3>{title}</h3>
          <button onClick={onToggle} className="modal__close">
            <AiOutlineClose />
          </button>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__bottom">
          <Button onClick={submitter} variant="primary">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );

  return <>{createPortal(modalContent, document.getElementById("root")!)}</>;
};

export default Modal;
