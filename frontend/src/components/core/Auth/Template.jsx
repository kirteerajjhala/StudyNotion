import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import Img from "./../../common/Img"

function Template({ title, description1, description2, image, formType }) {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gray-50">
      <div className="mx-auto flex w-11/12 max-w-6xl flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">

        {/* Left Section (Form and Text) */}
        <div className="mx-auto w-11/12 max-w-md md:mx-0">
          <h1 className="text-3xl font-semibold leading-tight text-gray-900">
            {title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            <span>{description1}</span>{" "}
            <span className="font-semibold italic text-blue-600">
              {description2}
            </span>
          </p>

          {/* Conditional Form */}
          <div className="mt-6">
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="relative max-w-md md:max-w-lg w-full">
          <Img
            src={image}
            alt={formType}
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  )
}

export default Template
