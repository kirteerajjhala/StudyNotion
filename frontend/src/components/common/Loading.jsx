import React from "react";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-[60vh]">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>

      {/* Text */}
      <p className="text-richblack-100 text-lg font-medium animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loading;
