import { redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const addToLocalStorage = (accessToken: string) => {
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
};

export const getFromLocalStorage = () => {
  localStorage.getItem("accessToken");
};

export const removeFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
};

// Return classes for Alert component
export const getAlertComponentClass = (
  className: string,
  alertType: "danger" | "success" | "info"
) => {
  switch (alertType) {
    case "danger":
      return (className += " alert--danger");
    case "success":
      return (className += " alert--success");
    case "info":
      return (className += " alert--info");
    default:
      return className;
  }
};

export const getAccessToken = (): { [key: string]: any } => {
  return jwt_decode(localStorage.getItem("accessToken")!);
};

export const isTokenValid = () => {
  const token = localStorage.getItem("accessToken")!;

  if (!token) return false;

  const decodedToken: { [key: string]: any } = jwt_decode(token);
  const currentTime = Date.now() / 1000;

  return currentTime >= decodedToken.exp;
};

export const protectRoute = () => {
  if (isTokenValid()) {
    return redirect("/login");
  }

  return null;
};

// If user is already logged in he cannot visits Login and Register Page
export const checkAuth = () => {
  if (isTokenValid()) {
    return redirect("/");
  }

  return null;
};
