import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, MapPin, Heart } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            {t("About Sam Roi Yot Insider", "เกี่ยวกับแสนร้อยยอด อินไซเดอร์")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t(
              "Your trusted partner for properties, lifestyle, and relocation services in Sam Roi Yot, Thailand",
              "พันธมิตรที่เชื่อถือได้ของคุณสำหรับทรัพย์สิน ไลฟ์สไตล์ และบริการย้ายถิ่นในแสนร้อยยอด ประเทศไทย"
            )}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("Our Story", "เรื่องราวของเรา")}
          </h2>
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p>
              {t(
                "Sam Roi Yot Insider was founded with a simple mission: to help people discover and settle into one of Thailand's most beautiful and underrated coastal areas. We fell in love with Sam Roi Yot's serene beaches, stunning national park, and welcoming community, and we wanted to share this hidden gem with others seeking a better quality of life.",
                "แสนร้อยยอด ไลฟ์สไตล์ก่อตั้งขึ้นด้วยภารกิจง่ายๆ: เพื่อช่วยให้ผู้คนค้นพบและตั้งรกรากในหนึ่งในพื้นที่ชายฝั่งที่สวยงามและถูกประเมินค่าต่ำที่สุดของประเทศไทย เราตกหลุมรักชายหาดที่เงียบสงบของแสนร้อยยอด อุทยานแห่งชาติที่สวยงาม และชุมชนที่อบอุ่น และเราต้องการแบ่งปันอัญมณีที่ซ่อนอยู่นี้กับผู้อื่นที่แสวงหาคุณภาพชีวิตที่ดีขึ้น"
              )}
            </p>
            <p>
              {t(
                "Whether you're a wealthy Thai looking for a weekend escape, an international expat seeking retirement paradise, or an investor searching for affordable beachfront opportunities, we provide comprehensive support every step of the way. From property selection to visa assistance and settling-in services, we're here to make your Sam Roi Yot journey seamless and enjoyable.",
                "ไม่ว่าคุณจะเป็นคนไทยที่ร่ำรวยที่มองหาการหลบหนีช่วงสุดสัปดาห์ ชาวต่างชาติที่แสวงหาสวรรค์เกษียณ หรือนักลงทุนที่มองหาโอกาสริมชายหาดในราคาที่เหมาะสม เรามอบการสนับสนุนที่ครอบคลุมทุกขั้นตอน ตั้งแต่การเลือกทรัพย์สินไปจนถึงความช่วยเหลือด้านวีซ่าและบริการตั้งรกราก เราพร้อมที่จะทำให้การเดินทางของคุณในแสนร้อยยอดราบรื่นและสนุกสนาน"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("Why Choose Us", "ทำไมต้องเลือกเรา")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  {t("Local Expertise", "ความเชี่ยวชาญในท้องถิ่น")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Deep knowledge of Sam Roi Yot properties, neighborhoods, and lifestyle opportunities",
                    "ความรู้ลึกซึ้งเกี่ยวกับทรัพย์สิน ย่านใกล้เคียง และโอกาสในการใช้ชีวิตในแสนร้อยยอด"
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">
                  {t("Personalized Service", "บริการส่วนบุคคล")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Tailored support for your unique needs, from property search to full relocation assistance",
                    "การสนับสนุนที่ปรับแต่งตามความต้องการเฉพาะของคุณ ตั้งแต่การค้นหาทรัพย์สินไปจนถึงความช่วยเหลือในการย้ายถิ่นแบบเต็มรูปแบบ"
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">
                  {t("Trusted Partnerships", "ความร่วมมือที่เชื่อถือได้")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Established relationships with property owners, legal advisors, and service providers",
                    "ความสัมพันธ์ที่ดีกับเจ้าของทรัพย์สิน ที่ปรึกษากฎหมาย และผู้ให้บริการ"
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  {t("Passion for Sam Roi Yot", "ความหลงใหลในแสนร้อยยอด")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "We live here and love it. Our genuine enthusiasm for the area shines through in everything we do",
                    "เราอาศัยอยู่ที่นี่และรักที่นี่ ความกระตือรือร้นที่แท้จริงของเราต่อพื้นที่นี้สะท้อนให้เห็นในทุกสิ่งที่เราทำ"
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("What We Do", "สิ่งที่เราทำ")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <h3 className="text-xl font-semibold text-primary">
                {t("Properties", "ทรัพย์สิน")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Curated listings of condos, houses, villas, and land with transparent pricing and detailed information",
                  "รายการคัดสรรของคอนโด บ้าน วิลล่า และที่ดินพร้อมราคาที่โปร่งใสและข้อมูลโดยละเอียด"
                )}
              </p>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-xl font-semibold text-secondary">
                {t("Lifestyle", "ไลฟ์สไตล์")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Insider guides to beaches, dining, activities, and the expat community in Sam Roi Yot",
                  "คู่มือภายในเกี่ยวกับชายหาด การรับประทานอาหาร กิจกรรม และชุมชนชาวต่างชาติในแสนร้อยยอด"
                )}
              </p>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-xl font-semibold text-accent">
                {t("Concierge", "คอนเซียร์จ")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Full relocation support including visas, transportation, and settling-in assistance",
                  "การสนับสนุนการย้ายถิ่นแบบเต็มรูปแบบรวมถึงวีซ่า การขนส่ง และความช่วยเหลือในการตั้งรกราก"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
