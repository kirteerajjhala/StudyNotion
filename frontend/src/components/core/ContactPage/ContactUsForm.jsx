import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountryCode from '../../../../data/countrycode.json'

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    console.log("from contact data : " ,data)
    try {
      setLoading(true)
      // API call placeholder
      setLoading(false)
    } catch (error) {
      console.log("ERROR WHILE CONTACT US  - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="firstname" className="text-gray-200 font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-yellow-400 text-xs mt-1">
              Please enter your first name.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="lastname" className="text-gray-200 font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-gray-200 font-medium">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-yellow-400 text-xs mt-1">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="text-gray-200 font-medium">
          Phone Number
        </label>
        <div className="flex gap-3 flex-wrap">
          <select
            className="w-24 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            {...register("countrycode", { required: true })}
          >
            <option value="91" selected>+91 - india</option>
            {CountryCode.map((ele, i) => (
              <option key={i} value={ele.code}>
                {ele.code} - {ele.country}
              </option>
            ))}
          </select>

          <input
            type="number"
            id="phonenumber"
            placeholder="12345 67890"
            className="flex-1 rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            {...register("phoneNo", {
              required: "Please enter your Phone Number.",
              minLength: { value: 10, message: "Invalid Phone Number" },
              maxLength: { value: 12, message: "Invalid Phone Number" },
            })}
          />
        </div>
        {errors.phoneNo && (
          <span className="text-yellow-400 text-xs mt-1">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-gray-200 font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Enter your message here"
          className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-yellow-400 text-xs mt-1">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`mt-4 rounded-md bg-yellow-400 px-6 py-3 font-bold text-black shadow hover:scale-95 transition-transform disabled:opacity-50`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm
