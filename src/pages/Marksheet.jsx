import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import StudentInfo from "../components/Transcript/StudentInfo";
import CourseList from "../components/Transcript/CourseList";
import UniversityInfo from "../components/Transcript/UniversityInfo";
import ResultSummary from "../components/Transcript/ResultSummary";
import SgpaAnimation from "../components/Transcript/SgpaAnimation";

const Marksheet = ({ data, basicInfo, onBack }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showCGPA, setShowCGPA] = useState(true); // State for showing CGPA animation

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile view breakpoint
    };

    handleResize(); // Check initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Automatically hide the CGPA animation after 3 seconds
    const timer = setTimeout(() => setShowCGPA(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!data || data.length === 0) {
    return (
      <p className="flex justify-center items-center gap-2">
        <span className="text-4xl">
          <TbError404 />
        </span>
        Result Not Found!
      </p>
    );
  }

  const totalCredits = data.reduce(
    (acc, course) => acc + (course.totalCredit || 0),
    0
  );
  const totalCourses = data.length;
  const cgpa = data[0]?.cgpa || 0;

  const gradeLetter = (() => {
    if (cgpa === 4.0) return "A+";
    if (cgpa >= 3.75) return "A";
    if (cgpa >= 3.5) return "A-";
    if (cgpa >= 3.25) return "B+";
    if (cgpa >= 3.0) return "B";
    if (cgpa >= 2.75) return "B-";
    if (cgpa >= 2.5) return "C+";
    if (cgpa >= 2.25) return "C";
    if (cgpa >= 2.0) return "D";
    return "F";
  })();

  const handleDownload = () => {
    const element = document.getElementById("marksheet-content");
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Academic_Transcript.pdf");
    });
  };

  return (
    <div className="relative">
      {/* CGPA Celebration Animation */}
      <SgpaAnimation showCGPA={showCGPA} cgpa={cgpa} />

      {/* Mobile Warning */}
      {isMobile && (
        <div className="fixed bottom-2 left-4 right-4 bg-yellow-200 text-yellow-800 text-sm p-3 rounded-lg shadow-lg z-50 text-center">
          📱 For better experience and downloading, please switch to desktop
          view!
        </div>
      )}
      <div
        className="bg-white p-8 rounded-lg shadow-md font-serif"
        id="marksheet-content"
      >
        {/* UniversityInfo */}
        <UniversityInfo />

        {/* Student Information */}
        <StudentInfo data={data} basicInfo={basicInfo} />

        {/* Summary Section */}
        <ResultSummary
          totalCredits={totalCredits}
          totalCourses={totalCourses}
          cgpa={cgpa}
          gradeLetter={gradeLetter}
        />

        {/* Courses Table */}
        <CourseList data={data} />

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center relative after:content-['beta'] after:absolute after:top-[-10px] after:right-[-10px] after:bg-red-500 after:text-white after:text-xs after:font-bold after:py-1 after:px-2 after:rounded-full after:shadow-lg"
        >
          <FaDownload className="mr-2" /> Download PDF
        </button>
      </div>
    </div>
  );
};

export default Marksheet;
