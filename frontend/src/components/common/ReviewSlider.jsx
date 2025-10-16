import React, { useEffect, useState } from "react"
import Img from "./Img"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

// ✅ Import necessary Swiper CSS
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { FaStar } from "react-icons/fa"
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
    <div className="text-white py-10 w-full  bg-[#0f172a]">
      <div className="max-w-[1200px] mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]} // ✅ Autoplay enabled
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-3 bg-[#1e293b] p-5 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] min-h-[180px]">
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
                    <h3 className="font-semibold text-white capitalize">
                      {`${review?.user?.firstName} ${review?.user?.lastName}`}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")} ...`
                    : review?.review}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-auto">
                  <span className="font-semibold text-yellow-400">
                    {review.rating}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <FaStar
                        key={idx}
                        size={16}
                        className={
                          idx < Math.round(review.rating)
                            ? "text-yellow-400"
                            : "text-gray-600"
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
