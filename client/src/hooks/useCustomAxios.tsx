import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { showAlert, logoutUser } from "../redux/appSlice";

const useCustomAxios = () => {
  const authAxios = axios.create();
  const accessToken = useSelector((state: RootState) => state.app.token);
  const dispatch = useDispatch();

  authAxios.interceptors.request.use(
    function (config) {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.request.status === 401) {
        dispatch(logoutUser());
      }
      dispatch(
        showAlert({ type: "danger", text: error.response.data.message })
      );

      return error;
    }
  );

  return { authAxios };
};

export default useCustomAxios;
