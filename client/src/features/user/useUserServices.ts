import useCustomAxios from "@hooks/useCustomAxios";
import { useDispatch } from "react-redux";
import { showAlert } from "redux/appSlice";

interface onPasswordChangeParams {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const useUserServices = () => {
  const { authAxios } = useCustomAxios();
  const dispatch = useDispatch();

  const onPasswordChange = async (values: onPasswordChangeParams) => {
    const response = await authAxios.post("/api/user/changePassword", values);

    if (response.data) {
      dispatch(
        showAlert({
          type: "success",
          text: "Password was successfully changed",
        })
      );
    }
  };

  return {
    onPasswordChange,
  };
};

export default useUserServices;
