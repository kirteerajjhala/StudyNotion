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

  // Loading Skeleton
  const sklItem = () => (
    <div className="flex border border-gray-600 px-5 py-3 w-full rounded-lg animate-pulse mb-3">
      <div className="flex flex-1 gap-x-4">
        <div className="h-14 w-14 rounded-lg bg-gray-700"></div>
        <div className="flex flex-col w-[40%] gap-2">
          <p className="h-2 w-[50%] rounded-xl bg-gray-700"></p>
          <p className="h-2 w-[70%] rounded-xl bg-gray-700 mt-2"></p>
        </div>
      </div>
      <div className="flex flex-[0.4] flex-col gap-2">
        <p className="h-2 w-[20%] rounded-xl bg-gray-700 mt-2"></p>
        <p className="h-2 w-[40%] rounded-xl bg-gray-700 mt-2"></p>
      </div>
    </div>
  );

  // If user has no courses
  if (enrolledCourses?.length === 0) {
    return (
      <p className="grid h-[50vh] w-full place-content-center text-center text-gray-100 text-3xl">
        You have not enrolled in any course yet.
      </p>
    );
  }

  return (
    <>
      <h1 className="text-4xl text-gray-100 font-boogaloo text-center sm:text-left">
        Enrolled Courses
      </h1>

      <div className="my-8 text-gray-100">
        {/* Table Headings */}
        <div className="flex rounded-t-2xl bg-gray-800 font-semibold">
          <p className="w-[45%] px-5 py-3">Course Name</p>
          <p className="w-1/4 px-2 py-3">Duration</p>
          <p className="flex-1 px-2 py-3">Progress</p>
        </div>

        {/* Skeleton Loader */}
        {!enrolledCourses &&
          Array(5)
            .fill(0)
            .map((_, i) => <sklItem key={i} />)}

        {/* Enrolled Courses */}
        {enrolledCourses?.map((course, i, arr) => (
          <div
            key={i}
            className={`flex flex-col sm:flex-row sm:items-center border border-gray-600 ${
              i === arr.length - 1 ? "rounded-b-2xl" : "rounded-none"
            }`}
          >
            {/* Course info */}
            <div
              className="flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
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
              <div className="flex max-w-xs flex-col gap-2">
                <p className="font-semibold text-gray-100">{course.courseName}</p>
                <p className="text-xs text-gray-300">
                  {course.courseDescription.length > 50
                    ? `${course.courseDescription.slice(0, 50)}...`
                    : course.courseDescription}
                </p>
              </div>
            </div>

            {/* Mobile: Duration & Progress */}
            <div className="sm:hidden flex flex-col px-2 py-3">
              <div>{course?.totalDuration}</div>
              <div className="flex flex-col gap-2 mt-2">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>

            {/* Desktop: Duration & Progress */}
            <div className="hidden sm:flex w-1/5 px-2 py-3">{course?.totalDuration}</div>
            <div className="hidden sm:flex w-1/5 flex-col gap-2 px-2 py-3">
              <p>Progress: {course.progressPercentage || 0}%</p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="8px"
                isLabelVisible={false}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
