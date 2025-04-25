// // ExamCard.tsx
// import React from "react";
// import { motion } from "framer-motion";
// import { FaLink, FaCalendarAlt, FaMapPin, FaTag } from "react-icons/fa";

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

// const ExamCard: React.FC<{ exam: Exam }> = ({ exam }) => (
//   <motion.div
//     key={exam.id}
//     whileHover={{ y: -5, boxShadow: "0px 10px 15px rgba(0,0,0,0.15)" }}
//     transition={{ type: "spring", stiffness: 300 }}
//     className="overflow-hidden rounded-lg border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
//   >
//     <div className="px-4 py-4">
//       <div className="mb-3 flex items-center justify-between">
//         <h2 className="truncate text-xl font-semibold text-blue-700 dark:text-blue-400">
//           {exam.short_name}
//         </h2>
//         <span
//           className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
//             exam.status === "Admission Over"
//               ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
//               : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//           }`}
//         >
//           {exam.status}
//         </span>
//       </div>
//       <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
//         {exam.full_name}
//       </p>
//       <div className="space-y-1">
//         <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//           <FaMapPin className="mr-2 text-gray-400 dark:text-gray-500" />
//           <strong>Mode:</strong> {exam.exam_mode}
//         </p>
//         <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//           <FaCalendarAlt className="mr-2 text-gray-400 dark:text-gray-500" />
//           <strong>Application:</strong> {exam.application_dates}
//         </p>
//         <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//           <FaCalendarAlt className="mr-2 text-gray-400 dark:text-gray-500" />
//           <strong>Exam:</strong> {exam.exam_dates}
//         </p>
//         {exam.category && (
//           <p className="flex items-center text-sm italic text-gray-500 dark:text-gray-400">
//             <FaTag className="mr-2 text-gray-400 dark:text-gray-500" />
//             {exam.category}
//           </p>
//         )}
//       </div>
//     </div>
//     <div className="bg-gray-100 px-4 py-3 text-right dark:bg-gray-700">
//       <a
//         href={exam.exam_link}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
//       >
//         View Details <FaLink className="ml-2" />
//       </a>
//     </div>
//   </motion.div>
// );

// export default ExamCard;

import React from "react";
import { motion } from "framer-motion";
import {
  FaLink,
  FaCalendarAlt,
  FaMapPin,
  FaTag,
  FaClock,
} from "react-icons/fa";

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

const ExamCard: React.FC<{ exam: Exam }> = ({ exam }) => {
  // Determine badge color based on status
  const getBadgeClasses = () => {
    switch (exam.status.toLowerCase()) {
      case "admission over":
      case "closed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "open":
      case "registration open":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Card Header with colored bar based on status */}
      <div
        className={`h-2 w-full ${
          exam.status.toLowerCase().includes("over") ||
          exam.status.toLowerCase().includes("closed")
            ? "bg-red-500"
            : exam.status.toLowerCase().includes("open")
              ? "bg-green-500"
              : "bg-blue-500"
        }`}
      />

      <div className="p-5">
        {/* Title and Badge Section */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {exam.short_name}
          </h2>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getBadgeClasses()}`}
          >
            {exam.status}
          </span>
        </div>

        {/* Full name with slightly larger font */}
        <p className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          {exam.full_name}
        </p>

        {/* Divider */}
        <div className="mb-4 border-t border-gray-200 dark:border-gray-700"></div>

        {/* Info Grid - Two columns for better layout */}
        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="flex items-start">
            <FaMapPin className="mr-2 mt-1 text-blue-500 dark:text-blue-400" />
            <div>
              <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Mode
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {exam.exam_mode}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <FaClock className="mr-2 mt-1 text-blue-500 dark:text-blue-400" />
            <div>
              <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {exam.status}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <FaCalendarAlt className="mr-2 mt-1 text-blue-500 dark:text-blue-400" />
            <div>
              <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Application
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {exam.application_dates || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <FaCalendarAlt className="mr-2 mt-1 text-blue-500 dark:text-blue-400" />
            <div>
              <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Exam
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {exam.exam_dates || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Category Tag */}
        {exam.category && (
          <div className="mb-4 flex items-center">
            <FaTag className="mr-2 text-blue-500 dark:text-blue-400" />
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {exam.category}
            </span>
          </div>
        )}
      </div>

      {/* Card Footer with action button */}
      <div className="bg-gray-50 px-5 py-3 dark:bg-gray-700/50">
        <a
          href={exam.exam_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          View Details <FaLink className="ml-2" />
        </a>
      </div>
    </motion.div>
  );
};

export default ExamCard;
