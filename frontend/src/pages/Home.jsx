import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlock";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

// random bg images
import bg1 from "../assets/Images/random bg img/coding bg1.jpg";
import bg2 from "../assets/Images/random bg img/coding bg2.jpg";
import bg3 from "../assets/Images/random bg img/coding bg3.jpg";
import bg4 from "../assets/Images/random bg img/coding bg4.jpg";
import bg5 from "../assets/Images/random bg img/coding bg5.jpg";
import bg7 from "../assets/Images/random bg img/coding bg7.jpg";
import bg8 from "../assets/Images/random bg img/coding bg8.jpeg";
import bg9 from "../assets/Images/random bg img/coding bg9.jpg";
import bg10 from "../assets/Images/random bg img/coding bg10.jpg";
import bg11 from "../assets/Images/random bg img/coding bg11.jpg";
import bg12 from "../assets/Images/random bg img/coding bg12.jpg";
import bg13 from "../assets/Images/random bg img/coding bg13.jpg";
import bg14 from "../assets/Images/random bg img/coding bg14.jpg";
import bg15 from "../assets/Images/random bg img/coding bg15.jpg";
import bg16 from "../assets/Images/random bg img/coding bg16.jpg";
import bg17 from "../assets/Images/random bg img/1.jpg";
import bg20 from "../assets/Images/random bg img/4.jpg";
import bg21 from "../assets/Images/random bg img/5.jpg";
import bg22 from "../assets/Images/random bg img/6.jpg";
import bg23 from "../assets/Images/random bg img/7.jpg";
import bg24 from "../assets/Images/random bg img/8.jpg";
import bg25 from "../assets/Images/random bg img/9.jpg";
import bg26 from "../assets/Images/random bg img/10.jpg";

const images = [bg1,bg2,bg3,bg4,bg5,bg7,bg8,bg9,bg10,bg11,bg12,bg13,bg14,bg15,bg16,bg17,bg20,bg21,bg22,bg23,bg24,bg25,bg26];

const Home = () => {
  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    const random = images[Math.floor(Math.random() * images.length)];
    setBackgroundImg(random);
  }, []);

  return (
    <div className="overflow-x-hidden bg-richblack-900 text-white">
      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center text-white
                   h-[480px] md:h-[640px] w-full bg-center bg-cover l overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        {/* glowing bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-tr from-green-400/40 via-cyan-400/30 to-transparent blur-3xl"></div>

        {/* top small button */}
        <Link to="/signup" className="z-10">
          <div className="group mx-auto rounded-full bg-[#161D29] text-richblack-200 font-bold transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex items-center gap-2 px-8 py-2 rounded-full transition-all duration-200 group-hover:bg-[#000814]">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* main heading */}
        <h1 className="z-10 mt-8 text-3xl sm:text-4xl lg:text-5xl font-semibold text-center px-4">
          Empower Your Future with <HighlightText text="Coding Skills" />
        </h1>

        {/* sub text */}
        <p className="z-10 mt-4 max-w-3xl text-center text-base sm:text-lg font-medium px-6">
          Learn at your own pace from anywhere with access to projects,
          quizzes, and feedback from top instructors around the world.
        </p>

        {/* buttons */}
        <div className="z-10 flex flex-col sm:flex-row gap-5 mt-8">
          <CTAButton active={true} linkto="/signup">
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto="/login">
            Book a Demo
          </CTAButton>
        </div>
      </section>

      {/* Code Sections */}
      <section className="relative w-11/12 mx-auto max-w-maxContent mt-16 flex flex-col gap-20 items-center">
        {/* Code Block 1 */}
        <CodeBlocks
          position="lg:flex-row"
          heading={
            <div className="text-3xl lg:text-4xl font-semibold">
              Unlock Your <HighlightText text="coding potential " /> with our
              online courses
            </div>
          }
          subheading="Our courses are designed by experts who share real-world coding experience and guide you through hands-on practice."
          ctabtn1={{
            btnText: "Try it Yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn More",
            linkto: "/login",
            active: false,
          }}
          codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title></head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav>`}
          codeColor="text-yellow-400"
          backgroundGradient={"bg-red-700"}
        />

        {/* Code Block 2 */}
        <CodeBlocks
          position="lg:flex-row-reverse"
          heading={
            <div className="text-3xl lg:text-4xl font-semibold">
              Start <HighlightText text="coding in seconds" />
            </div>
          }
          subheading="Our hands-on environment lets you write and run real code from day one."
          ctabtn1={{
            btnText: "Continue Lesson",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn More",
            linkto: "/login",
            active: false,
          }}
          codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => <div>Home</div>;\nexport default Home;`}
          codeColor="text-white"
        />

        <ExploreMore />
      </section>

      {/* Skill Section */}
      <section className="bg-white text-[#161D29] mt-16 py-10">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 mt-20">
              <CTAButton active={true} linkto="/signup">
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto="/signup">
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center gap-14 mt-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-3xl lg:text-4xl font-semibold w-full lg:w-[45%] text-center lg:text-left">
              Get the Skills you need for a{" "}
              <HighlightText text="Job that is in demand" />
            </div>

            <div className="flex flex-col gap-6 w-full lg:w-[45%] items-center lg:items-start text-center lg:text-left">
              <p className="text-base text-gray-700">
                The modern world demands skills beyond degrees. Gain
                professional knowledge that makes you truly employable.
              </p>
              <CTAButton active={true} linkto="/signup">
                Learn More
              </CTAButton>
            </div>
          </div>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </section>

      {/* Instructor + Reviews */}
      <section className="w-11/12 mx-auto max-w-maxContent mt-14 flex flex-col items-center text-white gap-12">
        <InstructorSection />
        <h1 className="text-center text-3xl lg:text-4xl font-semibold mt-8 flex justify-center items-center gap-x-3">
          Reviews from other learners <MdOutlineRateReview className="text-yellow-25" />
        </h1>
        <ReviewSlider />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
