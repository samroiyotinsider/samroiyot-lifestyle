import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { properties } from './drizzle/schema.ts';
import fs from 'fs';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Read all extracted property JSON files
const propertyFiles = [
  '/home/ubuntu/fazwaz-extracts/property-1-the-sea-u5985439.json',
  '/home/ubuntu/fazwaz-extracts/property-2-land-u5971940.json',
  '/home/ubuntu/fazwaz-extracts/property-3-land-u5971902.json',
  '/home/ubuntu/fazwaz-extracts/property-4-the-sea-u5971738.json',
  '/home/ubuntu/fazwaz-extracts/property-5-land-u5971841.json',
  '/home/ubuntu/fazwaz-extracts/property-6-land-u5971886.json',
];

for (const file of propertyFiles) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  await db.insert(properties).values({
    title: data.title,
    titleTh: data.titleTh,
    description: data.description,
    descriptionTh: data.descriptionTh,
    price: data.price,
    beds: data.beds,
    baths: data.baths,
    sqm: data.sqm,
    landSize: data.landSize,
    propertyType: data.propertyType,
    status: data.status,
    features: data.features,
    images: data.images,
    videoUrl: data.videoUrl,
    location: data.location,
    coordinates: data.coordinates,
    featured: data.featured,
  });
  
  console.log(`✅ Inserted: ${data.title}`);
}

await connection.end();
console.log('\n✅ All 6 FazWaz properties inserted successfully!');
