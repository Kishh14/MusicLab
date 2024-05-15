import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Pages
import RootLayout from "./RootLayout";
import Logout from "../pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        Component: React.lazy(() => import("../pages/LandingPage")),
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
      {
        path: "/discover",
        Component: React.lazy(() => import("../pages/Discover")),
      },
      {
        path: "/invite/:id",
        Component: React.lazy(() => import("./InviteRoute")),
      },
      {
        // It's outside because it should logout even if network is down
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

export default router;
