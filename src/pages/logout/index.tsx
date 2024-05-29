import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }, []);
  return <Navigate to="/" />;
}

export default Logout;
