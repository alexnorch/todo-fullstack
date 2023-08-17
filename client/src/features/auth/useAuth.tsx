import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, showAlert } from "../../redux/appSlice";
import { addToLocalStorage } from "../../helpers";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const {
        data: { result },
      } = await axios.post("/api/user/login", {
        email,
        password,
      });

      dispatch(loginUser(result));
      addToLocalStorage("accessToken", result.token);
      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        dispatch(showAlert({ type: "danger", text: errorMessage }));
      } else {
        throw err;
      }
    }
  };

  const register = async () => {
    console.log("register account");
  };

  return {
    login,
    register,
  };
};

export default useAuth;
