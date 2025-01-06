import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Semester = ({ semesterId, setSemesterId, semesters, error }) => {
  return (
    <motion.div className="relative">
      <label className="block text-gray-700 font-medium mb-1">Semester</label>
      <div className="relative flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
        <FaCalendarAlt className="text-teal-500 mr-2" />
        <select
          value={semesterId}
          onChange={(e) => setSemesterId(e.target.value)}
          className="w-full bg-transparent focus:outline-none"
        >
          <option value="" disabled>
            Select Semester
          </option>
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.name}
            </option>
          ))}
        </select>
        {/* Display the "Popular" label if semesterId is 243 */}
        {semesterId === "243" && (
          <span className="absolute -top-2 -right-2 transform translate-x-1 -translate-y-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
            Popular
          </span>
        )}
      </div>
      {error && !semesterId && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}
    </motion.div>
  );
};

export default Semester;
