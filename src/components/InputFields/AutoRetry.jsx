import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const AutoRetry = ({ autoRetry, setAutoRetry }) => {
  return (
    <motion.div className="relative">
      {/* <div className="flex items-center gap-2">
        <label className="block text-gray-700 font-medium mb-1">
          Auto Retry
        </label>
        <motion.input
          type="checkbox"
          checked={autoRetry}
          onChange={() => setAutoRetry((prev) => !prev)}
          className="size-4"
          whileTap={{ scale: 1.1 }}
        />
      </div> */}

      {/* <span className="text-xs text-gray-600 flex items-center gap-1">
        {autoRetry ? (
          <>
            <FaCheckCircle className="text-green-500 size-3" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: autoRetry ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className={`${autoRetry ? "animate-pulse" : ""}`}
            >
              {autoRetry && (
                <span className="text-xs text-green-600">
                  Auto Retry is active | Don't close the browser.
                </span>
              )}
            </motion.div>
          </>
        ) : (
          <>
            <FaRegCircle className="text-red-500" />
            Enable to keep trying until result is received.
          </>
        )}
      </span> */}
    </motion.div>
  );
};

export default AutoRetry;
