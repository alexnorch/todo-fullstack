import { Outlet } from "react-router-dom";

// Components
import Aside from "../features/layout/Aside/Aside";
import { Alert } from "@features/ui";

const Main = () => {
  return (
    <main className="app">
      <Aside />
      <div className="app-content">
        <Outlet />
      </div>
      <Alert />
    </main>
  );
};

export default Main;
