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

//   async function fetchExams() {
//     try {
//       const response = await fetch("/scraper-output/exams_data.json");

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
//               className={`p-2 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${refreshing ? 'opacity-50' : ''}`}
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



"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface Exam {
  id: string;
  short_name: string;
  full_name: string;
  exam_link: string;
  exam_mode: string;
  application_dates: string;
  exam_dates: string;
  status: string;
}

export default function ExamPage() {
  const [allExams, setAllExams] = useState<Exam[]>([]);
  const [displayedExams, setDisplayedExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Exam[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const examsPerPage = 50;
  const router = useRouter();

  async function fetchExams() {
    try {
      const response = await fetch("/scraper-output/exams_data.json");

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: Exam[] = await response.json(); // it's a raw array

      // Store all exams
      setAllExams(data);
      setSearchResults(data);
      
      const total = data.length;
      updatePaginatedExams(data, 1, total);
      
      setLastUpdated(new Date().toLocaleString());
      setError(null);
      console.log("Sample exam data:", data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching exams:", error);
      setError("Failed to load exams. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Update the displayed exams based on pagination
  const updatePaginatedExams = (exams: Exam[], page: number, total: number) => {
    const startIndex = (page - 1) * examsPerPage;
    const paginatedExams = exams.slice(startIndex, startIndex + examsPerPage);
    
    setDisplayedExams(paginatedExams);
    setTotalPages(Math.ceil(total / examsPerPage));
    setTotalRecords(total);
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = () => {
    setIsSearching(true);
    
    if (!searchQuery.trim()) {
      // If search is empty, show all exams
      setSearchResults(allExams);
      updatePaginatedExams(allExams, 1, allExams.length);
      setIsSearching(false);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = allExams.filter(exam => 
      exam.short_name.toLowerCase().includes(query) || 
      exam.full_name.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
    updatePaginatedExams(results, 1, results.length);
    setIsSearching(false);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults(allExams);
    updatePaginatedExams(allExams, 1, allExams.length);
  };

  // Initial setup and data fetch
  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    fetchExams();
  }, []);
  
  // Handle page changes
  useEffect(() => {
    if (searchResults.length > 0) {
      const startIndex = (currentPage - 1) * examsPerPage;
      const paginatedExams = searchResults.slice(startIndex, startIndex + examsPerPage);
      setDisplayedExams(paginatedExams);
    }
  }, [currentPage, searchResults]);
  
  // Handle search on Enter key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement?.id === 'search-input') {
        handleSearch();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [searchQuery, allExams]);

  // Function to manually refresh data
  const refreshData = async () => {
    setRefreshing(true);
    setSearchQuery("");
    await fetchExams();
  };

  const handleGoBack = () => {
    if (isClient) {
      router.push("/"); // Only call this on the client side
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

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // First button
    if (startPage > 1) {
      buttons.push(
        React.createElement('button', {
          key: 'first',
          onClick: () => setCurrentPage(1),
          className: "px-3 py-1 border text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }, 'First')
      );
    }

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        React.createElement('button', {
          key: 'prev',
          onClick: () => setCurrentPage(currentPage - 1),
          className: "px-3 py-1 border text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }, 'Prev')
      );
    }

    // Page number buttons
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        React.createElement('button', {
          key: page,
          onClick: () => setCurrentPage(page),
          className: page === currentPage
            ? "px-3 py-1 border bg-yellow-500 text-white"
            : "px-3 py-1 border text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }, page)
      );
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        React.createElement('button', {
          key: 'next',
          onClick: () => setCurrentPage(currentPage + 1),
          className: "px-3 py-1 border text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }, 'Next')
      );
    }

    // Last button
    if (endPage < totalPages) {
      buttons.push(
        React.createElement('button', {
          key: 'last',
          onClick: () => setCurrentPage(totalPages),
          className: "px-3 py-1 border text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }, 'Last')
      );
    }

    return buttons;
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
      <div className="p-6 dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <MdOutlineKeyboardBackspace
              className="cursor-pointer text-2xl mr-2"
              onClick={handleGoBack}
            />
            <h1 className="text-2xl font-bold">Exam List</h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={refreshData}
              disabled={loading || refreshing}
              className={`p-2 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${refreshing ? 'opacity-50' : ''}`}
              aria-label="Refresh data"
            >
              <FiRefreshCw className={`text-gray-600 dark:text-gray-300 ${refreshing ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <span className="text-yellow-400">☀️</span>
              ) : (
                <span className="text-gray-600">🌙</span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exams by name..."
              className="pl-10 pr-24 py-3 w-full border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Found {totalRecords} {totalRecords === 1 ? 'result' : 'results'} for "{searchQuery}"
            </div>
          )}
        </div>

        {lastUpdated && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Last updated: {lastUpdated}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : (!displayedExams || displayedExams.length === 0) && !error ? (
          <div className="text-center py-20 dark:text-gray-300">
            <p className="text-xl">No exams found{searchQuery ? ` matching "${searchQuery}"` : ''}.</p>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {displayedExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  whileHover={{ y: -5, boxShadow: "0px 10px 15px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="border dark:border-gray-700 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors duration-200"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-semibold">
                        <a
                          href={exam.exam_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {exam.short_name}
                        </a>
                      </h2>
                      <span
                        className={`px-2 py-1 text-xs rounded ${exam.status === 'Admission Over'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}
                      >
                        {exam.status}
                      </span>
                    </div>

                    <div className="text-sm dark:text-gray-300 space-y-1">
                      <p>
                        <strong className="dark:text-gray-200">Mode:</strong> {exam.exam_mode}
                      </p>
                      <p>
                        <strong className="dark:text-gray-200">Application Dates:</strong> {exam.application_dates}
                      </p>
                      <p>
                        <strong className="dark:text-gray-200">Exam Dates:</strong> {exam.exam_dates}
                      </p>
                    </div>

                    <div className="mt-2">
                      <a
                        href={exam.exam_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                        onClick={(e) => {
                          if (!exam.exam_link) {
                            e.preventDefault();
                            console.log("No valid link available");
                          } else {
                            console.log("Navigating to:", exam.exam_link);
                          }
                        }}
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Advanced Pagination Controls */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages} ({totalRecords} records)
              </div>
              <div className="flex items-center space-x-1 flex-wrap justify-center">
                {renderPaginationButtons()}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}