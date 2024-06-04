
import React from "react";
import ChangePassword from "./change-password";

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      <div className="max-w-md w-full p-8  border rounded-lg  ">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Change Password
        </h1>
        <ChangePassword />
      </div>
    </div>
  );
};
export default Signup;
