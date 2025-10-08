import { useEffect, useRef, useState } from "react"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"
import { IoMdArrowDropdown } from "react-icons/io"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)
  const [active, setActive] = useState(false)
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-100 last:mb-0 duration-200 rounded-md">
      {/* Accordion Header */}
      <div
        className="flex cursor-pointer items-start justify-between px-5 py-4 transition-all"
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-2">
          <i className={`${isActive.includes(course._id) ? "rotate-180" : "rotate-0"} transition-transform duration-300`}>
            <IoMdArrowDropdown size={25} />
          </i>
          <p className="font-semibold text-base">{course?.sectionName}</p>
        </div>

        <div className="text-sm text-yellow-400 font-medium">
          {`${course.subSection.length || 0} lecture(s)`}
        </div>
      </div>

      {/* Accordion Content */}
      <div
        ref={contentEl}
        className="overflow-hidden bg-gray-900 transition-[height] duration-300 ease-in-out"
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col gap-3 px-6 py-5 text-sm font-medium">
          {course?.subSection?.map((subSec, i) => (
            <CourseSubSectionAccordion subSec={subSec} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
