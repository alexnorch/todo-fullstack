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

export const protectRoute = () => {
  const accessToken = localStorage.getItem("accessToken")!;
  const decoded: { [key: string]: any } = jwt_decode(accessToken);
  const currentTime = Date.now() / 1000;

  if (currentTime >= decoded.exp) {
    return redirect("/login");
  }

  return null;
};
