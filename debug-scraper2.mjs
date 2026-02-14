import { load as cheerioLoad } from 'cheerio';

const response = await fetch('https://www.visitsamroiyot.com/whats-on/');
const html = await response.text();
const $ = cheerioLoad(html);

console.log('=== DEBUG SCRAPER 2 ===\n');

// Find all articles
const articles = $('article');
console.log(`Found ${articles.length} articles\n`);

// Log first article in detail
const firstArticle = articles.first();
console.log('First article HTML:');
console.log(firstArticle.html()?.substring(0, 1000));

console.log('\n\n=== Looking for title selectors ===\n');

// Try different selectors
const selectors = [
  'a[href*="/events/"]',
  'h2',
  'h3',
  '.event-title',
  '.mec-event-title',
  'a',
];

selectors.forEach(selector => {
  const el = firstArticle.find(selector).first();
  if (el.length) {
    console.log(`${selector}: "${el.text().trim()}"`);
  }
});

console.log('\n\n=== All text content ===\n');
console.log(firstArticle.text());
