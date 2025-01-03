// App.jsx
import React, { useState } from "react";
import InputSection from "./components/InputSection";
import Marksheet from "./components/Marksheet";
import { fetchStudentData } from "./utils/api";
import { FaArrowLeft, FaFileAlt, FaSpinner } from "react-icons/fa"; // Import icons
import { Toaster, toast } from "react-hot-toast"; //
import Header from "./components/Header";

const App = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (studentId, semesterId) => {
    setLoading(true);
    try {
      const data = await fetchStudentData(studentId, semesterId);
      setStudentData(data);

      // Check if result data exists and has content
      if (data.result && Object.keys(data.result).length > 0) {
        toast.success("Process Completed!", {
          position: "top-center",
        });
      } else {
        toast.error("No results found. Try again later!", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.message); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <Toaster position="top-right" /> {/* Add Toaster component */}
      <div className="md:w-4/5 p-8 rounded-2xl backdrop-blur-lg bg-white/30 shadow-lg relative overflow-hidden">
        {/* Glasmorphism effect with inner shadow */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl pointer-events-none"></div>
        <div className="absolute inset-0 -m-1 blur-lg bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-2xl pointer-events-none"></div>

        <Header />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
            <FaSpinner className="animate-spin text-4xl text-white" />
          </div>
        )}

        {!studentData ? (
          <div className="relative z-10">
            <InputSection onGenerate={handleGenerate} loading={loading} />
          </div>
        ) : (
          <div className="relative z-10">
            <button
              onClick={() => setStudentData(null)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md mb-4 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <Marksheet
              data={studentData.result}
              basicInfo={studentData.basicInfo}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
