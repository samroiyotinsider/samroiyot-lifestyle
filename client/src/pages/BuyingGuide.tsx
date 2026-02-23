import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { YouTubeButton } from "@/components/YouTubeButton";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Link } from "wouter";

import { videoConfig } from "@/config/videos";

export default function BuyingGuide() {
  const { language, t } = useLanguage();

  const faqItems = [
    {
      title: t("Can Foreigners Own Property in Thailand?", "ชาวต่างชาติสามารถเป็นเจ้าของทรัพย์สินในไทยได้หรือไม่?"),
      videoKey: "faq1",
      icon: "🏠",
    },
    {
      title: t("Leasehold vs Freehold Explained", "อธิบาย Leasehold vs Freehold"),
      videoKey: "faq2",
      icon: "📋",
    },
    {
      title: t("True Costs of Buying Thailand Property", "ต้นทุนที่แท้จริงของการซื้อทรัพย์สินในไทย"),
      videoKey: "faq3",
      icon: "💰",
    },
    {
      title: t("Step-by-Step Buying Process", "กระบวนการซื้อทีละขั้นตอน"),
      videoKey: "faq4",
      icon: "✅",
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
                "Complete Guide to Buying Property in Thailand (2026)",
                "คู่มือฉบับสมบูรณ์ในการซื้อทรัพย์สินในไทย (2026)"
              )}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t(
                "Everything you need to know - legal structures, costs, process, and more",
                "ทุกสิ่งที่คุณต้องรู้ - โครงสร้างทางกฎหมาย ต้นทุน กระบวนการ และอื่น ๆ"
              )}
            </p>
          </div>

          {/* Main Video */}
          <div className="max-w-4xl mx-auto space-y-4">
            <VideoPlayer
              videoUrl={videoConfig.buyingGuideHero.s3Url}
              youtubeUrl={videoConfig.buyingGuideHero.youtubeUrl}
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



      {/* FAQ Grid Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t("Frequently Asked Questions", "คำถามที่พบบ่อย")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqItems.map((item, index) => {
              const videoData = videoConfig[item.videoKey as keyof typeof videoConfig];
              return (
                <div key={index} className="space-y-4">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
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
              "Ready to find your property?",
              "พร้อมที่จะหาทรัพย์สินของคุณแล้วหรือ?"
            )}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg" className="w-full sm:w-auto">
                {t("Explore Properties", "สำรวจทรัพย์สิน")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {t("Book Consultation", "จองการปรึกษา")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
