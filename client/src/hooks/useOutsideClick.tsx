import { useEffect } from "react";

type UseOutsideClickProps = {
  isShown: boolean;
  onHide: () => void;
  nodeRef: React.RefObject<HTMLElement | null>;
};

const useOutsideClick = ({
  isShown,
  nodeRef,
  onHide,
}: UseOutsideClickProps) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
        onHide();
      }
    };

    if (isShown) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isShown]);
};

export default useOutsideClick;
