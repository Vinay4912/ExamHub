import { chromium } from 'playwright';
import { db} from './db';
import { NotificationType } from '@prisma/client';

export async function scrapeUPSCExams() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://www.upsc.gov.in/examinations');
    await page.waitForLoadState('networkidle');

    const exams = await page.evaluate(() => {
      const examElements = document.querySelectorAll('.examination-row');
      return Array.from(examElements).map(element => ({
        name: element.querySelector('.exam-name')?.textContent?.trim() || '',
        examType: element.querySelector('.exam-type')?.textContent?.trim() || '',
        applicationDates: element.querySelector('.application-dates')?.textContent?.trim() || '',
        examDate: element.querySelector('.exam-date')?.textContent?.trim() || '',
        admitCard: !!element.querySelector('.admit-card-available'),
        results: !!element.querySelector('.results-available'),
      }));
    });

    for (const examData of exams) {
      const existingExam = await db.exam.findUnique({
        where: { name: examData.name },
        include: { status: true },
      });

      if (existingExam) {
        await updateExistingExam(existingExam, examData);
      } else {
        await createNewExam(examData);
      }
    }
  } finally {
    await browser.close();
  }
}

async function updateExistingExam(existingExam: any, examData: any) {
  const changes = checkForChanges(existingExam, examData);
  
  await db.exam.update({
    where: { id: existingExam.id },
    data: {
      applicationStart: parseDate(examData.applicationDates, 'start'),
      applicationEnd: parseDate(examData.applicationDates, 'end'),
      examDate: parseDate(examData.examDate, 'exam'),
      lastScraped: new Date(),
      status: {
        update: {
          admitCard: examData.admitCard,
          results: examData.results,
          lastChecked: new Date(),
        },
      },
    },
  });

  if (changes.length > 0) {
    await createNotifications(existingExam.id, changes);
  }
}

async function createNewExam(examData: any) {
  await db.exam.create({
    data: {
      name: examData.name,
      examType: examData.examType,
      conductingBody: 'UPSC',
      category: determineCategory(examData.examType),
      applicationStart: parseDate(examData.applicationDates, 'start'),
      applicationEnd: parseDate(examData.applicationDates, 'end'),
      examDate: parseDate(examData.examDate, 'exam'),
      officialWebsite: 'https://www.upsc.gov.in',
      lastScraped: new Date(),
      status: {
        create: {
          admitCard: examData.admitCard,
          results: examData.results,
          lastChecked: new Date(),
        },
      },
      eligibility: {
        create: {
          education: 'Graduate',
          ageLimit: '21-32 years',
          nationality: 'Indian',
        },
      },
      notifications: {
        create: {
          type: NotificationType.NEW_EXAM,
          message: `New exam ${examData.name} has been announced`,
        },
      },
    },
  });
}
