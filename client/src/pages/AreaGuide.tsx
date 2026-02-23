import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { YouTubeButton } from "@/components/YouTubeButton";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Link } from "wouter";
import { videoConfig } from "@/config/videos";

export default function AreaGuide() {
  const { language, t } = useLanguage();

  const topics = [
    {
      title: t("Best Beaches in Sam Roi Yot", "หาดที่ดีที่สุดในแสนร้อยยอด"),
      videoKey: "beaches",
      icon: "🏖️",
    },
    {
      title: t("Cost of Living Comparison", "เปรียบเทียบต้นทุนการครองชีพ"),
      videoKey: "costOfLiving",
      icon: "💰",
    },
    {
      title: t("Things to Do & Activities", "สิ่งที่ต้องทำและกิจกรรม"),
      videoKey: "activities",
      icon: "🎯",
    },
    {
      title: t("Khao Sam Roi Yot National Park", "อุทยานแห่งชาติขาวสามร้อยยอด"),
      videoKey: "nationalPark",
      icon: "🏞️",
    },
    {
      title: t("Restaurants & Dining", "ร้านอาหารและการรับประทานอาหาร"),
      videoKey: "dining",
      icon: "🍽️",
    },
    {
      title: t("Healthcare & Expat Services", "สุขภาพและบริการสำหรับชาวต่างชาติ"),
      videoKey: "healthcare",
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
          <div className="max-w-4xl mx-auto space-y-4">
            <VideoPlayer
              videoUrl={videoConfig.areaGuideHero.s3Url}
              youtubeUrl={videoConfig.areaGuideHero.youtubeUrl}
              autoplay={false}
              controls={true}
              showYouTubeButton={true}
              youtubeButtonLabel={t("Watch Full Video on YouTube", "ดูวิดีโอเต็มบน YouTube")}
              youtubeButtonSize="default"
              youtubeButtonVariant="secondary"
            />
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic, index) => {
              const videoData = videoConfig[topic.videoKey as keyof typeof videoConfig];
              return (
                <div key={index} className="space-y-4">
                  <div className="text-4xl mb-2">{topic.icon}</div>
                  <h3 className="text-xl font-semibold">{topic.title}</h3>
                  <VideoPlayer
                    videoUrl={videoData?.s3Url || ""}
                    youtubeUrl={videoData?.youtubeUrl || ""}
                    autoplay={false}
                    controls={true}
                    showYouTubeButton={true}
                    youtubeButtonLabel={t("Watch Full Video on YouTube", "ดูวิดีโอเต็มบน YouTube")}
                    youtubeButtonSize="sm"
                    youtubeButtonVariant="secondary"
                  />
                </div>
              );
            })}
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
