import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, ExternalLink, AlertCircle } from "lucide-react";
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Events() {
  const { language, t } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch events from API (scraped from visitsamroiyot.com)
  const { data: apiEvents = [], isLoading } = trpc.events.getAll.useQuery({
    category: selectedCategory || undefined,
  });

  // Static fallback events for when API is empty
  const staticEvents = {
    en: [
      {
        id: "static-1",
        title: "Songkran Festival - Thai New Year",
        month: "April",
        date: "April 13-15",
        description: "Traditional Thai New Year celebration with water splashing, temple visits, and community gatherings throughout Sam Roi Yot.",
        location: "Sam Roi Yot Town & Temples",
        category: "Festival",
        source: "internal",
      },
      {
        id: "static-2",
        title: "Loy Krathong Festival",
        month: "November",
        date: "November (Full Moon)",
        description: "Beautiful festival where locals and visitors float decorated baskets on water to pay respects and release negativity.",
        location: "Beaches & Rivers",
        category: "Festival",
        source: "internal",
      },
      {
        id: "static-3",
        title: "Dolphin Watching Tours",
        month: "Year-round",
        date: "Daily departures",
        description: "See dolphins in their natural habitat at Dolphin Bay. Best in early morning. Tours include snorkeling and beach time.",
        location: "Dolphin Bay",
        category: "Adventure",
        source: "internal",
      },
      {
        id: "static-4",
        title: "Kayaking in Mangrove Forests",
        month: "Year-round",
        date: "Daily tours available",
        description: "Paddle through pristine mangrove forests and explore hidden caves. Suitable for all skill levels.",
        location: "Mangrove Forest",
        category: "Adventure",
        source: "internal",
      },
      {
        id: "static-5",
        title: "Mountain Biking Trails",
        month: "Year-round",
        date: "Guided tours daily",
        description: "Explore scenic trails through Sam Roi Yot National Park. Routes for beginners to advanced riders.",
        location: "National Park Trails",
        category: "Adventure",
        source: "internal",
      },
      {
        id: "static-6",
        title: "Thai Cooking Classes",
        month: "Year-round",
        date: "Daily classes",
        description: "Learn to cook authentic Thai cuisine from local chefs. Includes market visit and meal preparation.",
        location: "Local Kitchen",
        category: "Experience",
        source: "internal",
      },
    ],
    th: [
      {
        id: "static-1",
        title: "เทศกาลสงกรานต์ - ปีใหม่ไทย",
        month: "เมษายน",
        date: "13-15 เมษายน",
        description: "การฉลองปีใหม่ไทยแบบดั้งเดิมพร้อมการฉีดน้ำ การเยี่ยมวัด และการรวมตัวของชุมชน",
        location: "เมืองสามร้อยยอดและวัด",
        category: "เทศกาล",
        source: "internal",
      },
      {
        id: "static-2",
        title: "เทศกาลลอยกระทง",
        month: "พฤศจิกายน",
        date: "พฤศจิกายน (วันเพ็ญ)",
        description: "เทศกาลที่สวยงามที่ผู้คนลอยกระทงบนน้ำเพื่อแสดงความเคารพและปล่อยให้ความเศร้า",
        location: "ชายหาดและแม่น้ำ",
        category: "เทศกาล",
        source: "internal",
      },
      {
        id: "static-3",
        title: "ทัวร์ชมโลมาที่อ่าวโลมา",
        month: "ตลอดปี",
        date: "ออกเดินทางทุกวัน",
        description: "ชมโลมาในสภาพแวดล้อมธรรมชาติที่อ่าวโลมา ดีที่สุดในตอนเช้า ทัวร์รวมการดำน้ำและเวลาที่ชายหาด",
        location: "อ่าวโลมา",
        category: "ผจญภัย",
        source: "internal",
      },
    ],
  };

  // Combine API events with static events
  const allEvents = useMemo(() => {
    const combined = apiEvents.length > 0 ? apiEvents : (language === "en" ? staticEvents.en : staticEvents.th);
    
    // Filter by month if selected
    if (selectedMonth !== "all") {
      return combined.filter(event => {
        const eventMonth = (event as any).startDate ? new Date((event as any).startDate).toLocaleString('en-US', { month: 'long' }) : "";
        return eventMonth === selectedMonth || (event as any).month === selectedMonth;
      });
    }
    
    return combined;
  }, [apiEvents, language, selectedMonth]);

  const months = ["all", "January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];

  const categories = useMemo(() => {
    const cats = new Set(allEvents.map(e => e.category || (e as any).type));
    return Array.from(cats).sort();
  }, [allEvents]);

  const typeColors: { [key: string]: string } = {
    "Festival": "bg-purple-100 text-purple-800",
    "เทศกาล": "bg-purple-100 text-purple-800",
    "Adventure": "bg-green-100 text-green-800",
    "ผจญภัย": "bg-green-100 text-green-800",
    "Experience": "bg-orange-100 text-orange-800",
    "ประสบการณ์": "bg-orange-100 text-orange-800",
    "Community": "bg-blue-100 text-blue-800",
    "ชุมชน": "bg-blue-100 text-blue-800",
    "Dining": "bg-red-100 text-red-800",
    "ร้านอาหาร": "bg-red-100 text-red-800",
    "Market": "bg-yellow-100 text-yellow-800",
    "ตลาด": "bg-yellow-100 text-yellow-800",
    "Day Time": "bg-cyan-100 text-cyan-800",
    "Live Music": "bg-pink-100 text-pink-800",
    "Night Time": "bg-indigo-100 text-indigo-800",
  };

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      if (selectedCategory && event.category !== selectedCategory && (event as any).type !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [allEvents, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{t("Events & Activities", "เหตุการณ์และกิจกรรม")}</h1>
          <p className="text-lg opacity-90">
            {t("Discover what's happening in Sam Roi Yot - Updated from local sources", "ค้นพบว่าเกิดอะไรขึ้นในสามร้อยยอด - อัปเดตจากแหล่งข้อมูลท้องถิ่น")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto py-12 px-4">
        {/* Filters */}
        <div className="mb-8">
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-foreground/70">
              {t("Filter by Category", "กรองตามหมวดหมู่")}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                {t("All Categories", "ทั้งหมด")}
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Month Filter */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-foreground/70">
              {t("Filter by Month", "กรองตามเดือน")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {months.map(month => (
                <Button
                  key={month}
                  variant={selectedMonth === month ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMonth(month)}
                >
                  {month === "all" ? t("All Events", "ทั้งหมด") : month}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="mb-8">
          <p className="text-sm text-foreground/60 mb-4">
            {t("Showing", "แสดง")} {filteredEvents.length} {t("events", "เหตุการณ์")}
          </p>

          {filteredEvents.length === 0 ? (
            <Card className="p-8 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-foreground/40" />
              <p className="text-foreground/60">
                {t("No events found for this filter", "ไม่พบเหตุการณ์สำหรับตัวกรองนี้")}
              </p>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <Badge className={typeColors[event.category || (event as any).type] || "bg-gray-100 text-gray-800"}>
                        {event.category || (event as any).type}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                      {event.title || (event as any).titleTh}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-foreground/70 mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4 text-sm">
                      {((event as any).startDate || (event as any).date) && (
                        <div className="flex items-center gap-2 text-foreground/60">
                          <Calendar className="h-4 w-4" />
                          <span>{(event as any).startDate ? new Date((event as any).startDate).toLocaleDateString() : (event as any).date}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-foreground/60">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Source Info */}
                    {event.source && event.source !== "internal" && (
                      <div className="mb-4 p-2 bg-blue-50 rounded text-xs text-blue-700">
                        {t("From", "จาก")}: {event.source === "visitsamroiyot" ? "Visit Sam Roi Yot" : event.source}
                      </div>
                    )}

                    {/* Contact Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        const message = `Hi, I'm interested in: ${event.title}`;
                        window.location.href = `https://wa.me/66922746524?text=${encodeURIComponent(message)}`;
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t("Get Details", "รับรายละเอียด")}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <Card className="bg-blue-50 border-blue-200 p-6">
          <h3 className="font-semibold mb-2">{t("Event Information", "ข้อมูลเหตุการณ์")}</h3>
          <p className="text-sm text-foreground/70 mb-3">
            {t("Events are updated regularly from local sources and our community. For the most up-to-date information, contact the organizers directly via WhatsApp.", "เหตุการณ์ได้รับการอัปเดตเป็นประจำจากแหล่งข้อมูลท้องถิ่นและชุมชนของเรา สำหรับข้อมูลล่าสุด โปรดติดต่อผู้จัดการจัดเรียงโดยตรงผ่าน WhatsApp")}
          </p>
          <p className="text-sm text-foreground/70">
            {t("Join our Facebook community for real-time event announcements:", "เข้าร่วมชุมชน Facebook ของเราเพื่อรับประกาศเหตุการณ์แบบเรียลไทม์:")}
            <a href="https://www.facebook.com/groups/friendsofsam" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
              Friends of Sam Roi Yot
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
