import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid gap-6 mx-auto w-[90%] lg:w-full grid-cols-1 lg:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => (
        <div
          key={i}
          className={`${
            i === 0 ? "lg:col-span-2 lg:h-[300px]" : "h-[300px]"
          } ${
            card.order % 2 === 1
              ? "bg-gray-700"
              : card.order % 2 === 0
              ? "bg-gray-800"
              : "bg-transparent"
          } ${card.order === 3 ? "lg:col-start-2" : ""} rounded-lg shadow-md p-6 flex flex-col justify-between`}
        >
          {card.order < 0 ? (
            <div className="flex flex-col gap-4 h-full justify-between">
              <div>
                <h2 className="text-2xl lg:text-3xl font-semibold text-white">
                  {card.heading}{" "}
                  <HighlightText text={card.highlightText} />
                </h2>
                <p className="text-gray-300 mt-2">{card.description}</p>
              </div>
              <div className="mt-4">
                <CTAButton active={true} linkto={card.BtnLink}>
                  {card.BtnText}
                </CTAButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 h-full justify-center">
              <h3 className="text-lg lg:text-xl font-semibold text-white">
                {card.heading}
              </h3>
              <p className="text-gray-300">{card.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningGrid;
