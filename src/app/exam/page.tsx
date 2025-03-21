"use client";
import { useEffect, useState } from "react";

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

  useEffect(() => {
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exam List</h1>
      {loading ? (
        <p>Loading exams...</p>
      ) : exams.length === 0 ? (
        <p>No exams found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg">
              <img src={exam.image} alt={exam.title} className="w-full h-32 object-cover rounded-md" />
              <h2 className="text-lg font-semibold mt-2">
                <a href={exam.exam_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {exam.title}
                </a>
              </h2>
              <p><strong>Mode:</strong> {exam.mode}</p>
              <p><strong>Level:</strong> {exam.level}</p>
              <p><strong>Frequency:</strong> {exam.frequency}</p>
              <p><strong>Conducting Body:</strong> {exam.conducting_body}</p>
              <p><strong>Accepting Colleges:</strong> {exam.accepting_colleges}</p>
              <p><strong>Seats:</strong> {exam.seats}</p>
              <p><strong>Exam Dates:</strong> {exam.exam_dates}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
