import { drizzle } from 'drizzle-orm/mysql2';
import { properties } from './drizzle/schema.js';
import * as dotenv from 'dotenv';

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

const propertiesToInsert = [
  {
    title: "1 Bedroom Condo for Sale at The Sea Condominium",
    propertyType: "condo",
    priceUSD: null, // To be updated with YouTube link
    priceTHB: null,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: 52.76,
    description: `Sea View Condo for Sale at The Sea Condominium, Sam Roi Yot

Nestled directly at Dolphin Bay on Sam Roi Yot Beach (just steps from the sand), this modern condo (completed 2017) offers breathtaking panoramic sea views, island vistas, and the serene backdrop of Khao Sam Roi Yot National Park. Perfect for expats, retirees, or investors seeking a peaceful lifestyle retreat – only 30-45 minutes from Hua Hin amenities, yet worlds away from the crowds.

Key Highlights:
• Prime sea-facing position with stunning ocean and mountain views from your balcony
• 1 Bedroom | 52.76 sqm usable area | Fully furnished | 2nd floor for max privacy & breeze
• Resort-style facilities: Large outdoor swimming pool, children's pool, gym, 24hr security, CCTV, elevator, parking, garden/BBQ area, concierge
• Relaxing beach access for swimming, kite surfing, or simply unwinding in nature
• Ideal investment: Strong rental demand from tourists & expats (potential 5%+ ROI), foreigner-friendly ownership options

Surrounded by pristine nature, local fishermen's vibes, and easy access to national park adventures – this is more than a condo; it's a vacation lifestyle every day!`,
    address: "Sam Roi Yot, Hua Hin, Prachuap Khiri Khan",
    features: "Pool Access, Sea View, Pool View, Garden View, Communal Pool, Communal Gym, 24H Security, CCTV, Car Parking, Direct Beach Access, Kids Pool, BBQ Area",
    images: null, // To be uploaded
    videoUrl: null, // To be provided
    yearBuilt: 2017,
    status: "available",
    featured: 0,
    fazwazId: "U5985439",
    fazwazUrl: "https://www.fazwaz.com/property-sales/1-bedroom-condo-for-sale-at-the-sea-condominium-in-sam-roi-yot-hua-hin-u5985439"
  },
  {
    title: "Chanote Land 3.2 Rai Sam Roi Yot – Divisible into 3 Plots",
    propertyType: "land",
    priceUSD: null,
    priceTHB: null,
    bedrooms: 0,
    bathrooms: 0,
    sizeSqm: 4800,
    description: `Unlock unlimited potential in Sam Roi Yot – Thailand's serene hidden coastal gem, perfect for European expats, Chinese/Singaporean investors, or global buyers seeking a secure, build-ready plot with strong appreciation and flexibility.

This premium 3 Rai 2 Ngan (3.2 Rai / ~5,120 sqm) Chanote-title land plot features stunning mountain views, completely flat and usable terrain, and amazing potential for development—no restrictions noted (ideal for residential villas, family compound, small resort, or eco-retreat). The land can be divided into three separate 1-Rai plots (perfect for building one home and selling the others, or creating a private multi-unit estate).

Just a short drive from Dolphin Bay's pristine beaches and Khao Sam Roi Yot National Park trails—quiet, low-density location with easy access to utilities (electricity/water nearby) and Hua Hin amenities (30–45 mins). Chanote title ensures top-tier security and ease for foreigners (leasehold/company structures available).

This represents outstanding value compared to closer-to-beach plots—room for custom builds (pool villa, guest houses) and high ROI potential through resale or rentals in this growing area.`,
    address: "Sam Roi Yot, Hua Hin, Prachuap Khiri Khan",
    features: "Chanote Title, Flat Terrain, Mountain Views, Divisible into 3 x 1-Rai Plots, Unlimited Development Potential, Easy access to utilities",
    images: null,
    videoUrl: null,
    yearBuilt: null,
    status: "available",
    featured: 0,
    fazwazId: "U5971902",
    fazwazUrl: "https://www.fazwaz.com/property-sales/land-for-sale-in-sam-roi-yot-hua-hin-u5971902"
  },
  {
    title: "Prime Sea & Mountain View Land 300m to Beach Sam Roi Yot",
    propertyType: "land",
    priceUSD: null,
    priceTHB: null,
    bedrooms: 0,
    bathrooms: 0,
    sizeSqm: 574.8,
    description: `Escape to your own slice of paradise in Sam Roi Yot – Thailand's serene, uncrowded coastal gem that's increasingly popular among European expats and second-home buyers.

This stunning 1.47 Rai land plot (approximately 2,352 sqm) sits just 300 meters from the pristine beach (easy walk to Dolphin Bay's quiet sands), with breathtaking panoramic sea views and dramatic mountain backdrops – perfect for building your dream villa, eco-retreat, or holiday home.

Secure Chanote title (full freehold ownership – the gold standard in Thailand, ideal for foreigners via leasehold or company setup). Flat/usable terrain ready for development – imagine your private pool villa surrounded by nature, with Khao Sam Roi Yot National Park hikes, kite surfing, and local fishermen vibes right nearby.

Only 30-45 minutes from Hua Hin's European-friendly amenities (international hospitals, golf courses, markets, expat community) the ideal balance of peace and convenience.`,
    address: "Sam Roi Yot, Hua Hin, Prachuap Khiri Khan",
    features: "Chanote Title, 300m to Beach, Sea View, Mountain View, Flat Terrain",
    images: null,
    videoUrl: null,
    yearBuilt: null,
    status: "available",
    featured: 0,
    fazwazId: "U5971841",
    fazwazUrl: "https://www.fazwaz.com/property-sales/land-for-sale-in-sam-roi-yot-hua-hin-u5971841"
  },
  {
    title: "Chanote Land 150 sqm Sam Roi Yot 1.9km to Sea + Mountain View",
    propertyType: "land",
    priceUSD: null,
    priceTHB: null,
    bedrooms: 0,
    bathrooms: 0,
    sizeSqm: 150,
    description: `Secure your affordable entry into Sam Roi Yot's peaceful paradise – Thailand's hidden coastal treasure, increasingly favored by European expats and second-home seekers for its uncrowded beaches, nature, and relaxed lifestyle.

This compact 150 sqm Chanote-title land plot (full freehold ownership – secure and foreigner-friendly via leasehold/company) offers stunning sea views combined with dramatic mountain backdrops.

Just 1.9 km from the pristine beach (short drive to Dolphin Bay's quiet sands and swimming spots), it's ideal for building a private villa, small holiday home, or eco-retreat amid Khao Sam Roi Yot National Park's trails and wildlife. Flat/usable terrain with road access – ready for your vision without the premium price of ultra-close plots.

Only 30-45 minutes from Hua Hin's European community, international hospitals, golf, and shopping – the perfect blend of serenity and convenience.`,
    address: "Sam Roi Yot, Hua Hin, Prachuap Khiri Khan",
    features: "Chanote Title, Mountain View, Sea View, 1.9 km to Beach, Road Access, Flat Terrain",
    images: null,
    videoUrl: null,
    yearBuilt: null,
    status: "available",
    featured: 0,
    fazwazId: "U5971886",
    fazwazUrl: "https://www.fazwaz.com/property-sales/land-for-sale-in-sam-roi-yot-hua-hin-u5971886"
  },
  {
    title: "Chanote Land 1 Rai 30 sq wah Sam Roi Yot – Mountain View",
    propertyType: "land",
    priceUSD: null,
    priceTHB: null,
    bedrooms: 0,
    bathrooms: 0,
    sizeSqm: 1600,
    description: `Discover an excellent entry-level investment in Sam Roi Yot – Thailand's peaceful coastal haven, ideal for European expats, Chinese/Singaporean investors, or global buyers seeking secure, build-ready land with strong appreciation potential.

This 1 Rai 30 sq.wah (~1,720 sqm) plot boasts secure Chanote title (full freehold ownership – top-tier security, perfect for foreigners via leasehold or company setup) and captivating mountain views that provide a serene backdrop for your dream villa, weekend retreat, or small eco-home.

Flat and usable terrain with unlimited development potential — imagine a private pool villa, guest house, or family compound amid Khao Sam Roi Yot National Park's nature. Electricity/water nearby, easy access, and close to Dolphin Bay beaches for swimming/kite surfing. Only 30–45 mins from Hua Hin's international amenities (hospitals, golf, markets).`,
    address: "Sam Roi Yot, Hua Hin, Prachuap Khiri Khan",
    features: "Chanote Title, Mountain View, Flat Terrain, Unlimited Build Potential, Electricity/Water Nearby, Easy Access",
    images: null,
    videoUrl: null,
    yearBuilt: null,
    status: "available",
    featured: 0,
    fazwazId: "U5971940",
    fazwazUrl: "https://www.fazwaz.com/property-sales/land-for-sale-in-sam-roi-yot-hua-hin-u5971940"
  },
  {
    title: "1 Bedroom Condo for Sale at The Sea Condominium (70 SqM)",
    propertyType: "condo",
    priceUSD: null,
    priceTHB: null,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: 70,
    description: `Stunning 1-bedroom beachfront condo at The Sea Condominium, Sam Roi Yot. This spacious 70 sqm unit offers breathtaking sea views, mountain views, and direct beach access.

Completed in 2017, this fully furnished condo features resort-style amenities including communal pool, gym, 24-hour security, CCTV, car parking, kids pool, and BBQ area. Perfect for expats, retirees, or investors seeking a peaceful lifestyle retreat.

Located just steps from Dolphin Bay Beach with easy access to Khao Sam Roi Yot National Park. Only 30-45 minutes from Hua Hin amenities, yet worlds away from the crowds.`,
    address: "Sam Roi Yot, Hua Hin, Prachuap Khiri Khan",
    features: "Beach Access, Pool Access, Private Garden, Fully Furnished, Sea View, Mountain View, Pool View, Garden View, Communal Pool, Communal Gym, 24H Security, CCTV, Car Parking, Direct Beach Access, Kids Pool, BBQ Area",
    images: null,
    videoUrl: null,
    yearBuilt: 2017,
    status: "available",
    featured: 0,
    fazwazId: "U5971738",
    fazwazUrl: "https://www.fazwaz.com/property-sales/1-bedroom-condo-for-sale-at-the-sea-condominium-in-sam-roi-yot-hua-hin-u5971738"
  },
  {
    title: "Exclusive Mango Hills Resort Estate Sam Roi Yot",
    propertyType: "villa",
    priceUSD: null,
    priceTHB: null,
    bedrooms: 5,
    bathrooms: 5,
    sizeSqm: 258,
    description: `Offered exclusively through Sam Roi Yot Lifestyle Properties & Concierge – Mango Hills is a captivating traditional Thai resort estate immersed in a thriving mango orchard (120+ trees, ~5 tons annual harvest for passive revenue from sales or eco-tourism). Tucked in the tranquil mountains of Khao Sam Roi Yot National Park, just 1.5 km from Dolphin Bay's unspoiled beaches, it blends sea and mountain views with authentic luxury.

Imagine it as your family's private guest home (spacious for holidays) while generating income via Airbnb or boutique rentals when not in use — the proven B&B setup (5-star reviews for quiet luxury, great views, group appeal) supports 5–7%+ yields from holiday lets/expats. The orchard adds another layer: harvest revenue or branding as a sustainable retreat/wellness business.

Detailed Specs (Total Built ~258 sqm):
• Master Bedroom: 48 sqm
• Kitchen: 36 sqm
• Sala: 24 sqm
• Bar: 24 sqm
• Treehouse: 25 sqm
• Bungalows: 48 sqm (2 x 24 sqm)
• Container: 27 sqm
• Large saltwater pool (12m x 5m waterfall)
• Huge garden

Land: 4 Rai 2 Ngan 40 sq.wah (~7,360 sqm) with Chanote title (foreigner-friendly).`,
    address: "Sam Roi Yot, Hua Hin, Prachuap Khiri Khan",
    features: "1.5 km from Beach, Airbnb Income Potential, Chanote Title, Large Saltwater Pool, Mango Orchard (120+ trees), Mountain Views, Sea Views, Covered Parking, Huge Garden, Terrace, 5-7%+ Rental Yields",
    images: null,
    videoUrl: null,
    yearBuilt: 2000,
    status: "available",
    featured: 1,
    fazwazId: "U5988038",
    fazwazUrl: "https://www.fazwaz.com/property-sales/5-bedroom-hotel-for-sale-in-sam-roi-yot-hua-hin-u5988038"
  }
];

async function insertProperties() {
  try {
    console.log('Inserting properties without prices...');
    
    for (const property of propertiesToInsert) {
      await db.insert(properties).values(property);
      console.log(`✓ Inserted: ${property.title}`);
    }
    
    console.log('\n✅ All properties inserted successfully!');
    console.log('📝 Next steps:');
    console.log('   1. Upload property images to S3');
    console.log('   2. Update properties with image URLs');
    console.log('   3. Add YouTube video URLs');
    console.log('   4. Update prices (USD primary, THB secondary at 36:1 rate)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inserting properties:', error);
    process.exit(1);
  }
}

insertProperties();
