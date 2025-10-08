import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../../../../services/operations/SettingsAPI.js";
import IconBtn from "../../../common/IconBtn";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      {/* Profile Information */}
      <div className="my-8 rounded-lg border border-gray-700 bg-gray-900 p-6 md:p-8 lg:p-10 space-y-6">
        <h2 className="text-xl font-semibold text-white">Profile Information</h2>

        {/* Name Fields */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className="mt-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-25"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <span className="text-xs text-yellow-400 mt-1">Please enter your first name.</span>
            )}
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className="mt-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-25"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lastName && (
              <span className="text-xs text-yellow-400 mt-1">Please enter your last name.</span>
            )}
          </div>
        </div>

        {/* DOB and Gender */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-300">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              className="mt-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-25"
              {...register("dateOfBirth", {
                required: "Please enter your Date of Birth.",
                max: { value: new Date().toISOString().split("T")[0], message: "Date cannot be in the future." }
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <span className="text-xs text-yellow-400 mt-1">{errors.dateOfBirth.message}</span>
            )}
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="gender" className="text-sm font-medium text-gray-300">Gender</label>
            <select
              id="gender"
              className="mt-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-25"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              {genders.map((ele, i) => (
                <option key={i} value={ele}>{ele}</option>
              ))}
            </select>
            {errors.gender && (
              <span className="text-xs text-yellow-400 mt-1">Please select your gender.</span>
            )}
          </div>
        </div>

        {/* Contact Number & About */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="contactNumber" className="text-sm font-medium text-gray-300">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              placeholder="Enter contact number"
              className="mt-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-25"
              {...register("contactNumber", {
                required: "Please enter your Contact Number.",
                minLength: { value: 10, message: "Invalid Contact Number" },
                maxLength: { value: 12, message: "Invalid Contact Number" },
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && (
              <span className="text-xs text-yellow-400 mt-1">{errors.contactNumber.message}</span>
            )}
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="about" className="text-sm font-medium text-gray-300">About</label>
            <input
              type="text"
              id="about"
              placeholder="Enter Bio Details"
              className="mt-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-25"
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && (
              <span className="text-xs text-yellow-400 mt-1">Please enter your About.</span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md bg-gray-700 px-5 py-2 font-semibold text-white hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save" />
      </div>
    </form>
  );
}
