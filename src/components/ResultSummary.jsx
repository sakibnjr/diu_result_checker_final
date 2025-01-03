import React from "react";

const ResultSummary = ({ totalCredits, totalCourses, cgpa, gradeLetter }) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Credits Card */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h3 className="text-base font-medium text-gray-800 mb-2">
          Total Credits
        </h3>
        <p className="text-2xl font-bold text-blue-600">
          {totalCredits.toFixed(2)}
        </p>
      </div>

      {/* Total Courses Card */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h3 className="text-base font-medium text-gray-800 mb-2">
          Total Courses
        </h3>
        <p className="text-2xl font-bold text-green-600">{totalCourses}</p>
      </div>

      {/* CGPA Card */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h3 className="text-base font-medium text-gray-800 mb-2">CGPA</h3>
        <p className="text-2xl font-bold text-indigo-600">
          {cgpa.toFixed(2)} (
          <span className="text-md font-medium text-gray-600">
            {gradeLetter}
          </span>
          )
        </p>
      </div>
    </div>
  );
};

export default ResultSummary;
