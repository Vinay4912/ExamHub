// import axios from "axios";
// import * as cheerio from "cheerio";

// const EXAMS_URL = "https://www.careers360.com/exams";

// export async function scrapeExams() {
//   try {
//     // Fetch the website content
//     const { data } = await axios.get(EXAMS_URL, {
//       headers: {
//         "User-Agent": "Mozilla/5.0",
//       },
//     });

//     // Load HTML into Cheerio
//     const $ = cheerio.load(data);
//     const exams: any[] = [];

//     // Scrape exam details
//     $(".exam_listing_info").each((_, element) => {
//       const title = $(element).find(".school_Name a").text().trim() || "N/A";
//       const exam_link = $(element).find(".school_Name a").attr("href") || "#";
//       const mode = $(element).find(".offline ul li:nth-child(1)").text().trim() || "N/A";
//       const level = $(element).find(".offline ul li:nth-child(2)").text().trim() || "N/A";
//       const frequency = $(element).find(".offline ul li:nth-child(3)").text().trim() || "N/A";
//       const conducting_body = $(element).find(".offline ul li:nth-child(4)").text().trim() || "N/A";
//       const accepting_colleges = $(element).find(".offline ul li:nth-child(5)").text().trim() || "N/A";
//       const seats = $(element).find(".offline ul li:nth-child(6)").text().trim() || "N/A";
//       const image = $(element).find(".exam_pic img").attr("src") || "";

//       const exam_dates = $(element).find(".admission_correction .online_offline strong").text().trim() || "N/A";

//       exams.push({ title, exam_link, image, mode, level, frequency, conducting_body, accepting_colleges, seats, exam_dates });
//     });

//     return exams;
//   } catch (error) {
//     console.error("Error scraping exams:", error);
//     return [];
//   }
// }

// import axios from "axios";
// import * as cheerio from "cheerio";
// import fs from "fs/promises";
// import path from "path";

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

// export async function scrapeExams() {
//   const BASE_URL = "https://www.mynextexam.com/exams";
//   const MAX_PAGES = 118;
//   const ALL_EXAMS: Exam[] = [];

//   try {
//     for (let page = 1; page <= MAX_PAGES; page++) {
//       console.log(`Scraping page ${page}...`);

//       const { data } = await axios.get(`${BASE_URL}?page=${page}`, {
//         headers: {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//           "Accept-Language": "en-US,en;q=0.9",
//           "Accept-Encoding": "gzip, deflate, br",
//         },
//         timeout: 20000 // 10 seconds timeout
//       });

//       const $ = cheerio.load(data);

//       $(".mne-list-item.exam").each((_, element) => {
//         const id = $(element).attr('id') || 'N/A';

//         // Short Name (from h2)
//         const short_name = $(element).find('.details h2.short-name').text().trim() || 'N/A';

//         // Full Name (from p.full-name)
//         const full_name = $(element).find('.item-details .full-name').text().trim() || 'N/A';

//         // Exam Link
//         const exam_link = $(element).find('.details h2.short-name a').attr('href')
//           ? `https://www.mynextexam.com${$(element).find('.details h2.short-name a').attr('href')}`
//           : 'N/A';

//         // Exam Mode
//         const exam_mode = $(element).find('.other-details:contains("Exam Mode")').find('.txt').text().trim() || 'N/A';

//         // Application Dates
//         const application_dates = $(element).find('.other-details:contains("Application Start-End Dates")').find('.txt').text().trim() || 'N/A';

//         // Exam Dates
//         const exam_dates = $(element).find('.other-details:contains("Exam Dates")').find('.txt').text().trim() || 'N/A';

//         // Status
//         const status = $(element).find('.exam-announced').text().trim() || 'N/A';

//         ALL_EXAMS.push({
//           id,
//           short_name,
//           full_name,
//           exam_link,
//           exam_mode,
//           application_dates,
//           exam_dates,
//           status
//         });
//       });

//       // Optional: Add a delay between requests to avoid overwhelming the server
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     }

//     // Optional: Save results to a JSON file
//     await saveExamsToFile(ALL_EXAMS);

//     return ALL_EXAMS;
//   } catch (error) {
//     console.error("Error scraping exams:", error);
//     return [];
//   }
// }

// // Optional utility function to save results to a file
// async function saveExamsToFile(exams: Exam[]) {
//   try {
//     const outputDir = path.join(process.cwd(), 'scraper-output');

//     // Create output directory if it doesn't exist
//     await fs.mkdir(outputDir, { recursive: true });

//     const outputFile = path.join(outputDir, `exams_${Date.now()}.json`);
//     await fs.writeFile(outputFile, JSON.stringify(exams, null, 2));

//     console.log(`Saved ${exams.length} exams to ${outputFile}`);
//   } catch (error) {
//     console.error("Error saving exams to file:", error);
//   }
// }

// // Optional: Function to run the scraper
// async function runScraper() {
//   console.time('Scraping Duration');
//   const exams = await scrapeExams();
//   console.timeEnd('Scraping Duration');
//   console.log(`Total exams scraped: ${exams.length}`);
// }

// // Uncomment to run directly
// // runScraper();

// scripts/scrape-command.js
// scripts/scrape-command.js
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Get current file's directory (needed for ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function scrapeExams() {
  const BASE_URL = "https://www.mynextexam.com/exams";
  const MAX_PAGES = 118;
  const ALL_EXAMS = [];

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      console.log(`Scraping page ${page}...`);

      const { data } = await axios.get(`${BASE_URL}?page=${page}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
        },
        timeout: 60000 // 20 seconds timeout
      });

      const $ = cheerio.load(data);

      $(".mne-list-item.exam").each((_, element) => {
        const id = $(element).attr('id') || 'N/A';
        const short_name = $(element).find('.details h2.short-name').text().trim() || 'N/A';
        const full_name = $(element).find('.item-details .full-name').text().trim() || 'N/A';
        const exam_link = $(element).find('.details h2.short-name a').attr('href')
          ? `https://www.mynextexam.com${$(element).find('.details h2.short-name a').attr('href')}`
          : 'N/A';
        const exam_mode = $(element).find('.other-details:contains("Exam Mode")').find('.txt').text().trim() || 'N/A';
        const application_dates = $(element).find('.other-details:contains("Application Start-End Dates")').find('.txt').text().trim() || 'N/A';
        const exam_dates = $(element).find('.other-details:contains("Exam Dates")').find('.txt').text().trim() || 'N/A';
        const status = $(element).find('.exam-announced').text().trim() || 'N/A';

        ALL_EXAMS.push({
          id,
          short_name,
          full_name,
          exam_link,
          exam_mode,
          application_dates,
          exam_dates,
          status
        });
      });

      // Add a delay between requests to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Save results to a JSON file
    const outputDir = path.join(path.resolve(__dirname, '..'), 'scraper-output');
    await fs.mkdir(outputDir, { recursive: true });

    const outputFile = path.join(outputDir, 'exams_data.json');
    await fs.writeFile(outputFile, JSON.stringify(ALL_EXAMS, null, 2));

    console.log(`Saved ${ALL_EXAMS.length} exams to ${outputFile}`);
    return ALL_EXAMS;
  } catch (error) {
    console.error("Error scraping exams:", error);
    return [];
  }
}

async function runScraper() {
  console.time('Scraping Duration');
  const exams = await scrapeExams();
  console.timeEnd('Scraping Duration');
  console.log(`Total exams scraped: ${exams.length}`);
}

// Run the script
runScraper();