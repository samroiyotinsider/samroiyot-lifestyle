import { SEO, schemas } from "@/components/SEO";
import { YouTubeButton } from "@/components/YouTubeButton";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Home as HomeIcon, Users, Palmtree, ArrowRight, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import { videoConfig } from "@/config/videos";

export default function Home() {
  const { language } = useLanguage();
  const { data: allProperties, isLoading } = trpc.properties.list.useQuery({});
  const properties = allProperties?.filter(p => p.featured) || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    { image: "/hero-dolphin-bay-beach.jpg", alt: "Dolphin Bay Beach" },
    { image: "/hero-national-park.jpg", alt: "Khao Sam Roi Yot National Park" },
    { image: "/hero-luxury-villa.jpg", alt: "Luxury Villa with Pool" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const content = {
    en: {
      heroTitle: "Sam Roi Yot – Thailand's Last True Coastal Secret",
      heroSubtitle: "Where Nature Meets Luxury Living & Smart Investment",
      browseProp: "Browse Properties",
      relocation: "Relocation Services",
      trustPillar1: "Curated Exclusive Properties",
      trustPillar1Desc: "Hand-selected beachfront homes, luxury villas, and prime land",
      trustPillar2: "Seamless Relocation & Visa Support",
      trustPillar2Desc: "Elite visa assistance, bank setup, and settling-in services",
      trustPillar3: "Experience the Lifestyle First",
      trustPillar3Desc: "Private viewings, area tours, and local community introductions",
      featuredTitle: "Featured Exclusive Properties",
      featuredDesc: "Discover our curated selection of premium properties in Sam Roi Yot",
      viewAll: "View All Properties",
      whySRY: "Why Sam Roi Yot?",
      whyDesc: "Escape the crowds of Phuket and Pattaya. Sam Roi Yot offers pristine beaches, dramatic limestone mountains, world-class national parks, and a peaceful expat community—all within 4 hours of Bangkok.",
      benefit1: "Untouched Natural Beauty",
      benefit1Desc: "Dolphin Bay beaches, Phraya Nakhon Cave, and Khao Sam Roi Yot National Park",
      benefit2: "Strategic Location",
      benefit2Desc: "45 minutes to Hua Hin, 4 hours to Bangkok, 3hr 40min to airport (264km)",
      benefit3: "Growing Expat Community",
      benefit3Desc: "English-speaking services, international restaurants, and welcoming locals",
      benefit4: "Smart Investment",
      benefit4Desc: "Rising property values, tourism growth, and government infrastructure projects",
      ctaTitle: "Ready to Discover Your Paradise?",
      ctaDesc: "Let us guide you through properties, visas, and relocation—your journey starts here.",
      contactUs: "Contact Us Today",

      watchFullVideo: "Watch Full Video on YouTube",
    },
    th: {
      heroTitle: "สามร้อยยอด – ความลับชายฝั่งที่แท้จริงของไทย",
      heroSubtitle: "ที่ซึ่งธรรมชาติพบกับการใช้ชีวิตหรูหราและการลงทุนที่ชาญฉลาด",
      browseProp: "ดูอสังหาริมทรัพย์",
      relocation: "บริการย้ายถิ่นฐาน",
      trustPillar1: "อสังหาริมทรัพย์พิเศษที่คัดสรร",
      trustPillar1Desc: "บ้านติดชายหาด วิลล่าหรูหรา และที่ดินเลิศพิเศษที่คัดสรรมาอย่างดี",
      trustPillar2: "การย้ายถิ่นฐานและการสนับสนุนวีซ่าที่ราบรื่น",
      trustPillar2Desc: "ความช่วยเหลือด้านวีซ่าระดับพรีเมียม การตั้งค่าธนาคาร และบริการตั้งรกราก",
      trustPillar3: "สัมผัสไลฟ์สไตล์ก่อน",
      trustPillar3Desc: "การชมแบบส่วนตัว ทัวร์พื้นที่ และการแนะนำชุมชนท้องถิ่น",
      featuredTitle: "อสังหาริมทรัพย์พิเศษแนะนำ",
      featuredDesc: "ค้นพบคอลเลกชันอสังหาริมทรัพย์พรีเมียมที่คัดสรรมาในสามร้อยยอด",
      viewAll: "ดูอสังหาริมทรัพย์ทั้งหมด",
      whySRY: "ทำไมต้องสามร้อยยอด?",
      whyDesc: "หนีความแออัดของภูเก็ตและพัทยา สามร้อยยอดมีชายหาดที่บริสุทธิ์ ภูเขาหินปูนที่น่าทึ่ง อุทยานแห่งชาติระดับโลก และชุมชนชาวต่างชาติที่สงบ—ทั้งหมดอยู่ห่างจากกรุงเทพฯ เพียง 2.5 ชั่วโมง",
      benefit1: "ความงามทางธรรมชาติที่ไม่ถูกแตะต้อง",
      benefit1Desc: "ชายหาดดอลฟินเบย์ ถ้ำพระยานคร และอุทยานแห่งชาติเขาสามร้อยยอด",
      benefit2: "ทำเลที่ตั้งเชิงกลยุทธ์",
      benefit2Desc: "45 นาทีถึงหัวหิน 2.5 ชั่วโมงถึงกรุงเทพฯ 3 ชม 40 นาทีถึงสนามบิน (264 กม)",
      benefit3: "ชุมชนชาวต่างชาติที่เติบโต",
      benefit3Desc: "บริการภาษาอังกฤษ ร้านอาหารนานาชาติ และคนท้องถิ่นที่ต้อนรับ",
      benefit4: "การลงทุนที่ชาญฉลาด",
      benefit4Desc: "มูลค่าอสังหาริมทรัพย์ที่เพิ่มขึ้น การเติบโตของการท่องเที่ยว และโครงการโครงสร้างพื้นฐานของรัฐบาล",
      ctaTitle: "พร้อมที่จะค้นพบสวรรค์ของคุณหรือยัง?",
      ctaDesc: "ให้เราแนะนำคุณผ่านอสังหาริมทรัพย์ วีซ่า และการย้ายถิ่นฐาน—การเดินทางของคุณเริ่มต้นที่นี่",
      contactUs: "ติดต่อเราวันนี้",
      watchFullVideo: "ดูวิดีโอแบบเต็มบน YouTube",
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen">
      <SEO
        title="Sam Roi Yot Beachfront Properties & Relocation"
        description="Discover your dream beachfront property in Sam Roi Yot, Thailand. Affordable luxury condos, villas, and houses. Full relocation and concierge services."
        keywords="Sam Roi Yot real estate, beachfront property Thailand, Hua Hin properties, Thailand retirement, expat living Thailand, Sam Roi Yot condos, beach houses Thailand, property investment Thailand"
        schema={schemas.realEstateAgent}
      />
      {/* Video Hero Section */}
      <section className="relative hero-video-section">
        <div className="video-wrapper">
          <VideoPlayer
            videoUrl={videoConfig.hero.s3Url}
            youtubeUrl={videoConfig.hero.youtubeUrl}
            autoplay={true}
            controls={false}
            showYouTubeButton={false}
            loop={true}
            className="w-full h-full"
          />
        </div>
        
        <div className="hero-overlay">
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="tagline">{t.heroSubtitle}</p>
          <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                {t.browseProp} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t.featuredTitle}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.featuredDesc}
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-64 bg-muted" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties?.slice(0, 3).map((property) => (
                <Link key={property.id} href={`/properties/${property.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer h-full">
                    <div className="relative h-64 overflow-hidden">
                      {property.featured && (
                        <div className="absolute top-4 left-4 z-10 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current" />
                          EXCLUSIVE
                        </div>
                      )}
                      <img
                        src={property.images?.[0] || "/placeholder-property.jpg"}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-2xl font-bold text-primary mb-2">
                        {property.priceEur ? `€${property.priceEur.toLocaleString()}` : `${property.price?.toLocaleString()} THB`}
                      </p>
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {property.description}
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{property.bedrooms} Beds</span>
                        <span>{property.bathrooms} Baths</span>
                        <span>{property.sizeSqm} m²</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/properties">
              <Button size="lg" variant="outline">
                {t.viewAll} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t.ctaDesc}
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              {t.contactUs} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>


    </div>
  );
}
