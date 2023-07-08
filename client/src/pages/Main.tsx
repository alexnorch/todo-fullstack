import { Outlet } from "react-router-dom";

// Components
import Menu from "../components/Menu";

export default function Main() {
  return (
    <main className="app">
      <aside className="menu">
        <Menu />
      </aside>
      <div className="app__right">
        <Outlet />
      </div>
    </main>
  );
}
