import React from "react"
import Footer from "../components/common/Footer"
import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactForm from "../components/core/ContactPage/ContactForm"
import ReviewSlider from './../components/common/ReviewSlider';
import Navbar from "../components/common/Navbar";

const Contact = () => {
  return (
    <div className="bg-gray-900 text-white overflow-x-hidden mt-16">
      <Navbar/>

      {/* Contact Section */}
      <div className="mx-auto mt-16 sm:mt-20 flex flex-col lg:flex-row w-11/12 max-w-7xl justify-between gap-10">
        {/* Contact Details */}
        <div className="w-full lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-[60%]">
          <ContactForm />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="my-16 sm:my-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Contact
