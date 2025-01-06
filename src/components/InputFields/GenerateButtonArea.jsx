import React from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import HistoryButton from "./HistoryButton";
import ClearButton from "./ClearButton";

const GenerateButton = ({
  loading,
  showHistory,
  setShowHistory,
  history,
  clearHistory,
  isRetrying,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
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
        {loading || isRetrying ? (
          <FaSpinner className="animate-spin mr-2" />
        ) : (
          <FaSearch className="mr-2 text-white font-bold" />
        )}
        {loading || isRetrying ? "Searching . . ." : "Search"}
      </motion.button>

      {/* History Button */}
      <HistoryButton
        history={history}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
      />

      {/* Clear History Button */}
      <ClearButton history={history} clearHistory={clearHistory} />
    </div>
  );
};

export default GenerateButton;
