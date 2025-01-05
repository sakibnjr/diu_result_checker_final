import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"; // Import Router components
import InputSection from "./components/InputSection";
import Marksheet from "./components/Marksheet";
import { fetchStudentData } from "./utils/api";
import { FaSpinner } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import Header from "./components/Header";

const App = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGenerate = async (studentId, semesterId) => {
    setLoading(true);
    try {
      const data = await fetchStudentData(studentId, semesterId);
      setStudentData(data);

      if (data.result && Object.keys(data.result).length > 0) {
        toast.success("Process Completed! 🥂", {
          position: "top-center",
        });
        navigate("/marksheet"); // Navigate to Marksheet route
      } else {
        toast.error("No results found. Try again later! 😴", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="md:w-4/5 p-8 rounded-2xl  bg-white/30 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10  rounded-2xl pointer-events-none"></div>
        <div className="absolute inset-0 -m-1 blur-lg bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-2xl pointer-events-none"></div>

        <Header />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
            <FaSpinner className="animate-spin text-4xl text-white" />
          </div>
        )}

        {/* Use Routes to define paths */}
        <Routes>
          <Route
            path="/"
            element={
              <InputSection onGenerate={handleGenerate} loading={loading} />
            }
          />
          <Route
            path="/marksheet"
            element={
              <Marksheet
                data={studentData?.result}
                basicInfo={studentData?.basicInfo}
              />
            }
          />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
