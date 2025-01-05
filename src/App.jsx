import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import InputSection from "./components/InputSection";
import Marksheet from "./components/Marksheet";
import NotFoundPage from "./pages/NotFoundPage";
import { fetchStudentData } from "./utils/api";
import { FaSpinner } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import Header from "./components/Header";

const App = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async (studentId, semesterId) => {
    setLoading(true);
    try {
      const data = await fetchStudentData(studentId, semesterId);
      setStudentData(data);

      if (data.result && Object.keys(data.result).length > 0) {
        toast.success("Process Completed! 🥂", {
          position: "top-center",
        });
        navigate("/marksheet");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-100 flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="p-2 rounded-2xl relative overflow-hidden">
        <Header />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
            <FaSpinner className="animate-spin text-4xl text-white" />
          </div>
        )}

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
              studentData ? (
                <Marksheet
                  data={studentData?.result}
                  basicInfo={studentData?.basicInfo}
                />
              ) : (
                <Navigate to="/404" replace />
              )
            }
          />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
