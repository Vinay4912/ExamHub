"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaRegBell, FaSearch, FaUserCircle, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useUser, UserButton, SignIn } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
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

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-md p-4 transition-colors duration-200 fixed top-0 w-full z-10"
      >
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
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              onClick={() => router.push('/')}
            >ExamHub</h1>
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
    </>
  );
}