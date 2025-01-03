import React from "react";
import { motion } from "framer-motion";
import { FaBook, FaGraduationCap } from "react-icons/fa";

const CourseList = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No courses available.</p>;
  }

  // Function to map grade letters to emojis
  const getEmojiForGrade = (grade) => {
    switch (grade) {
      case "A+":
      case "A":
        return "🔥";
      case "A-":
        return "😊";
      case "B+":
      case "B":
        return "😒";
      case "B-":
        return "😓";
      case "C+":
      case "C":
        return "🙁";
      case "D":
        return "😢";
      case "F":
        return "💔";
      default:
        return "🧐";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="overflow-x-auto my-8">
      <motion.table
        className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden hidden md:table"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <thead className="">
          <tr className="bg-blue-50 text-blue-900">
            <th className="p-3 text-left font-bold ">Course Code</th>
            <th className="p-3 text-left font-bold">Course Title</th>
            <th className="p-3 text-left font-bold ">Credits</th>
            <th className="p-3 text-left font-bold">Grade</th>
            <th className="p-3 text-left font-bold">Point</th>
          </tr>
        </thead>
        <motion.tbody
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data.map((course, index) => (
            <motion.tr
              key={index}
              variants={itemVariants}
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
              <td className="p-3 flex items-center gap-1">
                <span>{course.gradeLetter}</span>
                <span>{getEmojiForGrade(course.gradeLetter)}</span>
              </td>
              <td className="p-3">{course.pointEquivalent}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </motion.table>

      {/* Mobile View - Card Layout */}
      <div className="md:hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data.map((course, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-4 mb-4 rounded-lg shadow-md border-l-4 border-blue-500"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {course.courseTitle}
              </h3>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Code:</span>{" "}
                {course.customCourseId}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Credits:</span>{" "}
                {course.totalCredit}
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <span className="font-medium">Grade:</span> {course.gradeLetter}
                <span>{getEmojiForGrade(course.gradeLetter)}</span>{" "}
              </p>
              <p className="text-rose-500 text-lg font-bold">
                <span>Point:</span> {course.pointEquivalent}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CourseList;
