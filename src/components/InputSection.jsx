import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import SearchHistory from "./SearchHistory";
import WelcomeText from "./InputFields/WelcomeText";
import StudentId from "./InputFields/StudentId";
import Semester from "./InputFields/Semester";
import GenerateButton from "./InputFields/GenerateButtonArea";

const InputSection = ({ onGenerate, loading }) => {
  const [studentId, setStudentId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState("");

  const messages = [
    "Find your academic records! 📜",
    "Make sure to complete teaching evaluation ⚠️",
  ];

  const semesters = [
    { id: "213", name: "Fall 2021" },
    { id: "221", name: "Spring 2022" },
    { id: "222", name: "Summer 2022" },
    { id: "223", name: "Fall 2022" },
    { id: "231", name: "Spring 2023" },
    { id: "232", name: "Summer 2023" },
    { id: "233", name: "Fall 2023" },
    { id: "241", name: "Spring 2024" },
    { id: "242", name: "Summer 2024" },
    { id: "243", name: "Fall 2024" },
    { id: "251", name: "Spring 2025" },
  ];

  const getSemesterName = (id) => {
    const semester = semesters.find((sem) => sem.id === id);
    return semester ? semester.name : id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const controller = new AbortController();

    if (studentId && semesterId) {
      setError("");

      const newEntry = {
        studentId: studentId.trim(),
        semesterId: semesterId.trim(),
      };
      const isDuplicate = history.some(
        (entry) =>
          entry.studentId === newEntry.studentId &&
          entry.semesterId === newEntry.semesterId
      );

      if (!isDuplicate) {
        const updatedHistory = [...history, newEntry];
        setHistory(updatedHistory);
        localStorage.setItem(
          "transcriptHistory",
          JSON.stringify(updatedHistory)
        );
      }

      // Normal submission (without Auto Retry)
      onGenerate(newEntry.studentId, newEntry.semesterId);
      toast.success("Generating transcript 👀✨", { position: "top-center" });
    } else {
      // Set error messages based on which input is empty
      if (!studentId && !semesterId) {
        setError("Student ID and Semester cannot be empty");
      } else if (!studentId) {
        setError("Student ID cannot be empty");
      } else if (!semesterId) {
        setError("Also select a semester");
      }

      toast.error("Fill out both fields 😡", { position: "top-center" });
    }

    return () => controller.abort();
  };

  useEffect(() => {
    if (messageIndex < messages.length - 1) {
      const timeout = setTimeout(() => setMessageIndex(messageIndex + 1), 2500);
      return () => clearTimeout(timeout);
    }
  }, [messageIndex]);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("transcriptHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("transcriptHistory");
    toast.success("Search history cleared!", { position: "top-center" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white drop-shadow-lg rounded-lg p-6 border border-gray-200"
    >
      <WelcomeText messages={messages} messageIndex={messageIndex} />

      <StudentId
        studentId={studentId}
        setStudentId={setStudentId}
        error={error}
      />

      <Semester
        semesterId={semesterId}
        setSemesterId={setSemesterId}
        semesters={semesters}
        error={error}
      />

      <GenerateButton
        loading={loading}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        history={history}
        clearHistory={clearHistory}
      />

      {showHistory && (
        <SearchHistory
          history={history}
          setStudentId={setStudentId}
          setSemesterId={setSemesterId}
          setShowHistory={setShowHistory}
          getSemesterName={getSemesterName}
        />
      )}
    </form>
  );
};

export default InputSection;
