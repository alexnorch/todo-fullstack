import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Main Pages
import Main from "./Main";
import Tasks from "./Tasks";
import Overview from "./Overview";
import Auth from "./Auth";
import Categories from "./Categories";

// Profile
import SettingsWrapper from "./Settings/SettingsWrapper";
import ProfilePassword from "./Settings/UserPassword";
import ProfileDetails from "./Settings/UserDetails";

// Settings

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
        <Route path="categories" element={<Categories />} />
        <Route
          path="categories/:category"
          element={
            <ProtectedCategories>
              <Tasks />
            </ProtectedCategories>
          }
        />
        <Route path="settings" element={<SettingsWrapper />}>
          <Route index element={<ProfileDetails />} />
          <Route path="password" element={<ProfilePassword />} />
        </Route>
      </Route>
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
