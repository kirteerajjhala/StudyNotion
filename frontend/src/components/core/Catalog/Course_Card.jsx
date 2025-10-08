import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import GetAvgRating from "../../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"
import Img from './../../common/Img';

function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <div className="hover:scale-105 transition-transform duration-200 z-50">
      <Link to={`/courses/${course._id}`}>
        <div className="rounded-lg overflow-hidden bg-gray-800">
          <Img
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`${Height} w-full object-cover rounded-t-lg`}
          />
          <div className="flex flex-col gap-2 px-3 py-4">
            <p className="text-lg sm:text-xl font-semibold text-white">{course?.courseName}</p>
            <p className="text-sm text-gray-300">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-yellow-400 font-semibold">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-gray-400">
                ({course?.ratingAndReviews?.length} Ratings)
              </span>
            </div>
            <p className="text-lg sm:text-xl font-semibold text-white">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_Card
