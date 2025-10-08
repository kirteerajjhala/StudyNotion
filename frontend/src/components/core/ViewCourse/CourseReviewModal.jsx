import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import Img from "../../common/Img"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  // Live rating watch
  const courseRating = watch("courseRating")

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [setValue])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    try {
      await createRating(
        {
          courseId: courseEntireData._id,
          rating: data.courseRating,
          review: data.courseExperience,
        },
        token
      )
      setReviewModal(false)
    } catch (error) {
      console.error("Error creating rating:", error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 overflow-auto">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-800 text-white rounded-t-lg p-4">
          <h2 className="text-lg font-semibold">Add Review</h2>
          <button
            type="button"
            onClick={() => setReviewModal(false)}
            className="text-white hover:text-yellow-400 transition"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <Img
              src={
                user?.image ||
                `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`
              }
              alt={`${user?.firstName} profile`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-500">Posting Publicly</p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-4 w-full"
          >
            {/* Star Rating */}
            <div className="flex flex-col items-center gap-2">
              <p className="font-medium text-gray-800">Rate this course:</p>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={40}
                value={courseRating}
                activeColor="#facc15"
                isHalf={true}
              />
              <p className="text-sm text-gray-600">
                Your rating: <b>{courseRating}</b> ★
              </p>
            </div>

            {/* Experience Textarea */}
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="courseExperience"
                className="text-sm font-medium"
              >
                Add Your Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Share your learning experience..."
                {...register("courseExperience", { required: true })}
                className="w-full min-h-[130px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />
              {errors.courseExperience && (
                <span className="text-sm text-red-500">
                  Please add your experience
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4 w-full">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-700 hover:text-white transition"
              >
                Cancel
              </button>
              <IconBtn type="submit" text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
