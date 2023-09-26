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

// Profile
import ProfileWrapper from "./Profile/ProfileWrapper";
import ProfilePassword from "./Profile/ProfilePassword";
import ProfileDetails from "./Profile/ProfileDetails";

// Settings
import SettingsWrapper from "./Settings/SettingsWrapper";
import Categories from "./Settings/Categories";

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

        <Route path="settings" element={<SettingsWrapper />}>
          <Route path="profile" element={<ProfileWrapper />}>
            <Route index element={<ProfileDetails />} />
            <Route path="password" element={<ProfilePassword />} />
          </Route>
          <Route path="categories" element={<Categories />} />
        </Route>
      </Route>
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
