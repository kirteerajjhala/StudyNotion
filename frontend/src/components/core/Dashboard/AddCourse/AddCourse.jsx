import { useEffect } from "react";
import RenderSteps from "./RenderSteps";

export default function AddCourse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full items-start gap-6 p-4 md:p-6 lg:p-10">
      {/* Left Section */}
      <div className="flex flex-1 flex-col w-full">
        <h1 className="mb-10 text-3xl md:text-4xl font-semibold text-gray-800 text-center lg:text-left">
          Add Course
        </h1>

        <div className="flex-1 w-full">
          <RenderSteps />
        </div>
      </div>

      {/* Right Section - Course Upload Tips */}
      <div className="sticky top-10 hidden lg:block max-w-sm flex-1 rounded-lg border border-gray-300 bg-white shadow-md p-6">
        <p className="mb-6 text-lg font-semibold text-gray-800">
          ⚡ Course Upload Tips
        </p>

        <ul className="ml-5 list-disc space-y-3 text-sm text-gray-600">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons,
            quizzes, and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>Make Announcements to notify any important updates.</li>
          <li>Send Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
}
