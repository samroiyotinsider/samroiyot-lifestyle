import { scrapeVisitSamRoiYotEvents } from './server/scrapers/visitsamroiyot-scraper.ts';

console.log('Starting manual scraper test...');
console.log('Time:', new Date().toISOString());

try {
  await scrapeVisitSamRoiYotEvents();
  console.log('Scraper completed successfully');
} catch (error) {
  console.error('Scraper error:', error);
}
