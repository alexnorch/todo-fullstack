import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/appSlice";
import { addToLocalStorage } from "../../helpers";

// Redux actions
import { initializeUser } from "@features/user/userSlice";
import { initializeCategories } from "@features/categories/categorySlice";
import { initializeTasks } from "@features/todos/todoSlice";
import { setAccessToken } from "../../redux/appSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/user/login", {
        email: "walbyel@gmail.com",
        password: "walbyel123",
      });

      const { user, token, data } = response.data.result;

      dispatch(initializeUser(user));
      dispatch(initializeCategories(data.categories));
      dispatch(initializeTasks(data.tasks));
      dispatch(setAccessToken(token));

      addToLocalStorage("accessToken", token);

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
