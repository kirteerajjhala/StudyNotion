import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"

import ConfirmationModal from "../../../../common/ConfirmationModal.jsx"
import SubSectionModal from "./SubSectionModal"

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({ sectionId, courseId: course._id, token })
    if (result) dispatch(setCourse(result))
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div className="rounded-2xl bg-gray-800 p-6 sm:px-8 space-y-2" id="nestedViewContainer">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open className="border border-gray-700 rounded-md">
            <summary className="flex cursor-pointer items-center justify-between border-b border-gray-600 py-2 px-2 sm:px-4">
              {/* Section Name */}
              <div className="flex items-center gap-3">
                <RxDropdownMenu className="text-2xl text-white" />
                <p className="font-semibold text-white">{section.sectionName}</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                  className="text-gray-300 hover:text-white transition"
                >
                  <MdEdit className="text-xl" />
                </button>

                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                  className="text-gray-300 hover:text-red-500 transition"
                >
                  <RiDeleteBin6Line className="text-xl" />
                </button>

                <AiFillCaretDown className="text-xl text-gray-300" />
              </div>
            </summary>

            <div className="px-4 sm:px-6 pb-4 space-y-2">
              {section.subSection.map((data) => (
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-3 border-b border-gray-600 py-2 px-2 sm:px-4 rounded hover:bg-gray-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <RxDropdownMenu className="text-2xl text-white" />
                    <p className="font-semibold text-white">{data.title}</p>
                  </div>

                  <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setEditSubSection({ ...data, sectionId: section._id })}
                      className="text-gray-300 hover:text-white transition"
                    >
                      <MdEdit className="text-xl" />
                    </button>

                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      className="text-gray-300 hover:text-red-500 transition"
                    >
                      <RiDeleteBin6Line className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Lecture */}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-1 text-yellow-500 hover:text-yellow-400 transition"
              >
                <FaPlus className="text-lg" />
                <span className="font-medium">Add Lecture</span>
              </button>
            </div>
          </details>
        ))}
      </div>

      {/* Modals */}
      {addSubSection && <SubSectionModal modalData={addSubSection} setModalData={setAddSubsection} add />}
      {viewSubSection && <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view />}
      {editSubSection && <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit />}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
