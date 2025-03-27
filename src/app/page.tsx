"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaRegBell, FaSearch, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { useUser, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
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
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-900 dark:text-white transition-colors duration-200">
        <Head>
          <title>ExamHub - Find and Track Exams</title>
        </Head>

        <nav className="bg-white dark:bg-gray-800 shadow-md p-4 transition-colors duration-200">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">ExamHub</h1>
            <div className="space-x-6 hidden md:flex">
              <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</a>
              <a href="/exam" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Exams</a>
              <a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</a>
              <a href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon className="text-gray-600" />
                )}
              </button>

              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <button
                  onClick={() => router.push("/sign-in")}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </nav>

        <header className="text-center py-16 dark:bg-gray-900 transition-colors duration-200">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Find and Track Your Perfect Exam Opportunities
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Stay updated with all upcoming competitive exams in India.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Search for exams, courses..."
                className="w-full p-3 border rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
              />
              <FaSearch className="absolute right-3 top-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </header>

        {/* <section className="max-w-6xl mx-auto p-6 dark:bg-gray-900 transition-colors duration-200">
          <h3 className="text-2xl font-semibold mb-6 dark:text-white">Featured Exams</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "GATE 2025", date: "Feb 15, 2025", deadline: "Dec 30, 2024", field: "Engineering & Technology" },
              { title: "CAT 2025", date: "Nov 28, 2025", deadline: "Oct 15, 2025", field: "Management Studies" },
              { title: "UPSC CSE 2025", date: "May 28, 2025", deadline: "Mar 15, 2025", field: "Civil Services" },
            ].map((exam, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
                <h4 className="text-xl font-semibold dark:text-white">{exam.title}</h4>
                <p className="text-gray-500 dark:text-gray-400">{exam.field}</p>
                <p className="text-gray-600 dark:text-gray-300">📅 {exam.date}</p>
                <p className="text-red-500 dark:text-red-400">Registration Deadline: {exam.deadline}</p>
                <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">View Details</button>
              </div>
            ))}
          </div>
        </section> */}

        <section className="max-w-6xl mx-auto p-6 dark:bg-gray-900 transition-colors duration-200">
          <h3 className="text-2xl font-semibold mb-6 dark:text-white">Featured Exams</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "GATE 2025", date: "Feb 15, 2025", deadline: "Dec 30, 2024", field: "Engineering & Technology" },
              { title: "CAT 2025", date: "Nov 28, 2025", deadline: "Oct 15, 2025", field: "Management Studies" },
              { title: "UPSC CSE 2025", date: "May 28, 2025", deadline: "Mar 15, 2025", field: "Civil Services" },
            ].map((exam, index) => (
              <motion.div
                key={index}
                className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200"
                whileHover={{ y: -20, boxShadow: "0px 10px 15px rgba(0,0,0,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h4 className="text-xl font-semibold dark:text-white">{exam.title}</h4>
                <p className="text-gray-500 dark:text-gray-400">{exam.field}</p>
                <p className="text-gray-600 dark:text-gray-300">📅 {exam.date}</p>
                <p className="text-red-500 dark:text-red-400">Registration Deadline: {exam.deadline}</p>
                <button onClick={() => router.push('/exam')} className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">View Details</button>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-800 px-4 py-12 text-center transition-colors duration-200">
          <h3 className="text-2xl font-semibold mb-6 dark:text-white">Why Choose ExamHub?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <FaRegBell className="text-blue-600 dark:text-blue-400 text-3xl" />, title: "Never Miss Deadlines", desc: "Get timely notifications about exam deadlines." },
              { icon: <FaSearch className="text-blue-600 dark:text-blue-400 text-3xl" />, title: "Easy Search", desc: "Find relevant exams quickly with powerful search tools." },
              { icon: <FaUserCircle className="text-blue-600 dark:text-blue-400 text-3xl" />, title: "Personalized Dashboard", desc: "Track your favorite exams and recommendations." },
            ].map((feature, index) => (
              <div key={index} className="p-6 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 shadow-md flex flex-col items-center transition-colors duration-200">
                {feature.icon}
                <h4 className="font-semibold mt-4 dark:text-white">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-600 dark:bg-blue-800 text-white text-center py-10 transition-colors duration-200">
          <h3 className="text-2xl font-semibold">Ready to Start Your Exam Preparation?</h3>
          <p className="mt-2">Join thousands of students using ExamHub!</p>
          <button
            onClick={() => router.push("/sign-in")}
            className="mt-4 bg-white text-blue-600 dark:bg-gray-200 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-100"
          >
            Get Started Now
          </button>
        </section>

        <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 text-center py-6 transition-colors duration-200">
          <p>&copy; 2025 ExamHub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

