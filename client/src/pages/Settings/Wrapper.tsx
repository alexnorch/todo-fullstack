import { Outlet } from "react-router-dom";

export default function Wrapper() {
  return (
    <div className="settings">
      <Outlet />
    </div>
  );
}
