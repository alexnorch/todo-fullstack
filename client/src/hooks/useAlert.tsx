import { useDispatch } from "react-redux";
import { showAlert } from "redux/appSlice";

const useAlert = () => {
  const dispatch = useDispatch();

  const showSuccessAlert = (text: string) => {
    dispatch(
      showAlert({
        type: "success",
        text,
      })
    );
  };

  const showDangerAlert = (text: string) => {
    dispatch(
      showAlert({
        type: "danger",
        text,
      })
    );
  };

  return {
    showSuccessAlert,
    showDangerAlert,
  };
};

export default useAlert;