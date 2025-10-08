import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

export default function ChipInput({ label, name, placeholder, register, errors, setValue }) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse && course?.tag) {
      setChips(course.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 }, chips)
  }, [])

  useEffect(() => {
    setValue(name, chips)
  }, [chips])

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      const chipValue = event.target.value.trim()
      if (chipValue && !chips.includes(chipValue)) {
        setChips([...chips, chipValue])
        event.target.value = ""
      }
    }
  }

  const handleDeleteChip = (chipIndex) => {
    setChips(chips.filter((_, index) => index !== chipIndex))
  }

  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-sm text-white" htmlFor={name}>
        {label} <sup className="text-pink-500">*</sup>
      </label>

      <div className="flex w-full flex-wrap gap-2">
        {chips?.map((chip, index) => (
          <div
            key={index}
            className="flex items-center rounded-full bg-yellow-400 px-3 py-1 text-sm text-white"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none hover:text-gray-800 transition"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="w-full rounded-md border border-gray-600 bg-gray-700 py-2 px-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition"
        />
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs text-pink-500">
          {label} is required
        </span>
      )}
    </div>
  )
}
