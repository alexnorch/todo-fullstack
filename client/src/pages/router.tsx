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
import Overview from "./Overview";
import Settings from "./Settings/Setting";

// Protection
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedCategories from "./ProtectedCategories";
import { NotFound } from "../features/ui";

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
        <Route
          path="tasks/:category"
          element={
            <ProtectedCategories>
              <Tasks />
            </ProtectedCategories>
          }
        />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
