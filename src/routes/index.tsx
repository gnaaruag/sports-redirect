import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Notfound from "../pages/Notfound";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import HomePage from "../pages/HomePage";
import AccountLayout from "../layout";
import Modal from "../pages/news/modal";
import Logout from "../pages/Logout.tsx";
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
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/articles/:articleID",
    element: <Modal />,
  },

]);

export default router;
