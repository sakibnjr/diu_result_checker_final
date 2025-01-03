import axios from "axios";

export const fetchStudentData = async (studentId, semesterId) => {
  try {
    const apiUrl = `//software.diu.edu.bd:8006/result?grecaptcha=&semesterId=${semesterId}&studentId=${studentId}`;
    const studentInfoUrl = `//software.diu.edu.bd:8006/result/studentInfo?studentId=${studentId}`;

    const [resultResponse, infoResponse] = await Promise.all([
      axios.get(apiUrl),
      axios.get(studentInfoUrl),
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
