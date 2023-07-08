import { createPortal } from "react-dom";

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
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__bottom">
          <button className="modal__submit" onClick={submitter}>
            Submit
          </button>
          <button className="modal__close" onClick={onToggle}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return <>{createPortal(modalContent, document.getElementById("root")!)}</>;
};

export default Modal;
