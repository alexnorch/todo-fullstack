import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { showAlert } from "../redux/appSlice";

const useCustomAxios = () => {
  const axiosInstance = axios.create();
  const accessToken = useSelector((state: RootState) => state.app.token);
  const dispatch = useDispatch();

  axiosInstance.interceptors.request.use(
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

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.request.status === 401) {
        console.log("Log out!");
      }
      dispatch(
        showAlert({ type: "danger", text: error.response.data.message })
      );

      return error;
    }
  );

  return axiosInstance;
};

export default useCustomAxios;
