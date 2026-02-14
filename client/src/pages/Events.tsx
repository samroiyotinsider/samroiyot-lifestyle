import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Events() {
  const { language, t } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  // Fetch events from API
  const { data: apiEvents, isLoading: isLoadingApi } = trpc.events.getAll.useQuery({
    category: selectedCategory || undefined,
    source: selectedSource as any || undefined,
  });

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
    ]
  };

  // Use API events if available, otherwise fall back to static events
  const currentEvents = apiEvents && apiEvents.length > 0 ? apiEvents.map(e => ({
    id: e.id,
    title: e.title,
    month: new Date(e.startDate).toLocaleString('en-US', { month: 'long' }),
    date: new Date(e.startDate).toLocaleDateString(),
    description: e.description || '',
    location: e.location || '',
    attendees: '?',
    type: e.category,
    youtubeUrl: e.youtubeUrl,
    price: e.price,
    commissionRate: e.commissionRate,
    affiliateLink: e.affiliateLink,
    source: e.source,
  })) : (language === "en" ? events.en : events.th);

  const months = ["all", "January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];

  const typeColors: { [key: string]: string } = {
    "Festival": "bg-purple-100 text-purple-800",
    "Community": "bg-blue-100 text-blue-800",
    "Social": "bg-green-100 text-green-800",
    "Activity": "bg-orange-100 text-orange-800",
    "Educational": "bg-pink-100 text-pink-800",
    "Day Time": "bg-yellow-100 text-yellow-800",
    "Night Time": "bg-indigo-100 text-indigo-800",
    "Eating Out": "bg-red-100 text-red-800",
    "Adventure": "bg-green-100 text-green-800",
    "Live Music": "bg-pink-100 text-pink-800",
    "Market": "bg-blue-100 text-blue-800",
  };

  const filteredEvents = selectedMonth === "all" 
    ? currentEvents 
    : currentEvents.filter((event: any) => event.month === selectedMonth);

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
              ? "Discover what's happening in Sam Roi Yot - Live Events & YouTube Previews"
              : "ค้นพบว่ามีอะไรเกิดขึ้นในสามร้อยยอด"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Source Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            {language === "en" ? "Filter by Source:" : "ตัวกรองตามแหล่ง:"}
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedSource(null)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedSource === null
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300"
              }`}
            >
              {language === "en" ? "All Sources" : "ทั้งหมด"}
            </button>
            <button
              onClick={() => setSelectedSource("visitsamroiyot")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedSource === "visitsamroiyot"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300"
              }`}
            >
              Visit Sam Roi Yot
            </button>
            <button
              onClick={() => setSelectedSource("partner")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedSource === "partner"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300"
              }`}
            >
              {language === "en" ? "Partner Events" : "กิจกรรมของพาร์ทเนอร์"}
            </button>
          </div>
        </div>

        {/* Month Filter */}
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
        {isLoadingApi ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-slate-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredEvents.map((event: any) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* YouTube Video Preview */}
                {event.youtubeUrl && (
                  <div className="relative bg-black h-48 flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                    <a
                      href={event.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="z-10 hover:scale-110 transition-transform"
                    >
                      <Play className="w-16 h-16 text-white opacity-80 hover:opacity-100" />
                    </a>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 flex-1">
                      {event.title}
                    </h3>
                    <div className="flex gap-2 ml-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${typeColors[event.type] || 'bg-slate-100 text-slate-800'}`}>
                        {event.type}
                      </span>
                      {event.source && (
                        <Badge variant="outline">
                          {event.source === "visitsamroiyot" ? "VSY" : event.source === "partner" ? "Partner" : "Our Event"}
                        </Badge>
                      )}
                    </div>
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
                    {event.price && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>THB {event.price.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-4 h-4" />
                      <span>{language === "en" ? "Expected attendees:" : "ผู้เข้าร่วมที่คาดหวัง:"} {event.attendees}</span>
                    </div>
                  </div>

                  {event.commissionRate && (
                    <div className="bg-amber-50 border border-amber-200 rounded p-2 text-xs text-amber-800 mb-4">
                      💰 {event.commissionRate}% commission on bookings
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      {language === "en" ? "Book Now" : "จองเลย"}
                    </button>
                    {event.affiliateLink && (
                      <a
                        href={event.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Link
                      </a>
                    )}
                  </div>
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
