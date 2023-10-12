import { forwardRef, Ref, useRef } from "react";
import { createPortal } from "react-dom";
import { hideAlert } from "../../../redux/appSlice";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";

import { CSSTransition } from "react-transition-group";

import "./Alert.scss";

// helpers
import { getAlertComponentClass } from "helpers";

// Icons
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";

const Alert = () => {
  const nodeRef = useRef(null);
  const dispatch = useDispatch();

  const { alertText, alertType, isAlert } = useSelector(
    (state: RootState) => state.app
  );

  const classes = getAlertComponentClass("alert", alertType);

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      classNames="alert-transition"
      in={isAlert}
      timeout={500}
      unmountOnExit
    >
      <div ref={nodeRef} className={classes}>
        <div className="alert__inner">
          <AiOutlineCheckCircle />
          <p>{alertText}</p>
          <AiOutlineClose
            className="alert__inner__close"
            onClick={() => dispatch(hideAlert())}
          />
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root") as HTMLElement
  );
};

export default Alert;
