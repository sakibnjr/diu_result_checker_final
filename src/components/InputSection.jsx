// components/InputSection.jsx
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast"; // Import toast

const InputSection = ({ onGenerate, loading }) => {
  const [studentId, setStudentId] = useState("");
  const [semesterId, setSemesterId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentId && semesterId) {
      onGenerate(studentId.trim(), semesterId.trim());
      toast.success("Generating marksheet...", {
        position: "top-center",
      }); // Show success toast on submission
    } else {
      toast.error("Please fill out both fields.", {
        position: "top-center",
      }); // Show error toast if fields are empty
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Student ID:
        </label>
        <input
          type="text"
          value={studentId}
          placeholder="XXX-XX-XXXX"
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Semester ID:
        </label>
        <input
          type="text"
          value={semesterId}
          placeholder="242 (for Fall 2024)"
          onChange={(e) => setSemesterId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      >
        {loading ? (
          <FaSpinner className="animate-spin mx-auto" />
        ) : (
          "Generate Marksheet"
        )}
      </button>
    </form>
  );
};

export default InputSection;
