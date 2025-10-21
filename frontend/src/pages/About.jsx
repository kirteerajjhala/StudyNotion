import React from "react"
import { motion } from "framer-motion"

import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"

import Footer from "../components/common/Footer"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"
import Img from "../components/common/Img"
import ReviewSlider from "../components/common/ReviewSlider"
import { fadeIn } from "../components/common/motionFrameVarients"
import NavBar from '../components/common/Navbar'

const About = () => {
  return (
    <div className="bg-gray-900 text-white overflow-x-hidden mt-16">
      <NavBar/>

      {/* Hero Section */}
      <section className="relative">
        <div className="mx-auto w-11/12 max-w-7xl flex flex-col justify-center gap-10 text-center py-16 sm:py-20">
          <motion.header className="mx-auto lg:w-2/3">
            <motion.p
              variants={fadeIn("down", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold"
            >
              Driving Innovation in Online Education for a{" "}
              <HighlightText text="Brighter Future" />
            </motion.p>

            <motion.p
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              className="mt-3 text-sm sm:text-base md:text-lg text-gray-300 font-medium lg:w-full mx-auto"
            >
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </motion.p>
          </motion.header>

          {/* Banner Images */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
            <Img src={BannerImage1} alt="Banner 1" className="rounded-xl w-full object-cover" />
            <Img src={BannerImage2} alt="Banner 2" className="rounded-xl w-full object-cover" />
            <Img src={BannerImage3} alt="Banner 3" className="rounded-xl w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="border-b border-gray-800">
        <div className="mx-auto w-11/12 max-w-7xl flex flex-col items-center py-16 sm:py-20 text-gray-400">
          <Quote />
        </div>
      </section>

      {/* Founding Story, Vision & Mission */}
      <section className="mx-auto w-11/12 max-w-7xl flex flex-col gap-16 sm:gap-20 py-16 sm:py-20 text-gray-300">
        {/* Founding Story */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="flex-1 flex flex-col gap-4 sm:gap-6"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-br from-purple-600 via-red-500 to-yellow-400 bg-clip-text text-transparent">
              Our Founding Story
            </h1>
            <p className="text-sm sm:text-base md:text-lg">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners...
            </p>
            <p className="text-sm sm:text-base md:text-lg">
              As experienced educators ourselves, we witnessed firsthand the
              limitations of traditional education systems...
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            className="flex-1 flex justify-center"
          >
            <Img
              src={FoundingStory}
              alt="Founding Story"
              className="rounded-xl shadow-lg shadow-red-400/50 w-full sm:w-4/5 lg:w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16">
          <div className="flex-1 flex flex-col gap-4 sm:gap-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-b from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Our Vision
            </h1>
            <p className="text-sm sm:text-base md:text-lg">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people
              learn...
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4 sm:gap-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-b from-blue-400 via-teal-400 to-green-200 bg-clip-text text-transparent">
              Our Mission
            </h1>
            <p className="text-sm sm:text-base md:text-lg">
              Our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another...
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsComponenet />

      {/* Learning Grid & Contact Form */}
      <section className="mx-auto w-11/12 max-w-7xl flex flex-col gap-16 sm:gap-20 py-16 sm:py-20">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* Reviews Slider */}
      <section className="mx-auto w-11/12 max-w-7xl py-16 sm:py-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8 sm:mb-10">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default About
