import { storagePut } from "./server/storage.js";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const propertyIds = [
  "U5985439",
  "U5971902",
  "U5971841",
  "U5971886",
  "U5971940",
  "U5971738",
  "U5988038",
];

async function uploadPropertyImages() {
  const results: Record<string, string[]> = {};

  for (const propertyId of propertyIds) {
    console.log(`\nUploading images for ${propertyId}...`);
    const imageDir = `/home/ubuntu/property_images/${propertyId}`;
    const files = readdirSync(imageDir);
    
    results[propertyId] = [];

    for (const file of files) {
      const filePath = join(imageDir, file);
      const fileBuffer = readFileSync(filePath);
      
      // Determine content type
      let contentType = "image/jpeg";
      if (file.endsWith(".png")) contentType = "image/png";
      if (file.endsWith(".mp4")) contentType = "video/mp4";
      
      // Upload to S3 with property-specific path
      const s3Key = `properties/${propertyId}/${file}`;
      const { url } = await storagePut(s3Key, fileBuffer, contentType);
      
      results[propertyId].push(url);
      console.log(`  ✓ ${file} → ${url}`);
    }
  }

  console.log("\n\n=== UPLOAD COMPLETE ===");
  console.log(JSON.stringify(results, null, 2));
  
  // Save results to file
  const fs = await import("fs/promises");
  await fs.writeFile(
    "/home/ubuntu/property_images_urls.json",
    JSON.stringify(results, null, 2)
  );
  console.log("\nResults saved to /home/ubuntu/property_images_urls.json");
}

uploadPropertyImages().catch(console.error);
