import { drizzle } from "drizzle-orm/mysql2";
import { eq, like } from "drizzle-orm";
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
    videoUrl: null, // No video yet
  },
];

async function updateProperties() {
  console.log("Updating properties with images, videos, and prices...\n");

  for (const prop of propertyData) {
    const images = imageUrls[prop.fazwazId];
    
    if (!images || images.length === 0) {
      console.log(`⚠️  ${prop.fazwazId}: No images found, skipping...`);
      continue;
    }

    await db
      .update(properties)
      .set({
        images: JSON.stringify(images),
        videoUrl: prop.videoUrl,
        priceEur: prop.priceEur,
      })
      .where(like(properties.fazwazUrl, `%${prop.fazwazId}%`));

    console.log(`✅ ${prop.fazwazId}: Updated with ${images.length} images, €${prop.priceEur.toLocaleString()}, video: ${prop.videoUrl ? "Yes" : "No"}`);
  }

  console.log("\n✨ All properties updated successfully!");
}

updateProperties().catch(console.error);
