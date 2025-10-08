import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";
import EditCourse from "./../EditCourse/EditCourse";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  const { editCourse } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <div className="w-full">
      {/* Progress Step Circles */}
      <div className="relative mb-4 flex w-full select-none justify-center items-center flex-wrap sm:flex-nowrap">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center">
              <div
                className={`grid aspect-square w-9 sm:w-10 place-items-center rounded-full border-2 text-sm font-semibold transition-all duration-300
                ${
                  step === item.id
                    ? "border-yellow-400 bg-yellow-100 text-yellow-800"
                    : "border-gray-400 bg-gray-100 text-gray-600"
                }
                ${step > item.id ? "bg-yellow-400 text-white border-yellow-400" : ""}
              `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-white" />
                ) : (
                  item.id
                )}
              </div>
            </div>

            {/* Dotted Line Between Steps */}
            {index !== steps.length - 1 && (
              <div
                className={`hidden sm:block w-1/3 border-b-2 border-dashed transition-all duration-300 ${
                  step > item.id ? "border-yellow-400" : "border-gray-400"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Titles */}
      <div className="relative mb-10 flex w-full justify-between items-center text-center">
        {steps.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col items-center gap-y-2 ${
              editCourse ? "sm:min-w-[270px]" : "sm:min-w-[130px]"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                step >= item.id ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render Step Components */}
      <div className="w-full">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
  );
}
