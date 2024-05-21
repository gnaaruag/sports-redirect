import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Notfound from "../pages/Notfound";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import HomePage from "../pages/HomePage";
import AccountLayout from "../layout";

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
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <Notfound />,
  },

]);

export default router;
