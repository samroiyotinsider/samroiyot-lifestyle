import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { properties } from "./drizzle/schema.js";
import { readFileSync } from "fs";

const db = drizzle(process.env.DATABASE_URL!);

// Load S3 image URLs
const imageUrls = JSON.parse(
  readFileSync("/home/ubuntu/property_images_urls.json", "utf-8")
);

// Map property IDs to FazWaz IDs (based on insertion order)
const propertyMapping = [
  { id: 1, fazwazId: "U5985439", priceEur: 125000, videoUrl: "https://youtube.com/shorts/oD-sokRcVO8?feature=share" },
  { id: 2, fazwazId: "U5971902", priceEur: 195000, videoUrl: "https://youtu.be/hp2dN2vpTxs" },
  { id: 3, fazwazId: "U5971841", priceEur: 60000, videoUrl: "https://youtube.com/shorts/Nxf_PQ5z24Y?feature=share" },
  { id: 4, fazwazId: "U5971886", priceEur: 55000, videoUrl: "https://youtube.com/shorts/ENiERtUx-aw?feature=share" },
  { id: 5, fazwazId: "U5971940", priceEur: 55000, videoUrl: "https://youtube.com/shorts/02WIhaMNB8Y?feature=share" },
  { id: 6, fazwazId: "U5971738", priceEur: 140000, videoUrl: "https://youtube.com/shorts/kWq7fFJsVjQ?feature=share" },
  { id: 7, fazwazId: "U5988038", priceEur: 595000, videoUrl: null },
];

async function updateProperties() {
  console.log("Updating properties by ID...\n");

  for (const prop of propertyMapping) {
    const images = imageUrls[prop.fazwazId];
    
    if (!images || images.length === 0) {
      console.log(`⚠️  ID ${prop.id} (${prop.fazwazId}): No images found`);
      continue;
    }

    const imagesJson = JSON.stringify(images);
    
    await db
      .update(properties)
      .set({
        images: imagesJson,
        videoUrl: prop.videoUrl,
        priceEur: prop.priceEur,
      })
      .where(eq(properties.id, prop.id));

    console.log(`✅ ID ${prop.id} (${prop.fazwazId}): ${images.length} images, €${prop.priceEur.toLocaleString()}, video: ${prop.videoUrl ? "Yes" : "No"}`);
  }

  console.log("\n✨ Update complete!");
  
  // Verify
  const check = await db.select().from(properties).where(eq(properties.id, 1)).limit(1);
  if (check[0]) {
    console.log("\nVerification - Property ID 1:");
    console.log("Images type:", typeof check[0].images);
    console.log("Images preview:", check[0].images?.substring(0, 100));
    console.log("Price EUR:", check[0].priceEur);
    console.log("Video URL:", check[0].videoUrl);
  }
}

updateProperties().catch(console.error);
