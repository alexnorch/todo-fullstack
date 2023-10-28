import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import withAuth from "hocs/withAuth";

// Main Pages
import Main from "./Main";
import Tasks from "./Tasks";
import Overview from "./Overview";
import Auth from "./Auth";
import Categories from "./Categories";
import NotFound from "./NotFound";

// Profile
import SettingsWrapper from "./Settings/SettingsWrapper";
import ProfilePassword from "./Settings/UserPassword";
import ProfileDetails from "./Settings/UserDetails";

const MainWithAuth = withAuth(Main);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainWithAuth />}>
        <Route index element={<Overview />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:category" element={<Tasks />} />
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
