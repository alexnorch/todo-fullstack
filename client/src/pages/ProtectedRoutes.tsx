import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { getFromLocalStorage } from "../helpers";

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const accessToken = getFromLocalStorage("accessToken");

  // useSelector((state: RootState) => state.app.token)

  if (!accessToken) return <Navigate replace to="/login" />;

  const decodedToken: { [key: string]: any } = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  if (currentTime >= decodedToken.exp) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
