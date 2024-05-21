import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React from "react";

const AccountLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto max-w-7xl py-2 sm:px-4 lg:px-6">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AccountLayout;