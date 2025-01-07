import axios from "axios";

export const fetchStudentData = async (studentId, semesterId) => {
  try {
    const apiUrl = `/api/result?grecaptcha=&semesterId=${semesterId}&studentId=${studentId}`;
    const studentInfoUrl = `/api/result/studentInfo?studentId=${studentId}`;

    const axiosConfig = {
      timeout: 600000, // Set timeout to 10 minutes (600,000 ms)
    };

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
    console.error("Error fetching student data:", error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
