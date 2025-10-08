import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from './../../common/IconBtn';
import { setCourseViewSidebar } from "../../../slices/sidebarSlice"

import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { IoMdClose } from 'react-icons/io'
import { HiMenuAlt1 } from 'react-icons/hi'

export default function VideoDetailsSidebar({ setReviewModal }) {

  const [activeStatus, setActiveStatus] = useState("") // current section id
  const [videoBarActive, setVideoBarActive] = useState("") // current subSection id
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();

  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  const { courseViewSidebar } = useSelector(state => state.sidebar)

  // set active section & subsection
  useEffect(() => {
    ; (() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
      const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <div className="flex h-[calc(100vh-14)] w-80 max-w-[350px] flex-col border-r border-gray-700 bg-gray-900">
      {/* Header */}
      <div className="mx-5 flex flex-col gap-4 border-b border-gray-700 py-5 text-lg font-bold text-white">
        <div className="flex w-full items-center justify-between">
          {/* Sidebar toggle */}
          <div
            className="sm:hidden text-white cursor-pointer"
            onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
          >
            {courseViewSidebar ? <IoMdClose size={33} /> : <HiMenuAlt1 size={33} />}
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-800 hover:scale-95"
            title="back"
          >
            <IoIosArrowBack size={24} />
          </button>

          {/* Add Review */}
          <IconBtn
            text="Add Review"
            onclick={() => setReviewModal(true)}
          />
        </div>

        {/* Course info */}
        <div className="flex flex-col">
          <p className="text-base font-semibold">{courseEntireData?.courseName}</p>
          <p className="text-sm font-medium text-gray-400">
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* Sections & Subsections */}
      <div className="h-[calc(100vh-20)] overflow-y-auto px-2">
        {courseSectionData.map((section, index) => (
          <div key={index} className="mt-2 text-sm text-white cursor-pointer">
            {/* Section Header */}
            <div
              className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-md"
              onClick={() => setActiveStatus(section?._id)}
            >
              <div className="font-semibold">{section?.sectionName}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">
                  Lessons {section?.subSection.length}
                </span>
                <BsChevronDown
                  className={`transition-transform duration-300 ${
                    activeStatus === section?._id ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>
            </div>

            {/* Subsections */}
            {activeStatus === section?._id && (
              <div className="mt-1 space-y-1">
                {section.subSection.map((topic, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-white cursor-pointer ${
                      videoBarActive === topic._id
                        ? "bg-yellow-300 text-gray-900 font-semibold"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => {
                      navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                      setVideoBarActive(topic._id)
                      if (courseViewSidebar && window.innerWidth <= 640) {
                        dispatch(setCourseViewSidebar(false))
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      readOnly
                    />
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
