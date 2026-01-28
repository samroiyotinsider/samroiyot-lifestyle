import { drizzle } from "drizzle-orm/mysql2";
import { properties } from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL!);

async function checkImages() {
  const props = await db.select().from(properties).limit(1);
  console.log("First property images field:");
  console.log(props[0]?.images);
  console.log("\nType:", typeof props[0]?.images);
  console.log("\nFirst 200 chars:", props[0]?.images?.substring(0, 200));
}

checkImages().catch(console.error);
