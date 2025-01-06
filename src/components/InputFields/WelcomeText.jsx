import React from "react";
import { motion } from "framer-motion";

const WelcomeText = ({ messages, messageIndex }) => {
  return (
    <motion.div
      className="text-center text-gray-700 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.span
        key={messageIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: 0,
        }}
        className="block text-sm"
      >
        {messages[messageIndex]}
      </motion.span>
    </motion.div>
  );
};

export default WelcomeText;
