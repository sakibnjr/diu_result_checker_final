import React from "react";
import { FaHistory } from "react-icons/fa";

const SearchHistory = ({
  history,
  setStudentId,
  setSemesterId,
  setShowHistory,
  getSemesterName,
}) => {
  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-md">
      <h3 className="font-semibold mb-2 text-lg">Search History</h3>
      {history.length > 0 ? (
        <div className="overflow-y-auto max-h-48">
          {" "}
          {/* Added scrollable container */}
          {history
            .slice()
            .reverse() // Reverse the history array to show the latest first
            .map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => {
                  setStudentId(entry.studentId);
                  setSemesterId(entry.semesterId);
                  setShowHistory(false); // Automatically hide history
                }}
              >
                <div className="text-gray-800">
                  <div className="font-medium">
                    Student ID: {entry.studentId}
                  </div>
                  <div className="text-sm text-gray-600">
                    Semester: {getSemesterName(entry.semesterId)}
                  </div>
                </div>
                <FaHistory className="text-blue-500" />
              </div>
            ))}
        </div>
      ) : (
        <div className="text-gray-600">No search history available.</div>
      )}
    </div>
  );
};

export default SearchHistory;
