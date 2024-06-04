import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Notfound from "../pages/Notfound";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import HomePage from "../pages/HomePage";
import AccountLayout from "../layout";
import Modal from "../pages/news/modal";
import Logout from "../pages/logout";
import ChangePassword from "../pages/change-password";
const router = createBrowserRouter([


  {
    path: "/",
    element: <AccountLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
	{
		path: "/",
		element: <HomePage/>,
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
    path: "/articles/:articleID",
    element: <Modal />,
  },
  {
    path: "*",
    element: <Notfound />,
  },

]);

export default router;
