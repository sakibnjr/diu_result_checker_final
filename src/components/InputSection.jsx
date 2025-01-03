// components/InputSection.jsx
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const InputSection = ({ onGenerate, loading }) => {
  const [studentId, setStudentId] = useState("");
  const [semesterId, setSemesterId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentId && semesterId) {
      onGenerate(studentId.trim(), semesterId.trim());
    } else {
      alert("Please fill out both fields.");
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
