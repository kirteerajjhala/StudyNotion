import React, { useEffect, useState } from "react"
import Img from "./Img"

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

// Icons
import { FaStar } from "react-icons/fa"

// API
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/api"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data || [])
        }
      } catch (err) {
        console.error("Error fetching reviews:", err)
      }
    })()
  }, [])

  if (!reviews || reviews.length === 0) return null

  return (
    <div className="text-white py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <Swiper
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-3 bg-gray-900 p-4 rounded-lg shadow-md min-h-[180px]">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <Img
                    src={
                      review?.user?.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt={`${review?.user?.firstName} profile`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-white capitalize">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h3>
                    <p className="text-xs text-gray-400">{review?.course?.courseName}</p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-200 text-sm">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                    : review?.review}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-yellow-400">{review.rating}</span>
                  <div className="flex gap-1">

                    {Array.from({ length: 5 }).map((_, idx) => (
                      <FaStar
                        key={idx}
                        size={18}
                        className={
                          idx < Math.round(review.rating)
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
