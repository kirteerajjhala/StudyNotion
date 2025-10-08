import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../../../services/operations/SettingsAPI.js";
import IconBtn from "../../../common/IconBtn";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)} className="w-full max-w-4xl mx-auto">
      <div className="my-8 flex flex-col gap-6 rounded-lg border border-gray-700 bg-gray-900 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-white">Update Password</h2>

        <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap">
          {/* Current Password */}
          <div className="relative w-full lg:w-[48%]">
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-200 mb-1">
              Current Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              placeholder="Enter Current Password"
              className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              {...register("oldPassword", { required: true })}
            />
            <span
              onClick={() => setShowOldPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {showOldPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
            {errors.oldPassword && (
              <span className="text-xs text-yellow-400 mt-1 block">
                Please enter your Current Password.
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="relative w-full lg:w-[48%]">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-200 mb-1">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Enter New Password"
              className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              {...register("newPassword", { required: true })}
            />
            <span
              onClick={() => setShowNewPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {showNewPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
            {errors.newPassword && (
              <span className="text-xs text-yellow-400 mt-1 block">
                Please enter your New Password.
              </span>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="relative w-full lg:w-[48%]">
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-200 mb-1">
              Confirm New Password
            </label>
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              id="confirmNewPassword"
              placeholder="Confirm New Password"
              className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              {...register("confirmNewPassword", { required: true })}
            />
            <span
              onClick={() => setShowConfirmNewPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {showConfirmNewPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
            {errors.confirmNewPassword && (
              <span className="text-xs text-yellow-400 mt-1 block">
                Please confirm your new password.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4 flex-wrap">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md bg-gray-700 text-white py-2 px-5 hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update" />
      </div>
    </form>
  );
}
