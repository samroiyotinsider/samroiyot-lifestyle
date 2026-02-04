import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { ExternalLink, Calendar, Users, Heart } from "lucide-react";

export default function News() {
  const { language, t } = useLanguage();

  const newsItems = [
    {
      id: 1,
      title: "Sam Roi Yot Bucket List - Community Favorites",
      titleTh: "รายการสิ่งที่ต้องทำในสามร้อยยอด - สิ่งที่ชุมชนชื่นชอบ",
      description: "Join our community in sharing favorite places to visit and things to do in Sam Roi Yot. From hidden beaches to local restaurants, discover what makes this place special.",
      descriptionTh: "เข้าร่วมชุมชนของเราในการแบ่งปันสถานที่ที่ชื่นชอบและสิ่งที่ต้องทำในสามร้อยยอด จากหาดทรายที่ซ่อนอยู่ไปจนถึงร้านอาหารท้องถิ่น",
      date: "Updated Weekly",
      dateTh: "อัปเดตทุกสัปดาห์",
      category: "Community",
      categoryTh: "ชุมชน",
      link: "https://www.facebook.com/groups/friendsofsamroiyot/learning_content/",
      image: "🏖️"
    },
    {
      id: 2,
      title: "Biking Tours - Explore Off the Beaten Track",
      titleTh: "ทัวร์จักรยาน - สำรวจเส้นทางที่ไม่เป็นที่รู้จัก",
      description: "Discover local biking tour agency offering guided tours through Sam Roi Yot's scenic routes and hidden trails. Perfect for adventure seekers and nature lovers.",
      descriptionTh: "ค้นพบบริการทัวร์จักรยานท้องถิ่นที่นำเสนอทัวร์ที่มีไกด์ผ่านเส้นทางสวยงามและเส้นทางที่ซ่อนอยู่ของสามร้อยยอด",
      date: "Ongoing",
      dateTh: "ตลอดเวลา",
      category: "Activities",
      categoryTh: "กิจกรรม",
      link: "https://www.facebook.com/groups/friendsofsamroiyot/learning_content/",
      image: "🚴"
    },
    {
      id: 3,
      title: "Khao Sam Roi Yot National Park - Tourist Map & Coordinates",
      titleTh: "อุทยานแห่งชาติเขาสามร้อยยอด - แผนที่นักท่องเที่ยวและพิกัด",
      description: "Complete map with coordinates of all tourist attractions in Khao Sam Roi Yot National Park. Essential guide for exploring caves, beaches, and hiking trails.",
      descriptionTh: "แผนที่ที่สมบูรณ์พร้อมพิกัดของสถานที่ท่องเที่ยวทั้งหมดในอุทยานแห่งชาติเขาสามร้อยยอด",
      date: "Reference",
      dateTh: "อ้างอิง",
      category: "Attractions",
      categoryTh: "สถานที่ท่องเที่ยว",
      link: "https://www.facebook.com/groups/friendsofsamroiyot/learning_content/",
      image: "🗺️"
    },
    {
      id: 4,
      title: "Practical Info for Residents & Visitors - FAQ",
      titleTh: "ข้อมูลปฏิบัติสำหรับผู้อยู่อาศัยและนักท่องเที่ยว - คำถามที่พบบ่อย",
      description: "Comprehensive FAQ covering daily market schedules, snake identification, local builders, and essential services. Everything you need to know for living in Sam Roi Yot.",
      descriptionTh: "คำถามที่พบบ่อยที่ครอบคลุมตารางเวลาตลาดรายวัน การระบุตัวตน และบริการที่จำเป็น",
      date: "Updated Monthly",
      dateTh: "อัปเดตทุกเดือน",
      category: "Practical",
      categoryTh: "ปฏิบัติ",
      link: "https://www.facebook.com/groups/friendsofsamroiyot/learning_content/",
      image: "❓"
    },
    {
      id: 5,
      title: "Local Fresh Market Schedule & Locations",
      titleTh: "ตารางเวลาและสถานที่ตลาดสดท้องถิ่น",
      description: "Daily market times and locations for fresh produce, seafood, and local goods. Get the best prices and freshest selection by visiting at the right time.",
      descriptionTh: "เวลาและสถานที่ตลาดรายวันสำหรับผลผลิตสดใหม่อาหารทะเลและสินค้าท้องถิ่น",
      date: "Daily",
      dateTh: "ทุกวัน",
      category: "Local Services",
      categoryTh: "บริการท้องถิ่น",
      link: "https://www.facebook.com/groups/friendsofsamroiyot/learning_content/",
      image: "🛒"
    },
    {
      id: 6,
      title: "Snake Identification & Relocation Info",
      titleTh: "การระบุตัวตนของงูและข้อมูลการย้ายถิ่น",
      description: "Important safety information about local snakes, how to identify them, and safe relocation procedures. Essential knowledge for living in Sam Roi Yot.",
      descriptionTh: "ข้อมูลความปลอดภัยที่สำคัญเกี่ยวกับงูท้องถิ่น วิธีการระบุตัวตน และขั้นตอนการย้ายถิ่นที่ปลอดภัย",
      date: "Reference",
      dateTh: "อ้างอิง",
      category: "Safety",
      categoryTh: "ความปลอดภัย",
      link: "https://www.facebook.com/groups/friendsofsamroiyot/learning_content/",
      image: "🐍"
    }
  ];

  const categoryColors: { [key: string]: string } = {
    "Community": "bg-blue-100 text-blue-800",
    "Activities": "bg-green-100 text-green-800",
    "Attractions": "bg-purple-100 text-purple-800",
    "Practical": "bg-orange-100 text-orange-800",
    "Local Services": "bg-pink-100 text-pink-800",
    "Safety": "bg-red-100 text-red-800",
    "ชุมชน": "bg-blue-100 text-blue-800",
    "กิจกรรม": "bg-green-100 text-green-800",
    "สถานที่ท่องเที่ยว": "bg-purple-100 text-purple-800",
    "ปฏิบัติ": "bg-orange-100 text-orange-800",
    "บริการท้องถิ่น": "bg-pink-100 text-pink-800",
    "ความปลอดภัย": "bg-red-100 text-red-800"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "en" ? "News & Updates" : "ข่าวสารและการอัปเดต"}
          </h1>
          <p className="text-xl text-blue-100">
            {language === "en"
              ? "Stay informed with the latest from our community"
              : "ติดตามข่าวสารล่าสุดจากชุมชนของเรา"}
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 text-4xl text-center">
                {item.image}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[language === "en" ? item.category : item.categoryTh]}`}>
                    {language === "en" ? item.category : item.categoryTh}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {language === "en" ? item.title : item.titleTh}
                </h3>
                <p className="text-slate-700 mb-4 flex-1">
                  {language === "en" ? item.description : item.descriptionTh}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {language === "en" ? item.date : item.dateTh}
                  </span>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {language === "en" ? "View on Facebook" : "ดูใน Facebook"}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* Facebook Group CTA */}
        <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 p-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            {language === "en" ? "Join the Community" : "เข้าร่วมชุมชน"}
          </h2>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
            {language === "en"
              ? "For the latest news, events, and community discussions, join our Facebook group with over 3,300 members from around the world."
              : "สำหรับข่าวสารล่าสุด เหตุการณ์ และการสนทนาชุมชน เข้าร่วมกลุ่ม Facebook ของเราที่มีสมาชิกกว่า 3,300 คนจากทั่วโลก"}
          </p>
          <a
            href="https://www.facebook.com/groups/friendsofsamroiyot/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Users className="w-5 h-5" />
            {language === "en" ? "Visit Facebook Group" : "ไปที่กลุ่ม Facebook"}
            <ExternalLink className="w-4 h-4" />
          </a>
        </Card>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {language === "en" ? "About This Page" : "เกี่ยวกับหน้านี้"}
          </h3>
          <p className="text-slate-700">
            {language === "en"
              ? "This page aggregates important news, guides, and updates from the Friends of Sam Roi Yot community. For real-time discussions and the latest posts, visit our Facebook group where our community actively shares experiences, tips, and local insights."
              : "หน้านี้รวบรวมข่าวสาร คู่มือ และการอัปเดตที่สำคัญจากชุมชน Friends of Sam Roi Yot สำหรับการสนทนาแบบเรียลไทม์และโพสต์ล่าสุด โปรดเยี่ยมชมกลุ่ม Facebook ของเรา"}
          </p>
        </div>
      </div>
    </div>
  );
}
