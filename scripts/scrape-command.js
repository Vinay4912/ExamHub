
import scrapeExams from "../src/scraper/scrapeExams.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Get current file's directory (needed for ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runStandaloneScraper() {
  console.log("Starting exam data scraping...");
  console.time('Scraping Duration');

  try {
    const exams = await scrapeExams();

    // Ensure output directory exists
    const outputDir = path.join(path.resolve(__dirname, '..'), 'scraper-output');
    await fs.mkdir(outputDir, { recursive: true });

    // Save to a consistent filename
    const outputFile = path.join(outputDir, 'exams_data.json');
    await fs.writeFile(outputFile, JSON.stringify(exams, null, 2));

    console.log(`Saved ${exams.length} exams to ${outputFile}`);
  } catch (error) {
    console.error("Error during scraping:", error);
    process.exit(1);
  }

  console.timeEnd('Scraping Duration');
}

// Run the scraper
runStandaloneScraper();