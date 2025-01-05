import React, { useState, useEffect } from "react";
import { FaSpinner, FaUser, FaCalendarAlt, FaHistory } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { ImPower } from "react-icons/im";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import SearchHistory from "./SearchHistory";

const InputSection = ({ onGenerate, loading, fetchStudentData }) => {
  const [studentId, setStudentId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState("");
  const [autoRetry, setAutoRetry] = useState(false); // Add state for Auto Retry
  const [autoRetryIndicator, setAutoRetryIndicator] = useState(false); // Indicator state

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
    { id: "243", name: "Fall 2024" },
    { id: "251", name: "Spring 2025" },
  ];

  const getSemesterName = (id) => {
    const semester = semesters.find((sem) => sem.id === id);
    return semester ? semester.name : id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (studentId && semesterId) {
      // Clear any previous errors
      setError("");

      // Create a new entry
      const newEntry = {
        studentId: studentId.trim(),
        semesterId: semesterId.trim(),
      };
      const isDuplicate = history.some(
        (entry) =>
          entry.studentId === newEntry.studentId &&
          entry.semesterId === newEntry.semesterId
      );

      if (!isDuplicate) {
        const updatedHistory = [...history, newEntry];
        setHistory(updatedHistory);
        localStorage.setItem(
          "transcriptHistory",
          JSON.stringify(updatedHistory)
        );
      }

      // Handle auto retry feature
      if (autoRetry) {
        setAutoRetryIndicator(true); // Show the indicator when auto-retry is active
        const retryInterval = setInterval(async () => {
          try {
            const data = await fetchStudentData(
              newEntry.studentId,
              newEntry.semesterId
            );
            if (data.result && Object.keys(data.result).length > 0) {
              clearInterval(retryInterval);
              setAutoRetryIndicator(false); // Hide the indicator when the retry succeeds
              onGenerate(newEntry.studentId, newEntry.semesterId);
              toast.success("Generating transcript 👀✨", {
                position: "top-center",
              });
            }
          } catch (error) {
            toast.error("Retry failed", error);
          }
        }, 2000); // Retry every 2 seconds
      } else {
        // Normal submission if auto retry is disabled
        onGenerate(newEntry.studentId, newEntry.semesterId);
        toast.success("Generating transcript 👀✨", { position: "top-center" });
      }
    } else {
      // Set error messages based on which input is empty
      if (!studentId && !semesterId) {
        setError("Student ID and Semester cannot be empty");
      } else if (!studentId) {
        setError("Student ID cannot be empty");
      } else if (!semesterId) {
        setError("Also select a semester");
      }

      toast.error("Please fill out both fields 😡", { position: "top-center" });
    }
  };

  useEffect(() => {
    if (messageIndex < messages.length - 1) {
      const timeout = setTimeout(() => setMessageIndex(messageIndex + 1), 1500);
      return () => clearTimeout(timeout);
    }
  }, [messageIndex]);

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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white drop-shadow-lg rounded-lg p-6 border border-gray-200"
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
          Student ID
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
        {error && !studentId && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
      </motion.div>

      <motion.div className="relative">
        <label className="block text-gray-700 font-medium mb-1">Semester</label>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
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
        </div>
        {error && !semesterId && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
      </motion.div>

      {/* Auto Retry Toggle */}
      <motion.div className="relative">
        <label className="block text-gray-700 font-medium mb-1">
          Auto Retry
        </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={autoRetry}
            onChange={() => setAutoRetry((prev) => !prev)}
            className="mr-2"
          />
          <span className="text-sm text-gray-600">
            Enable auto-retry to keep trying until data is received.
          </span>
        </div>
      </motion.div>

      {/* Auto Retry Indicator */}
      {autoRetryIndicator && (
        <div className="text-green-600 text-sm mt-2">
          Auto Retry is Enabled. We are trying to fetch data...
        </div>
      )}

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
            <ImPower className="mr-2 text-yellow-300" />
          )}
          {loading ? "Generating..." : "Generate Transcript"}
        </motion.button>

        {/* History Button */}
        <button
          type="button"
          onClick={() => setShowHistory(!showHistory)}
          className={`flex items-center text-blue-600 text-center justify-center border-2 p-1 rounded-lg ${
            history.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={history.length === 0} // Disable the history button if no history
        >
          <FaHistory className="mr-2" />
          History
        </button>

        {/* Clear History Button */}
        <button
          type="button"
          onClick={clearHistory}
          className={`flex items-center text-rose-600 text-center justify-center border-2 p-1 rounded-lg ${
            history.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={history.length === 0}
        >
          <IoTrashBinSharp className="mr-2" />
          Clear
        </button>
      </div>

      {/* Show History if toggled */}
      {showHistory && (
        <SearchHistory
          history={history}
          setStudentId={setStudentId}
          setSemesterId={setSemesterId}
          setShowHistory={setShowHistory}
          getSemesterName={getSemesterName}
        />
      )}
    </form>
  );
};

export default InputSection;
