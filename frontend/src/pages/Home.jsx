import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"


import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlock"
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'
// import Course_Slider from '../components/core/Catalog/Course_Slider'



import { MdOutlineRateReview } from 'react-icons/md'
import { FaArrowRight } from "react-icons/fa"

// import { motion } from 'framer-motion'
// import { fadeIn, } from './../components/common/motionFrameVarients';

// background random images
import backgroundImg1 from '../assets/Images/random bg img/coding bg1.jpg'
import backgroundImg2 from '../assets/Images/random bg img/coding bg2.jpg'
import backgroundImg3 from '../assets/Images/random bg img/coding bg3.jpg'
import backgroundImg4 from '../assets/Images/random bg img/coding bg4.jpg'
import backgroundImg5 from '../assets/Images/random bg img/coding bg5.jpg'
import backgroundImg7 from '../assets/Images/random bg img/coding bg7.jpg'
import backgroundImg8 from '../assets/Images/random bg img/coding bg8.jpeg'
import backgroundImg9 from '../assets/Images/random bg img/coding bg9.jpg'
import backgroundImg10 from '../assets/Images/random bg img/coding bg10.jpg'
import backgroundImg11 from '../assets/Images/random bg img/coding bg11.jpg'



import backgroundImg12 from '../assets/Images/random bg img/coding bg12.jpg'
import backgroundImg13 from '../assets/Images/random bg img/coding bg13.jpg'
import backgroundImg14 from '../assets/Images/random bg img/coding bg14.jpg'
import backgroundImg15 from '../assets/Images/random bg img/coding bg15.jpg'
import backgroundImg16 from '../assets/Images/random bg img/coding bg16.jpg'



import backgroundImg17 from '../assets/Images/random bg img/1.jpg'
import backgroundImg20 from '../assets/Images/random bg img/4.jpg'
import backgroundImg21 from '../assets/Images/random bg img/5.jpg'
import backgroundImg22 from '../assets/Images/random bg img/6.jpg'
import backgroundImg23 from '../assets/Images/random bg img/7.jpg'
import backgroundImg24 from '../assets/Images/random bg img/8.jpg'
import backgroundImg25 from '../assets/Images/random bg img/9.jpg'
import backgroundImg26  from '../assets/Images/random bg img/10.jpg'
const randomImges = [
    backgroundImg1,
    backgroundImg2,
    backgroundImg3,
    backgroundImg4,
    backgroundImg5,
    backgroundImg7,
    backgroundImg8,
    backgroundImg9,
    backgroundImg10,
    backgroundImg11,
    backgroundImg12,
    backgroundImg13,
    backgroundImg14,
    backgroundImg15,
    backgroundImg16,
    backgroundImg17,
backgroundImg20,
backgroundImg21,
backgroundImg22,
backgroundImg23,
backgroundImg24,
backgroundImg25,
backgroundImg26,
];

// hardcoded



const Home = () => {

    // get background random images
    const [backgroundImg, setBackgroundImg] = useState(null);

    useEffect(() => {
        const bg = randomImges[Math.floor(Math.random() * randomImges.length)]
        setBackgroundImg(bg);
    }, [])








    return (
        <div className='mt-16'>

          
            {/* background random image */}
      
   <div className={`relative h-[450px] md:h-[640px] w-full
                 bg-[url(${backgroundImg})]  bg-no-repeat bg-center object-center bg-cover
                
                justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white
                    backdrop-blur-xs  
                `}>

                    <Link to={"/signup"}>
                        <div className='z-0 group p-1 mx-auto rounded-full bg-[#161D29] font-bold text-richblack-200
                                        transition-all duration-200 hover:scale-95 w-fit'>
                            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                              transition-all duration-200 group-hover:bg-[#000814]'>
                                <p>Become an Instructor</p>
                                <FaArrowRight />
                            </div>
                        </div>

                    </Link>

                    <div
                    
                        className='text-center text-3xl lg:text-4xl font-semibold mt-7  '
                    >
                        Empower Your Future with
                        <HighlightText text={"Coding Skills"} />
                    </div>

                    <div
                      
                        className=' mt-4 w-[90%] text-center text-base lg:text-lg font-bold  text-shadow-2xs '
                    >
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                    </div>


                    <div className='flex flex-row gap-7 mt-8'>
                        <CTAButton active={true} linkto={"/signup"}>
                            Learn More
                        </CTAButton>

                        <CTAButton active={false} linkto={"/login"}>
                            Book a Demo
                        </CTAButton>
                    </div>
                </div>
            <div className='w-full '>
                {/*Section1  */}
             

                {/* animated code */}
                <div className='relative mx-auto flex flex-col w-11/12  max-w-maxContent items-center text-white justify-between'>
                    {/* Code block 1 */}
                    <div className=''>
                        <CodeBlocks
                            position={"lg:flex-row"}
                            heading={
                                <div className='text-3xl lg:text-4xl font-semibold'>
                                    Unlock Your
                                    <HighlightText text={"coding potential "} />
                                    with our online courses
                                </div>
                            }
                            subheading={
                                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                            }
                            ctabtn1={
                                {
                                    btnText: "try it yourself",
                                    linkto: "/signup",
                                    active: true,
                                }
                            }
                            ctabtn2={
                                {
                                    btnText: "learn more",
                                    linkto: "/login",
                                    active: false,
                                }
                            }

                            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                            codeColor={"text-yellow-400"}
                            backgroundGradient={`absolute w-[400.95px] h-[257.05px] rounded-full
         left-[calc(50%-203.005px)] top-[calc(50%-145.995px)] 
        bg-[linear-gradient(123.77deg,#8A2BE2_-6.46%,#FFA500_59.04%,#F8F8FF_124.53%)] 
         opacity-30 blur-[34px] 
         [transform:matrix(1,0,-0.03,1,0,0)] 
         z-0`}
                        />
                    </div>


                    {/* Code block 2 */}
                    <div>
                        <CodeBlocks
                            position={"lg:flex-row-reverse"}
                            heading={
                                <div className="w-[100%] text-3xl lg:text-4xl font-semibold lg:w-[50%]">
                                    Start
                                    <HighlightText text={"coding in seconds"} />
                                </div>
                            }
                            subheading={
                                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                            }
                            ctabtn1={{
                                btnText: "Continue Lesson",
                                link: "/signup",
                                active: true,
                            }}
                            ctabtn2={{
                                btnText: "Learn More",
                                link: "/signup",
                                active: false,
                            }}
                            codeColor={"text-white"}
                            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                            backgroundGradient={`absolute rounded-full
         w-[372.95px] h-[257.05px] 
         left-[calc(50%-213.005px)] top-[calc(50%-145.995px)] 
         bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)] 
         opacity-20 
         blur-[34px] 
         [transform:matrix(1,0,-0.03,1,0,0)] 
         flex-none 
         order-0 
         grow-0 
         z-0`}
                        />
                    </div>

                    {/* course slider */}
                {/* <div>
                        <div className='mx-auto box-content w-full max-w-maxContentTab px- py-12 lg:max-w-maxContent'>
                        <h2 className='text-white mb-6 text-2xl '>
                            Popular Picks for You 🏆
                        </h2>
                        <Course_Slider Courses={CatalogPageData?.selectedCategory?.courses} />
                    </div>
                    <div className=' mx-auto box-content w-full max-w-maxContentTab px- py-12 lg:max-w-maxContent'>
                        <h2 className='text-white mb-6 text-2xl '>
                            Top Enrollments Today 🔥
                        </h2>
                        <Course_Slider Courses={CatalogPageData?.mostSellingCourses} />
                    </div>
                </div> */}


                    <ExploreMore />
                </div>

                {/*Section 2  */}
                <div className='bg-zinc-100 text-[#161D29] '>
                    <div className='homepage_bg h-[310px]'>
                        <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                            <div className='h-[150px]'></div>
                            <div className='flex flex-row gap-7 text-white '>
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div className='flex items-center gap-3' >
                                        Explore Full Catalog
                                        <FaArrowRight />
                                    </div>
                                </CTAButton>
                                <CTAButton active={false} linkto={"/signup"}>
                                    <div>
                                        Learn more
                                    </div>
                                </CTAButton>
                            </div>
                        </div>
                    </div>

                    <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                        <div className='flex flex-col lg:flex-row items-center justify-center gap-5 mb-20 mt-[70px]'>
                            <div className='text-3xl lg:text-4xl font-semibold w-full lg:w-[45%]'>
                                Get the Skills you need for a
                                <HighlightText text={"Job that is in demand"} />
                            </div>

                            <div className='flex flex-col gap-10 w-full lg:w-[40%] items-start'>
                                <div className='text-[16px]'>
                                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                                </div>
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div>
                                        Learn more
                                    </div>
                                </CTAButton>
                            </div>
                        </div>


                        {/* leadership */}
                        <TimelineSection />

                        <LearningLanguageSection />

                    </div>

                </div>


                {/*Section 3 */}
                <div className='mt-14 w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
                    <InstructorSection />

                    {/* Reviws from Other Learner */}
                    <h1 className="text-center text-3xl lg:text-4xl font-semibold mt-8 flex justify-center items-center gap-x-3">
                        Reviews from other learners <MdOutlineRateReview className='text-yellow-25' />
                    </h1>
                    <ReviewSlider />

                    
                </div>

                {/*Footer */}
               <div className='w-full px-5 py-10'>
                 <Footer />
               </div>
            </div >
        </div>
    )
}

export default Home