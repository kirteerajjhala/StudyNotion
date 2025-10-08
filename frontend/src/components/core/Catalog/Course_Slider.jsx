import React from "react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pt-6 px-2"
        >
          {Courses.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height="h-60 sm:h-64 md:h-72" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-48 sm:h-52 md:h-60 w-full rounded-xl bg-gray-700 animate-pulse"
            ></div>
          ))}
        </div>
      )}
    </>
  )
}

export default Course_Slider
