import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function RequirementsField({ name, label, register, setValue, errors }) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions || []);
    }
    register(name, { required: true, validate: (value) => value.length > 0 }, requirementsList);
  }, []);

  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList]);

  const handleAddRequirement = () => {
    if (requirement && !requirementsList.includes(requirement)) {
      setRequirementsList([...requirementsList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList];
    updatedRequirements.splice(index, 1);
    setRequirementsList(updatedRequirements);
  };

  return (
    <div className="flex flex-col space-y-3 w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Label */}
      <label className="text-gray-800 font-medium text-sm" htmlFor={name}>
        {label} <sup className="text-red-500">*</sup>
      </label>

      {/* Input + Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="Enter a requirement..."
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      {/* Requirement List */}
      {requirementsList.length > 0 && (
        <ul className="mt-3 list-disc list-inside space-y-2 text-gray-700">
          {requirementsList.map((req, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <span className="break-words">{req}</span>
              <button
                type="button"
                className="text-red-500 hover:text-red-700 transition"
                onClick={() => handleRemoveRequirement(index)}
              >
                <RiDeleteBin6Line className="text-lg" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Error Message */}
      {errors[name] && (
        <span className="text-xs text-red-500 mt-1">{label} is required</span>
      )}
    </div>
  );
}
