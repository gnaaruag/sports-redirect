
import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
};

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>();
  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async (data) => {
    const { currentPassword, newPassword } = data;

    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        navigate("/");
        setError(null);
        console.log("Password changed successfully");
      } else {
        const responseData = await response.json();
        if (
          responseData.errors &&
          responseData.errors.includes("Invalid auth token")
        ) {
			toast.error("could'nt update password")
        } else {
			toast.error("could'nt update password")
        }
      }
    } catch (error) {
      toast.error("could'nt update password")
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 p-4  "
    >
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">
          Current Password:
        </label>
        <input
          type="password"
          id="currentPassword"
          autoFocus
          {...register("currentPassword", { required: true })}
          className="w-full required border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
        {errors.currentPassword && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          autoFocus
          {...register("newPassword", { required: true })}
          className="w-full required border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
        {errors.newPassword && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue mt-4w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default ChangePassword;
