import React from "react";
import { FaHistory } from "react-icons/fa";

const HistoryButton = ({ history, showHistory, setShowHistory }) => {
  return (
    <button
      type="button"
      onClick={() => setShowHistory(!showHistory)}
      className={`flex items-center text-blue-600 text-center justify-center border-2 p-1 rounded-lg ${
        history.length === 0 ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={history.length === 0}
    >
      <FaHistory className="mr-2" />
      History
    </button>
  );
};

export default HistoryButton;
