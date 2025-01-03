import React from "react";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Marksheet = ({ data, onBack }) => {
  const totalCredits = data.reduce(
    (acc, course) => acc + course.totalCredit,
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
    <div className="bg-gray-50 p-6 rounded-xl shadow-lg" id="marksheet-content">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          University Name
        </h1>
        <p className="text-gray-600">Official Academic Transcript</p>
      </div>

      {/* Student Information */}
      <div className="mb-6">
        <p className="text-sm text-gray-700">
          <strong>Student Name:</strong> John Doe
        </p>
        <p className="text-sm text-gray-700">
          <strong>Student ID:</strong> 12345678
        </p>
        <p className="text-sm text-gray-700">
          <strong>Semester:</strong> Spring 2025
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* Courses Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">
                Course Code
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Course Title
              </th>
              <th className="border border-gray-300 p-2 text-left">Credits</th>
              <th className="border border-gray-300 p-2 text-left">Grade</th>
              <th className="border border-gray-300 p-2 text-left">Point</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="border border-gray-300 p-2">
                  {course.customCourseId}
                </td>
                <td className="border border-gray-300 p-2">
                  {course.courseTitle}
                </td>
                <td className="border border-gray-300 p-2">
                  {course.totalCredit}
                </td>
                <td className="border border-gray-300 p-2">
                  {course.gradeLetter}
                </td>
                <td className="border border-gray-300 p-2">
                  {course.pointEquivalent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="bg-blue-50 p-4 rounded-lg mt-6 shadow">
        <p className="text-lg font-bold text-blue-700">Summary</p>
        <p className="text-gray-700">
          Total Credits: {totalCredits.toFixed(2)}
        </p>
        <p className="text-gray-700">Total Courses: {totalCourses}</p>
        <p className="text-gray-700">
          CGPA: {cgpa.toFixed(2)} (
          <span className="font-semibold">{gradeLetter}</span>)
        </p>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="mt-4 flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <FaDownload className="mr-2" /> Download PDF
      </button>
    </div>
  );
};

export default Marksheet;
