import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../services/operations/profileAPI";
import InstructorChart from "./InstructorDashboard/InstructorChart";
import Img from "../../common/Img";

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  // Fetch instructor data and courses
  useEffect(() => {
    (async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);
      if (instructorApiData.length) setInstructorData(instructorApiData);
      if (result) setCourses(result);
      setLoading(false);
    })();
  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  // Skeleton loader
  const skItem = () => (
    <div className="mt-5 w-full flex flex-col justify-between rounded-xl space-y-6">
      <div className="flex flex-col sm:flex-row border p-4 border-gray-600 rounded-xl gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <p className="w-24 h-4 rounded-xl bg-gray-700 animate-pulse"></p>
          <div className="flex gap-5">
            <p className="w-48 h-4 rounded-xl bg-gray-700 animate-pulse"></p>
            <p className="w-24 h-4 rounded-xl bg-gray-700 animate-pulse"></p>
          </div>
          <div className="flex flex-col items-center mt-5 gap-4">
            <div className="w-4/5 h-24 rounded-xl bg-gray-700 animate-pulse"></div>
            <div className="w-60 h-60 rounded-full bg-gray-700 animate-pulse"></div>
          </div>
        </div>
        <div className="hidden sm:flex min-w-[250px] flex-col p-6 bg-gray-700 rounded-xl animate-pulse"></div>
      </div>

      <div className="flex flex-col gap-6 mt-5">
        <div className="flex justify-between">
          <p className="text-lg font-bold text-gray-100 pl-5">Your Courses</p>
          <Link to="/dashboard/my-courses">
            <p className="text-xs font-semibold text-yellow-500 hover:underline pr-5">
              View All
            </p>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <p className="h-[201px] w-full rounded-xl bg-gray-700 animate-pulse"></p>
          <p className="h-[201px] w-full rounded-xl bg-gray-700 animate-pulse"></p>
          <p className="h-[201px] w-full rounded-xl bg-gray-700 animate-pulse"></p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Greeting */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 text-center sm:text-left">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-gray-300 text-center sm:text-left">
          Let's start something new
        </p>
      </div>

      {loading ? (
        skItem()
      ) : courses.length > 0 ? (
        <div className="space-y-6 mt-4">
          {/* Chart & Stats */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-[450px]">
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-gray-800 p-6 flex flex-col justify-center items-center">
                <p className="text-lg font-bold text-gray-100">Visualize</p>
                <p className="mt-4 text-xl font-medium text-gray-200">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}

            {/* Statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-gray-800 p-6 space-y-4">
              <p className="text-lg font-bold text-gray-100">Statistics</p>
              <div className="space-y-4">
                <div>
                  <p className="text-lg text-gray-300">Total Courses</p>
                  <p className="text-3xl font-semibold text-gray-100">{courses.length}</p>
                </div>
                <div>
                  <p className="text-lg text-gray-300">Total Students</p>
                  <p className="text-3xl font-semibold text-gray-100">{totalStudents}</p>
                </div>
                <div>
                  <p className="text-lg text-gray-300">Total Income</p>
                  <p className="text-3xl font-semibold text-gray-100">Rs. {totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top 3 Courses */}
          <div className="rounded-md bg-gray-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-gray-100">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-500 hover:underline">
                  View All
                </p>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course._id}
                  className="sm:w-1/3 flex flex-col items-center justify-center"
                >
                  <Img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-2xl object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-gray-100">{course.courseName}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-300 font-medium">
                      <span>{course.studentsEnrolled.length} students</span>
                      <span>|</span>
                      <span>Rs. {course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-md bg-gray-800 p-6 py-20 flex flex-col items-center">
          <p className="text-2xl font-bold text-gray-100 text-center">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-2 text-lg font-semibold text-yellow-500 hover:underline">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
