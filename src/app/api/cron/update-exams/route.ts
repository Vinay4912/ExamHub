// import { NextResponse } from "next/server";
// import { scrapeExams} from "@/scraper/scrapeExams";

// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

// export async function GET() {
//   try {
//     const exams = await scrapeExams();
    
//     // Here you would typically save the exam data to your database
//     // For example: await db.exams.saveMany(exams);
    
//     return NextResponse.json({ 
//       success: true, 
//       message: "Exams data updated successfully", 
//       count: exams.length 
//     });
//   } catch (error) {
//     console.error("Cron job failed:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to update exams data" },
//       { status: 500 }
//     );
//   }
// }