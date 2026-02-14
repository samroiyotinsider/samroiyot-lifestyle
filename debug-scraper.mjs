import { load as cheerioLoad } from 'cheerio';

const response = await fetch('https://www.visitsamroiyot.com/whats-on/');
const html = await response.text();
const $ = cheerioLoad(html);

console.log('=== DEBUG SCRAPER ===\n');

// Find all event elements
const eventElements = $('[data-event-id]');
console.log(`Found ${eventElements.length} elements with data-event-id\n`);

// Log first 3 event elements
eventElements.slice(0, 3).each((index, element) => {
  const $el = $(element);
  const eventId = $el.attr('data-event-id');
  const html = $el.html();
  
  console.log(`\n--- Event ${index + 1} (ID: ${eventId}) ---`);
  console.log('HTML:', html?.substring(0, 300));
  console.log('Text:', $el.text().substring(0, 200));
  
  // Try to find title
  const titleLink = $el.find("a[href*='/events/']").first();
  console.log('Title Link:', titleLink.attr('href'));
  console.log('Title Text:', titleLink.text());
  
  // Get parent container
  const parent = $el.closest('.mec-event-item, .mec-event-article, li, article');
  console.log('Parent:', parent.length > 0 ? parent[0].name : 'none');
  
  if (parent.length) {
    const parentText = parent.text();
    console.log('Parent Text (first 300 chars):', parentText.substring(0, 300));
    
    // Try date extraction
    const dateMatch = parentText.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
    console.log('Date Match:', dateMatch ? `${dateMatch[1]} ${dateMatch[2]} ${dateMatch[3]}` : 'NO MATCH');
  }
});
