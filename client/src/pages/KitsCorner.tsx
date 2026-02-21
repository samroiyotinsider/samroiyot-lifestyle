import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, MapPin, Users, Wifi, ParkingCircle, Utensils, Wind } from 'lucide-react';

const KitsCorner = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [language, setLanguage] = useState<'en' | 'th'>('en');

  const content = {
    en: {
      title: "Kit's Corner",
      subtitle: "My Personal Favorite: Punoi Bungalow",
      tagline: "A slice of paradise, exclusively on Airbnb",
      intro: "Hi! I'm Kitsana, a Sam Roi Yot local who's passionate about sharing the best this region has to offer. After living here for years, I decided to open my home to travelers seeking an authentic Sam Roi Yot experience. Welcome to Punoi Bungalow—my favorite place to call home.",
      
      propertyName: "Punoi Bungalow",
      propertyType: "Entire Home",
      location: "Sam Roi Yot, Prachuap Khiri Khan",
      capacity: "2 guests",
      bedrooms: "1 bedroom",
      bathrooms: "1 bathroom",
      
      description: "Relax together in a peaceful place near the mountains, near the beautiful Sam Roi Yot Beach. This cozy bungalow is designed for comfort and authenticity—no fancy frills, just genuine Thai hospitality and a home where you can truly unwind.",
      
      whyChoose: "Why Choose Punoi Bungalow?",
      whyPoints: [
        {
          icon: "🏖️",
          title: "Beach Access",
          desc: "Steps away from Sam Roi Yot's pristine beaches"
        },
        {
          icon: "🏔️",
          title: "Mountain Views",
          desc: "Surrounded by stunning natural scenery"
        },
        {
          icon: "🍽️",
          title: "Outdoor Dining & BBQ",
          desc: "Perfect for summer gatherings and sunset meals"
        },
        {
          icon: "🐾",
          title: "Pet Friendly",
          desc: "Bring your furry friends along"
        },
        {
          icon: "📶",
          title: "Modern Amenities",
          desc: "WiFi, dedicated workspace, full kitchen"
        },
        {
          icon: "🚗",
          title: "Free Parking",
          desc: "Convenient parking on premises"
        }
      ],
      
      amenities: "What You'll Find Here",
      amenitiesList: [
        "Beach access",
        "Full kitchen",
        "WiFi",
        "Dedicated workspace",
        "Free parking",
        "Pet friendly",
        "TV",
        "Outdoor entertainment area",
        "BBQ grill",
        "Alfresco dining"
      ],
      
      kitsStory: "Kit's Local Tips",
      storyText: "Living in Sam Roi Yot has taught me that the best travel experiences come from staying where locals live, eating where locals eat, and exploring at a pace that lets you truly connect with a place. That's what Punoi Bungalow offers—not just a place to sleep, but a home base for discovering the real Sam Roi Yot.",
      
      recommendations: "When You Stay Here",
      recommendationsList: [
        "Visit Phraya Nakhon Cave at sunrise (30 min hike, magical views)",
        "Kayak through the mangroves with local guides",
        "Catch the sunset from Ao Manao Beach",
        "Join the weekly market tour on Saturday mornings",
        "Try the fresh seafood at the local night market",
        "Hike to Khao Sam Roi Yot viewpoint for panoramic views"
      ],
      
      monthlyOption: "Pay by Month",
      monthlyText: "Looking for a longer stay? Punoi Bungalow offers monthly installment payments, making it perfect for digital nomads, sabbatical travelers, or anyone wanting to experience Sam Roi Yot at a slower pace.",
      
      cta: "Book Your Stay",
      ctaText: "Ready to experience Sam Roi Yot like a local? Head to Airbnb and book Punoi Bungalow. Mention you found it through Sam Roi Yot Insider and let's make your stay unforgettable!",
      
      bookButton: "View on Airbnb",
      bookUrl: "https://www.airbnb.com/rooms/1594194240398038277",
      
      footer: "Questions? Contact me through Airbnb or reach out to Sam Roi Yot Insider's Concierge team for local recommendations and activity bookings."
    },
    th: {
      title: "มุมของคิท",
      subtitle: "ที่โปรดปรานของฉัน: บังกะโลพูนอย",
      tagline: "ชิ้นสวรรค์ที่เต็มไปด้วยความสุข บน Airbnb โดยเฉพาะ",
      intro: "สวัสดี! ฉันคือกิตสนา ชาวท้องถิ่นสามร้อยยอดที่หลงใหลในการแบ่งปันสิ่งที่ดีที่สุดของภูมิภาคนี้ หลังจากอาศัยอยู่ที่นี่มาหลายปี ฉันจึงตัดสินใจเปิดบ้านของฉันให้กับนักท่องเที่ยวที่ต้องการประสบการณ์สามร้อยยอดที่แท้จริง ยินดีต้อนรับสู่บังกะโลพูนอย—สถานที่ที่ฉันชอบที่สุด",
      
      propertyName: "บังกะโลพูนอย",
      propertyType: "บ้านทั้งหลัง",
      location: "สามร้อยยอด จังหวัรประจวบคีรีขันธ์",
      capacity: "2 ท่าน",
      bedrooms: "1 ห้องนอน",
      bathrooms: "1 ห้องน้ำ",
      
      description: "ผ่อนคลายไปพร้อมกันในสถานที่สงบสุขใกล้ภูเขา ใกล้หาดสามร้อยยอดที่สวยงาม บังกะโลนี้ออกแบบมาเพื่อความสะดวกสบายและความแท้จริง—ไม่มีการตกแต่งหรูหรา แค่การต้อนรับแบบไทยแท้จริงและบ้านที่คุณสามารถผ่อนคลายได้อย่างแท้จริง",
      
      whyChoose: "ทำไมต้องเลือกบังกะโลพูนอย?",
      whyPoints: [
        {
          icon: "🏖️",
          title: "เข้าถึงหาด",
          desc: "อยู่ใกล้หาดสามร้อยยอดที่บริสุทธิ์"
        },
        {
          icon: "🏔️",
          title: "วิวภูเขา",
          desc: "ล้อมรอบด้วยธรรมชาติที่สวยงาม"
        },
        {
          icon: "🍽️",
          title: "ห้องรับประทานอาหารกลางแจ้งและบาร์บีคิว",
          desc: "เหมาะสำหรับการรวมตัวในฤดูร้อนและอาหารค่ำพระอาทิตย์ตกดิน"
        },
        {
          icon: "🐾",
          title: "เป็นมิตรกับสัตว์เลี้ยง",
          desc: "นำเพื่อนขนฟูของคุณมาด้วย"
        },
        {
          icon: "📶",
          title: "สิ่งอำนวยความสะดวกสมัยใหม่",
          desc: "WiFi พื้นที่ทำงานเฉพาะ ครัวเต็มรูปแบบ"
        },
        {
          icon: "🚗",
          title: "ที่จอดรถฟรี",
          desc: "ที่จอดรถสะดวกในบริเวณ"
        }
      ],
      
      amenities: "สิ่งที่คุณจะพบที่นี่",
      amenitiesList: [
        "เข้าถึงหาด",
        "ครัวเต็มรูปแบบ",
        "WiFi",
        "พื้นที่ทำงานเฉพาะ",
        "ที่จอดรถฟรี",
        "เป็นมิตรกับสัตว์เลี้ยง",
        "โทรทัศน์",
        "พื้นที่บันเทิงกลางแจ้ง",
        "เตาบาร์บีคิว",
        "ห้องรับประทานอาหารกลางแจ้ง"
      ],
      
      kitsStory: "เคล็ดลับท้องถิ่นของคิท",
      storyText: "การอาศัยอยู่ในสามร้อยยอดได้สอนให้ฉันว่าประสบการณ์การท่องเที่ยวที่ดีที่สุดมาจากการอยู่ที่ชาวบ้านอาศัยอยู่ กิน ที่ชาวบ้านกิน และสำรวจด้วยความเร็วที่ให้คุณเชื่อมต่อกับสถานที่ได้อย่างแท้จริง นั่นคือสิ่งที่บังกะโลพูนอยเสนอ—ไม่ใช่แค่สถานที่พักผ่อน แต่เป็นฐานสำหรับการค้นพบสามร้อยยอดที่แท้จริง",
      
      recommendations: "เมื่อคุณพักอยู่ที่นี่",
      recommendationsList: [
        "เยี่ยมชมถ้ำพญานาคตอนพระอาทิตย์ขึ้น (เดิน 30 นาที วิวมหัศจรรย์)",
        "พายเรือผ่านป่าชายเลนกับไกด์ท้องถิ่น",
        "ชมพระอาทิตย์ตกดินจากหาดอ่าวมะเนา",
        "เข้าร่วมทัวร์ตลาดรายสัปดาห์ในเช้าวันเสาร์",
        "ลองอาหารทะเลสดใหม่ที่ตลาดกลางคืนท้องถิ่น",
        "เดินขึ้นไปยังจุดชมวิวเขาสามร้อยยอดเพื่อชมวิวพาโนรามา"
      ],
      
      monthlyOption: "จ่ายรายเดือน",
      monthlyText: "มองหาการพักที่นานขึ้น? บังกะโลพูนอยเสนอการชำระเงินรายเดือน ซึ่งเหมาะสำหรับนักเดินทางดิจิทัล ผู้ที่หยุดพักชีวิต หรือใครก็ตามที่ต้องการสัมผัสสามร้อยยอดในจังหวะที่ช้าลง",
      
      cta: "จองการพักของคุณ",
      ctaText: "พร้อมที่จะสัมผัสสามร้อยยอดเหมือนชาวท้องถิ่น? ไปที่ Airbnb และจองบังกะโลพูนอย บอกว่าคุณพบมันผ่านสามร้อยยอด Insider และให้เราทำให้การพักของคุณไม่ลืมได้!",
      
      bookButton: "ดูใน Airbnb",
      bookUrl: "https://www.airbnb.com/rooms/1594194240398038277",
      
      footer: "มีคำถาม? ติดต่อฉันผ่าน Airbnb หรือติดต่อทีม Concierge ของ Sam Roi Yot Insider เพื่อรับคำแนะนำท้องถิ่นและการจองกิจกรรม"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: 'url(/kits-bungalow.png)' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-2">{t.title}</h1>
          <p className="text-2xl mb-4">{t.subtitle}</p>
          <p className="text-lg italic">{t.tagline}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Intro */}
        <Card className="p-8 mb-8 border-l-4 border-blue-600">
          <p className="text-lg text-gray-700 leading-relaxed">{t.intro}</p>
        </Card>

        {/* Property Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">{t.propertyName}</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">{t.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">{t.capacity} • {t.bedrooms} • {t.bathrooms}</span>
              </div>
              <p className="text-sm text-gray-600 italic mt-4">{t.propertyType}</p>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-3 text-amber-900">{t.monthlyOption}</h3>
            <p className="text-gray-700">{t.monthlyText}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg border-l-4 border-green-600">
            {t.description}
          </p>
        </div>

        {/* Why Choose */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.whyChoose}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.whyPoints.map((point, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition">
                <div className="text-4xl mb-3">{point.icon}</div>
                <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                <p className="text-gray-600">{point.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{t.amenities}</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {t.amenitiesList.map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-blue-50 rounded">
                <Wind className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kit's Story */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold mb-4">{t.kitsStory}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{t.storyText}</p>
        </Card>

        {/* Recommendations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{t.recommendations}</h2>
          <div className="space-y-3">
            {t.recommendationsList.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <span className="text-2xl flex-shrink-0">✓</span>
                <span className="text-gray-700 pt-1">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h2 className="text-3xl font-bold mb-4">{t.cta}</h2>
          <p className="text-lg mb-6">{t.ctaText}</p>
          <a href={t.bookUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              {t.bookButton} →
            </Button>
          </a>
        </Card>

        {/* Footer Note */}
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-700">{t.footer}</p>
        </div>
      </div>
    </div>
  );
};

export default KitsCorner;
