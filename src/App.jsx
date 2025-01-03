// App.jsx
import React, { useState } from "react";
import InputSection from "./components/InputSection";
import Marksheet from "./components/Marksheet";
import { fetchStudentData } from "./utils/api";

const App = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (studentId, semesterId) => {
    setLoading(true);
    try {
      const data = await fetchStudentData(studentId, semesterId);
      setStudentData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-md mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Academic Transcript
      </h1>
      {!studentData ? (
        <InputSection onGenerate={handleGenerate} loading={loading} />
      ) : (
        <Marksheet data={studentData} onBack={() => setStudentData(null)} />
      )}
    </div>
  );
};

export default App;
