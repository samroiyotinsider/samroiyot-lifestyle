import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function AreaGuide() {
  const { language, t } = useLanguage();

  const topics = [
    {
      title: t("Best Beaches in Sam Roi Yot", "หาดที่ดีที่สุดในแสนร้อยยอด"),
      videoId: "PLACEHOLDER_BEACH_VIDEO",
      icon: "🏖️",
    },
    {
      title: t("Cost of Living Comparison", "เปรียบเทียบต้นทุนการครองชีพ"),
      videoId: "PLACEHOLDER_COST_VIDEO",
      icon: "💰",
    },
    {
      title: t("Things to Do & Activities", "สิ่งที่ต้องทำและกิจกรรม"),
      videoId: "PLACEHOLDER_ACTIVITIES_VIDEO",
      icon: "🎯",
    },
    {
      title: t("Khao Sam Roi Yot National Park", "อุทยานแห่งชาติขาวสามร้อยยอด"),
      videoId: "PLACEHOLDER_PARK_VIDEO",
      icon: "🏞️",
    },
    {
      title: t("Restaurants & Dining", "ร้านอาหารและการรับประทานอาหาร"),
      videoId: "PLACEHOLDER_DINING_VIDEO",
      icon: "🍽️",
    },
    {
      title: t("Healthcare & Expat Services", "สุขภาพและบริการสำหรับชาวต่างชาติ"),
      videoId: "PLACEHOLDER_HEALTH_VIDEO",
      icon: "🏥",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t(
                "Sam Roi Yot Area Guide - Everything You Need to Know",
                "คู่มือพื้นที่แสนร้อยยอด - ทุกสิ่งที่คุณต้องรู้"
              )}
            </h1>
          </div>

          {/* Main Video */}
          <div className="max-w-4xl mx-auto">
            <div className="video-container-large">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/PLACEHOLDER_AREA_OVERVIEW?rel=0&modestbranding=1"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic, index) => (
              <div key={index} className="space-y-4">
                <div className="text-4xl mb-2">{topic.icon}</div>
                <h3 className="text-xl font-semibold">{topic.title}</h3>
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${topic.videoId}?rel=0&modestbranding=1`}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t(
              "Thinking about relocating to Sam Roi Yot?",
              "กำลังคิดจะย้ายไปแสนร้อยยอดหรือ?"
            )}
          </h2>
          <Link href="/concierge">
            <Button size="lg">
              {t("Explore Concierge Services", "สำรวจบริการคอนเซียร์จ")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
