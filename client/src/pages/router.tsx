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
import Wrapper from "./Settings/Wrapper";
import Profile from "./Settings/Profile";
import Theme from "./Settings/Theme";
import Categories from "./Settings/Categories";

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
        <Route path="settings" element={<Wrapper />}>
          <Route index element={<Profile />} />
          <Route path="categories" element={<Categories />} />
          <Route path="theme" element={<Theme />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

export default router;
