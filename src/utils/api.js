import axios from "axios";

export const fetchStudentData = async (studentId, semesterId, signal) => {
  try {
    const apiUrl = `https://diurc.onrender.com/api/result?grecaptcha=&semesterId=${semesterId}&studentId=${studentId}`;
    const studentInfoUrl = `https://diurc.onrender.com/api/result/studentInfo?studentId=${studentId}`;

    // Attach signal to the Axios configuration
    const axiosConfig = {
      timeout: 600000, // Set timeout to 10 minutes
      signal, // Attach AbortController signal for cancellation
    };

    // Fetch both APIs concurrently with Promise.all
    const [resultResponse, infoResponse] = await Promise.all([
      axios.get(apiUrl, axiosConfig),
      axios.get(studentInfoUrl, axiosConfig),
    ]);

    if (resultResponse.status !== 200 || infoResponse.status !== 200) {
      throw new Error("Failed to fetch data. Please check the entered IDs.");
    }

    return {
      result: resultResponse.data,
      basicInfo: infoResponse.data,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled:", error.message);
      throw new Error("Request was canceled.");
    } else {
      console.error("Error fetching student data:", error.message);
      throw error; // Re-throw the error to handle it in the calling function
    }
  }
};
