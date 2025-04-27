

import { NextRequest, NextResponse } from "next/server";
import scrapeExams from "@/scraper/scrapeExams";
import path from "path";
import fs from "fs/promises";

// Path to the data file
const DATA_FILE = path.join(process.cwd(), 'scraper-output', 'exams_data.json');

// Cache duration (24 hours in milliseconds)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

async function getExamsData() {
  try {
    // Check if the data file exists
    const stats = await fs.stat(DATA_FILE).catch(() => null);
    const currentTime = Date.now();

    // If file exists and is not older than cache duration, read it
    if (stats && (currentTime - stats.mtime.getTime() < CACHE_DURATION)) {
      console.log("Reading exams from cached file");
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }

    // If file doesn't exist or is too old, scrape new data
    console.log("File doesn't exist or cache expired, scraping new data...");
    const exams = await scrapeExams();

    // Ensure directory exists
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });

    // Save scraped data
    await fs.writeFile(DATA_FILE, JSON.stringify(exams, null, 2));
    return exams;
  } catch (error) {
    console.error("Error getting exams data:", error);
    throw error;
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get page and limit from query params, with defaults
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    // Get exams from the cached file or scrape if needed
    const allExams = await getExamsData();

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
    headers.set('Cache-Control', 'max-age=3600, s-maxage=86400'); // Cache in browser for 1 hour, on CDN for 24 hours

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