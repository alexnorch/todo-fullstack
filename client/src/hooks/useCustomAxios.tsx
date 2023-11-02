import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { showAlert, logout } from "../store/reducers/appReducer";

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
        dispatch(logout());
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
