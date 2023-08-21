import { CSSTransition } from "react-transition-group";
import { forwardRef, useRef } from "react";
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

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, isOpen, onToggle, title, submitter }, ref) => {
    const nodeRef = useRef(null);
    const modalContent = isOpen && (
      <div className="modal">
        <div ref={nodeRef} className="modal__inner">
          <div className="modal__header">
            <h3>{title}</h3>
            <button onClick={onToggle} className="modal__close">
              <AiOutlineClose />
            </button>
          </div>
          <div className="modal__body">{children}</div>
          <div className="modal__bottom">
            <Button onClick={onToggle} variant="outline">
              Cancel
            </Button>
            <Button onClick={submitter} variant="primary">
              Submit
            </Button>
          </div>
        </div>
      </div>
    );

    return <>{createPortal(modalContent, document.getElementById("root")!)}</>;
  }
);

export default Modal;
