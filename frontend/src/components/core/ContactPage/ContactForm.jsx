import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-gray-700 bg-gray-800 text-gray-300 rounded-xl p-6 sm:p-8 lg:p-14 flex flex-col gap-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white   leading-snug">
        Got an Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="text-sm sm:text-base text-gray-300">
        Tell us more about yourself and what you&apos;ve got in mind.
      </p>

      <div className="mt-6 sm:mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
