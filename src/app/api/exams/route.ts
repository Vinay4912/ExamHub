import { NextRequest, NextResponse } from "next/server";
import { scrapeExams } from "@/scraper/scrapeExams";

export async function GET(req: NextRequest) {
  try {
    const exams = await scrapeExams();
    
    // Set appropriate cache headers
    const headers = new Headers();
    headers.set('Cache-Control', 'max-age=0, s-maxage=86400'); // Cache on CDN for 24 hours
    
    return NextResponse.json(exams, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      { error: "Failed to fetch exams" },
      { status: 500 }
    );
  }
}