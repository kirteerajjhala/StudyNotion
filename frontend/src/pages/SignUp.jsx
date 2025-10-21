import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendOtp } from "../services/operations/authAPI";
import { setSignupData } from "../slices/authSlice";
import { ACCOUNT_TYPE } from "../../utils/constants";
import Tab from "../components/common/Tab";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const signupData = { ...formData, accountType };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-900 mt-16">
      <div className="w-full max-w-4xl lg:w-[50%] p-6 sm:p-10 bg-gray-900 rounded-lg shadow-lg">
        {/* Tab */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex-1">
              <p className="mb-1 text-sm text-white font-medium">
                First Name <sup className="text-pink-400">*</sup>
              </p>
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                className="w-full rounded-md bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </label>

            <label className="flex-1">
              <p className="mb-1 text-sm text-white font-medium">
                Last Name <sup className="text-pink-400">*</sup>
              </p>
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                className="w-full rounded-md bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </label>
          </div>

          {/* Email */}
          <label className="w-full">
            <p className="mb-1 text-sm text-white font-medium">
              Email Address <sup className="text-pink-400">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="w-full rounded-md bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </label>

          {/* Password Fields */}
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="relative flex-1">
              <p className="mb-1 text-sm text-white font-medium">
                Create Password <sup className="text-pink-400">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-full rounded-md bg-gray-800 p-3 pr-10 text-white outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-10 cursor-pointer text-gray-400 hover:text-yellow-400 transition"
              >
                {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
              </span>
            </label>

            <label className="relative flex-1">
              <p className="mb-1 text-sm text-white font-medium">
                Confirm Password <sup className="text-pink-400">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full rounded-md bg-gray-800 p-3 pr-10 text-white outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-10 cursor-pointer text-gray-400 hover:text-yellow-400 transition"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full sm:w-1/2 mx-auto rounded-md bg-yellow-400 py-3 font-semibold text-gray-900 hover:bg-yellow-500 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
