import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import SearchHistory from "./SearchHistory";
import WelcomeText from "./InputFields/WelcomeText";
import StudentId from "./InputFields/StudentId";
import Semester from "./InputFields/Semester";
import AutoRetry from "./InputFields/AutoRetry";
import GenerateButton from "./InputFields/GenerateButtonArea";
import CancelRetry from "./InputFields/CancelRetry";

const InputSection = ({ onGenerate, fetchStudentData }) => {
  const [studentId, setStudentId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState("");
  const [autoRetry, setAutoRetry] = useState(false); // Add state for Auto Retry
  const [retryInterval, setRetryInterval] = useState(null); // Store the retry interval to clear it later
  const [isRetrying, setIsRetrying] = useState(false); // Track if retrying is in progress

  const messages = ["Find your academic records! 📜"];

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

      if (autoRetry) {
        setIsRetrying(true);
        const interval = setInterval(async () => {
          try {
            const data = await fetchStudentData(
              newEntry.studentId,
              newEntry.semesterId
            );
            if (data.result && Object.keys(data.result).length > 0) {
              clearInterval(interval);
              setIsRetrying(false);
              onGenerate(newEntry.studentId, newEntry.semesterId);
              toast.success("Generating transcript 👀✨", {
                position: "top-center",
              });
            }
          } catch (error) {
            toast.error("Retry failed", error);
          }
        }, 2000); // Retry every 2 seconds
        setRetryInterval(interval); // Store the interval ID
      } else {
        // Normal submission if auto retry is disabled
        onGenerate(newEntry.studentId, newEntry.semesterId);
        toast.success("Generating transcript 👀✨", { position: "top-center" });
      }
    } else {
      // Set error messages based on which input is empty
      if (!studentId && !semesterId) {
        setError("Student ID and Semester cannot be empty");
      } else if (!studentId) {
        setError("Student ID cannot be empty");
      } else if (!semesterId) {
        setError("Also select a semester");
      }

      toast.error("Please fill out both fields 😡", { position: "top-center" });
    }
  };

  const cancelRetry = () => {
    if (retryInterval) {
      clearInterval(retryInterval);
      setIsRetrying(false);
      toast.success("Auto Retry cancelled", { position: "top-center" });
    }
  };

  useEffect(() => {
    if (messageIndex < messages.length - 1) {
      const timeout = setTimeout(() => setMessageIndex(messageIndex + 1), 1500);
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

      <AutoRetry autoRetry={autoRetry} setAutoRetry={setAutoRetry} />

      <GenerateButton
        loading={isRetrying}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        history={history}
        clearHistory={clearHistory}
      />

      {isRetrying && <CancelRetry cancelRetry={cancelRetry} />}

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
