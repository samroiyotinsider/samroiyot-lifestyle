import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Events() {
  const { language, t } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState("all");

  const events = {
    en: [
      {
        id: 1,
        title: "Songkran Festival - Thai New Year",
        month: "April",
        date: "April 13-15",
        description: "Traditional Thai New Year celebration with water splashing, temple visits, and community gatherings throughout Sam Roi Yot.",
        location: "Sam Roi Yot Town & Temples",
        attendees: "500+",
        type: "Festival"
      },
      {
        id: 2,
        title: "Loy Krathong Festival",
        month: "November",
        date: "November (Full Moon)",
        description: "Beautiful festival where locals and visitors float decorated baskets on water to pay respects and release negativity.",
        location: "Beaches & Rivers",
        attendees: "300+",
        type: "Festival"
      },
      {
        id: 3,
        title: "Community Beach Cleanup",
        month: "Monthly",
        date: "Last Saturday of Month",
        description: "Regular community effort to keep our beaches clean and pristine. All welcome to participate.",
        location: "Various Beaches",
        attendees: "50-100",
        type: "Community"
      },
      {
        id: 4,
        title: "Expat Social Meetup",
        month: "Weekly",
        date: "Friday Evenings",
        description: "Casual gathering of expats and locals at local restaurants and beach spots. Great way to meet people and make friends.",
        location: "Local Restaurants",
        attendees: "20-50",
        type: "Social"
      },
      {
        id: 5,
        title: "Hiking & Nature Exploration",
        month: "Weekly",
        date: "Saturday Mornings",
        description: "Guided hikes through Khao Sam Roi Yot National Park with experienced local guides. All fitness levels welcome.",
        location: "Khao Sam Roi Yot National Park",
        attendees: "10-30",
        type: "Activity"
      },
      {
        id: 6,
        title: "Local Market Tour",
        month: "Monthly",
        date: "First Sunday of Month",
        description: "Guided tour of daily fresh markets with local guide explaining produce, prices, and local specialties.",
        location: "Central Market",
        attendees: "15-25",
        type: "Educational"
      },
      {
        id: 7,
        title: "Sunset Photography Walk",
        month: "Weekly",
        date: "Wednesday Evenings",
        description: "Casual walk to scenic sunset spots perfect for photography. Photographers and nature lovers welcome.",
        location: "Various Beaches",
        attendees: "10-20",
        type: "Activity"
      },
      {
        id: 8,
        title: "Thai Cooking Class",
        month: "Monthly",
        date: "Varies",
        description: "Learn to prepare authentic Thai dishes from experienced local instructors. Includes market visit and recipe book.",
        location: "Local Kitchen",
        attendees: "8-12",
        type: "Educational"
      }
    ],
    th: [
      {
        id: 1,
        title: "เทศกาลสงกรานต์ - ปีใหม่ไทย",
        month: "เมษายน",
        date: "13-15 เมษายน",
        description: "การฉลองปีใหม่ไทยแบบดั้งเดิมพร้อมการฉีดน้ำ การเยี่ยมวัด และการรวมตัวของชุมชน",
        location: "เมืองสามร้อยยอดและวัด",
        attendees: "500+",
        type: "เทศกาล"
      },
      {
        id: 2,
        title: "เทศกาลลอยกระทง",
        month: "พฤศจิกายน",
        date: "พฤศจิกายน (วันเพ็ญ)",
        description: "เทศกาลสวยงามที่ชาวบ้านและนักท่องเที่ยวลอยกระทงประดับบนน้ำ",
        location: "หาดและแม่น้ำ",
        attendees: "300+",
        type: "เทศกาล"
      },
      {
        id: 3,
        title: "ทำความสะอาดชายหาดชุมชน",
        month: "รายเดือน",
        date: "วันเสาร์สุดท้ายของเดือน",
        description: "ความพยายามของชุมชนในการรักษาหาดให้สะอาดและสวยงาม ทุกคนยินดีต้อนรับ",
        location: "หาดต่างๆ",
        attendees: "50-100",
        type: "ชุมชน"
      },
      {
        id: 4,
        title: "การพบปะของชาวต่างชาติ",
        month: "รายสัปดาห์",
        date: "เย็นวันศุกร์",
        description: "การพบปะอย่างไม่เป็นทางการของชาวต่างชาติและชาวบ้านท้องถิ่น",
        location: "ร้านอาหารท้องถิ่น",
        attendees: "20-50",
        type: "สังคม"
      }
    ]
  };

  const currentEvents = language === "en" ? events.en : events.th;

  const months = ["all", "January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];

  const typeColors: { [key: string]: string } = {
    "Festival": "bg-purple-100 text-purple-800",
    "Community": "bg-blue-100 text-blue-800",
    "Social": "bg-green-100 text-green-800",
    "Activity": "bg-orange-100 text-orange-800",
    "Educational": "bg-pink-100 text-pink-800",
    "เทศกาล": "bg-purple-100 text-purple-800",
    "ชุมชน": "bg-blue-100 text-blue-800",
    "สังคม": "bg-green-100 text-green-800",
    "กิจกรรม": "bg-orange-100 text-orange-800",
    "การศึกษา": "bg-pink-100 text-pink-800"
  };

  const filteredEvents = selectedMonth === "all" 
    ? currentEvents 
    : currentEvents.filter(event => event.month === selectedMonth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "en" ? "Events & Activities" : "เหตุการณ์และกิจกรรม"}
          </h1>
          <p className="text-xl text-blue-100">
            {language === "en"
              ? "Discover what's happening in Sam Roi Yot"
              : "ค้นพบว่ามีอะไรเกิดขึ้นในสามร้อยยอด"}
          </p>
        </div>
      </div>

      {/* Month Filter */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            {language === "en" ? "Filter by Month:" : "ตัวกรองตามเดือน:"}
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedMonth("all")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedMonth === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300"
              }`}
            >
              {language === "en" ? "All Events" : "ทั้งหมด"}
            </button>
            {months.slice(1).map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedMonth === month
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 flex-1">
                      {event.title}
                    </h3>
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${typeColors[event.type]}`}>
                      {event.type}
                    </span>
                  </div>

                  <p className="text-slate-700 mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-4 h-4" />
                      <span>{language === "en" ? "Expected attendees:" : "ผู้เข้าร่วมที่คาดหวัง:"} {event.attendees}</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    {language === "en" ? "Learn More" : "เรียนรู้เพิ่มเติม"}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              {language === "en" ? "No events found for this month." : "ไม่พบเหตุการณ์สำหรับเดือนนี้"}
            </p>
          </div>
        )}

        {/* Facebook Group CTA */}
        <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 p-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            {language === "en" ? "Stay Updated" : "ติดตามข่าวสาร"}
          </h2>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
            {language === "en"
              ? "For real-time event announcements and community discussions, join our Facebook group."
              : "สำหรับการประกาศเหตุการณ์แบบเรียลไทม์และการสนทนาชุมชน เข้าร่วมกลุ่ม Facebook ของเรา"}
          </p>
          <a
            href="https://www.facebook.com/groups/friendsofsamroiyot/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {language === "en" ? "Join Facebook Group" : "เข้าร่วมกลุ่ม Facebook"}
            <ExternalLink className="w-4 h-4" />
          </a>
        </Card>
      </div>
    </div>
  );
}
