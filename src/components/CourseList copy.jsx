import React from "react";
import { FaBook, FaStar, FaGraduationCap } from "react-icons/fa";

const CourseList = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No courses available.</p>;
  }

  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-blue-50 text-blue-900">
            <th className="p-3 text-left font-bold hidden md:table-cell">
              Course Code
            </th>
            <th className="p-3 text-left font-bold">Course Title</th>
            <th className="p-3 text-left font-bold hidden md:table-cell">
              Credits
            </th>
            <th className="p-3 text-left font-bold hidden md:table-cell">
              Grade
            </th>
            <th className="p-3 text-left font-bold">Point</th>
          </tr>
        </thead>
        <tbody>
          {data.map((course, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition`}
            >
              <td className="p-3 hidden md:table-cell">
                <FaGraduationCap className="inline-block text-blue-500 mr-2" />
                {course.customCourseId}
              </td>
              <td className="p-3">
                <FaBook className="inline-block text-green-500 mr-2" />
                {course.courseTitle}
              </td>
              <td className="p-3 hidden md:table-cell">{course.totalCredit}</td>
              <td className="p-3 hidden md:table-cell">
                <FaStar className="inline-block text-yellow-500 mr-1" />
                {course.gradeLetter}
              </td>
              <td className="p-3">{course.pointEquivalent}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View - Card Layout */}
      <div className="md:hidden">
        {data.map((course, index) => (
          <div
            key={index}
            className="bg-white p-4 mb-4 rounded-lg shadow-md border-l-4 border-blue-500"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {course.courseTitle}
            </h3>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Code:</span> {course.customCourseId}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Credits:</span> {course.totalCredit}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Grade:</span> {course.gradeLetter}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Point:</span>{" "}
              {course.pointEquivalent}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
