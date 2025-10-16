import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import Img from "../../common/Img";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  // Fetch all user's enrolled courses
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [token]);

  // Skeleton loader item
  const SklItem = () => (
    <div className="flex flex-col sm:flex-row border border-gray-700 rounded-lg px-5 py-3 animate-pulse mb-3">
      <div className="flex flex-1 gap-4 items-center">
        <div className="h-14 w-14 bg-gray-700 rounded-lg"></div>
        <div className="flex flex-col gap-2 w-[60%]">
          <p className="h-3 w-1/2 bg-gray-700 rounded"></p>
          <p className="h-3 w-3/4 bg-gray-700 rounded"></p>
        </div>
      </div>
      <div className="flex flex-col sm:w-[40%] gap-2 mt-3 sm:mt-0">
        <p className="h-3 w-1/3 bg-gray-700 rounded"></p>
        <p className="h-3 w-2/3 bg-gray-700 rounded"></p>
      </div>
    </div>
  );

  if (!enrolledCourses) {
    return (
      <div className="mt-20">
        <h1 className="text-4xl text-gray-100 font-boogaloo text-center sm:text-left mb-6">
          Enrolled Courses
        </h1>
        {Array(5).fill(0).map((_, i) => <SklItem key={i} />)}
      </div>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <p className="grid h-[50vh] w-full place-content-center text-center text-gray-100 text-2xl sm:text-3xl">
        You have not enrolled in any course yet.
      </p>
    );
  }

  return (
    <div className="mt-20">
      <h1 className="text-4xl text-gray-100 font-boogaloo text-center sm:text-left mb-6">
        Enrolled Courses
      </h1>

      <div className="my-8 text-gray-100">
        {/* Table Headings - only for desktop */}
        <div className="hidden sm:flex bg-gray-800 font-semibold rounded-t-2xl">
          <p className="w-[45%] px-5 py-3">Course Name</p>
          <p className="w-[25%] px-2 py-3">Duration</p>
          <p className="flex-1 px-2 py-3">Progress</p>
        </div>

        {/* Enrolled Courses List */}
        {enrolledCourses.map((course, i, arr) => (
          <div
            key={i}
            className={`flex flex-col sm:flex-row border border-gray-700 ${
              i === arr.length - 1 ? "rounded-b-2xl" : ""
            }`}
          >
            {/* Course info */}
            <div
              className="flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3 hover:bg-gray-800/40 transition-all"
              onClick={() =>
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                )
              }
            >
              <Img
                src={course.thumbnail}
                alt="course_img"
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-gray-100">{course.courseName}</p>
                <p className="text-xs text-gray-400">
                  {course.courseDescription.length > 50
                    ? `${course.courseDescription.slice(0, 50)}...`
                    : course.courseDescription}
                </p>
              </div>
            </div>

            {/* Duration and Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-[55%] px-5 py-3 border-t sm:border-t-0 sm:border-l border-gray-700 gap-3 sm:gap-0">
              <div className="sm:w-1/3 text-sm text-gray-300">
                {course?.totalDuration || "—"}
              </div>
              <div className="sm:w-2/3">
                <p className="text-sm mb-1">
                  Progress: {course.progressPercentage || 0}%
                </p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
