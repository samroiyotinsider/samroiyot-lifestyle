import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Plane, Car, FileText, Home, CreditCard, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { WhatsAppQRModal } from "@/components/WhatsAppQRModal";

export default function Concierge() {
  const { t } = useLanguage();
  const [showWhatsAppQR, setShowWhatsAppQR] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const inquiryMutation = trpc.inquiries.create.useMutation({
    onSuccess: () => {
      toast.success(t(
        "Thank you! We'll contact you soon.",
        "ขอบคุณ! เราจะติดต่อคุณเร็วๆ นี้"
      ));
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: () => {
      toast.error(t("Failed to send message. Please try again.", "ไม่สามารถส่งข้อความได้ กรุณาลองอีกครั้ง"));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inquiryMutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
      inquiryType: "concierge",
    });
  };

  const services = [
    {
      icon: FileText,
      title: t("Activities & Tours", "กิจกรรมและทัวร์"),
      description: t(
        "Curated experiences including biking tours, kayaking adventures, cooking classes, market tours, hiking, and sunset photography. We book trusted local partners for authentic experiences.",
        "ประสบการณ์ที่คัดสรรมาแล้ว รวมถึงทัวร์จักรยาน การผจญภัยพายเรือ ชั้นเรียนการทำอาหาร ทัวร์ตลาด การเดินป่า และการถ่ายภาพพระอาทิตย์ตกดิน"
      ),
      features: [
        t("Biking & hiking tours", "ทัวร์จักรยานและเดินป่า"),
        t("Kayaking & boat tours", "ทัวร์พายเรือและเรือ"),
        t("Cooking classes & market tours", "ชั้นเรียนการทำอาหารและทัวร์ตลาด"),
        t("Photography & sunset tours", "ทัวร์ถ่ายภาพและพระอาทิตย์ตกดิน"),
      ],
    },
    {
      icon: FileText,
      title: t("Visa & Immigration", "วีซ่าและการตรวจคนเข้าเมือง"),
      description: t(
        "Thailand Elite/Privilege Visa guidance, retirement visa extensions, and application assistance. We help navigate Thai immigration requirements smoothly.",
        "คำแนะนำเกี่ยวกับวีซ่าไทยแลนด์เอลิท การต่ออายุวีซ่าเกษียณ และความช่วยเหลือในการสมัคร"
      ),
      features: [
        t("Thailand Elite Visa consultation", "คำปรึกษาวีซ่าไทยแลนด์เอลิท"),
        t("Retirement visa extensions", "การต่ออายุวีซ่าเกษียณ"),
        t("Document preparation", "การเตรียมเอกสาร"),
        t("Immigration office liaison", "การประสานงานสำนักงานตรวจคนเข้าเมือง"),
      ],
    },
    {
      icon: Car,
      title: t("Transportation", "การขนส่ง"),
      description: t(
        "Airport transfers, long-term car rentals, taxi and driver services, and scooter options. Get around Sam Roi Yot and beyond with ease.",
        "รับส่งสนามบิน การเช่ารถระยะยาว บริการแท็กซี่และคนขับ และตัวเลือกสกู๊ตเตอร์"
      ),
      features: [
        t("Airport pickup/drop-off", "รับ/ส่งสนามบิน"),
        t("Monthly car rentals", "การเช่ารถรายเดือน"),
        t("Private driver services", "บริการคนขับส่วนตัว"),
        t("Scooter/motorcycle rentals", "การเช่าสกู๊ตเตอร์/มอเตอร์ไซค์"),
      ],
    },
    {
      icon: Home,
      title: t("Settling-In Support", "การสนับสนุนการตั้งรกราก"),
      description: t(
        "Bank account setup, SIM cards and utilities, health insurance guidance, and local orientation. We make your transition to Thailand seamless.",
        "การตั้งค่าบัญชีธนาคาร ซิมการ์ดและสาธารณูปโภค คำแนะนำประกันสุขภาพ และการปฐมนิเทศท้องถิ่น"
      ),
      features: [
        t("Bank account opening", "การเปิดบัญชีธนาคาร"),
        t("Utility connections", "การเชื่อมต่อสาธารณูปโภค"),
        t("Health insurance advice", "คำแนะนำประกันสุขภาพ"),
        t("Local area orientation", "การปฐมนิเทศพื้นที่ท้องถิ่น"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-24">
        <div className="container text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold">
            {t("Your Seamless Transition to Paradise", "การเปลี่ยนผ่านที่ราบรื่นสู่สวรรค์")}
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-medium">
            {t(
              "From activities and tours to visa applications and settling in—we handle every detail of your Sam Roi Yot experience.",
              "จากกิจกรรมและทัวร์ไปจนถึงการสมัครวีซ่าและการตั้งรกราก เราจัดการทุกรายละเอียดของประสบการณ์แสนร้อยยอดของคุณ"
            )}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container space-y-12">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Card key={idx} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="bg-primary/5 p-8 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <div className="md:col-span-2 p-8 space-y-6">
                    <p className="text-lg text-muted-foreground">{service.description}</p>
                    <div>
                      <h4 className="font-semibold mb-3">{t("What we offer:", "สิ่งที่เรานำเสนอ:")}</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Direct Booking CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container max-w-3xl">
          <Card className="border-2 border-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl">
                {t("Ready to Book?", "พร้อมที่จะจอง?")}
              </CardTitle>
              <p className="text-xl text-muted-foreground mt-4">
                {t(
                  "Call us directly for immediate assistance",
                  "โทรหาเราโดยตรงเพื่อรับความช่วยเหลือทันที"
                )}
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Phone CTA */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Phone className="h-8 w-8 text-primary" />
                  <a href="tel:+66922746524" className="text-4xl font-bold text-primary hover:underline">
                    +66 092-2746524
                  </a>
                </div>
                <p className="text-lg text-muted-foreground">
                  {t("Khun Kitty (Aor) | Thai / English", "คุณกิตติ (อ้อ) | ไทย / อังกฤษ")}
                </p>
              </div>

              {/* Incentive Message */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-lg text-center">
                  {t("Special Offer", "ข้อเสนอพิเศษ")}
                </h3>
                <p className="text-center text-muted-foreground">
                  {t(
                    "Mention our website and receive a complementary gift from our web developer upon your arrival in Sam Roi Yot!",
                    "พูดถึงเว็บไซต์ของเราและรับของขวัญฟรีจากนักพัฒนาเว็บของเราเมื่อคุณมาถึงแสนร้อยยอด!"
                  )}
                </p>
              </div>

              {/* Service Hours */}
              <div className="text-center space-y-2 text-sm text-muted-foreground">
                <p>{t("Available for consultations and bookings", "พร้อมให้คำปรึกษาและจองบริการ")}</p>
                <p>{t("WhatsApp, Phone, or Email", "WhatsApp, โทรศัพท์, หรืออีเมล")}</p>
                <Button
                  onClick={() => setShowWhatsAppQR(true)}
                  className="w-full bg-green-600 hover:bg-green-700 mt-2"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t("WhatsApp", "WhatsApp")}
                </Button>
              </div>

              {/* Alternative Contact */}
              <div className="border-t pt-6 space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  {t("Prefer to send a message first?", "ต้องการส่งข้อความก่อนหรือไม่?")}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm">{t("Name", "ชื่อ")} *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm">{t("Phone", "โทรศัพท์")} *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">{t("Email", "อีเมล")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm">{t("Your message", "ข้อความของคุณ")} *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="text-sm"
                      placeholder={t(
                        "Tell us what services you're interested in...",
                        "บอกเราว่าคุณสนใจบริการใด..."
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={inquiryMutation.isPending}>
                    {inquiryMutation.isPending
                      ? t("Sending...", "กำลังส่ง...")
                      : t("Send Message", "ส่งข้อความ")}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <WhatsAppQRModal isOpen={showWhatsAppQR} onClose={() => setShowWhatsAppQR(false)} />
    </div>
  );
}
