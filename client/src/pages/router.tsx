import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";

// Main Pages
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Tasks from "./Tasks";
import ProtectedRoutes from "./ProtectedRoutes";
import Overview from "./Overview";

// Settings Pages
import SettingsWrapper from "./Settings/Wrapper";
import SettingsIndex from "./Settings/Settings";
import Password from "./Settings/Password";
import Profile from "./Settings/Profile";
import Theme from "./Settings/Theme";
import NewCategory from "./Settings/NewCategory";

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
        <Route path="settings" element={<SettingsWrapper />}>
          <Route index element={<SettingsIndex />} />
          <Route path="profile" element={<Profile />} />
          <Route path="password" element={<Password />} />
          <Route path="category" element={<NewCategory />} />
          <Route path="theme" element={<Theme />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

export default router;
