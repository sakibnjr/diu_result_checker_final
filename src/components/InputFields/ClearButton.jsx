import React from "react";
import { IoTrashBinSharp } from "react-icons/io5";

const ClearButton = ({ history, clearHistory }) => {
  return (
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
  );
};

export default ClearButton;
