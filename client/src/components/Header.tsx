import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: t("Home", "หน้าแรก") },
    { href: "/area-guide", label: t("Area Guide", "คู่มือพื้นที่") },
    { href: "/buying-guide", label: t("Buying Guide", "คู่มือการซื้อ") },
    { href: "/events", label: t("Events", "เหตุการณ์") },
    { href: "/properties", label: t("Properties", "ทรัพย์สิน") },
    { href: "/concierge", label: t("Concierge", "บริการคอนเซียร์จ") },
    { href: "/kits-corner", label: t("Kit's Corner", "มุมของคิท") },
    { href: "/about", label: t("About", "เกี่ยวกับเรา") },
    { href: "/contact", label: t("Contact", "ติดต่อ") },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "th" : "en");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-primary">
          <span className="whitespace-nowrap md:whitespace-normal">{t("Sam Roi Yot Insider", "แสนร้อยยอด อินไซเดอร์")}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === item.href
                  ? "text-primary"
                  : "text-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="ml-2"
          >
            {language === "en" ? (
              <span className="h-4 w-4 mr-1">🇹🇭</span>
            ) : (
              <span className="h-4 w-4 mr-1">🇬🇧</span>
            )}
            {language === "en" ? "ไทย" : "EN"}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
          >
            {language === "en" ? "🇹🇭" : "🇬🇧"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                  location === item.href
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
