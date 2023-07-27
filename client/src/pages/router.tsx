import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Main Pages
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Tasks from "./Tasks";
import ProtectedRoutes from "./ProtectedRoutes";
import Overview from "./Overview";
import Settings from "./Settings/Setting";

// Helpers

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Main />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Overview />} />
        <Route path="tasks/:category" element={<Tasks />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

export default router;
