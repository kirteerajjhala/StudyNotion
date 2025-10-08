import React from "react";
import CountUp from "react-countup";

const Stats = [
  { count: 5000, label: "Active Students", suffix: "K" },
  { count: 10, label: "Mentors", suffix: "+" },
  { count: 200, label: "Courses", suffix: "+" },
  { count: 50, label: "Awards", suffix: "+" },
];

const StatsComponent = () => {
  return (
    <div className="bg-gray-900 py-16">
      <div className="w-11/12 max-w-7xl mx-auto text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {Stats.map((data, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center py-6 px-4 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
            >
              <h1 className="text-3xl md:text-3xl font-bold text-white">
                <CountUp end={data.count} duration={2} />{data.suffix}
              </h1>
              <h2 className="mt-2 text-lg md:text-xl font-semibold text-gray-400">
                {data.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
