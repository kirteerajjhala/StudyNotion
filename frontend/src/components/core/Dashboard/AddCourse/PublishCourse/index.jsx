import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../../utils/constants";
import IconBtn from "../../../../common/IconBtn";

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  // Set checkbox initial value if course is already published
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [course, setValue]);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async (data) => {
    // Check if nothing changed
    if (
      (course?.status === COURSE_STATUS.PUBLISHED && data.public) ||
      (course?.status === COURSE_STATUS.DRAFT && !data.public)
    ) {
      goToCourses();
      return;
    }

    // Prepare updates as JSON object
    const updates = {
      courseId: course._id,
      status: data.public ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT,
    };

    try {
      setLoading(true);
      const result = await editCourseDetails(updates, token); // now sending JSON
      if (result) goToCourses();
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    handleCoursePublish(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md p-6 mt-6">
      <p className="text-2xl font-semibold text-gray-800 mb-4">
        Publish Settings
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="public" className="ml-3 text-gray-700 text-base">
            Make this course public
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 font-medium transition disabled:opacity-50"
          >
            Back
          </button>

          <IconBtn
            type="submit"
            disabled={loading}
            text={loading ? "Saving..." : "Save Changes"}
            customClasses="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition disabled:opacity-50"
          />
        </div>
      </form>
    </div>
  );
}
