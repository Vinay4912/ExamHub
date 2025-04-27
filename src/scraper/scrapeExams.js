
// import axios from "axios";
// import * as cheerio from "cheerio";
// import fs from "fs/promises";
// import path from "path";
// import { fileURLToPath } from "url";

// // Get current file's directory (needed for ESM)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default async function scrapeExams() {
//   const BASE_URL = "https://www.mynextexam.com/exams";
//   const MAX_PAGES = 118;
//   const ALL_EXAMS = [];

//   try {
//     for (let page = 1; page <= MAX_PAGES; page++) {
//       console.log(`Scraping page ${page}...`);

//       const { data } = await axios.get(`${BASE_URL}?page=${page}`, {
//         headers: {
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//           "Accept-Language": "en-US,en;q=0.9",
//           "Accept-Encoding": "gzip, deflate, br",
//         },
//         timeout: 60000 // 20 seconds timeout
//       });

//       const $ = cheerio.load(data);

//       $(".mne-list-item.exam").each((_, element) => {
//         const id = $(element).attr('id') || 'N/A';
//         const short_name = $(element).find('.details h2.short-name').text().trim() || 'N/A';
//         const full_name = $(element).find('.item-details .full-name').text().trim() || 'N/A';
//         const relativeLink = $(element).find('a').attr('href');
//         const exam_link = relativeLink
//         ? `https://www.mynextexam.com${relativeLink}`
//         : 'N/A';

//         const exam_mode = $(element).find('.other-details:contains("Exam Mode")').find('.txt').text().trim() || 'N/A';
//         const application_dates = $(element).find('.other-details:contains("Application Start-End Dates")').find('.txt').text().trim() || 'N/A';
//         const exam_dates = $(element).find('.other-details:contains("Exam Dates")').find('.txt').text().trim() || 'N/A';
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

//       // Add a delay between requests to avoid overwhelming the server
//       await new Promise(resolve => setTimeout(resolve, 1000));
//     }

//     // Save results to a JSON file
//     const outputDir = path.join(path.resolve(__dirname, '..'), 'scraper-output');
//     await fs.mkdir(outputDir, { recursive: true });

//     const outputFile = path.join(outputDir, 'exams_data.json');
//     await fs.writeFile(outputFile, JSON.stringify(ALL_EXAMS, null, 2));

//     console.log(`Saved ${ALL_EXAMS.length} exams to ${outputFile}`);
//     return ALL_EXAMS;
//   } catch (error) {
//     console.error("Error scraping exams:", error);
//     return [];
//   }
// }

// async function runScraper() {
//   console.time('Scraping Duration');
//   const exams = await scrapeExams();
//   console.timeEnd('Scraping Duration');
//   console.log(`Total exams scraped: ${exams.length}`);
// }

// // Run the script
// runScraper();



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
        const relativeLink = $(element).find('a').attr('href');
        const exam_link = relativeLink
        ? `https://www.mynextexam.com${relativeLink}`
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