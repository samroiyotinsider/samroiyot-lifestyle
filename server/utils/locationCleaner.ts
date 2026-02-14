/**
 * Clean and normalize location data from scraped events
 * Removes garbled text, incomplete words, and misspellings
 */

export function cleanLocation(rawLocation: string): string {
  if (!rawLocation) return "Sam Roi Yot";

  let location = rawLocation.trim();

  // Remove category names that got mixed in (do this first)
  location = location.replace(/\s+(Market|Adventure|Eating Out|Day Time|Night Time|Live Music|Festival|Experience)\s*/gi, " ");

  // Remove common garbled patterns
  location = location.replace(/\s+[a-z]{1,3}$/i, ""); // Remove single/double letter words at end
  location = location.replace(/ing\s+Out.*$/i, ""); // Remove "ing Out" and everything after
  location = location.replace(/ing\s+Out/gi, ""); // Remove "ing Out" anywhere
  location = location.replace(/Night\s+Time.*$/i, ""); // Remove "Night Time" and everything after
  location = location.replace(/Live\s+Music.*$/i, ""); // Remove "Live Music" and everything after
  location = location.replace(/urday$/i, ""); // Remove partial "Saturday"

  // Clean up specific venue patterns
  location = location.replace(/Beach\s+Bar\s+Weekly\s+Pool\s+Comp/i, "Noi Beach Bar");
  location = location.replace(/Compnoi/i, "Noi Beach Bar"); // Fix typo
  location = location.replace(/\s+Pool\s+Comp.*$/i, ""); // Remove "Pool Comp" and everything after
  location = location.replace(/\s+Noi\s+Beach$/i, "Noi Beach Bar"); // Expand "Noi Beach" to "Noi Beach Bar"
  location = location.replace(/^Noi$/i, "Noi Beach Bar"); // Expand lone "Noi" to "Noi Beach Bar"
  location = location.replace(/Noi\s+Beach\s+Bar\s+noi\s+Beach\s+Bar/i, "Noi Beach Bar"); // Fix duplicate
  location = location.replace(/Foodmarket/i, "Food Market"); // Fix "Foodmarket" to "Food Market"
  location = location.replace(/\s+Local\s+Food/i, "Local Food Market"); // Expand "Local Food" to "Local Food Market"

  // Clean up extra whitespace
  location = location.replace(/\s+/g, " ").trim();

  // If location is empty or too short after cleaning, use default
  if (!location || location.length < 3) {
    return "Sam Roi Yot";
  }

  // Capitalize properly
  location = location
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return location;
}

/**
 * Extract phone number from organizer text if present
 */
export function extractPhone(text: string): string | undefined {
  // Thai phone pattern: +66 or 0 followed by digits
  const phoneMatch = text.match(/(?:\+66|0)[\d\s\-]{8,}/);
  if (phoneMatch) {
    return phoneMatch[0].replace(/\s+/g, "");
  }
  return undefined;
}

/**
 * Extract organizer name and clean it
 */
export function cleanOrganizer(rawOrganizer: string | undefined): string | undefined {
  if (!rawOrganizer) return undefined;

  let organizer = rawOrganizer.trim();

  // Remove phone numbers from organizer name
  organizer = organizer.replace(/(?:\+66|0)[\d\s\-]{8,}/g, "").trim();

  // Remove category names
  organizer = organizer.replace(/\s+(Market|Adventure|Eating Out|Day Time|Night Time|Live Music|Festival|Experience)\s*/gi, "").trim();

  // Remove extra whitespace
  organizer = organizer.replace(/\s+/g, " ").trim();

  if (!organizer || organizer.length < 2) {
    return undefined;
  }

  return organizer;
}
