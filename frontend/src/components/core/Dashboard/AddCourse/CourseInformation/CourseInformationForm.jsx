import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../../utils/constants";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequirementsField from "./RequirementField";

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) setCourseCategories(categories);
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    );
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName)
          formData.append("courseName", data.courseTitle);
        if (currentValues.courseShortDesc !== course.courseDescription)
          formData.append("courseDescription", data.courseShortDesc);
        if (currentValues.coursePrice !== course.price)
          formData.append("price", data.coursePrice);
        if (currentValues.courseTags.toString() !== course.tag.toString())
          formData.append("tag", JSON.stringify(data.courseTags));
        if (currentValues.courseBenefits !== course.whatYouWillLearn)
          formData.append("whatYouWillLearn", data.courseBenefits);
        if (currentValues.courseCategory._id !== course.category._id)
          formData.append("category", data.courseCategory);
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        )
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        if (currentValues.courseImage !== course.thumbnail)
          formData.append("thumbnailImage", data.courseImage);

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-lg border border-gray-700 bg-gray-800 p-6 text-gray-100 max-w-3xl mx-auto w-full"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium" htmlFor="courseTitle">
          Course Title <sup className="text-red-400">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.courseTitle && (
          <span className="text-xs text-red-400">Course title is required</span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-red-400">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="min-h-[120px] w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.courseShortDesc && (
          <span className="text-xs text-red-400">Description is required</span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium" htmlFor="coursePrice">
          Course Price <sup className="text-red-400">*</sup>
        </label>
        <div className="relative">
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: { value: /^(0|[1-9]\d*)(\.\d+)?$/ },
            })}
            className="w-full rounded-md border border-gray-600 bg-gray-900 px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {errors.coursePrice && (
          <span className="text-xs text-red-400">Price is required</span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium" htmlFor="courseCategory">
          Course Category <sup className="text-red-400">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="text-xs text-red-400">Category is required</span>
        )}
      </div>

      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
      />

      {/* Thumbnail Image */}
<Upload
  name="courseImage"
  label="Course Thumbnail"
  register={register}
  setValue={setValue}
  errors={errors}
  editData={editCourse ? course?.thumbnail : null}
/>



      {/* Benefits */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-red-400">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter course benefits"
          {...register("courseBenefits", { required: true })}
          className="min-h-[120px] w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.courseBenefits && (
          <span className="text-xs text-red-400">
            Benefits are required
          </span>
        )}
      </div>

      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements / Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
      />

      {/* Next Button */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="rounded-md bg-gray-500 px-4 py-2 text-white font-semibold hover:bg-gray-700 transition"
          >
            Continue Without Saving
          </button>
        )}
       <IconBtn
  type="submit"        // ✅ yaha submit set karna zaruri hai
  disabled={loading}
  text={!editCourse ? "Next" : "Save Changes"}
>
  <MdNavigateNext />
</IconBtn>

      </div>
    </form>
  );
}
