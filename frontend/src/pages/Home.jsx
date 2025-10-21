import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlock";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

import { MdOutlineRateReview } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

import { motion } from "framer-motion";
import { fadeIn } from "../components/common/motionFrameVarients";

// Random Background Images
import backgroundImg1 from "../assets/Images/random bg img/coding bg1.jpg";
import backgroundImg2 from "../assets/Images/random bg img/coding bg2.jpg";
import backgroundImg3 from "../assets/Images/random bg img/coding bg3.jpg";
import backgroundImg4 from "../assets/Images/random bg img/coding bg4.jpg";
import backgroundImg5 from "../assets/Images/random bg img/coding bg5.jpg";
import backgroundImg7 from "../assets/Images/random bg img/coding bg7.jpg";
import backgroundImg8 from "../assets/Images/random bg img/coding bg8.jpeg";
import backgroundImg9 from "../assets/Images/random bg img/coding bg9.jpg";
import backgroundImg10 from "../assets/Images/random bg img/coding bg10.jpg";
import backgroundImg11 from "../assets/Images/random bg img/coding bg11.jpg";

import backgroundImg12 from "../assets/Images/random bg img/coding bg12.jpg";
import backgroundImg13 from "../assets/Images/random bg img/coding bg13.jpg";
import backgroundImg14 from "../assets/Images/random bg img/coding bg14.jpg";
import backgroundImg15 from "../assets/Images/random bg img/coding bg15.jpg";
import backgroundImg16 from "../assets/Images/random bg img/coding bg16.jpg";

import backgroundImg17 from "../assets/Images/random bg img/1.jpg";
import backgroundImg20 from "../assets/Images/random bg img/4.jpg";
import backgroundImg21 from "../assets/Images/random bg img/5.jpg";
import backgroundImg22 from "../assets/Images/random bg img/6.jpg";
import backgroundImg23 from "../assets/Images/random bg img/7.jpg";
import backgroundImg24 from "../assets/Images/random bg img/8.jpg";
import backgroundImg25 from "../assets/Images/random bg img/9.jpg";
import backgroundImg26 from "../assets/Images/random bg img/10.jpg";

const randomImages = [
  backgroundImg1, backgroundImg2, backgroundImg3, backgroundImg4, backgroundImg5,
  backgroundImg7, backgroundImg8, backgroundImg9, backgroundImg10, backgroundImg11,
  backgroundImg12, backgroundImg13, backgroundImg14, backgroundImg15, backgroundImg16,
  backgroundImg17, backgroundImg20, backgroundImg21, backgroundImg22, backgroundImg23,
  backgroundImg24, backgroundImg25, backgroundImg26,
];

const Home = () => {
  const [backgroundImg, setBackgroundImg] = useState(null);

  useEffect(() => {
    const bg = randomImages[Math.floor(Math.random() * randomImages.length)];
    setBackgroundImg(bg);
  }, []);

  return (
    <div className="mt-20 overflow-hidden">

      {/* Hero Section */}
      <div
        className="relative w-full h-[500px] md:h-[640px] bg-center bg-cover  flex flex-col items-center justify-center text-white px-5 py-10 md:px-0"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <Link to="/signup">
          <motion.div
            whileHover={{ scale: 0.95 }}
            className="group p-1 rounded-full bg-[#161D29] mt-10 md:mt-0 font-bold text-white transition-all duration-200 mb-4"
          >
            <div className="flex items-center gap-2 px-8  py-2 rounded-full transition-all duration-200 group-hover:bg-[#000814]">
              Become an Instructor <FaArrowRight />
            </div>
          </motion.div>
        </Link>

        <motion.h1
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          className="text-3xl md:text-4xl font-semibold text-center"
        >
          Empower Your Future with <HighlightText text="Coding Skills" />
        </motion.h1>

        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          className="mt-4 max-w-3xl text-center text-base md:text-lg font-bold text-gray-200"
        >
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to hands-on projects, quizzes, and personalized feedback from instructors.
        </motion.p>

        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row gap-4 mt-6"
        >
          <CTAButton active={true} linkto="/signup">Learn More</CTAButton>
          <CTAButton active={false} linkto="/login">Book a Demo</CTAButton>
        </motion.div>
      </div>

      {/* Code Blocks & Explore Section */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center gap-16 mt-16">

        {/* Code Block 1 */}
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="w-full"
        >
          <CodeBlocks
            position="lg:flex-row"
            heading={<h2 className="text-3xl md:text-4xl font-semibold">Unlock Your <HighlightText text="coding potential" /> with our online courses</h2>}
            subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            ctabtn1={{ btnText: "Try it Yourself", link: "/signup", active: true }}
            ctabtn2={{ btnText: "Learn More", link: "/login", active: false }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>\n</nav>`}
            codeColor="text-yellow-400"
            backgroundGradient="absolute w-[400px] h-[250px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-700 via-orange-500 to-white opacity-30 blur-3xl"
          />
        </motion.div>

        {/* Code Block 2 */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="w-full"
        >
          <CodeBlocks
            position="lg:flex-row-reverse"
            heading={<h2 className="text-3xl md:text-4xl font-semibold">Start <HighlightText text="coding in seconds" /></h2>}
            subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            ctabtn1={{ btnText: "Continue Lesson", link: "/signup", active: true }}
            ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
            codeColor="text-white"
            codeblock={`import React from "react";\nconst Home = () => {\n return <div>Home</div>;\n};\nexport default Home;`}
            backgroundGradient="absolute w-[372px] h-[257px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400 via-teal-400 to-green-200 opacity-20 blur-3xl"
          />
        </motion.div>

        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-zinc-100 text-[#161D29] mt-20">
        <div className="mx-auto max-w-maxContent w-11/12 flex flex-col items-center gap-10 py-20 ">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            className="text-3xl md:text-4xl font-semibold text-center mt-20"
          >
            Get the Skills you need for a <HighlightText text="Job that is in demand" />
          </motion.h2>

          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            className="text-center max-w-2xl text-base md:text-lg"
          >
            The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
          </motion.p>

          <CTAButton active={true} linkto="/signup">Learn More</CTAButton>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 - Instructors & Reviews */}
      <div className="bg-richblack-900 text-white py-20">
        <div className="mx-auto max-w-maxContent w-11/12 flex flex-col gap-12">
          <InstructorSection />

          <h2 className="text-center text-3xl md:text-4xl font-semibold flex justify-center items-center gap-2">
            Reviews from other learners <MdOutlineRateReview className="text-yellow-400" />
          </h2>
          <ReviewSlider />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
