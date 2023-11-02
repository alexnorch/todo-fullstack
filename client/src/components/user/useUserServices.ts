import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { addToLocalStorage } from "helpers";

// Custom hooks
import useCustomAxios from "@hooks/useCustomAxios";
import useAlert from "@hooks/useAlert";

// Redux actions
import { initializeUser, userUpdate } from "@components/user/userSlice";
import { initializeCategories } from "@components/categories/categorySlice";
import { initializeTasks } from "@components/todos/todoSlice";
import { setAccessToken } from "@store/reducers/appReducer";

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
  const navigate = useNavigate();
  const { authAxios } = useCustomAxios();
  const { showSuccessAlert, showDangerAlert } = useAlert();

  const loginUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post("/api/user/login", credentials);

      const { user, token, data } = response.data;

      dispatch(initializeUser(user));
      dispatch(initializeCategories(data.categories));
      dispatch(initializeTasks(data.tasks));
      dispatch(setAccessToken(token));

      addToLocalStorage("accessToken", token);

      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        let errorMessage = err.response?.data.message;

        if (err.response?.status === 500) {
          errorMessage = "Something went wrong. Please try again later";
        }

        showDangerAlert(errorMessage);
      } else {
        throw err;
      }
    }
  };

  const registerUser = async () => {
    console.log("Registered");
  };

  const getUser = async () => {
    const response = await authAxios.get("/api/user");

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
    loginUser,
    registerUser,
    onPasswordChange,
    changeUserImage,
    changeUserInfo,
    getUser,
  };
};

export default useUserServices;
