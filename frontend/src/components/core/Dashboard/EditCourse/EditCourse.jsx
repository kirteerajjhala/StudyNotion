import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import RenderSteps from "../AddCourse/RenderSteps";
import Loading from "../../../common/Loading";

export default function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFullCourseDetails = async () => {
      setLoading(true);
      try {
        const result = await getFullDetailsOfCourse(courseId, token);
        if (result?.courseDetails) {
          dispatch(setEditCourse(true));
          dispatch(setCourse(result.courseDetails));
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
      setLoading(false);
    };

    fetchFullCourseDetails();
  }, [courseId, token, dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="flex w-full flex-col lg:flex-row items-start gap-x-6 ">
      <div className="flex flex-1 flex-col">
        <h1 className="mb-14 text-3xl font-medium text-gray-100 text-center sm:text-left">
          Edit Course
        </h1>

        <div className="flex-1">
          {course ? (
            <RenderSteps />
          ) : (
            <p className="mt-14 text-center text-3xl font-semibold text-gray-300">
              Course not found
            </p>
          )}
        </div>
      </div>

      {/* Optional Course Upload Tips (Uncomment if needed) */}
      {/*
      <div className="sticky top-10 hidden lg:block max-w-[400px] flex-1 rounded-md border border-gray-700 bg-gray-800 p-6">
        <p className="mb-8 text-lg text-gray-100">⚡ Course Upload Tips</p>
        <ul className="ml-5 list-disc space-y-4 text-xs text-gray-100">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
          <li>Information from the Additional Data section shows up on the course single page.</li>
          <li>Make Announcements to notify any important notes to all enrolled students at once.</li>
        </ul>
      </div>
      */}
    </div>
  );
}
