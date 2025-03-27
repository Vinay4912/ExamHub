"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaRegBell, FaSearch, FaUserCircle, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useUser, UserButton, SignIn } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Show loading state
  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-900 dark:text-white transition-colors duration-200">
        <Head>
          <title>ExamHub - Find and Track Exams</title>
        </Head>

        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-md p-4 transition-colors duration-200 fixed top-0 w-full z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="md:hidden mr-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isSidebarOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">ExamHub</h1>
            </div>
            <div className="space-x-6 hidden md:flex">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
              <Link href="/exam" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Exams</Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
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
        </motion.nav>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={closeSidebar}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              />
              {/* Sidebar */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 md:hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Menu</h2>
                    <button
                      onClick={closeSidebar}
                      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <Link
                      href="/"
                      className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                      onClick={closeSidebar}
                    >
                      Home
                    </Link>
                    <Link
                      href="/exam"
                      className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                      onClick={closeSidebar}
                    >
                      Exams
                    </Link>
                    <Link
                      href="/about"
                      className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                      onClick={closeSidebar}
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                      onClick={closeSidebar}
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {!isSignedIn ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
            <SignIn />
          </div>
        ) : (
          <>
            <header className="text-center mt-12 py-16 dark:bg-gray-900 transition-colors duration-200">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                  Find and Track Your Perfect Exam Opportunities
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  Stay updated with all upcoming competitive exams in India.
                </p>
              </motion.div>
              <div className="mt-6 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative w-full max-w-lg px-4">
                  <input
                    type="text"
                    placeholder="Search for exams, courses..."
                    className="w-full p-3 border rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  />
                  <FaSearch className="absolute right-6 top-4 text-gray-500 dark:text-gray-400" />
                </motion.div>
              </div>
            </header>

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

            <section className="bg-gray-100 dark:bg-gray-800 px-4 py-12 text-center transition-colors duration-200" id="about">
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">Why Choose ExamHub?</h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              </motion.div>
            </section>

            <section className="bg-blue-600 dark:bg-blue-800 text-white text-center py-10 transition-colors duration-200">
              <h3 className="text-2xl font-semibold">Ready to Start Your Exam Preparation?</h3>
              <p className="mt-2">Join thousands of students using ExamHub!</p>
              <button
                onClick={() => router.push("/exam")}
                className="mt-4 bg-white text-blue-600 dark:bg-gray-200 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-100"
              >
                Explore Exams
              </button>
            </section>
          </>
        )}

        <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 text-center py-6 transition-colors duration-200">
          <p>&copy; 2025 ExamHub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

