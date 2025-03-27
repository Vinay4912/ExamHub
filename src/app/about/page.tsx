"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FaRegBell, FaSearch, FaUserCircle, FaGraduationCap, FaUsers, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

export default function About() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const features = [
    {
      icon: <FaGraduationCap className="text-4xl text-blue-600 dark:text-blue-400" />,
      title: "Comprehensive Coverage",
      description: "Access information about a wide range of competitive exams across different fields and levels."
    },
    {
      icon: <FaUsers className="text-4xl text-blue-600 dark:text-blue-400" />,
      title: "Community Driven",
      description: "Join a community of like-minded students and share experiences and resources."
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-600 dark:text-blue-400" />,
      title: "Progress Tracking",
      description: "Monitor your preparation progress and get personalized recommendations."
    }
  ]

  if (!isSignedIn) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About ExamHub</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your one-stop platform for exam preparation and tracking
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              ExamHub aims to revolutionize the way students prepare for competitive exams by providing
              a comprehensive platform that simplifies exam discovery, tracking, and preparation.
              We believe in making quality education accessible to all.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To become the leading platform for exam preparation in India, helping millions of students
              achieve their academic and career goals through organized and efficient exam preparation.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-blue-600 dark:bg-blue-800 text-white p-8 rounded-lg shadow-lg text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
          <p className="mb-6">
            Be part of the growing community of students who are making their exam preparation journey easier and more effective.
          </p>
          <button
            onClick={() => router.push("/exam")}
            className="bg-white text-blue-600 dark:bg-gray-200 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-100"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
} 