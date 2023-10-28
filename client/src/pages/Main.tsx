import { Outlet } from "react-router-dom";
import { Aside } from "@layout";
import { Alert } from "@components/ui";

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
