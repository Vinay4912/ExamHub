import axios from "axios";
import * as cheerio from "cheerio";

const EXAMS_URL = "https://www.careers360.com/exams";

export async function scrapeExams() {
  try {
    // Fetch the website content
    const { data } = await axios.get(EXAMS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    // Load HTML into Cheerio
    const $ = cheerio.load(data);
    const exams: any[] = [];

    // Scrape exam details
    $(".exam_listing_info").each((_, element) => {
      const title = $(element).find(".school_Name a").text().trim() || "N/A";
      const exam_link = $(element).find(".school_Name a").attr("href") || "#";
      const mode = $(element).find(".offline ul li:nth-child(1)").text().trim() || "N/A";
      const level = $(element).find(".offline ul li:nth-child(2)").text().trim() || "N/A";
      const frequency = $(element).find(".offline ul li:nth-child(3)").text().trim() || "N/A";
      const conducting_body = $(element).find(".offline ul li:nth-child(4)").text().trim() || "N/A";
      const accepting_colleges = $(element).find(".offline ul li:nth-child(5)").text().trim() || "N/A";
      const seats = $(element).find(".offline ul li:nth-child(6)").text().trim() || "N/A";
      const image = $(element).find(".exam_pic img").attr("src") || "";

      const exam_dates = $(element).find(".admission_correction .online_offline strong").text().trim() || "N/A";

      exams.push({ title, exam_link, image, mode, level, frequency, conducting_body, accepting_colleges, seats, exam_dates });
    });

    return exams;
  } catch (error) {
    console.error("Error scraping exams:", error);
    return [];
  }
}


