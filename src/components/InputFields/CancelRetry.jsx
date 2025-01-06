import React from "react";

const CancelRetry = ({ cancelRetry }) => {
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={cancelRetry}
        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Cancel Retry
      </button>
    </div>
  );
};

export default CancelRetry;
