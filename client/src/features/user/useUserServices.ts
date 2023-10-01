import useCustomAxios from "@hooks/useCustomAxios";
import { useDispatch } from "react-redux";
import { userUpdate } from "./userSlice";
import useAlert from "@hooks/useAlert";

interface onPasswordChangeParams {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface changeUserInfoParams {
  email?: string;
  firstName: string;
  lastName: string;
}

const useUserServices = () => {
  const dispatch = useDispatch();
  const { authAxios } = useCustomAxios();
  const { showSuccessAlert } = useAlert();

  const getUser = async () => {
    const response = await authAxios.get("/api/user");

    console.log(response);

    if (response.data) {
      dispatch(userUpdate(response.data));
    }
  };

  const onPasswordChange = async (values: onPasswordChangeParams) => {
    const response = await authAxios.post("/api/user/changePassword", values);

    if (response.data) {
      showSuccessAlert("Password was successfully changed");
    }
  };

  const changeUserInfo = async (values: changeUserInfoParams) => {
    const response = await authAxios.patch("/api/user/profileDetails", values);

    if (response.data) {
      dispatch(userUpdate(response.data));
      showSuccessAlert("User information was successfully changed");
    }
  };

  const changeUserImage = async (file: any) => {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await authAxios.patch(
      "/api/user/profilePicture",
      formData
    );

    if (response.data) {
      dispatch(userUpdate(response.data));
      showSuccessAlert("Profile image was successfully changed");
    }
  };

  return {
    onPasswordChange,
    changeUserImage,
    changeUserInfo,
    getUser,
  };
};

export default useUserServices;
