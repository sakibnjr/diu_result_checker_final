import React from "react";

const ResultSummary = ({ totalCredits, totalCourses, cgpa, gradeLetter }) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* CGPA Card */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h3 className="text-base font-medium text-gray-800 mb-2">SGPA</h3>
        <p className="text-2xl font-bold text-indigo-600">
          {cgpa.toFixed(2)} (
          <span className="text-md font-medium text-gray-600">
            {gradeLetter}
          </span>
          )
        </p>
      </div>

      {/* Total Courses Card */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 relative">
        <h3 className="text-base font-medium text-gray-800 mb-2">
          Course Taken
        </h3>
        <p className="text-2xl font-bold text-green-600">{totalCourses}</p>
        <span className="absolute -top-2 -right-3 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-md">
          This Semester
        </span>
      </div>

      {/* Total Credits Card */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h3 className="text-base font-medium text-gray-800 mb-2">
          Total Credits
        </h3>
        <p className="text-2xl font-bold text-blue-600">
          {totalCredits.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ResultSummary;
