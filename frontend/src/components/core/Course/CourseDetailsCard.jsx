import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../../utils/constants"
import Img from "./../../common/Img"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-gray-800 p-5 text-white shadow-lg md:max-w-[420px] w-full mx-auto">
      {/* Course Image */}
      <Img
        src={ThumbnailImage}
        alt={course?.courseName}
        className="w-full max-h-[260px] rounded-2xl object-cover md:h-[280px] sm:h-[220px]"
      />

      <div className="px-2 md:px-4">
        {/* Price */}
        <div className="text-2xl md:text-3xl font-semibold pb-3">
          ₹{CurrentPrice}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
            className="w-full rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 transition-all duration-200"
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>

          {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
            <button
              onClick={handleAddToCart}
              className="w-full rounded-lg bg-black border border-gray-600 hover:bg-gray-900 font-semibold py-2 transition-all duration-200"
            >
              Add to Cart
            </button>
          )}
        </div>

        {/* Guarantee */}
        <p className="text-center text-sm text-gray-300 pt-5">
          30-Day Money-Back Guarantee
        </p>

        {/* Requirements */}
        <div className="pt-5">
          <p className="text-lg md:text-xl font-semibold mb-2">
            Course Requirements:
          </p>
          <div className="flex flex-col gap-2 text-sm text-green-300">
            {course?.instructions?.map((item, i) => (
              <p className="flex gap-2 items-start" key={i}>
                <BsFillCaretRightFill className="mt-[3px]" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="text-center mt-5">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mx-auto transition-all duration-200"
          >
            <FaShareSquare size={16} /> Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard
