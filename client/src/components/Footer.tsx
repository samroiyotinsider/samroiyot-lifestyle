import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppQRModal } from "./WhatsAppQRModal";
import { LineQRModal } from "./LineQRModal";

export function Footer() {
  const { t } = useLanguage();
  const [showWhatsAppQR, setShowWhatsAppQR] = useState(false);
  const [showLineQR, setShowLineQR] = useState(false);

  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-primary">
              {t("Sam Roi Yot Insider", "แสนร้อยยอด อินไซเดอร์")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t(
                "Your Expert Guide to Thailand's Hidden Coastal Paradise",
                "คู่มือผู้เชี่ยวชาญสู่สวรรค์ชายฝั่งที่ซ่อนเร้นของไทย"
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("Quick Links", "ลิงก์ด่วน")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/area-guide" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("Area Guide", "คู่มือพื้นที่")}
                </Link>
              </li>
              <li>
                <Link href="/buying-guide" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("Buying Guide", "คู่มือการซื้อ")}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("Events", "เหตุการณ์")}
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("Properties", "ทรัพย์สิน")}
                </Link>
              </li>
              <li>
                <Link href="/concierge" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("Concierge", "บริการคอนเซียร์จ")}
                </Link>
              </li>
              <li>
                <Link href="/kits-corner" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("Kit's Corner", "มุมของคิท")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("About", "เกี่ยวกับเรา")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("Contact", "ติดต่อ")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("Contact", "ติดต่อ")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <a
                  href="mailto:samroiyot.th@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  samroiyot.th@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  {t(
                    "Sam Roi Yot, Prachuap Khiri Khan, Thailand",
                    "แสนร้อยยอด ประจวบคีรีขันธ์ ประเทศไทย"
                  )}
                </span>
              </li>
              <li className="space-y-2">
                <Button
                  onClick={() => setShowWhatsAppQR(true)}
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700 text-white mt-2"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t("WhatsApp", "WhatsApp")}
                </Button>
                <Button
                  onClick={() => setShowLineQR(true)}
                  size="sm"
                  className="w-full bg-[#00B900] hover:bg-[#00A000] text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t("Line", "Line")}
                </Button>
              </li>
            </ul>
          </div>

      <WhatsAppQRModal isOpen={showWhatsAppQR} onClose={() => setShowWhatsAppQR(false)} />
      <LineQRModal isOpen={showLineQR} onClose={() => setShowLineQR(false)} />
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {t("Sam Roi Yot Insider", "แสนร้อยยอด อินไซเดอร์")}.{" "}
            {t("All rights reserved.", "สงวนลิขสิทธิ์")}
          </p>
        </div>
      </div>
    </footer>
  );
}
