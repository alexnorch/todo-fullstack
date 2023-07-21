import axios from "axios";

const authAxios = axios.create();
const accessToken = JSON.parse(localStorage.getItem("accessToken")!) || "";

console.log(accessToken);

authAxios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  function (config) {
    console.log(config);
    return config;
  },
  function (error) {
    if (error.response.status === 401) {
      // Logout user
      console.log("User logged out");
    }
    return Promise.reject(error);
  }
);

export { authAxios };
