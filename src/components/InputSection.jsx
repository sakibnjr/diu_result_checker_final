import React, { useState, useEffect } from "react";
import {
  FaSpinner,
  FaUser,
  FaCalendarAlt,
  FaPaperPlane,
  FaHistory,
} from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";

import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const InputSection = ({ onGenerate, loading }) => {
  const [studentId, setStudentId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const messages = [
    "Are you ready?👀",
    "Let's see what you have done🐸",
    "Brace yourself! 🏆",
    "Your success is just a click away 🚀",
    "Here comes the magic! 🎩✨",
    "Time to shine! 🌟",
    "The wait is almost over ⏳",
    "Let's get this party started 🎉",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentId && semesterId) {
      // Save to local storage
      const newEntry = {
        studentId: studentId.trim(),
        semesterId: semesterId.trim(),
      };
      const updatedHistory = [...history, newEntry];
      setHistory(updatedHistory);
      localStorage.setItem("transcriptHistory", JSON.stringify(updatedHistory));

      onGenerate(studentId.trim(), semesterId.trim());
      toast.success("Generating transcript 👀✨", {
        position: "top-center",
      });
    } else {
      toast.error("Please fill out both fields 😡", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (messageIndex < messages.length - 1) {
      const timeout = setTimeout(() => setMessageIndex(messageIndex + 1), 1500);
      return () => clearTimeout(timeout);
    }
  }, [messageIndex]);

  // Load history from local storage on component mount
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("transcriptHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("transcriptHistory");
    toast.success("Search history cleared!", { position: "top-center" });
  };

  const semesters = [
    { id: "213", name: "Fall 2021" },
    { id: "221", name: "Spring 2022" },
    { id: "222", name: "Summer 2022" },
    { id: "223", name: "Fall 2022" },
    { id: "231", name: "Spring 2023" },
    { id: "232", name: "Summer 2023" },
    { id: "233", name: "Fall 2023" },
    { id: "241", name: "Spring 2024" },
    { id: "242", name: "Summer 2024" },
    { id: "243", name: "Fall 2024", popularChoice: false }, // Mark Fall 2024 as popular choice
    { id: "251", name: "Spring 2025" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
    >
      <motion.div
        className="text-center text-gray-700 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          key={messageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            delay: 0,
          }}
          className="block text-sm font-semibold"
        >
          {messages[messageIndex]}
        </motion.span>
      </motion.div>

      <motion.div className="relative">
        <label className="block text-gray-700 font-medium mb-1">
          Student ID:
        </label>
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
      </motion.div>

      <motion.div className="relative">
        <label className="block text-gray-700 font-medium mb-1">
          Semester:
        </label>
        <div
          className={`flex items-center border rounded-lg px-3 py-2 bg-gray-50 ${
            semesterId === "243" ? "border-red-500" : "border-gray-300"
          } focus-within:ring-2 focus-within:ring-blue-500 relative`}
        >
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
                {semester.popularChoice && (
                  <span className="text-green-500 text-xs">
                    (Popular Choice)
                  </span>
                )}
              </option>
            ))}
          </select>
          {/* Hot indicator */}
          {semesterId === "243" && (
            <span className="absolute -top-1 -right-4 transform translate-x-1 -translate-y-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
              Popular
            </span>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-2">
        {/* Generate Button */}
        <motion.button
          type="submit"
          className={`col-span-2 w-full px-4 py-2 text-white rounded-lg flex items-center justify-center ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          }`}
          disabled={loading}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            <FaPaperPlane className="mr-2" />
          )}
          {loading ? "Generating..." : "Generate Transcript"}
        </motion.button>

        {/* History Button */}
        <button
          type="button"
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center text-blue-600 text-center justify-center border-2 p-1 rounded-lg"
        >
          <FaHistory className="mr-2" />
          History
        </button>

        {/* Clear History Button */}
        <button
          type="button"
          onClick={clearHistory}
          className="flex items-center text-rose-500 text-center justify-center border-2 p-1 rounded-lg"
        >
          <IoTrashBinSharp className="mr-2" />
          Clear
        </button>
      </div>

      {/* Show History if toggled */}
      {showHistory && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-md">
          <h3 className="font-semibold mb-2 text-lg">Search History</h3>
          {history.length > 0 ? (
            history.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => {
                  setStudentId(entry.studentId);
                  setSemesterId(entry.semesterId);
                }}
              >
                <div className="text-gray-800">
                  <div className="font-medium">
                    Student ID: {entry.studentId}
                  </div>
                  <div className="text-sm text-gray-600">
                    Semester ID: {entry.semesterId}
                  </div>
                </div>
                <FaHistory className="text-blue-500" />
              </div>
            ))
          ) : (
            <div className="text-gray-600">No search history available.</div>
          )}
        </div>
      )}
    </form>
  );
};

export default InputSection;
