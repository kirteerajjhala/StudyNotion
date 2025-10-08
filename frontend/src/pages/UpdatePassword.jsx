import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { resetPassword } from "../services/operations/authAPI"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    console.log("token:", token)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : (
        <div className="w-full max-w-md sm:max-w-lg rounded-xl bg-gray-800 p-6 sm:p-10 shadow-lg">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            Choose a new password
          </h1>

          <p className="mt-2 mb-6 text-sm sm:text-base text-gray-300">
            Almost done! Enter your new password to reset your account.
          </p>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="space-y-5">
            {/* New Password */}
            <label className="relative block">
              <span className="mb-1 block text-sm text-white">
                New Password <sup className="text-red-400">*</sup>
              </span>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-full rounded-lg bg-gray-700 p-3 pr-10 text-white text-sm outline-none border border-gray-600 focus:border-yellow-400"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[42px] cursor-pointer text-gray-300"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} />
                ) : (
                  <AiOutlineEye fontSize={20} />
                )}
              </span>
            </label>

            {/* Confirm Password */}
            <label className="relative block">
              <span className="mb-1 block text-sm text-white">
                Confirm New Password <sup className="text-red-400">*</sup>
              </span>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full rounded-lg bg-gray-700 p-3 pr-10 text-white text-sm outline-none border border-gray-600 focus:border-yellow-400"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[42px] cursor-pointer text-gray-300"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} />
                ) : (
                  <AiOutlineEye fontSize={20} />
                )}
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-400 py-3 px-4 font-medium text-gray-900 hover:bg-yellow-300 transition-all text-sm sm:text-base"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 flex justify-center">
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              <BiArrowBack /> Back To Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
