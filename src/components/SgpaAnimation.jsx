import React from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import for animation

const SgpaAnimation = ({ showCGPA, cgpa }) => {
  // Function to generate wish messages based on CGPA
  const getWishMessage = (cgpa) => {
    if (cgpa >= 4.0) {
      return "Perfect Score! You're a rockstar! 🌟";
    } else if (cgpa >= 3.75) {
      return "Outstanding performance! Keep it up! 🚀";
    } else if (cgpa >= 3.5) {
      return "Great job! You're doing amazing! 🎯";
    } else if (cgpa >= 3.0) {
      return "Good work! Keep aiming higher! 💪";
    } else if (cgpa >= 2.5) {
      return "Not bad! Keep pushing for greatness! 🌱";
    } else {
      return "Every step counts! You got this! 🌈";
    }
  };

  return (
    <AnimatePresence>
      {showCGPA && (
        <motion.div
          className="absolute md:fixed inset-0 h-screen -top-10 md:h-auto flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-500 bg-opacity-90 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative text-white text-center p-8 rounded-lg shadow-xl bg-white bg-opacity-10 backdrop-blur-md"
            initial={{ scale: 0.5, rotate: 0 }}
            animate={{
              scale: [0.5, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
          >
            {/* Floating Confetti */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{
                    y: "100vh",
                    opacity: 0,
                    scale: [1, 0.5, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                  }}
                ></motion.div>
              ))}
            </motion.div>

            {/* Main Content */}
            <h1 className="text-5xl font-extrabold mb-4">
              SGPA {cgpa.toFixed(2)}🎉
            </h1>
            <p className="text-lg font-medium">{getWishMessage(cgpa)}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SgpaAnimation;
