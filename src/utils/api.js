// utils/api.js
import axios from "axios";

export const fetchStudentData = async (studentId, semesterId) => {
  const apiUrl = `http://software.diu.edu.bd:8006/result?grecaptcha=&semesterId=${semesterId}&studentId=${studentId}`;
  const response = await axios.get(apiUrl);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data. Please check the entered IDs.");
  }

  return response.data;
};
