import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Plane, Car, FileText, Home, CreditCard, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Concierge() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const inquiryMutation = trpc.inquiries.create.useMutation({
    onSuccess: () => {
      toast.success(t(
        "Thank you! We'll contact you soon to discuss your needs.",
        "ขอบคุณ! เราจะติดต่อคุณเร็วๆ นี้เพื่อหารือเกี่ยวกับความต้องการของคุณ"
      ));
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: () => {
      toast.error(t("Failed to send inquiry. Please try again.", "ไม่สามารถส่งคำถามได้ กรุณาลองอีกครั้ง"));
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
        "ประสบการณ์ที่คัดสรรมาแล้ว รวมถึงทัวร์จักรยาน การผจญภัยพายเรือ ชั้นเรียนการทำอาหาร ทัวร์ตลาด การเดินป่า และการถ่ายภาพพระอาทิตย์ตกดิน เราจองพันธมิตรท้องถิ่นที่เชื่อถือได้เพื่อประสบการณ์ที่แท้จริง"
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
        "คำแนะนำเกี่ยวกับวีซ่าไทยแลนด์เอลิท/พริวิเลจ การต่ออายุวีซ่าเกษียณ และความช่วยเหลือในการสมัคร เราช่วยนำทางข้อกำหนดการตรวจคนเข้าเมืองของไทยอย่างราบรื่น"
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
        "รับส่งสนามบิน การเช่ารถระยะยาว บริการแท็กซี่และคนขับ และตัวเลือกสกู๊ตเตอร์ เดินทางไปรอบๆ แสนร้อยยอดและพื้นที่อื่นๆ ได้อย่างสะดวก"
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
        "การตั้งค่าบัญชีธนาคาร ซิมการ์ดและสาธารณูปโภค คำแนะนำประกันสุขภาพ และการปฐมนิเทศท้องถิ่น เราทำให้การเปลี่ยนผ่านของคุณไปยังประเทศไทยราบรื่น"
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
              "From visa applications to finding your dream home—we handle every detail of your Sam Roi Yot relocation.",
              "ผู้ช่วยการย้ายถิ่นส่วนบุคคลของคุณในแสนร้อยยอด เราจัดการวีซ่า การขนส่ง และการตั้งรกรากเพื่อให้คุณสามารถมุ่งเน้นไปที่การเพลิดเพลินกับชีวิตใหม่ของคุณในประเทศไทย"
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

      {/* Premium Package Highlight */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">
                {t("Premium Relocation Package", "แพ็คเกจการย้ายถิ่นพรีเมียม")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-lg text-muted-foreground">
                {t(
                  "Get personalized, end-to-end support for your move to Sam Roi Yot. From visa applications to finding your perfect home, we're with you every step of the way.",
                  "รับการสนับสนุนส่วนบุคคลแบบครบวงจรสำหรับการย้ายของคุณไปยังแสนร้อยยอด ตั้งแต่การสมัครวีซ่าไปจนถึงการหาบ้านที่สมบูรณ์แบบของคุณ เราอยู่กับคุณทุกขั้นตอน"
                )}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    {t("Included Services", "บริการที่รวมอยู่")}
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t("Full visa assistance", "ความช่วยเหลือวีซ่าแบบเต็ม")}</li>
                    <li>• {t("Airport transfers", "รับส่งสนามบิน")}</li>
                    <li>• {t("Property viewings", "การดูทรัพย์สิน")}</li>
                    <li>• {t("Bank & utilities setup", "การตั้งค่าธนาคารและสาธารณูปโภค")}</li>
                    <li>• {t("Local area tours", "ทัวร์พื้นที่ท้องถิ่น")}</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    {t("Ongoing Support", "การสนับสนุนอย่างต่อเนื่อง")}
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t("24/7 emergency contact", "ติดต่อฉุกเฉิน 24/7")}</li>
                    <li>• {t("Translation services", "บริการแปล")}</li>
                    <li>• {t("Healthcare guidance", "คำแนะนำด้านสุขภาพ")}</li>
                    <li>• {t("Expat community intro", "การแนะนำชุมชนชาวต่างชาติ")}</li>
                    <li>• {t("Monthly check-ins", "การตรวจสอบรายเดือน")}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-16 bg-background">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">
                {t("Request a Consultation", "ขอคำปรึกษา")}
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                {t(
                  "Tell us about your relocation plans and we'll get back to you within 24 hours",
                  "บอกเราเกี่ยวกับแผนการย้ายถิ่นของคุณและเราจะติดต่อกลับภายใน 24 ชั่วโมง"
                )}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t("Name", "ชื่อ")} *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("Phone", "โทรศัพท์")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">{t("Email", "อีเมล")} *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="message">{t("Tell us about your needs", "บอกเราเกี่ยวกับความต้องการของคุณ")} *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t(
                      "I'm planning to relocate to Sam Roi Yot and need help with...",
                      "ฉันวางแผนที่จะย้ายไปยังแสนร้อยยอดและต้องการความช่วยเหลือเกี่ยวกับ..."
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={inquiryMutation.isPending}>
                  {inquiryMutation.isPending
                    ? t("Sending...", "กำลังส่ง...")
                    : t("Request Consultation", "ขอคำปรึกษา")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
