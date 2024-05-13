import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Pages
import RootLayout from "./RootLayout";
import Logout from "../pages/Logout";
import App_demo from "../components/App_demo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        Component: React.lazy(() => import("../components/App_demo")),
      },
      {
        path: "/signup",
        Component: React.lazy(() => import("../pages/Signup")),
      },
      {
        path: "/login",
        Component: React.lazy(() => import("../pages/Login")),
      },
      {
        path: "/home",
        Component: React.lazy(() => import("./HomeRoute")),
      },
    ],
  },
  {
    // It's outside because it should logout even if network is down
    path: "/logout",
    element: <App_demo />,
  },
]);

export default router;
