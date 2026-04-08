import { drizzle } from "drizzle-orm/mysql2";
import { properties } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

async function exportData() {
  try {
    const allProperties = await db.select().from(properties);
    console.log(JSON.stringify(allProperties, null, 2));
  } catch (error) {
    console.error("Export failed:", error);
    process.exit(1);
  }
}

exportData();
