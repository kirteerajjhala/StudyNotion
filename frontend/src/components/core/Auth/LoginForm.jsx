import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

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
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4 "
    >
      {/* Email Field */}
      <label className="w-full">
        <p className="mb-1 text-sm font-medium text-gray-100">
          Email Address <sup className="text-red-400">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter your email"
          className="w-full rounded-md bg-gray-800 p-3 text-gray-100 outline-none border border-gray-700 focus:border-blue-400"
        />
      </label>

      {/* Password Field */}
      <label className="relative w-full">
        <p className="mb-1 text-sm font-medium text-gray-100">
          Password <sup className="text-red-400">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter your password"
          className="w-full rounded-md bg-gray-800 p-3 pr-12 text-gray-100 outline-none border border-gray-700 focus:border-blue-400"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] cursor-pointer text-gray-400 hover:text-gray-200"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={22} />
          ) : (
            <AiOutlineEye fontSize={22} />
          )}
        </span>

        <Link to="/forgot-password">
          <p className="mt-1 ml-auto w-max text-xs text-blue-400 hover:underline">
            Forgot Password?
          </p>
        </Link>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 rounded-md bg-yellow-400 py-2 px-4 font-semibold text-black hover:bg-yellow-500 transition-all duration-200"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
