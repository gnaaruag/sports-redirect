import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Notfound from "../pages/Notfound";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import AccountLayout from "../layout";
import Logout from "../pages/logout";
import ChangePassword from "../pages/change-password";
import Modal from "../pages/news/modal";
const router = createBrowserRouter([


  {
    path: "/",
    element: <AccountLayout />,
    children: [
      {
        path: "articles/:articleID",
        element: <Modal />,
      },
    ],
  },
	{
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "*",
    element: <Notfound />,
  },

]);

export default router;
