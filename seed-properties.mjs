import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const properties = [
  {
    title: "The Sea Condominium Unit 291/10",
    titleTh: "คอนโดมิเนียม เดอะ ซี ยูนิต 291/10",
    description: `Stunning beachfront condo with panoramic sea views in The Sea Condominium, Sam Roi Yot. This 2-bedroom, 2-bathroom unit offers 85 sqm of modern living space with direct beach access.

Features include:
- Floor-to-ceiling windows with breathtaking ocean views
- Fully furnished with contemporary furniture
- Modern kitchen with built-in appliances
- Two spacious bedrooms with ensuite bathrooms
- Large balcony perfect for sunset watching
- Communal swimming pool and fitness center
- 24/7 security and parking
- Walking distance to local restaurants and shops

Perfect for weekend getaways, retirement living, or rental investment. The Sea Condominium is one of Sam Roi Yot's premier beachfront developments, offering luxury living at an affordable price.`,
    descriptionTh: `คอนโดริมชายหาดที่สวยงามพร้อมวิวทะเลพาโนรามาใน The Sea Condominium แสนร้อยยอด ยูนิต 2 ห้องนอน 2 ห้องน้ำนี้มีพื้นที่ใช้สอยสมัยใหม่ 85 ตารางเมตรพร้อมทางเข้าชายหาดโดยตรง

คุณสมบัติรวมถึง:
- หน้าต่างตั้งแต่พื้นถึงเพดานพร้อมวิวมหาสมุทรที่น่าทึ่ง
- ตกแต่งครบพร้อมเฟอร์นิเจอร์ร่วมสมัย
- ครัวทันสมัยพร้อมเครื่องใช้ไฟฟ้าบิวท์อิน
- ห้องนอนกว้างขวาง 2 ห้องพร้อมห้องน้ำในตัว
- ระเบียงขนาดใหญ่เหมาะสำหรับชมพระอาทิตย์ตก
- สระว่ายน้ำส่วนกลางและศูนย์ฟิตเนส
- รักษาความปลอดภัย 24/7 และที่จอดรถ
- ระยะเดินถึงร้านอาหารและร้านค้าท้องถิ่น

เหมาะสำหรับการพักผ่อนช่วงสุดสัปดาห์ การใช้ชีวิตเกษียณ หรือการลงทุนให้เช่า`,
    propertyType: "condo",
    price: 4500000,
    priceUsd: 125000,
    sizeSqm: 85,
    bedrooms: 2,
    bathrooms: 2,
    features: JSON.stringify(["seaView", "beachfront", "pool", "furnished"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200"
    ]),
    latitude: "12.2167",
    longitude: "99.9667",
    address: "The Sea Condominium, Dolphin Bay, Sam Roi Yot, Prachuap Khiri Khan",
    addressTh: "คอนโดมิเนียม เดอะ ซี อ่าวโลมา แสนร้อยยอด ประจวบคีรีขันธ์",
    fazwazUrl: "https://www.fazwaz.com/property/the-sea-condominium",
    status: "available",
    featured: 1
  },
  {
    title: "The Sea Condominium Unit 291/35",
    titleTh: "คอนโดมิเนียม เดอะ ซี ยูนิต 291/35",
    description: `Spacious 1-bedroom beachfront condo in The Sea Condominium with stunning mountain and partial sea views. This 65 sqm unit is perfect for singles, couples, or as a vacation rental investment.

Highlights:
- One large bedroom with ensuite bathroom
- Open-plan living and dining area
- Modern kitchenette
- Private balcony with mountain views
- Fully furnished and move-in ready
- Access to communal pool and gym
- Secure parking and 24/7 security
- Steps from the beach

The Sea Condominium offers resort-style living with low maintenance fees, making it ideal for those seeking a lock-and-leave lifestyle or passive rental income.`,
    descriptionTh: `คอนโดริมชายหาด 1 ห้องนอนขนาดกว้างขวางใน The Sea Condominium พร้อมวิวภูเขาและวิวทะเลบางส่วนที่สวยงาม ยูนิต 65 ตารางเมตรนี้เหมาะสำหรับคนโสด คู่รัก หรือเป็นการลงทุนให้เช่าวันหยุด

ไฮไลท์:
- ห้องนอนขนาดใหญ่หนึ่งห้องพร้อมห้องน้ำในตัว
- พื้นที่นั่งเล่นและรับประทานอาหารแบบเปิด
- ครัวเล็กทันสมัย
- ระเบียงส่วนตัวพร้อมวิวภูเขา
- ตกแต่งครบและพร้อมเข้าอยู่
- เข้าถึงสระว่ายน้ำและยิมส่วนกลาง
- ที่จอดรถปลอดภัยและรักษาความปลอดภัย 24/7
- ห่างจากชายหาดเพียงไม่กี่ก้าว`,
    propertyType: "condo",
    price: 3200000,
    priceUsd: 89000,
    sizeSqm: 65,
    bedrooms: 1,
    bathrooms: 1,
    features: JSON.stringify(["mountainView", "beachfront", "pool", "furnished"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200"
    ]),
    latitude: "12.2167",
    longitude: "99.9667",
    address: "The Sea Condominium, Dolphin Bay, Sam Roi Yot, Prachuap Khiri Khan",
    addressTh: "คอนโดมิเนียม เดอะ ซี อ่าวโลมา แสนร้อยยอด ประจวบคีรีขันธ์",
    fazwazUrl: "https://www.fazwaz.com/property/the-sea-condominium",
    status: "available",
    featured: 1
  },
  {
    title: "Renovated Single House with Garden",
    titleTh: "บ้านเดี่ยวปรับปรุงใหม่พร้อมสวน",
    description: `Charming renovated 3-bedroom house with lush garden in a quiet neighborhood near Sam Roi Yot town center. This 180 sqm property sits on 200 sqm of land and offers comfortable family living with modern updates.

Property features:
- Three bedrooms and two bathrooms
- Spacious living and dining areas
- Modern kitchen with ample storage
- Covered parking for two vehicles
- Beautiful tropical garden with fruit trees
- Outdoor sala perfect for relaxation
- Air conditioning throughout
- Recently renovated with quality materials
- Close to schools, markets, and hospitals
- 10 minutes to the beach

This house is perfect for families, retirees, or anyone seeking a peaceful lifestyle with easy access to amenities. The property is ready to move in and requires no additional work.`,
    descriptionTh: `บ้านปรับปรุงใหม่ที่มีเสน่ห์ 3 ห้องนอนพร้อมสวนเขียวชอุ่มในย่านที่เงียบสงบใกล้ใจกลางเมืองแสนร้อยยอด ทรัพย์สิน 180 ตารางเมตรนี้ตั้งอยู่บนที่ดิน 200 ตารางเมตรและมอบการใช้ชีวิตครอบครัวที่สะดวกสบายพร้อมการปรับปรุงสมัยใหม่

คุณสมบัติของทรัพย์สิน:
- สามห้องนอนและสองห้องน้ำ
- พื้นที่นั่งเล่นและรับประทานอาหารกว้างขวาง
- ครัวทันสมัยพร้อมพื้นที่จัดเก็บเพียงพอ
- ที่จอดรถมุงหลังคาสำหรับรถสองคัน
- สวนเขตร้อนที่สวยงามพร้อมต้นไม้ผล
- ศาลากลางแจ้งเหมาะสำหรับการพักผ่อน
- เครื่องปรับอากาศทั่วทั้งบ้าน
- ปรับปรุงใหม่ล่าสุดด้วยวัสดุคุณภาพ
- ใกล้โรงเรียน ตลาด และโรงพยาบาล
- 10 นาทีถึงชายหาด

บ้านหลังนี้เหมาะสำหรับครอบครัว ผู้เกษียณ หรือทุกคนที่แสวงหาการใช้ชีวิตที่เงียบสงบพร้อมการเข้าถึงสิ่งอำนวยความสะดวกได้ง่าย ทรัพย์สินพร้อมเข้าอยู่และไม่ต้องการงานเพิ่มเติม`,
    propertyType: "house",
    price: 5800000,
    priceUsd: 161000,
    sizeSqm: 180,
    sizeRai: "50 sq.wah (200 sqm)",
    bedrooms: 3,
    bathrooms: 2,
    features: JSON.stringify(["renovated", "furnished"]),
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
    ]),
    latitude: "12.2000",
    longitude: "99.9500",
    address: "Sam Roi Yot Town, Prachuap Khiri Khan",
    addressTh: "เมืองแสนร้อยยอด ประจวบคีรีขันธ์",
    status: "available",
    featured: 1
  }
];

for (const property of properties) {
  await connection.execute(
    `INSERT INTO properties (title, titleTh, description, descriptionTh, propertyType, price, priceUsd, sizeSqm, sizeRai, bedrooms, bathrooms, features, images, latitude, longitude, address, addressTh, fazwazUrl, status, featured)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      property.title,
      property.titleTh,
      property.description,
      property.descriptionTh,
      property.propertyType,
      property.price,
      property.priceUsd,
      property.sizeSqm,
      property.sizeRai || null,
      property.bedrooms,
      property.bathrooms,
      property.features,
      property.images,
      property.latitude,
      property.longitude,
      property.address,
      property.addressTh,
      property.fazwazUrl || null,
      property.status,
      property.featured
    ]
  );
}

console.log('✅ Successfully seeded 3 properties');
await connection.end();
