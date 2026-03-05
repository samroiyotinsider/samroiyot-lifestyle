import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Bed, Bath, Square, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { WhatsAppQRModal } from '@/components/WhatsAppQRModal';
import { LineQRModal } from '@/components/LineQRModal';
import { trpc } from '@/lib/trpc';

export default function AboutKit() {
  const { language, t } = useLanguage();
  const [showWhatsAppQR, setShowWhatsAppQR] = useState(false);
  const [showLineQR, setShowLineQR] = useState(false);
  const { data: allProperties } = trpc.properties.list.useQuery({});
  const featuredPropsFromDB = allProperties?.filter(p => p.featured)?.slice(0, 3) || [];

  const content = {
    en: {
      // Hero Section
      heroTitle: "About Kit",
      heroSubtitle: "The Sam Roi Yot Insider",
      heroIntro: "Born and raised in Sam Roi Yot, I help property owners in our village connect with international buyers and renters. I know this area, the people, and what makes each property special.",

      // Who is Kit Section
      whoTitle: "Local Knowledge, International Reach",
      whoParagraphs: [
        "I'm Kit, a Sam Roi Yot native who has watched our quiet coastal village transform over the past decade.",
        "What started as a few property owners asking for help listing their homes has grown into a mission: showcase Sam Roi Yot's unique properties to people around the world who are looking for authentic Thailand.",
        "I work with property owners who want professional representation. Each property gets detailed video analysis created by an experienced content creator, giving you complete transparency before you ever contact me.",
        "My role is simple: I connect serious buyers and renters with property owners, coordinate viewings, and provide local support throughout the process. All transactions are handled through licensed Thai lawyers—I facilitate, they execute."
      ],

      // Featured Properties Section
      featuredTitle: "Featured Properties",
      featuredSubtitle: "Each property includes complete video analysis on YouTube",
      viewingPrompt: "Interested in viewing a property? Contact me below.",

      // Short-Term Rentals Section
      rentalTitle: "Short-Term Stays in Sam Roi Yot",
      rentalIntro: "Looking for a place to stay while exploring the area? I also manage select short-term rentals.",
      
      // Airbnb Details
      airbnbName: "Punoi Bungalow",
      airbnbType: "Entire Home",
      airbnbGuests: "2 guests",
      airbnbBeds: "1 bedroom",
      airbnbBaths: "1 bathroom",
      airbnbSize: "Cozy beachfront bungalow",
      airbnbDescription: "Relax in a peaceful place near the mountains and beautiful Sam Roi Yot Beach. Designed for comfort and authenticity with genuine Thai hospitality.",
      airbnbLink: "View on Airbnb",
      airbnbUrl: "https://www.airbnb.com/rooms/1594194240398038277",

      // Contact Section
      contactTitle: "Get in Touch",
      contactIntro: "Whether you're interested in buying, renting, or just have questions about Sam Roi Yot, I'm here to help.",
      whatsappLabel: "WhatsApp",
      whatsappText: "Scan to message on WhatsApp",
      lineLabel: "Line",
      lineText: "Scan to add on Line",
      emailLabel: "Email",
      emailAddress: "samroiyot.th@gmail.com",
      emailSubtext: "I respond within 24 hours",
      languageNote: "I speak Thai and English fluently.",

      // Footer
      footerText: "Sam Roi Yot Insider showcases properties in Sam Roi Yot, Thailand. Property owners work directly with buyers through licensed Thai legal professionals. Kit provides local coordination and introductions.",
      footerVideoLine: "All video content available on YouTube:",
      youtubeLink: "Sam Roi Yot Insider"
    },
    th: {
      // Hero Section
      heroTitle: "เกี่ยวกับคิท",
      heroSubtitle: "การเชื่อมต่อท้องถิ่นสามร้อยยอดของคุณ",
      heroIntro: "เกิดและเติบโตในสามร้อยยอด ฉันช่วยเจ้าของทรัพย์สินในหมู่บ้านของเราเชื่อมต่อกับผู้ซื้อและผู้เช่าระหว่างประเทศ ฉันรู้พื้นที่นี้ คนที่นี่ และสิ่งที่ทำให้ทรัพย์สินแต่ละแห่งพิเศษ",

      // Who is Kit Section
      whoTitle: "ความรู้ท้องถิ่น ความเข้าถึงระหว่างประเทศ",
      whoParagraphs: [
        "ฉันคือคิท ชาวบ้านสามร้อยยอดที่ได้เห็นหมู่บ้านชายฝั่งที่เงียบสงบของเราเปลี่ยนแปลงไปในช่วงสิบปีที่ผ่านมา",
        "สิ่งที่เริ่มต้นจากเจ้าของทรัพย์สินไม่กี่คนขอความช่วยเหลือในการลงทะเบียนบ้านของพวกเขาได้กลายเป็นภารกิจ: แสดงให้เห็นทรัพย์สินที่ไม่ซ้ำใครของสามร้อยยอดให้กับผู้คนทั่วโลกที่กำลังมองหาไทยแท้",
        "ฉันทำงานกับเจ้าของทรัพย์สินที่ต้องการการแทนค่าที่เป็นมืออาชีพ ทรัพย์สินแต่ละแห่งได้รับการวิเคราะห์วิดีโอโดยละเอียดที่สร้างโดยผู้สร้างเนื้อหาที่มีประสบการณ์ ซึ่งให้ความโปร่งใสอย่างสมบูรณ์ก่อนที่คุณจะติดต่อฉัน",
        "บทบาทของฉันนั้นง่าย: ฉันเชื่อมต่อผู้ซื้อและผู้เช่าที่จริงจังกับเจ้าของทรัพย์สิน ประสานงานการดู และให้การสนับสนุนท้องถิ่นตลอดกระบวนการ การทำธุรกรรมทั้งหมดดำเนินการผ่านนักกฎหมายไทยที่ได้รับใบอนุญาต—ฉันอำนวยความสะดวก พวกเขาดำเนินการ"
      ],

      // Featured Properties Section
      featuredTitle: "ทรัพย์สินที่โดดเด่น",
      featuredSubtitle: "ทรัพย์สินแต่ละแห่งรวมการวิเคราะห์วิดีโอที่สมบูรณ์บน YouTube",
      viewingPrompt: "สนใจดูทรัพย์สิน? ติดต่อฉันด้านล่าง",

      // Short-Term Rentals Section
      rentalTitle: "การพักระยะสั้นในสามร้อยยอด",
      rentalIntro: "กำลังมองหาที่พักขณะสำรวจพื้นที่? ฉันยังจัดการการเช่าระยะสั้นที่เลือกสรรมา",
      
      // Airbnb Details
      airbnbName: "บังกะโลพูนอย",
      airbnbType: "บ้านทั้งหลัง",
      airbnbGuests: "2 ท่าน",
      airbnbBeds: "1 ห้องนอน",
      airbnbBaths: "1 ห้องน้ำ",
      airbnbSize: "บังกะโลชายฝั่งที่สะดวกสบาย",
      airbnbDescription: "ผ่อนคลายในสถานที่สงบสุขใกล้ภูเขาและหาดสามร้อยยอดที่สวยงาม ออกแบบมาเพื่อความสะดวกสบายและความแท้จริงด้วยการต้อนรับแบบไทยแท้",
      airbnbLink: "ดูใน Airbnb",
      airbnbUrl: "https://www.airbnb.com/rooms/1594194240398038277",

      // Contact Section
      contactTitle: "ติดต่อ",
      contactIntro: "ไม่ว่าคุณสนใจในการซื้อ การเช่า หรือมีคำถามเกี่ยวกับสามร้อยยอด ฉันพร้อมที่จะช่วยเหลือ",
      whatsappLabel: "WhatsApp",
      whatsappText: "สแกนเพื่อส่งข้อความบน WhatsApp",
      lineLabel: "Line",
      lineText: "สแกนเพื่อเพิ่มใน Line",
      emailLabel: "อีเมล",
      emailAddress: "samroiyot.th@gmail.com",
      emailSubtext: "ฉันตอบกลับภายใน 24 ชั่วโมง",
      languageNote: "ฉันพูดภาษาไทยและอังกฤษได้อย่างคล่องแคล่ว",

      // Footer
      footerText: "Sam Roi Yot Insider แสดงทรัพย์สินในสามร้อยยอด ประเทศไทย เจ้าของทรัพย์สินทำงานโดยตรงกับผู้ซื้อผ่านมืออาชีพกฎหมายไทยที่ได้รับใบอนุญาต คิทให้การประสานงานท้องถิ่นและการแนะนำ",
      footerVideoLine: "เนื้อหาวิดีโอทั้งหมดพร้อมใช้งานบน YouTube:",
      youtubeLink: "Sam Roi Yot Insider"
    }
  };

  const currentContent = content[language as keyof typeof content];



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white">
        <div className="text-center px-4 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">{currentContent.heroTitle}</h1>
          <h2 className="text-2xl font-semibold mb-6 text-blue-100 italic">{currentContent.heroSubtitle}</h2>
          <p className="text-lg leading-relaxed">{currentContent.heroIntro}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Who is Kit Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">{currentContent.whoTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              {currentContent.whoParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-lg text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-2 text-gray-900">{currentContent.featuredTitle}</h2>
          <p className="text-lg text-gray-600 mb-8 italic">{currentContent.featuredSubtitle}</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredPropsFromDB.map((property) => {
              let images: string[] = [];
              if (typeof property.images === 'string') {
                try {
                  images = JSON.parse(property.images);
                } catch (e) {
                  images = [];
                }
              } else if (Array.isArray(property.images)) {
                images = property.images;
              }
              
              return (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition">
                  <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img src={images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400'} alt={property.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{property.title}</h3>
                    <p className="text-2xl font-bold text-blue-600 mb-3">€{property.priceEur?.toLocaleString() || property.price?.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
                    <Link href={`/properties/${property.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center py-8 border-t border-b">
            <p className="text-lg text-gray-700">{currentContent.viewingPrompt}</p>
          </div>
        </section>

        {/* Short-Term Rentals Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-2 text-gray-900">{currentContent.rentalTitle}</h2>
          <p className="text-lg text-gray-600 mb-8">{currentContent.rentalIntro}</p>

          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Image */}
              <div className="h-80 bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src="/punoi-bungalow.png" alt="Punoi Bungalow" className="w-full h-full object-cover" />
              </div>

              {/* Right: Details */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-gray-900">{currentContent.airbnbName}</h3>
                  <p className="text-gray-600 mb-6">{currentContent.airbnbType}</p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Bed className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{currentContent.airbnbBeds}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bath className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{currentContent.airbnbBaths}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{currentContent.airbnbGuests}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{currentContent.airbnbDescription}</p>
                </div>

                <a href={currentContent.airbnbUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg">
                    {currentContent.airbnbLink} →
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-2 text-gray-900">{currentContent.contactTitle}</h2>
          <p className="text-lg text-gray-600 mb-12">{currentContent.contactIntro}</p>

          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-center">
            {/* WhatsApp */}
            <Button
              onClick={() => setShowWhatsAppQR(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {currentContent.whatsappLabel}
            </Button>

            {/* Line */}
            <Button
              onClick={() => setShowLineQR(true)}
              className="bg-[#00B900] hover:bg-[#00A000] text-white px-8 py-6 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {currentContent.lineLabel}
            </Button>

            {/* Email */}
            <a href={`mailto:${currentContent.emailAddress}`} className="text-blue-600 hover:text-blue-700 font-bold text-lg">
              {currentContent.emailAddress}
            </a>
          </div>

          <div className="text-center py-8 border-t border-b">
            <p className="text-lg text-gray-700">{currentContent.languageNote}</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-600">
          <p className="leading-relaxed mb-4">
            {currentContent.footerText}
          </p>
          <p className="leading-relaxed">
            {currentContent.footerVideoLine}{" "}
            <a
              href="https://youtube.com/@SamRoiYotinsider"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {currentContent.youtubeLink}
            </a>
          </p>
        </footer>
      </div>

      <WhatsAppQRModal isOpen={showWhatsAppQR} onClose={() => setShowWhatsAppQR(false)} />
      <LineQRModal isOpen={showLineQR} onClose={() => setShowLineQR(false)} />
    </div>
  );
}
