import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { PropertyMap } from "@/components/PropertyMap";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
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
        "Thank you for contacting us! We'll respond within 24 hours.",
        "ขอบคุณที่ติดต่อเรา! เราจะตอบกลับภายใน 24 ชั่วโมง"
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
      inquiryType: "general",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="container text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            {t("Contact Us", "ติดต่อเรา")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t(
              "Get in touch with our team. We're here to answer your questions about properties, lifestyle, and relocation to Sam Roi Yot.",
              "ติดต่อทีมงานของเรา เราพร้อมตอบคำถามของคุณเกี่ยวกับทรัพย์สิน ไลฟ์สไตล์ และการย้ายถิ่นไปยังแสนร้อยยอด"
            )}
          </p>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("Get in Touch", "ติดต่อเรา")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t("Email", "อีเมล")}</p>
                      <a
                        href="mailto:samroiyot.th@gmail.com"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        samroiyot.th@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t("Location", "ที่ตั้ง")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t(
                          "Sam Roi Yot, Prachuap Khiri Khan, Thailand",
                          "แสนร้อยยอด ประจวบคีรีขันธ์ ประเทศไทย"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <p className="font-medium">{t("Instant Messaging", "ข้อความทันที")}</p>
                  <div className="space-y-2">
                    <a
                      href="https://wa.me/66123456789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm w-full justify-center"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <a
                      href="https://line.me/ti/p/~samroiyotlifestyle"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#00B900] text-white rounded-md hover:bg-[#00A000] transition-colors text-sm w-full justify-center"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Line
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("Office Hours", "เวลาทำการ")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("Monday - Friday", "จันทร์ - ศุกร์")}</span>
                  <span className="font-medium">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("Saturday", "เสาร์")}</span>
                  <span className="font-medium">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("Sunday", "อาทิตย์")}</span>
                  <span className="font-medium">{t("By appointment", "ตามนัดหมาย")}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("Send us a Message", "ส่งข้อความถึงเรา")}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Fill out the form below and we'll get back to you as soon as possible",
                    "กรอกแบบฟอร์มด้านล่างและเราจะติดต่อกลับโดยเร็วที่สุด"
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
                        placeholder={t("Your name", "ชื่อของคุณ")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t("Phone", "โทรศัพท์")}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t("Your phone number", "หมายเลขโทรศัพท์ของคุณ")}
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
                      placeholder={t("your.email@example.com", "อีเมลของคุณ@example.com")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">{t("Message", "ข้อความ")} *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={8}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t(
                        "Tell us how we can help you...",
                        "บอกเราว่าเราสามารถช่วยคุณได้อย่างไร..."
                      )}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={inquiryMutation.isPending}>
                    {inquiryMutation.isPending
                      ? t("Sending...", "กำลังส่ง...")
                      : t("Send Message", "ส่งข้อความ")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>{t("Find Us", "ค้นหาเรา")}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Sam Roi Yot is located in Prachuap Khiri Khan province, approximately 45km south of Hua Hin",
                  "แสนร้อยยอดตั้งอยู่ในจังหวัดประจวบคีรีขันธ์ ห่างจากหัวหินประมาณ 45 กิโลเมตรทางใต้"
                )}
              </p>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden">
                <PropertyMap
                  latitude="12.2833"
                  longitude="99.9500"
                  title="Sam Roi Yot Lifestyle Office"
                  address="622 ถนน 4020 Tambon Sam Roi Yot, Sam Roi Yot District, Prachuap Khiri Khan 77120"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
