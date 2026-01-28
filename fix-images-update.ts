import { drizzle } from "drizzle-orm/mysql2";
import { like } from "drizzle-orm";
import { properties } from "./drizzle/schema.js";
import { readFileSync } from "fs";

const db = drizzle(process.env.DATABASE_URL!);

// Load S3 image URLs
const imageUrls = JSON.parse(
  readFileSync("/home/ubuntu/property_images_urls.json", "utf-8")
);

const propertyData = [
  {
    fazwazId: "U5985439",
    priceEur: 125000,
    videoUrl: "https://youtube.com/shorts/oD-sokRcVO8?feature=share",
  },
  {
    fazwazId: "U5971902",
    priceEur: 195000,
    videoUrl: "https://youtu.be/hp2dN2vpTxs",
  },
  {
    fazwazId: "U5971841",
    priceEur: 60000,
    videoUrl: "https://youtube.com/shorts/Nxf_PQ5z24Y?feature=share",
  },
  {
    fazwazId: "U5971886",
    priceEur: 55000,
    videoUrl: "https://youtube.com/shorts/ENiERtUx-aw?feature=share",
  },
  {
    fazwazId: "U5971940",
    priceEur: 55000,
    videoUrl: "https://youtube.com/shorts/02WIhaMNB8Y?feature=share",
  },
  {
    fazwazId: "U5971738",
    priceEur: 140000,
    videoUrl: "https://youtube.com/shorts/kWq7fFJsVjQ?feature=share",
  },
  {
    fazwazId: "U5988038",
    priceEur: 595000,
    videoUrl: null,
  },
];

async function updateProperties() {
  console.log("Fixing properties with images, videos, and prices...\n");

  for (const prop of propertyData) {
    const images = imageUrls[prop.fazwazId];
    
    if (!images || images.length === 0) {
      console.log(`⚠️  ${prop.fazwazId}: No images found, skipping...`);
      continue;
    }

    // Convert to JSON string manually
    const imagesJson = JSON.stringify(images);
    
    // First, let's check what's currently in the database
    const existing = await db
      .select()
      .from(properties)
      .where(like(properties.fazwazUrl, `%${prop.fazwazId}%`))
      .limit(1);
    
    if (existing.length === 0) {
      console.log(`⚠️  ${prop.fazwazId}: Property not found in database`);
      continue;
    }

    console.log(`Updating ${prop.fazwazId} (ID: ${existing[0].id})...`);
    console.log(`  Images JSON length: ${imagesJson.length} chars`);
    console.log(`  First 100 chars: ${imagesJson.substring(0, 100)}`);

    // Update using the raw SQL to avoid any ORM encoding issues
    await db.execute({
      sql: `UPDATE properties SET images = ?, videoUrl = ?, priceEur = ? WHERE id = ?`,
      params: [imagesJson, prop.videoUrl, prop.priceEur, existing[0].id],
    });

    console.log(`✅ ${prop.fazwazId}: Updated successfully`);
  }

  console.log("\n✨ All properties updated!");
  
  // Verify one property
  const check = await db.select().from(properties).limit(1);
  console.log("\nVerification - First property images field:");
  console.log("Type:", typeof check[0]?.images);
  console.log("Value preview:", check[0]?.images?.substring(0, 150));
}

updateProperties().catch(console.error);
