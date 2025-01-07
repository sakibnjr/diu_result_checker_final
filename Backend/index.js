const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS to allow requests from your frontend
app.use(cors());

// Proxy for result API
app.get("/api/result", async (req, res) => {
  const { grecaptcha, semesterId, studentId } = req.query;

  if (!semesterId || !studentId) {
    return res
      .status(400)
      .json({ error: "Semester ID and Student ID are required." });
  }

  try {
    const response = await axios.get(
      `http://software.diu.edu.bd:8006/result?grecaptcha=${grecaptcha}&semesterId=${semesterId}&studentId=${studentId}`,
      { timeout: 600000 } // Timeout set to 10 minutes
    );
    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      res
        .status(500)
        .json({ error: "Failed to fetch result from the university server." });
    } else {
      console.error("Unknown error:", error.message);
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
});

// Proxy for student info API
app.get("/api/result/studentInfo", async (req, res) => {
  const { studentId } = req.query;

  if (!studentId) {
    return res.status(400).json({ error: "Student ID is required." });
  }

  try {
    const response = await axios.get(
      `http://software.diu.edu.bd:8006/result/studentInfo?studentId=${studentId}`,
      { timeout: 600000 } // Timeout set to 10 minutes
    );
    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      res.status(500).json({
        error: "Failed to fetch student info from the university server.",
      });
    } else {
      console.error("Unknown error:", error.message);
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
