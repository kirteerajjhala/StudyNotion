import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={handleOnSubmit}
        className="w-full max-w-md sm:max-w-lg p-6 sm:p-10 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-4"
      >
        {/* Email */}
        <label className="w-full">
          <p className="mb-1 text-sm leading-5 text-white font-medium">
            Email Address <sup className="text-pink-400">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-md bg-gray-700 p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </label>

        {/* Password */}
        <label className="relative w-full">
          <p className="mb-1 text-sm leading-5 text-white font-medium">
            Password <sup className="text-pink-400">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            className="w-full rounded-md bg-gray-700 p-3 pr-12 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {/* Toggle Eye Icon */}
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-10 z-10 cursor-pointer text-gray-400 hover:text-yellow-400 transition"
          >
            {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
          </span>

          {/* Forgot Password Link */}
          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-300 hover:underline">
              Forgot Password
            </p>
          </Link>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full sm:w-1/2 mx-auto rounded-md bg-yellow-400 py-3 font-semibold text-gray-900 hover:bg-yellow-500 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
