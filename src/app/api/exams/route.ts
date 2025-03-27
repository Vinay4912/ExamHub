// import { NextRequest, NextResponse } from "next/server";
// import { scrapeExams } from "@/scraper/scrapeExams";

// export async function GET(req: NextRequest) {
//   try {
//     const exams = await scrapeExams();
    
//     // Set appropriate cache headers
//     const headers = new Headers();
//     headers.set('Cache-Control', 'max-age=0, s-maxage=86400'); // Cache on CDN for 24 hours
    
//     return NextResponse.json(exams, {
//       status: 200,
//       headers
//     });
//   } catch (error) {
//     console.error("Error fetching exams:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch exams" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { scrapeExams } from "@/scraper/scrapeExams";

export async function GET(req: NextRequest) {
  try {
    // Get page and limit from query params, with defaults
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    // Fetch all exams
    const allExams = await scrapeExams();

    // Ensure allExams is an array
    const examsArray = Array.isArray(allExams) ? allExams : [];

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalPages = Math.max(1, Math.ceil(examsArray.length / limit));

    // Slice the exams for the current page
    const paginatedExams = examsArray.slice(startIndex, endIndex);

    // Set appropriate cache headers
    const headers = new Headers();
    headers.set('Cache-Control', 'max-age=0, s-maxage=86400'); // Cache on CDN for 24 hours
    
    return NextResponse.json({
      exams: paginatedExams,
      totalPages,
      currentPage: page,
      totalExams: examsArray.length
    }, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      { error: "Failed to fetch exams", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}