import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] h-screen place-items-center bg-gray-900 px-4 sm:px-6">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-md p-6 sm:p-8 bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white text-center">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>

          <div className="my-4 text-base sm:text-lg text-gray-200 text-center">
            {!emailSent ? (
              "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery."
            ) : (
              <p>
                We have sent the reset email to{" "}
                <span className="text-yellow-400 break-words">{email}</span>
              </p>
            )}
          </div>

          <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-sm sm:text-base text-white font-medium">
                  Email Address <sup className="text-pink-400">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full rounded-md bg-gray-700 p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </label>
            )}

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-yellow-400 py-3 font-medium text-gray-900 hover:bg-yellow-500 transition"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center sm:justify-start">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-white hover:text-yellow-400 transition text-sm sm:text-base">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
