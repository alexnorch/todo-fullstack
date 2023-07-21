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

// Settings Pages
import Wrapper from "./Settings/Wrapper";
import Settings from "./Settings/Settings";
import Password from "./Settings/Password";
import Profile from "./Settings/Profile";
import Theme from "./Settings/Theme";
import NewCategory from "./Settings/NewCategory";

// Helpers
import { checkAuth } from "../helpers";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Main />
          </ProtectedRoutes>
        }
      >
        <Route path="/" element={<Tasks />} />
        <Route path="/:category" element={<Tasks />} />
        <Route path="/settings" element={<Wrapper />}>
          <Route path="" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="password" element={<Password />} />
          <Route path="new-category" element={<NewCategory />} />
          <Route path="theme" element={<Theme />} />
        </Route>
      </Route>
      <Route loader={checkAuth} path="/login" element={<Login />} />
      <Route loader={checkAuth} path="/register" element={<Register />} />
    </>
  )
);

export default router;
