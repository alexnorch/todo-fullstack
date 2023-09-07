import { forwardRef, Ref } from "react";
import { createPortal } from "react-dom";
import { hideAlert } from "../../../redux/appSlice";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";

import "./Alert.scss";

// helpers
import { getAlertComponentClass } from "../../../helpers";

// Icons
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";

const Alert = (props: {}, ref: Ref<HTMLDivElement>) => {
  const dispatch = useDispatch();
  const { alertText, alertType, isAlert } = useSelector(
    (state: RootState) => state.app
  );

  const classes = getAlertComponentClass("alert", alertType);

  if (isAlert) {
    return createPortal(
      <div ref={ref} className={classes}>
        <div className="alert__inner">
          <AiOutlineCheckCircle />
          <p>{alertText}</p>
          <AiOutlineClose
            className="alert__inner__close"
            onClick={() => dispatch(hideAlert())}
          />
        </div>
      </div>,
      document.getElementById("root") as HTMLElement
    );
  } else {
    return null;
  }
};

export default forwardRef<HTMLDivElement>(Alert);
