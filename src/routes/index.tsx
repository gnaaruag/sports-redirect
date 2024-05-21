import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Notfound from "../pages/Notfound";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Notfound />
  }
]);

export default router;