import { useState } from "react";
import { Chart, registerables } from "chart.js";
import  {Pie}  from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students");

  // Fixed colors array for consistent chart colors
  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#C9CBCF",
    "#FF5A5F",
    "#008080",
    "#800000",
  ];

  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(COLORS[i % COLORS.length]);
    }
    return colors;
  };

  // Chart data for students
  const chartDataStudents = {
    labels:
      courses.length > 0
        ? courses.map((course) => course.courseName)
        : ["No Courses"],
    datasets: [
      {
        label: "Students Enrolled",
        data:
          courses.length > 0
            ? courses.map((course) => course.totalStudentsEnrolled)
            : [1],
        backgroundColor: generateColors(courses.length || 1),
        borderWidth: 1,
      },
    ],
  };

  // Chart data for income
  const chartIncomeData = {
    labels:
      courses.length > 0
        ? courses.map((course) => course.courseName)
        : ["No Courses"],
    datasets: [
      {
        label: "Income Generated",
        data:
          courses.length > 0
            ? courses.map((course) => course.totalAmountGenerated)
            : [1],
        backgroundColor: generateColors(courses.length || 1),
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            if (currChart === "students") {
              return `Students: ${value}`;
            } else {
              return `₹ ${value}`;
            }
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-gray-800 p-6">
      <p className="text-lg font-bold text-gray-100">Visualize</p>

      {/* Chart type buttons */}
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-gray-700 text-yellow-100"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-gray-700 text-yellow-100"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>

      {/* Pie Chart */}
      <div className="relative mx-auto min-h-[300px] w-full">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
