import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { formatDate } from "../../../../services/formatDate";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal.jsx";
import Img from "../../../common/Img";
import toast from "react-hot-toast";

export default function CoursesTable({
  courses,
  setCourses,
  loading,
  setLoading,
}) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const TRUNCATE_LENGTH = 25;

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    const toastId = toast.loading("Deleting...");
    await deleteCourse({ courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) setCourses(result);
    setConfirmationModal(null);
    setLoading(false);
    toast.dismiss(toastId);
  };

  const skItem = () => (
    <div className="flex border-b border-gray-700 px-6 py-8 w-full">
      <div className="flex flex-1 gap-x-4">
        <div className="h-[148px] min-w-[300px] rounded-xl bg-gray-300 animate-pulse"></div>
        <div className="flex flex-col w-[40%]">
          <p className="h-5 w-[50%] rounded-xl bg-gray-300 animate-pulse"></p>
          <p className="h-20 w-[60%] rounded-xl mt-3 bg-gray-300 animate-pulse"></p>
          <p className="h-2 w-[20%] rounded-xl mt-3 bg-gray-300 animate-pulse"></p>
          <p className="h-2 w-[20%] rounded-xl mt-2 bg-gray-300 animate-pulse"></p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-gray-700 bg-gray-800">
        <Table className="min-w-full">
          <Thead>
            <Tr className="rounded-t-2xl bg-gray-700 text-gray-100 text-sm sm:text-base">
              <Th className="py-3 px-4 text-left">Courses</Th>
              <Th className="py-3 px-4 text-left hidden sm:table-cell">
                Duration
              </Th>
              <Th className="py-3 px-4 text-left hidden sm:table-cell">
                Price
              </Th>
              <Th className="py-3 px-4 text-left">Actions</Th>
            </Tr>
          </Thead>

          {loading && (
            <tbody>
              <tr>
                <td colSpan="4">
                  {skItem()}
                  {skItem()}
                  {skItem()}
                </td>
              </tr>
            </tbody>
          )}

          <Tbody>
            {!loading && courses?.length === 0 ? (
              <Tr>
                <Td className="py-10 text-center text-lg sm:text-2xl font-medium text-gray-200">
                  No courses found
                </Td>
              </Tr>
            ) : (
              courses?.map((course) => (
                <Tr
                  key={course._id}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 flex flex-col sm:table-row"
                >
                  {/* Course Info */}
                  <Td className="flex flex-col sm:table-cell gap-3 sm:gap-x-4 py-4 px-4 sm:flex-row sm:items-start">
                    <Img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="
                        w-full h-[160px] 
                        sm:w-[180px] sm:h-[110px] 
                        md:w-[220px] md:h-[130px]
                        object-cover rounded-lg
                      "
                    />
                    <div className="flex flex-col mt-2 sm:mt-0">
                      <p className="text-base sm:text-lg font-semibold text-gray-100 capitalize">
                        {course.courseName}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400">
                        {course.courseDescription.split(" ").length >
                        TRUNCATE_LENGTH
                          ? course.courseDescription
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : course.courseDescription}
                      </p>
                      <p className="text-[12px] text-gray-400 mt-2">
                        Created: {formatDate(course?.createdAt)}
                      </p>
                      <p className="text-[12px] text-gray-400">
                        Updated: {formatDate(course?.updatedAt)}
                      </p>

                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className="mt-2 flex w-fit items-center gap-2 rounded-full bg-pink-200/20 px-2 py-[2px] text-[12px] font-medium text-pink-500">
                          <HiClock size={14} />
                          Drafted
                        </p>
                      ) : (
                        <div className="mt-2 flex w-fit items-center gap-2 rounded-full bg-yellow-200/20 px-2 py-[2px] text-[12px] font-medium text-yellow-500">
                          <p className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-500 text-gray-900">
                            <FaCheck size={8} />
                          </p>
                          Published
                        </div>
                      )}
                    </div>
                  </Td>

                  {/* Duration */}
                  <Td className="text-sm font-medium text-gray-200 hidden sm:table-cell py-4 px-4">
                    2hr 30min
                  </Td>

                  {/* Price */}
                  <Td className="text-sm font-medium text-gray-200 hidden sm:table-cell py-4 px-4">
                    ₹{course.price}
                  </Td>

                  {/* Actions */}
                  <Td className="text-sm font-medium text-gray-200 flex justify-start sm:justify-start gap-4 py-4 px-4">
                    <button
                      disabled={loading}
                      onClick={() =>
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }
                      title="Edit"
                      className="transition-all duration-200 hover:scale-110 hover:text-green-400"
                    >
                      <FiEdit2 size={20} />
                    </button>

                    <button
                      disabled={loading}
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2: "All data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }
                      title="Delete"
                      className="transition-all duration-200 hover:scale-110 hover:text-red-500"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
