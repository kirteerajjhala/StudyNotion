import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const signupData = { ...formData, accountType }
    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 mt-4">
        <div className="flex gap-4">
          {/* First Name */}
          <label className="w-full">
            <p className="mb-1 text-sm font-medium text-gray-700">
              First Name <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </label>

          {/* Last Name */}
          <label className="w-full">
            <p className="mb-1 text-sm font-medium text-gray-700">
              Last Name <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </label>
        </div>

        {/* Email */}
        <label>
          <p className="mb-1 text-sm font-medium text-gray-700">
            Email Address <sup className="text-red-500">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </label>

        <div className="flex gap-4">
          {/* Password */}
          <label className="relative w-full">
            <p className="mb-1 text-sm font-medium text-gray-700">
              Create Password <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter password"
              className="w-full rounded-md border border-gray-300 p-2 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>
          </label>

          {/* Confirm Password */}
          <label className="relative w-full">
            <p className="mb-1 text-sm font-medium text-gray-700">
              Confirm Password <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm password"
              className="w-full rounded-md border border-gray-300 p-2 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 rounded-md bg-blue-600 py-2 px-4 font-medium text-white hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
