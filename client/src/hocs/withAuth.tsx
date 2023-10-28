import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = useSelector((state: RootState) => state.app.token);
    if (!accessToken) return <Navigate replace to="/auth" />;

    const decodedToken: { [key: string]: any } = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (currentTime >= decodedToken.exp) {
      return <Navigate replace to="/auth" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
