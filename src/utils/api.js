import axios from "axios";

// Retry logic for handling transient errors
const fetchWithRetry = async (url, config, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios.get(url, config);
    } catch (error) {
      if (i === retries - 1) {
        console.error(
          `Error after ${retries} retries for URL: ${url}`,
          error.message
        );
        throw error; // Throw the error after exhausting retries
      }
      console.warn(
        `Retrying (${i + 1}/${retries}) for URL: ${url} due to error:`,
        error.message
      );
    }
  }
};

export const fetchStudentData = async (studentId, semesterId) => {
  const apiUrl = `/api/result?grecaptcha=&semesterId=${semesterId}&studentId=${studentId}`;
  const studentInfoUrl = `/api/result/studentInfo?studentId=${studentId}`;

  const axiosConfig = {
    timeout: 600000, // Set timeout to 10 minutes (600,000 ms)
  };

  try {
    // Use Promise.all with retry logic
    const [resultResponse, infoResponse] = await Promise.all([
      fetchWithRetry(apiUrl, axiosConfig),
      fetchWithRetry(studentInfoUrl, axiosConfig),
    ]);

    // Validate responses
    if (resultResponse.status !== 200 || infoResponse.status !== 200) {
      throw new Error("Failed to fetch data. Please check the entered IDs.");
    }

    return {
      result: resultResponse.data,
      basicInfo: infoResponse.data,
    };
  } catch (error) {
    // Handle 502 or other network/server errors
    if (error.response) {
      console.error(
        `API error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out:", error.message);
    } else {
      console.error("Network error or unexpected issue:", error.message);
    }
    throw new Error(
      "An error occurred while fetching student data. Please try again later."
    );
  }
};
