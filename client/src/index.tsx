import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";

// Pages
import Main from "./pages/Main";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Settings Pages
import Wrapper from "./pages/Settings/Wrapper";
import Settings from "./pages/Settings/Settings";
import Password from "./pages/Settings/Password";
import Profile from "./pages/Settings/Profile";
import Theme from "./pages/Settings/Theme";
import NewCategory from "./pages/Settings/NewCategory";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Main />}>
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
