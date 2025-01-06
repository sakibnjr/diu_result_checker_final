import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { TbSum } from "react-icons/tb";
import { BsJournalCode } from "react-icons/bs";

const CourseList = ({ data }) => {
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile view breakpoint
    };

    handleResize(); // Check initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to map grade letters to emojis
  const getEmojiForGrade = (grade) => {
    switch (grade) {
      case "A+":
        return "🔥";
      case "A":
        return "😍";
      case "A-":
        return "😊";
      case "B+":
        return "🥲";
      case "B":
        return "😒";
      case "B-":
        return "🥴";
      case "C+":
        return "😓";
      case "C":
        return "🙁";
      case "D":
        return "😢";
      case "F":
        return "🐸";
      default:
        return "🧐";
    }
  };

  const toggleCourseDetails = (courseId) => {
    setExpandedCourseId((prev) => (prev === courseId ? null : courseId));
  };

  if (!data || data.length === 0) {
    return <p>No courses available.</p>;
  }

  return (
    <>
      {/* Desktop View - Table */}
      {!isMobile && (
        <motion.table
          className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="bg-blue-50 text-blue-900">
              <th className="p-3 text-left font-bold">Course Code</th>
              <th className="p-3 text-left font-bold">Course Title</th>
              <th className="p-3 text-left font-bold">Credits</th>
              <th className="p-3 text-left font-bold">Grade</th>
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
                <td className="p-3">
                  <BsJournalCode className="inline-block text-blue-500 mr-2" />
                  {course.customCourseId}
                </td>
                <td className="p-3">{course.courseTitle}</td>
                <td className="p-3">{course.totalCredit}</td>
                <td className="p-3 flex items-center gap-1">
                  {course.gradeLetter} {getEmojiForGrade(course.gradeLetter)}
                </td>
                <td className="p-3">{course.pointEquivalent}</td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}

      {/* Mobile View - Card Layout */}
      {isMobile && (
        <div className="space-y-4">
          {data.map((course, index) => {
            const isExpanded = expandedCourseId === course.customCourseId;

            return (
              <motion.div
                key={index}
                className={`bg-white bg-opacity-30 backdrop-blur-md p-5 rounded-xl shadow-lg border-l-4 mt-6 ${
                  isExpanded ? "border-blue-500" : "border-gray-300"
                } relative`}
                onClick={() => toggleCourseDetails(course.customCourseId)}
              >
                {/* Default View: Title and Point */}
                <div className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      {course.courseTitle}
                    </h3>
                    <p className="text-rose-500 text-md font-bold flex items-center gap-1">
                      Point: {course.pointEquivalent}
                    </p>
                  </div>
                  <FaChevronDown
                    className={`text-xl transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Expanded View: Additional Details */}
                {isExpanded && (
                  <motion.div
                    className="mt-4 space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Course Code:</span>{" "}
                      <span className="text-gray-900">
                        {course.customCourseId}
                      </span>
                    </p>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Credit:</span>{" "}
                      <span className="text-gray-900">
                        {course.totalCredit}
                      </span>
                    </p>
                    <p className="text-gray-700 text-sm flex items-center gap-1">
                      <span className="font-semibold">Grade:</span>
                      <span className="text-xl">{course.gradeLetter}</span>
                      <span className="text-xl">
                        {getEmojiForGrade(course.gradeLetter)}
                      </span>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CourseList;
