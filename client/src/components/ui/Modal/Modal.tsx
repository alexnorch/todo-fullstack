import { createPortal } from "react-dom";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "..";
import "./Modal.scss";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  submitter?: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { children, isOpen, onToggle, title, submitter } = props;

  const nodeRef = useRef<HTMLDivElement>(null);

  const onModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as HTMLElement;

    if (targetElement.classList.contains("modal")) {
      onToggle();
    }
  };

  const modalContent = (
    <div className="modal" onClick={onModalClick}>
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

          {submitter && (
            <Button onClick={submitter} variant="primary">
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(
    <CSSTransition
      in={isOpen}
      nodeRef={nodeRef}
      timeout={300}
      classNames="fade-up"
      unmountOnExit
    >
      {modalContent}
    </CSSTransition>,
    document.getElementById("root")!
  );
};

export default Modal;
