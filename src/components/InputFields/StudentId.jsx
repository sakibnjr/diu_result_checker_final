import React from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const StudentId = ({ studentId, error, setStudentId }) => {
  return (
    <motion.div className="relative">
      <label className="block text-gray-700 font-medium mb-1">Student ID</label>
      <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
        <FaUser className="text-blue-500 mr-2" />
        <input
          type="text"
          value={studentId}
          placeholder="XXX-XX-XXXX"
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full bg-transparent focus:outline-none"
        />
      </div>
      {error && !studentId && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}
    </motion.div>
  );
};

export default StudentId;
