import { drizzle } from "drizzle-orm/mysql2";
import { properties } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);
const allProperties = await db.select().from(properties);

console.log(`\n=== Current Properties (${allProperties.length}) ===\n`);
allProperties.forEach(p => {
  console.log(`ID: ${p.id}`);
  console.log(`Title: ${p.title}`);
  console.log(`Type: ${p.propertyType}`);
  console.log(`Price USD: $${p.priceUsd?.toLocaleString() || 'N/A'}`);
  console.log(`Price THB: ฿${p.price?.toLocaleString() || 'N/A'}`);
  console.log(`Featured: ${p.featured ? 'Yes' : 'No'}`);
  console.log(`Status: ${p.status}`);
  console.log('---');
});

process.exit(0);
