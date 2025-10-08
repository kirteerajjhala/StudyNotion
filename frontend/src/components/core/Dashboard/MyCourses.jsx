import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all instructor courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const result = await fetchInstructorCourses(token);
        if (result) setCourses(result);
      } catch (error) {
        console.log("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-100">
          My Courses
        </h1>
        <div className="w-full sm:w-auto">
          <IconBtn
            text="Add Course"
            onClick={() => navigate("/dashboard/add-course")}
            className="w-full sm:w-auto"
          >
            <VscAdd />
          </IconBtn>
        </div>
      </div>

      {/* Courses Table */}
      {courses.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <CoursesTable
            courses={courses}
            setCourses={setCourses}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      ) : (
        <p className="text-center text-gray-200 text-base sm:text-lg mt-8 px-4">
          {loading
            ? "Loading courses..."
            : "No courses found. Add a new course!"}
        </p>
      )}
    </div>
  );
}
