

"use client"

import Head from "next/head";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { FaRegBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function Home() {
  const router = useRouter(); // Initialize Next.js router

  return (
    <>
      <Head>
        <title>ExamHub - Find and Track Exams</title>
      </Head>

      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">ExamHub</h1>
          <div className="space-x-6 hidden md:flex">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/exam" className="text-gray-600 hover:text-blue-600">Exams</a>
            <a href="about" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          </div>
          <button
            onClick={() => router.push("/sign-in")} // Navigate to /sign-in on click
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Find and Track Your Perfect Exam Opportunities</h2>
        <p className="text-gray-600 mt-3">Stay updated with all upcoming competitive exams in India.</p>
        <div className="mt-6 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for exams, courses..."
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>
      </header>

      {/* Featured Exams Section */}
      <section className="max-w-6xl mx-auto p-6">
        <h3 className="text-2xl font-semibold mb-6">Featured Exams</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "GATE 2025", date: "Feb 15, 2025", deadline: "Dec 30, 2024", field: "Engineering & Technology" },
            { title: "CAT 2025", date: "Nov 28, 2025", deadline: "Oct 15, 2025", field: "Management Studies" },
            { title: "UPSC CSE 2025", date: "May 28, 2025", deadline: "Mar 15, 2025", field: "Civil Services" },
          ].map((exam, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">{exam.title}</h4>
              <p className="text-gray-500">{exam.field}</p>
              <p className="text-gray-600">📅 {exam.date}</p>
              <p className="text-red-500">Registration Deadline: {exam.deadline}</p>
              <button className="mt-4 text-blue-600 hover:underline">View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose ExamHub Section */}
      <section className="bg-gray-100 py-12 text-center">
        <h3 className="text-2xl font-semibold mb-6">Why Choose ExamHub?</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: <FaRegBell className="text-blue-600 text-3xl" />, title: "Never Miss Deadlines", desc: "Get timely notifications about exam deadlines." },
            { icon: <FaSearch className="text-blue-600 text-3xl" />, title: "Easy Search", desc: "Find relevant exams quickly with powerful search tools." },
            { icon: <FaUserCircle className="text-blue-600 text-3xl" />, title: "Personalized Dashboard", desc: "Track your favorite exams and recommendations." },
          ].map((feature, index) => (
            <div key={index} className="p-6 border rounded-lg bg-white shadow-md flex flex-col items-center">
              {feature.icon}
              <h4 className="font-semibold mt-4">{feature.title}</h4>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white text-center py-10">
        <h3 className="text-2xl font-semibold">Ready to Start Your Exam Preparation?</h3>
        <p className="mt-2">Join thousands of students using ExamHub!</p>
        <button
          onClick={() => router.push("/sign-in")} // Navigate to /sign-in on click
          className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
        >
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>&copy; 2025 ExamHub. All rights reserved.</p>
      </footer>
    </>
  );
}
