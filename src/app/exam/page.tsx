"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

interface Exam {
  title: string;
  exam_link: string;
  image: string;
  mode: string;
  level: string;
  frequency: string;
  conducting_body: string;
  accepting_colleges: string;
  seats: string;
  exam_dates: string;
}

export default function ExamPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    async function fetchExams() {
      try {
        const response = await fetch("/api/exams");
        const data = await response.json();
        setExams(data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, []);


  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
      <div className="p-6 dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Exam List</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              // <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              //   <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              // </svg>
              <FaSun className="text-yellow-400" />
            ) : (
              // <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              //   <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              // </svg>
              <FaMoon className="text-gray-600" />
            )}
          </button>
        </div>

        {loading ? (
          <p className="dark:text-gray-300">Loading exams...</p>
        ) : exams.length === 0 ? (
          <p className="dark:text-gray-300">No exams found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exams.map((exam, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -20, boxShadow: "0px 10px 15px rgba(0,0,0,0.2)" }}
                transition={{ type: "spring" }}
                className="border dark:border-gray-700 p-4 mt-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors duration-200"
              >
                <img
                  src={exam.image}
                  alt={exam.title}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-2">
                  <a
                    href={exam.exam_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    {exam.title}
                  </a>
                </h2>
                <div className="mt-2 space-y-1 text-sm dark:text-gray-300">
                  <p><strong className="dark:text-gray-200">Mode:</strong> {exam.mode}</p>
                  <p><strong className="dark:text-gray-200">Level:</strong> {exam.level}</p>
                  <p><strong className="dark:text-gray-200">Frequency:</strong> {exam.frequency}</p>
                  <p><strong className="dark:text-gray-200">Conducting Body:</strong> {exam.conducting_body}</p>
                  <p><strong className="dark:text-gray-200">Accepting Colleges:</strong> {exam.accepting_colleges}</p>
                  <p><strong className="dark:text-gray-200">Seats:</strong> {exam.seats}</p>
                  <p><strong className="dark:text-gray-200">Exam Dates:</strong> {exam.exam_dates}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}