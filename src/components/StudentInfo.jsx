import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaIdBadge, FaCalendarAlt } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";

const StudentInfo = ({ data, basicInfo }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No student information available.</p>;
  }

  const student = data[1]; // Accessing index 1 for student info

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
    <motion.div
      className="mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-lg p-6"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="flex items-center gap-4"
            variants={itemVariants}
          >
            <FaUser className="text-blue-500 text-xl" />
            <div>
              <span className="block text-sm font-medium text-gray-500">
                Student Name
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {basicInfo.studentName || <TbError404 />}
              </span>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            variants={itemVariants}
          >
            <FaIdBadge className="text-green-500 text-xl" />
            <div>
              <span className="block text-sm font-medium text-gray-500">
                Student ID
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {student.studentId}
              </span>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            variants={itemVariants}
          >
            <FaCalendarAlt className="text-purple-500 text-xl" />
            <div>
              <span className="block text-sm font-medium text-gray-500">
                Semester
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {student.semesterName} {student.semesterYear}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StudentInfo;
