import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { YouTubeButton } from "@/components/YouTubeButton";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { EmailSignupForm } from "@/components/EmailSignupForm";
import { videoConfig } from "@/config/videos";

export default function BuyingGuide() {
  const { language, t } = useLanguage();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqItems = [
    {
      question: t("Can Foreigners Own Property in Thailand?", "ชาวต่างชาติสามารถเป็นเจ้าของทรัพย์สินในไทยได้หรือไม่?"),
      videoId: "PLACEHOLDER_FAQ_1",
      summary: t(
        "Foreigners can own land and buildings in Thailand, but with certain restrictions. Learn about freehold vs leasehold options.",
        "ชาวต่างชาติสามารถเป็นเจ้าของที่ดินและอาคารในไทยได้ แต่มีข้อจำกัดบางประการ เรียนรู้เกี่ยวกับตัวเลือก freehold และ leasehold"
      ),
    },
    {
      question: t("Leasehold vs Freehold Explained", "อธิบาย Leasehold vs Freehold"),
      videoId: "PLACEHOLDER_FAQ_2",
      summary: t(
        "Understand the differences between leasehold (30-year renewable) and freehold ownership, and which is right for you.",
        "เข้าใจความแตกต่างระหว่าง leasehold (30 ปีต่ออายุได้) และ freehold และอันไหนเหมาะสมกับคุณ"
      ),
    },
    {
      question: t("True Costs of Buying Thailand Property", "ต้นทุนที่แท้จริงของการซื้อทรัพย์สินในไทย"),
      videoId: "PLACEHOLDER_FAQ_3",
      summary: t(
        "Beyond the purchase price: transfer fees, taxes, legal costs, and ongoing expenses you need to budget for.",
        "นอกเหนือจากราคาซื้อ: ค่าโอน ภาษี ค่าทำความเห็น และค่าใช้จ่ายอื่น ๆ ที่คุณต้องคำนวณ"
      ),
    },
    {
      question: t("Step-by-Step Buying Process", "กระบวนการซื้อทีละขั้นตอน"),
      videoId: "PLACEHOLDER_FAQ_4",
      summary: t(
        "Complete walkthrough of the Thai property buying process from initial viewing to final registration.",
        "คำแนะนำที่สมบูรณ์ของกระบวนการซื้อทรัพย์สินไทยตั้งแต่การชมครั้งแรกจนถึงการลงทะเบียนสุดท้าย"
      ),
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

      {/* Email Capture Section */}
      <section className="py-12 md:py-16 bg-card border-y">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {t(
                "Download Free Thailand Property Buyer's Guide (PDF)",
                "ดาวน์โหลด Thailand Property Buyer's Guide ฟรี (PDF)"
              )}
            </h2>
            <p className="text-muted-foreground">
              {t(
                "30-page comprehensive guide with checklists, legal frameworks, and cost breakdowns",
                "คู่มือฉบับสมบูรณ์ 30 หน้าพร้อมรายการตรวจสอบ กรอบกฎหมาย และการแบ่งต้นทุน"
              )}
            </p>
          </div>

          {/* Email Form */}
          <EmailSignupForm
            title={t(
              "Download Free Thailand Property Buyer's Guide (PDF)",
              "ดาวน์โหลด Thailand Property Buyer's Guide ฟรี (PDF)"
            )}
            description={t(
              "30-page comprehensive guide with checklists, legal frameworks, and cost breakdowns",
              "คู่มือฉบับสมบูรณ์ 30 หน้าพร้อมรายการตรวจสอบ กรอบกฎหมาย และการแบ่งต้นทุน"
            )}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t("Frequently Asked Questions", "คำถามที่พบบ่อย")}
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-card/80 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-left">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedFAQ === index && (
                  <div className="px-6 py-6 bg-background border-t space-y-4">
                    <VideoPlayer
                      videoUrl={videoConfig[`faq${index + 1}` as keyof typeof videoConfig]?.s3Url || ""}
                      youtubeUrl={videoConfig[`faq${index + 1}` as keyof typeof videoConfig]?.youtubeUrl || ""}
                      autoplay={false}
                      controls={true}
                      showYouTubeButton={true}
                      youtubeButtonLabel={t("Watch Full Video on YouTube", "ดูวิดีโอเต็มบน YouTube")}
                      youtubeButtonSize="sm"
                      youtubeButtonVariant="secondary"
                    />
                    <p className="text-muted-foreground">{item.summary}</p>
                  </div>
                )}
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
