// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// interface Exam {
//   id: string;
//   short_name: string;
//   full_name: string;
//   exam_link: string;
//   exam_mode: string;
//   application_dates: string;
//   exam_dates: string;
//   status: string;
// }

// export default function ExamPage() {
//   const [exams, setExams] = useState<Exam[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const examsPerPage = 50; // Adjust this number as needed

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }

//     async function fetchExams() {
//       try {
//         const response = await fetch(`/api/exams?page=${currentPage}&limit=${examsPerPage}`);
//         const data = await response.json();

//         setExams(data.exams);
//         setTotalPages(data.totalPages);
//       } catch (error) {
//         console.error("Error fetching exams:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchExams();
//   }, [currentPage]);

//   const toggleTheme = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);

//     if (newDarkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   return (
//     <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
//       <div className="p-6 dark:text-white">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Exam List</h1>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
//             aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//           >
//             {darkMode ? (
//               <span className="text-yellow-400">☀️</span>
//             ) : (
//               <span className="text-gray-600">🌙</span>
//             )}
//           </button>
//         </div>

//         {loading ? (
//           <p className="dark:text-gray-300">Loading exams...</p>
//         ) : exams.length === 0 ? (
//           <p className="dark:text-gray-300">No exams found.</p>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//               {exams.map((exam) => (
//                 <motion.div
//                   key={exam.id}
//                   whileHover={{ y: -10, boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                   className="border dark:border-gray-700 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors duration-200"
//                 >
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-start">
//                       <h2 className="text-lg font-semibold">
//                         <a
//                           href={exam.exam_link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 dark:text-blue-400 hover:underline"
//                         >
//                           {exam.short_name}
//                         </a>
//                       </h2>
//                       <span
//                         className={`px-2 py-1 text-xs rounded ${
//                           exam.status === 'Admission Over'
//                           ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                           : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//                         }`}
//                       >
//                         {exam.status}
//                       </span>
//                     </div>

//                     <div className="text-sm dark:text-gray-300 space-y-1">
//                       <p>
//                         <strong className="dark:text-gray-200">Mode:</strong> {exam.exam_mode}
//                       </p>
//                       <p>
//                         <strong className="dark:text-gray-200">Application Dates:</strong> {exam.application_dates}
//                       </p>
//                       <p>
//                         <strong className="dark:text-gray-200">Exam Dates:</strong> {exam.exam_dates}
//                       </p>
//                     </div>

//                     <div className="mt-2">
//                       <a
//                         href={exam.exam_link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="w-full block text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
//                       >
//                         View Details
//                       </a>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Pagination Controls */}
//             <div className="flex justify-center items-center space-x-4 mt-6">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="p-2 rounded disabled:opacity-50 dark:text-white"
//               >
//                 &larr;
//               </button>

//               <span className="dark:text-white">
//                 Page {currentPage} of {totalPages}
//               </span>

//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="p-2 rounded disabled:opacity-50 dark:text-white"
//               >
//                 &rarr;
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { MdOutlineKeyboardBackspace } from "react-icons/md"

// interface Exam {
//   id: string;
//   short_name: string;
//   full_name: string;
//   exam_link: string;
//   exam_mode: string;
//   application_dates: string;
//   exam_dates: string;
//   status: string;
// }

// export default function ExamPage() {
//   const [exams, setExams] = useState<Exam[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);
//   const [isClient, setIsClient] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const examsPerPage = 50;
//   const router = useRouter()
//   useEffect(() => {
//     setIsClient(true);
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }

//     async function fetchExams() {
//       try {
//         const response = await fetch(`/api/exams?page=${currentPage}&limit=${examsPerPage}`);
//         const data = await response.json();

//         setExams(data.exams);
//         setTotalPages(data.totalPages);
//         setTotalRecords(data.totalExams);
//       } catch (error) {
//         console.error("Error fetching exams:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchExams();
//   }, [currentPage]);

//   const handleGoBack = () => {
//     if (isClient) {
//       router.push("/"); // Only call this on the client side
//     }
//   };

//   const toggleTheme = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);

//     if (newDarkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const renderPaginationButtons = () => {
//     const buttons = [];
//     const maxVisibleButtons = 10;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

//     if (endPage - startPage + 1 < maxVisibleButtons) {
//       startPage = Math.max(1, endPage - maxVisibleButtons + 1);
//     }

//     // First button
//     if (startPage > 1) {
//       buttons.push(
//         React.createElement('button', {
//           key: 'first',
//           onClick: () => setCurrentPage(1),
//           className: "px-3 py-1 border text-gray-600 hover:bg-gray-100"
//         }, 'First')
//       );
//     }

//     // Previous button
//     if (currentPage > 1) {
//       buttons.push(
//         React.createElement('button', {
//           key: 'prev',
//           onClick: () => setCurrentPage(currentPage - 1),
//           className: "px-3 py-1 border text-gray-600 hover:bg-gray-100"
//         }, 'Prev')
//       );
//     }

//     // Page number buttons
//     for (let page = startPage; page <= endPage; page++) {
//       buttons.push(
//         React.createElement('button', {
//           key: page,
//           onClick: () => setCurrentPage(page),
//           className: page === currentPage
//             ? "px-3 py-1 border bg-yellow-500 text-white"
//             : "px-3 py-1 border text-gray-600 hover:bg-gray-100"
//         }, page)
//       );
//     }

//     // Next button
//     if (currentPage < totalPages) {
//       buttons.push(
//         React.createElement('button', {
//           key: 'next',
//           onClick: () => setCurrentPage(currentPage + 1),
//           className: "px-3 py-1 border text-gray-600 hover:bg-gray-100"
//         }, 'Next')
//       );
//     }

//     // Last button
//     if (endPage < totalPages) {
//       buttons.push(
//         React.createElement('button', {
//           key: 'last',
//           onClick: () => setCurrentPage(totalPages),
//           className: "px-3 py-1 border text-gray-600 hover:bg-gray-100"
//         }, 'Last')
//       );
//     }

//     return buttons;
//   };

//   return (
//     <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
//       <div className="p-6 dark:text-white">
//         <div className="flex justify-between items-center mb-6">

//           <h1 className="text-2xl font-bold"> <MdOutlineKeyboardBackspace
//             className="cursor-pointer inline-block mr-2"
//             onClick={handleGoBack}
//           />Exam List</h1>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
//             aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//           >
//             {darkMode ? (
//               <span className="text-yellow-400">☀️</span>
//             ) : (
//               <span className="text-gray-600">🌙</span>
//             )}
//           </button>
//         </div>

//         {loading ? (
//           <p className="dark:text-gray-300">Loading exams...</p>
//         ) : exams.length === 0 ? (
//           <p className="dark:text-gray-300">No exams found.</p>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//               {exams.map((exam) => (
//                 <motion.div
//                   key={exam.id}
//                   whileHover={{ y: -10, boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                   className="border dark:border-gray-700 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors duration-200"
//                 >
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-start">
//                       <h2 className="text-lg font-semibold">
//                         <a
//                           href={exam.exam_link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 dark:text-blue-400 hover:underline"
//                         >
//                           {exam.short_name}
//                         </a>
//                       </h2>
//                       <span
//                         className={`px-2 py-1 text-xs rounded ${exam.status === 'Admission Over'
//                             ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                             : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//                           }`}
//                       >
//                         {exam.status}
//                       </span>
//                     </div>

//                     <div className="text-sm dark:text-gray-300 space-y-1">
//                       <p>
//                         <strong className="dark:text-gray-200">Mode:</strong> {exam.exam_mode}
//                       </p>
//                       <p>
//                         <strong className="dark:text-gray-200">Application Dates:</strong> {exam.application_dates}
//                       </p>
//                       <p>
//                         <strong className="dark:text-gray-200">Exam Dates:</strong> {exam.exam_dates}
//                       </p>
//                     </div>

//                     <div className="mt-2">
//                       <a
//                         href={exam.exam_link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="w-full block text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
//                       >
//                         View Details
//                       </a>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Advanced Pagination Controls */}
//             <div className="flex justify-between items-center">
//               <div className="text-gray-600">
//                 Total Records: {totalRecords}
//               </div>
//               <div className="flex items-center space-x-1">
//                 {renderPaginationButtons()}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { FiRefreshCw } from "react-icons/fi";

// interface Exam {
//   id: string;
//   short_name: string;
//   full_name: string;
//   exam_link: string;
//   exam_mode: string;
//   application_dates: string;
//   exam_dates: string;
//   status: string;
// }

// export default function ExamPage() {
//   const [exams, setExams] = useState<Exam[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [isClient, setIsClient] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [lastUpdated, setLastUpdated] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const examsPerPage = 50;
//   const router = useRouter();

//   // Function to fetch exams data
//   // async function fetchExams() {
//   //   try {
//   //     const response = await fetch("/scraper-output/exams_data.json");

//   //     if (!response.ok) {
//   //       throw new Error(`Error ${response.status}: ${response.statusText}`);
//   //     }

//   //     const data = await response.json();

//   //     setExams(data.exams);
//   //     setTotalPages(data.totalPages);
//   //     setTotalRecords(data.totalExams);

//   //     // Set last updated time if available
//   //     if (data.lastUpdated) {
//   //       setLastUpdated(new Date(data.lastUpdated).toLocaleString());
//   //     } else {
//   //       // If API doesn't provide timestamp, use current time
//   //       setLastUpdated(new Date().toLocaleString());
//   //     }

//   //     setError(null);
//   //   } catch (error) {
//   //     console.error("Error fetching exams:", error);
//   //     setError("Failed to load exams. Please try again later.");
//   //   } finally {
//   //     setLoading(false);
//   //     setRefreshing(false);
//   //   }
//   // }

//   async function fetchExams() {
//     try {
//       // const response = await fetch("/scraper-output/exams_data.json");
//       const response = await fetch("/final-scraper/exam data with categories.json");

//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`);
//       }

//       const data: Exam[] = await response.json(); // it's a raw array

//       const total = data.length;
//       const startIndex = (currentPage - 1) * examsPerPage;
//       const paginated = data.slice(startIndex, startIndex + examsPerPage);

//       setExams(paginated);
//       setTotalPages(Math.ceil(total / examsPerPage));
//       setTotalRecords(total);
//       setLastUpdated(new Date().toLocaleString());
//       setError(null);
//       console.log("Sample exam data:", data.slice(0, 3));
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//       setError("Failed to load exams. Please try again later.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }

//   // Initial setup and data fetch
//   useEffect(() => {
//     setIsClient(true);
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }

//     fetchExams();
//   }, [currentPage]);

//   // Function to manually refresh data
//   const refreshData = async () => {
//     setRefreshing(true);
//     await fetchExams();
//   };

//   const handleGoBack = () => {
//     if (isClient) {
//       router.push("/"); // Only call this on the client side
//     }
//   };

//   const toggleTheme = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);

//     if (newDarkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const renderPaginationButtons = () => {
//     const buttons = [];
//     const maxVisibleButtons = 10;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

//     if (endPage - startPage + 1 < maxVisibleButtons) {
//       startPage = Math.max(1, endPage - maxVisibleButtons + 1);
//     }

//     // First button
//     if (startPage > 1) {
//       buttons.push(
//         React.createElement('button', {
//           key: 'first',
//           onClick: () => setCurrentPage(1),
//           className: "px-3 py-1 border text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//         }, 'First')
//       );
//     }

//     // Previous button
//     if (currentPage > 1) {
//       buttons.push(
//         React.createElement('button', {
//           key: 'prev',
//           onClick: () => setCurrentPage(currentPage - 1),
//           className: "px-3 py-1 border text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//         }, 'Prev')
//       );
//     }

//     // Page number buttons
//     for (let page = startPage; page <= endPage; page++) {
//       buttons.push(
//         React.createElement('button', {
//           key: page,
//           onClick: () => setCurrentPage(page),
//           className: page === currentPage
//             ? "px-3 py-1 border bg-yellow-500 text-white"
//             : "px-3 py-1 border text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//         }, page)
//       );
//     }

//     // Next button
//     if (currentPage < totalPages) {
//       buttons.push(
//         React.createElement('button', {
//           key: 'next',
//           onClick: () => setCurrentPage(currentPage + 1),
//           className: "px-3 py-1 border text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//         }, 'Next')
//       );
//     }

//     // Last button
//     if (endPage < totalPages) {
//       buttons.push(
//         React.createElement('button', {
//           key: 'last',
//           onClick: () => setCurrentPage(totalPages),
//           className: "px-3 py-1 border text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//         }, 'Last')
//       );
//     }

//     return buttons;
//   };

//   return (
//     <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
//       <div className="p-6 dark:text-white">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center">
//             <MdOutlineKeyboardBackspace
//               className="cursor-pointer text-2xl mr-2"
//               onClick={handleGoBack}
//             />
//             <h1 className="text-2xl font-bold">Exam List</h1>
//           </div>

//           <div className="flex items-center space-x-2">
//             <button
//               onClick={refreshData}
//               disabled={loading || refreshing}
//               className={`p-2 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${refreshing ? 'opacity-50' : ''
//                 }`}
//               aria-label="Refresh data"
//             >
//               <FiRefreshCw className={`text-gray-600 dark:text-gray-300 ${refreshing ? 'animate-spin' : ''}`} />
//             </button>

//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
//               aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//             >
//               {darkMode ? (
//                 <span className="text-yellow-400">☀️</span>
//               ) : (
//                 <span className="text-gray-600">🌙</span>
//               )}
//             </button>
//           </div>
//         </div>

//         {lastUpdated && (
//           <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//             Last updated: {lastUpdated}
//           </div>
//         )}

//         {error && (
//           <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded mb-4">
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
//           </div>
//         ) : !exams && !error ? (
//           <div className="text-center py-20 dark:text-gray-300">
//             <p className="text-xl">No exams found.</p>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//               {exams.map((exam) => (
//                 <motion.div
//                   key={exam.id}
//                   whileHover={{ y: -5, boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                   className="border dark:border-gray-700 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors duration-200"
//                 >
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-start">
//                       <h2 className="text-lg font-semibold">
//                         <a
//                           href={exam.exam_link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 dark:text-blue-400 hover:underline"
//                         >
//                           {exam.short_name}
//                         </a>
//                       </h2>
//                       <span
//                         className={`px-2 py-1 text-xs rounded ${exam.status === 'Admission Over'
//                           ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                           : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//                           }`}
//                       >
//                         {exam.status}
//                       </span>
//                     </div>

//                     <div className="text-sm dark:text-gray-300 space-y-1">
//                       <p>
//                         <strong className="dark:text-gray-200">Mode:</strong> {exam.exam_mode}
//                       </p>
//                       <p>
//                         <strong className="dark:text-gray-200">Application Dates:</strong> {exam.application_dates}
//                       </p>
//                       <p>
//                         <strong className="dark:text-gray-200">Exam Dates:</strong> {exam.exam_dates}
//                       </p>
//                     </div>

//                     <div className="mt-2">
//                       <a
//                         href={exam.exam_link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="w-full block text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
//                         onClick={(e) => {
//                           if (!exam.exam_link) {
//                             e.preventDefault();
//                             console.log("No valid link available");
//                           } else {
//                             console.log("Navigating to:", exam.exam_link);
//                           }
//                         }}
//                       >
//                         View Details
//                       </a>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Advanced Pagination Controls */}
//             <div className="flex flex-col md:flex-row justify-center items-center gap-4">
//               {/* <div className="text-gray-600 dark:text-gray-400">
//                 Total Records: {totalRecords}
//               </div> */}
//               <div className="flex items-center space-x-1 flex-wrap justify-center">
//                 {renderPaginationButtons()}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { FiRefreshCw } from "react-icons/fi";

// interface Exam {
//   id: string;
//   short_name: string;
//   full_name: string;
//   exam_link: string;
//   exam_mode: string;
//   application_dates: string;
//   exam_dates: string;
//   status: string;
//   category?: string;
// }

// export default function ExamPage() {
//   const [allExams, setAllExams] = useState<Exam[]>([]);
//   const [exams, setExams] = useState<Exam[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [isClient, setIsClient] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [lastUpdated, setLastUpdated] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const examsPerPage = 50;
//   const router = useRouter();

//   const fetchExams = async () => {
//     try {
//       const response = await fetch("/final-scraper/exam data with categories.json");

//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`);
//       }

//       const data: Exam[] = await response.json();
//       setAllExams(data);
//       applyPagination(data, currentPage, selectedCategory);
//       setTotalRecords(data.length);
//       setLastUpdated(new Date().toLocaleString());
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//       setError("Failed to load exams. Please try again later.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const applyPagination = (data: Exam[], page: number, category: string | null) => {
//     let filtered = category ? data.filter((exam) => exam.category === category) : data;
//     const total = filtered.length;
//     const startIndex = (page - 1) * examsPerPage;
//     const paginated = filtered.slice(startIndex, startIndex + examsPerPage);

//     setExams(paginated);
//     setTotalPages(Math.ceil(total / examsPerPage));
//     setTotalRecords(total);
//   };

//   useEffect(() => {
//     setIsClient(true);
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }

//     fetchExams();
//   }, []);

//   useEffect(() => {
//     applyPagination(allExams, currentPage, selectedCategory);
//   }, [currentPage, selectedCategory]);

//   const refreshData = async () => {
//     setRefreshing(true);
//     await fetchExams();
//   };

//   const handleGoBack = () => {
//     if (isClient) {
//       router.push("/");
//     }
//   };

//   const toggleTheme = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);

//     if (newDarkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const categories = Array.from(new Set(allExams.map((exam) => exam.category).filter(Boolean)));
//   console.log(categories)
//   const handleCategoryChange = (category: string | null) => {
//     setSelectedCategory(category);
//     setCurrentPage(1); // reset pagination
//   };

//   const renderPaginationButtons = () => {
//     const buttons = [];
//     const maxVisibleButtons = 10;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

//     if (endPage - startPage + 1 < maxVisibleButtons) {
//       startPage = Math.max(1, endPage - maxVisibleButtons + 1);
//     }

//     if (startPage > 1) {
//       buttons.push(<button key="first" onClick={() => setCurrentPage(1)} className="px-3 py-1 border">First</button>);
//     }

//     if (currentPage > 1) {
//       buttons.push(<button key="prev" onClick={() => setCurrentPage(currentPage - 1)} className="px-3 py-1 border">Prev</button>);
//     }

//     for (let page = startPage; page <= endPage; page++) {
//       buttons.push(
//         <button
//           key={page}
//           onClick={() => setCurrentPage(page)}
//           className={`px-3 py-1 border ${page === currentPage ? "bg-yellow-500 text-white" : ""}`}
//         >
//           {page}
//         </button>
//       );
//     }

//     if (currentPage < totalPages) {
//       buttons.push(<button key="next" onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 border">Next</button>);
//     }

//     if (endPage < totalPages) {
//       buttons.push(<button key="last" onClick={() => setCurrentPage(totalPages)} className="px-3 py-1 border">Last</button>);
//     }

//     return buttons;
//   };

//   return (
//     <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
//       <div className="p-6 dark:text-white">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center">
//             <MdOutlineKeyboardBackspace
//               className="cursor-pointer text-2xl mr-2"
//               onClick={handleGoBack}
//             />
//             <h1 className="text-2xl font-bold">Exam List</h1>
//           </div>

//           <div className="flex items-center space-x-2">
//             <button
//               onClick={refreshData}
//               disabled={loading || refreshing}
//               className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${refreshing ? 'opacity-50' : ''}`}
//               aria-label="Refresh data"
//             >
//               <FiRefreshCw className={`text-gray-600 dark:text-gray-300 ${refreshing ? 'animate-spin' : ''}`} />
//             </button>

//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//               aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//             >
//               {darkMode ? <span className="text-yellow-400">☀️</span> : <span className="text-gray-600">🌙</span>}
//             </button>
//           </div>
//         </div>

//         {lastUpdated && (
//           <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//             Last updated: {lastUpdated}
//           </div>
//         )}

//         {categories.length > 0 && (
//           <div className="mb-6">
//             <label className="mr-2 text-sm font-medium">Filter by Category:</label>
//             <select
//               value={selectedCategory || ""}
//               onChange={(e) => handleCategoryChange(e.target.value || null)}
//               className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//             >
//               <option value="">All</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {error && (
//           <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded mb-4">
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
//           </div>
//         ) : exams.length === 0 ? (
//           <div className="text-center py-20 dark:text-gray-300">
//             <p className="text-xl">No exams found.</p>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//               {exams.map((exam) => (
//                 <motion.div
//                   key={exam.id}
//                   whileHover={{ y: -5, boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                   className="border dark:border-gray-700 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800"
//                 >
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-start">
//                       <h2 className="text-lg font-semibold">
//                         <a href={exam.exam_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
//                           {exam.short_name}
//                         </a>
//                       </h2>
//                       <span
//                         className={`px-2 py-1 text-xs rounded ${exam.status === 'Admission Over'
//                           ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//                           : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}
//                       >
//                         {exam.status}
//                       </span>
//                     </div>
//                     <p className="text-sm dark:text-gray-300">{exam.full_name}</p>
//                     <p className="text-sm dark:text-gray-300"><strong>Mode:</strong> {exam.exam_mode}</p>
//                     <p className="text-sm dark:text-gray-300"><strong>Application Dates:</strong> {exam.application_dates}</p>
//                     <p className="text-sm dark:text-gray-300"><strong>Exam Dates:</strong> {exam.exam_dates}</p>
//                     {exam.category && <p className="text-sm dark:text-gray-400 italic">Category: {exam.category}</p>}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             <div className="flex justify-center space-x-2">
//               {renderPaginationButtons()}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { FiRefreshCw } from "react-icons/fi";
// import ExamCard from "@/components/ui/ExamCard";

// interface Exam {
//   id: string;
//   short_name: string;
//   full_name: string;
//   exam_link: string;
//   exam_mode: string;
//   application_dates: string;
//   exam_dates: string;
//   status: string;
//   category?: string;
// }

// const ExamPage = () => {
//   const [allExams, setAllExams] = useState<Exam[]>([]);
//   const [exams, setExams] = useState<Exam[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [isClient, setIsClient] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [lastUpdated, setLastUpdated] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const examsPerPage = 50;
//   const router = useRouter();

//   const fetchExams = async () => {
//     try {
//       const response = await fetch(
//         "/final-scraper/exam data with categories.json",
//       );

//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`);
//       }

//       const data: Exam[] = await response.json();
//       setAllExams(data);
//       applyPagination(data, currentPage, selectedCategory);
//       setTotalRecords(data.length);
//       setLastUpdated(new Date().toLocaleString());
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//       setError("Failed to load exams. Please try again later.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const applyPagination = (
//     data: Exam[],
//     page: number,
//     category: string | null,
//   ) => {
//     let filtered = category
//       ? data.filter((exam) => exam.category === category)
//       : data;
//     const total = filtered.length;
//     const startIndex = (page - 1) * examsPerPage;
//     const paginated = filtered.slice(startIndex, startIndex + examsPerPage);

//     setExams(paginated);
//     setTotalPages(Math.ceil(total / examsPerPage));
//     setTotalRecords(total);
//   };

//   useEffect(() => {
//     setIsClient(true);
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }

//     fetchExams();
//   }, []);

//   useEffect(() => {
//     applyPagination(allExams, currentPage, selectedCategory);
//   }, [currentPage, selectedCategory]);

//   const refreshData = async () => {
//     setRefreshing(true);
//     await fetchExams();
//   };

//   const handleGoBack = () => {
//     if (isClient) {
//       router.push("/");
//     }
//   };

//   const toggleTheme = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);

//     if (newDarkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const categories = Array.from(
//     new Set(allExams.map((exam) => exam.category).filter(Boolean)),
//   );
//   const handleCategoryChange = (category: string | null) => {
//     setSelectedCategory(category);
//     setCurrentPage(1); // reset pagination
//   };

//   const renderPaginationButtons = () => {
//     const buttons = [];
//     const maxVisibleButtons = 10;
//     let startPage = Math.max(
//       1,
//       currentPage - Math.floor(maxVisibleButtons / 2),
//     );
//     let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

//     if (endPage - startPage + 1 < maxVisibleButtons) {
//       startPage = Math.max(1, endPage - maxVisibleButtons + 1);
//     }

//     if (startPage > 1) {
//       buttons.push(
//         <button
//           key="first"
//           onClick={() => setCurrentPage(1)}
//           className="rounded border px-3 py-1 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
//         >
//           First
//         </button>,
//       );
//     }

//     if (currentPage > 1) {
//       buttons.push(
//         <button
//           key="prev"
//           onClick={() => setCurrentPage(currentPage - 1)}
//           className="rounded border px-3 py-1 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
//         >
//           Prev
//         </button>,
//       );
//     }

//     for (let page = startPage; page <= endPage; page++) {
//       buttons.push(
//         <button
//           key={page}
//           onClick={() => setCurrentPage(page)}
//           className={`rounded border px-3 py-1 ${page === currentPage ? "bg-yellow-500 text-white" : "hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"}`}
//         >
//           {page}
//         </button>,
//       );
//     }

//     if (currentPage < totalPages) {
//       buttons.push(
//         <button
//           key="next"
//           onClick={() => setCurrentPage(currentPage + 1)}
//           className="rounded border px-3 py-1 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
//         >
//           Next
//         </button>,
//       );
//     }

//     if (endPage < totalPages) {
//       buttons.push(
//         <button
//           key="last"
//           onClick={() => setCurrentPage(totalPages)}
//           className="rounded border px-3 py-1 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
//         >
//           Last
//         </button>,
//       );
//     }

//     return buttons;
//   };

//   return (
//     <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
//       <div className="p-6 dark:text-white">
//         <div className="mb-6 flex items-center justify-between">
//           <div className="flex items-center">
//             <MdOutlineKeyboardBackspace
//               className="mr-2 cursor-pointer text-2xl"
//               onClick={handleGoBack}
//             />
//             <h1 className="text-2xl font-bold">Exam List</h1>
//           </div>

//           <div className="flex items-center space-x-2">
//             <button
//               onClick={refreshData}
//               disabled={loading || refreshing}
//               className={`rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${refreshing ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
//               aria-label="Refresh data"
//             >
//               <FiRefreshCw
//                 className={`text-gray-600 dark:text-gray-300 ${refreshing ? "animate-spin" : ""}`}
//               />
//             </button>

//             <button
//               onClick={toggleTheme}
//               className="cursor-pointer rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
//               aria-label={
//                 darkMode ? "Switch to light mode" : "Switch to dark mode"
//               }
//             >
//               {darkMode ? (
//                 <span className="text-yellow-400">☀️</span>
//               ) : (
//                 <span className="text-gray-600">🌙</span>
//               )}
//             </button>
//           </div>
//         </div>

//         {lastUpdated && (
//           <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
//             Last updated: {lastUpdated}
//           </div>
//         )}

//         {categories.length > 0 && (
//           <div className="mb-6">
//             <label className="mr-2 text-sm font-medium dark:text-white">
//               Filter by Category:
//             </label>
//             <select
//               value={selectedCategory || ""}
//               onChange={(e) => handleCategoryChange(e.target.value || null)}
//               className="rounded border p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//             >
//               <option value="">All</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {error && (
//           <div className="mb-4 rounded bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-200">
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <div className="flex items-center justify-center py-20">
//             <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-yellow-500"></div>
//           </div>
//         ) : exams.length === 0 ? (
//           <div className="py-20 text-center dark:text-gray-300">
//             <p className="text-xl">No exams found.</p>
//           </div>
//         ) : (
//           <>
//             <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//               {exams.map((exam) => (
//                 <ExamCard key={exam.id} exam={exam} />
//               ))}
//             </div>

//             <div className="flex justify-center space-x-2">
//               {renderPaginationButtons()}
//             </div>
//             {totalRecords > 0 && (
//               <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
//                 Showing {exams.length} of {totalRecords} exams
//               </p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExamPage;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { FiRefreshCw } from "react-icons/fi";
// import ExamCard from "@/components/ui/ExamCard"; // Import the ExamCard component

// interface Exam {
//   id: string;
//   short_name: string;
//   full_name: string;
//   exam_link: string;
//   exam_mode: string;
//   application_dates: string;
//   exam_dates: string;
//   status: string;
//   category?: string;
// }

// const ExamPage = () => {
//   const [allExams, setAllExams] = useState<Exam[]>([]);
//   const [exams, setExams] = useState<Exam[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [isClient, setIsClient] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [lastUpdated, setLastUpdated] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedMode, setSelectedMode] = useState<string | null>(null);
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

//   const examsPerPage = 50;
//   const router = useRouter();

//   const fetchExams = async () => {
//     try {
//       const response = await fetch(
//         "/final-scraper/exam data with categories.json",
//       );

//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`);
//       }

//       const data: Exam[] = await response.json();
//       setAllExams(data);
//       applyPagination(data, currentPage); // Removed passing selectedCategory here
//       setTotalRecords(data.length);
//       setLastUpdated(new Date().toLocaleString());
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//       setError("Failed to load exams. Please try again later.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const applyPagination = (data: Exam[], page: number) => {
//     // Removed category: string | null
//     let filtered = data;

//     if (selectedCategory) {
//       filtered = filtered.filter((exam) => exam.category === selectedCategory);
//     }
//     if (selectedMode) {
//       filtered = filtered.filter((exam) => exam.exam_mode === selectedMode);
//     }
//     if (selectedStatus) {
//       filtered = filtered.filter((exam) => exam.status === selectedStatus);
//     }

//     const total = filtered.length;
//     const startIndex = (page - 1) * examsPerPage;
//     const paginated = filtered.slice(startIndex, startIndex + examsPerPage);

//     setExams(paginated);
//     setTotalPages(Math.ceil(total / examsPerPage));
//     setTotalRecords(total);
//   };

//   useEffect(() => {
//     setIsClient(true);
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }

//     fetchExams();
//   }, []);

//   useEffect(() => {
//     applyPagination(allExams, currentPage); // Call applyPagination whenever filter changes
//   }, [currentPage, selectedCategory, selectedMode, selectedStatus]);

//   const refreshData = async () => {
//     setRefreshing(true);
//     await fetchExams();
//   };

//   const handleGoBack = () => {
//     if (isClient) {
//       router.push("/");
//     }
//   };

//   const toggleTheme = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);

//     if (newDarkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const categories = Array.from(
//     new Set(allExams.map((exam) => exam.category).filter(Boolean)),
//   );
//   const modes = Array.from(new Set(allExams.map((exam) => exam.exam_mode)));
//   const statuses = Array.from(new Set(allExams.map((exam) => exam.status)));

//   const handleCategoryChange = (category: string | null) => {
//     setSelectedCategory(category);
//     setCurrentPage(1);
//   };
//   const handleModeChange = (mode: string | null) => {
//     setSelectedMode(mode);
//     setCurrentPage(1);
//   };
//   const handleStatusChange = (status: string | null) => {
//     setSelectedStatus(status);
//     setCurrentPage(1);
//   };

//   const renderPaginationButtons = () => {
//     const buttons = [];
//     const maxVisibleButtons = 10;
//     let startPage = Math.max(
//       1,
//       currentPage - Math.floor(maxVisibleButtons / 2),
//     );
//     let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

//     if (endPage - startPage + 1 < maxVisibleButtons) {
//       startPage = Math.max(1, endPage - maxVisibleButtons + 1);
//     }

//     if (startPage > 1) {
//       buttons.push(
//         <button
//           key="first"
//           onClick={() => setCurrentPage(1)}
//           className="rounded border px-3 py-1 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
//         >
//           First
//         </button>,
//       );
//     }

//     if (currentPage > 1) {
//       buttons.push(
//         <button
//           key="prev"
//           onClick={() => setCurrentPage(currentPage - 1)}
//           className="rounded border px-3 py-1 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
//         >
//           Prev
//         </button>,
//       );
//     }

//     for (let page = startPage; page <= endPage; page++) {
//       buttons.push(
//         <button
//           key={page}
//           onClick={() => setCurrentPage(page)}
//           className={`rounded border px-3 py-1 ${page === currentPage ? "bg-yellow-500 text-white" : "hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"}`}
//         >
//           {page}
//         </button>,
//       );
//     }

//     if (currentPage < totalPages) {
//       buttons.push(
//         <button
//           key="next"
//           onClick={() => setCurrentPage(currentPage + 1)}
//           className="rounded border px-3 py-1 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
//         >
//           Next
//         </button>,
//       );
//     }

//     if (endPage < totalPages) {
//       buttons.push(
//         <button
//           key="last"
//           onClick={() => setCurrentPage(totalPages)}
//           className="rounded border px-3 py-1 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
//         >
//           Last
//         </button>,
//       );
//     }

//     return buttons;
//   };

//   return (
//     <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
//       <div className="p-6 dark:text-white">
//         <div className="mb-6 flex items-center justify-between">
//           <div className="flex items-center">
//             <MdOutlineKeyboardBackspace
//               className="mr-2 cursor-pointer text-2xl"
//               onClick={handleGoBack}
//             />
//             <h1 className="text-2xl font-bold">Exam List</h1>
//           </div>

//           <div className="flex items-center space-x-2">
//             <button
//               onClick={refreshData}
//               disabled={loading || refreshing}
//               className={`rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${refreshing ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
//               aria-label="Refresh data"
//             >
//               <FiRefreshCw
//                 className={`text-gray-600 dark:text-gray-300 ${refreshing ? "animate-spin" : ""}`}
//               />
//             </button>

//             <button
//               onClick={toggleTheme}
//               className="cursor-pointer rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
//               aria-label={
//                 darkMode ? "Switch to light mode" : "Switch to dark mode"
//               }
//             >
//               {darkMode ? (
//                 <span className="text-yellow-400">☀️</span>
//               ) : (
//                 <span className="text-gray-600">🌙</span>
//               )}
//             </button>
//           </div>
//         </div>

//         {lastUpdated && (
//           <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
//             Last updated: {lastUpdated}
//           </div>
//         )}

//         <div className="mb-6 flex flex-wrap justify-evenly gap-4">
//           {categories.length > 0 && (
//             <div>
//               <label className="mr-2 text-sm font-medium dark:text-white">
//                 Filter by Category:
//               </label>
//               <select
//                 value={selectedCategory || ""}
//                 onChange={(e) => handleCategoryChange(e.target.value || null)}
//                 className="rounded border p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               >
//                 <option value="">All</option>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {modes.length > 0 && (
//             <div>
//               <label className="mr-2 text-sm font-medium dark:text-white">
//                 Filter by Mode:
//               </label>
//               <select
//                 value={selectedMode || ""}
//                 onChange={(e) => handleModeChange(e.target.value || null)}
//                 className="rounded border p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               >
//                 <option value="">All</option>
//                 {modes.map((mode) => (
//                   <option key={mode} value={mode}>
//                     {mode}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {statuses.length > 0 && (
//             <div>
//               <label className="mr-2 text-sm font-medium dark:text-white">
//                 Filter by Status:
//               </label>
//               <select
//                 value={selectedStatus || ""}
//                 onChange={(e) => handleStatusChange(e.target.value || null)}
//                 className="rounded border p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               >
//                 <option value="">All</option>
//                 {statuses.map((status) => (
//                   <option key={status} value={status}>
//                     {status}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>

//         {error && (
//           <div className="mb-4 rounded bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-200">
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <div className="flex items-center justify-center py-20">
//             <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-yellow-500"></div>
//           </div>
//         ) : exams.length === 0 ? (
//           <div className="py-20 text-center dark:text-gray-300">
//             <p className="text-xl">No exams found.</p>
//           </div>
//         ) : (
//           <>
//             <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//               {exams.map((exam) => (
//                 <ExamCard key={exam.id} exam={exam} />
//               ))}
//             </div>

//             <div className="flex justify-center space-x-2">
//               {renderPaginationButtons()}
//             </div>
//             {totalRecords > 0 && (
//               <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
//                 Showing {exams.length} of {totalRecords} exams
//               </p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExamPage;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FiRefreshCw, FiMoon, FiSun } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import ExamCard from "@/components/ui/ExamCard"; // Import the improved ExamCard

interface Exam {
  id: string;
  short_name: string;
  full_name: string;
  exam_link: string;
  exam_mode: string;
  application_dates: string;
  exam_dates: string;
  status: string;
  category?: string;
}

const ExamPage = () => {
  const [allExams, setAllExams] = useState<Exam[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const examsPerPage = 50;
  const router = useRouter();

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "/final-scraper/exam data with categories.json",
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: Exam[] = await response.json();
      setAllExams(data);
      applyFiltersAndPagination(data, currentPage);
      setTotalRecords(data.length);
      setLastUpdated(new Date().toLocaleString());
      setError(null);
    } catch (error) {
      console.error("Error fetching exams:", error);
      setError("Failed to load exams. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const applyFiltersAndPagination = (data: Exam[], page: number) => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (exam) =>
          exam.short_name.toLowerCase().includes(term) ||
          exam.full_name.toLowerCase().includes(term),
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((exam) => exam.category === selectedCategory);
    }

    // Apply mode filter
    if (selectedMode) {
      filtered = filtered.filter((exam) => exam.exam_mode === selectedMode);
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter((exam) => exam.status === selectedStatus);
    }

    const total = filtered.length;
    const startIndex = (page - 1) * examsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + examsPerPage);

    setExams(paginated);
    setTotalPages(Math.ceil(total / examsPerPage));
    setTotalRecords(total);
  };

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    fetchExams();
  }, []);

  useEffect(() => {
    applyFiltersAndPagination(allExams, currentPage);
  }, [currentPage, selectedCategory, selectedMode, selectedStatus, searchTerm]);

  const refreshData = async () => {
    setRefreshing(true);
    await fetchExams();
  };

  const handleGoBack = () => {
    if (isClient) {
      router.push("/");
    }
  };

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

  const categories = Array.from(
    new Set(allExams.map((exam) => exam.category).filter(Boolean)),
  );
  const modes = Array.from(new Set(allExams.map((exam) => exam.exam_mode)));
  const statuses = Array.from(new Set(allExams.map((exam) => exam.status)));

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleModeChange = (mode: string | null) => {
    setSelectedMode(mode);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string | null) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedMode(null);
    setSelectedStatus(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5; // Reduced for better mobile display
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2),
    );
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key="first"
          onClick={() => setCurrentPage(1)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
        >
          First
        </button>,
      );
    }

    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => setCurrentPage(currentPage - 1)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
        >
          Prev
        </button>,
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            page === currentPage
              ? "bg-blue-600 text-white dark:bg-blue-700"
              : "border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
          }`}
        >
          {page}
        </button>,
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => setCurrentPage(currentPage + 1)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
        >
          Next
        </button>,
      );
    }

    if (endPage < totalPages) {
      buttons.push(
        <button
          key="last"
          onClick={() => setCurrentPage(totalPages)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
        >
          Last
        </button>,
      );
    }

    return (
      <div className="mt-6 flex flex-wrap justify-center gap-2">{buttons}</div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGoBack}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdOutlineKeyboardBackspace className="text-2xl text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Exam List
            </h1>
            {lastUpdated && (
              <span className="hidden text-sm text-gray-500 dark:text-gray-400 md:inline-block">
                Last updated: {lastUpdated}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <FaFilter className="mr-2" />
              Filters
              {(selectedCategory || selectedMode || selectedStatus) && (
                <span className="ml-2 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                  {
                    [selectedCategory, selectedMode, selectedStatus].filter(
                      Boolean,
                    ).length
                  }
                </span>
              )}
            </button>

            <button
              onClick={refreshData}
              disabled={loading || refreshing}
              className={`rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                refreshing ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
              aria-label="Refresh data"
            >
              <FiRefreshCw
                className={`text-lg text-gray-600 dark:text-gray-300 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
            </button>

            <button
              onClick={toggleTheme}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <FiSun className="text-lg text-yellow-400" />
              ) : (
                <FiMoon className="text-lg text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Search and filters */}
        <div className="mb-6">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search exams by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Filter section with animation */}
          {showFilters && (
            <div className="mb-6 rounded-lg border bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Filter Options
                </h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {categories.length > 0 && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <select
                      value={selectedCategory || ""}
                      onChange={(e) =>
                        handleCategoryChange(e.target.value || null)
                      }
                      className="block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {modes.length > 0 && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Exam Mode
                    </label>
                    <select
                      value={selectedMode || ""}
                      onChange={(e) => handleModeChange(e.target.value || null)}
                      className="block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">All Modes</option>
                      {modes.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {statuses.length > 0 && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <select
                      value={selectedStatus || ""}
                      onChange={(e) =>
                        handleStatusChange(e.target.value || null)
                      }
                      className="block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">All Statuses</option>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-200">
            <div className="flex">
              <svg
                className="mr-3 h-6 w-6 flex-shrink-0 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
          </div>
        ) : exams.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-md dark:border-gray-700 dark:bg-gray-800">
            <svg
              className="mb-4 h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
              No exams found
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Results summary */}
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {exams.length} of {totalRecords} exams
              {(selectedCategory ||
                selectedMode ||
                selectedStatus ||
                searchTerm) &&
                " (filtered)"}
            </div>

            {/* Exam cards grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {exams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>

            {/* Pagination */}
            {renderPaginationButtons()}
          </>
        )}
      </main>
    </div>
  );
};

export default ExamPage;
