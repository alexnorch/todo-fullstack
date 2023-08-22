import { createPortal } from "react-dom";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from ".";

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
  const nodeRef = useRef<HTMLDivElement>(null);

  const modalContent = (
    <div
      className="modal"
      onClick={(e: any) => {
        if (e.target.classList.contains("modal")) {
          onToggle();
        }
      }}
    >
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

  return createPortal(
    <CSSTransition
      in={isOpen}
      nodeRef={nodeRef}
      timeout={500}
      classNames="fade-up"
    >
      <>{isOpen ? modalContent : null}</>
    </CSSTransition>,
    document.getElementById("root")!
  );
};

export default Modal;
