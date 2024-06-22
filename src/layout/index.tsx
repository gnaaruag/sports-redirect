import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React from "react";
import HomePage from "../pages/HomePage";

const AccountLayout = () => {
  return (
    <>
      <Navbar />
      <HomePage />
      <main>
        <div className="mx-auto max-w-7xl py-2 sm:px-4 lg:px-6">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AccountLayout;