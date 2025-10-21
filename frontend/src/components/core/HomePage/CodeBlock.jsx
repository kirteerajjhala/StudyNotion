import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
    position = "lg:flex-row",
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient = "bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg",
    codeColor = "text-yellow-500",
}) => {
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>
            
            {/* Section 1 - Text & Buttons */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
                {heading}
                
                <div className="text-gray-300 text-base font-bold w-11/12 -mt-3">
                    {subheading}
                </div>

                <div className="flex gap-4 mt-6">
                    {ctabtn1 && (
                        <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
                            <div className="flex items-center gap-2">
                                {ctabtn1.btnText}
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    )}
                    {ctabtn2 && (
                        <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
                            {ctabtn2.btnText}
                        </CTAButton>
                    )}
                </div>
            </div>

            {/* Section 2 - Code Block */}
            <div className="h-fit border border-gray-700 rounded-xl flex w-full lg:w-[470px] py-3 text-xs sm:text-sm leading-[18px] sm:leading-6 font-mono relative">
                
                {/* Line Numbers */}
                <div className="text-center flex flex-col w-10 select-none text-gray-400 font-bold">
                    {Array.from({ length: 11 }, (_, i) => (
                        <p key={i}>{i + 1}</p>
                    ))}
                </div>

                {/* Code Content */}
                <div className={`w-[90%] flex flex-col gap-2 pr-2 relative ${codeColor}`}>
                    <div className={`${backgroundGradient} absolute w-full h-full `}></div>
                    <TypeAnimation
                        sequence={[codeblock, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                            overflowX: "hidden",
                            fontSize: "16px",
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;
