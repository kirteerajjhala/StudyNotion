import React, { useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full bg-gray-800 rounded-lg text-white mb-2 transition-all duration-300">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-700 rounded-lg transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <HiOutlineVideoCamera className="text-yellow-400 text-lg" />
          <p className="font-medium text-sm sm:text-base">{subSec?.title}</p>
        </div>
        <AiOutlineDown
          className={`text-gray-300 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-5 py-3 bg-gray-900 text-sm text-gray-300 border-t border-gray-700 rounded-b-lg">
          <p>{subSec?.description || "No description available."}</p>
        </div>
      )}
    </div>
  )
}

export default CourseSubSectionAccordion
