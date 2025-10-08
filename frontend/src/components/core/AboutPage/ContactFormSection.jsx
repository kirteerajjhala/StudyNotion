import React from "react";
import ContactUsForm from '../ContactPage/ContactUsForm';

const ContactFormSection = () => {
  return (
    <div className="max-w-4xl bg-gray-800 rounded-lg lg:w-[70%] w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
      <h1 className="text-center text-3xl sm:text-4xl font-semibold">
        Get in Touch
      </h1>
      <p className="text-center text-gray-500 mt-3 text-sm sm:text-base">
        We&apos;d love to hear from you. Please fill out this form.
      </p>

      <div className="mt-8 sm:mt-12">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
