import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmailSignupFormProps {
  title?: string;
  description?: string;
  onSuccess?: (leadId: number) => void;
  className?: string;
}

export function EmailSignupForm({
  title = "Get Your Free Sam Roi Yot Insider Guide",
  description = "Discover the best beaches, visa tips, hidden spots, and insider secrets about living in Sam Roi Yot.",
  onSuccess,
  className = "",
}: EmailSignupFormProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const signupMutation = trpc.leads.signup.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signupMutation.mutateAsync({
        email,
        firstName: firstName || undefined,
        interestLevel: "casual_visitor",
      });

      if (result.success) {
        setSubmitted(true);
        setEmail("");
        setFirstName("");
        if (onSuccess && result.leadId) {
          onSuccess(result.leadId);
        }
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } else {
        setError(result.message || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error("[EmailSignupForm] Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    en: {
      title,
      description,
      firstName: "First Name (Optional)",
      email: "Email Address",
      subscribe: "Get Free Guide",
      success: "Check your email for your free guide!",
      error: "Something went wrong",
    },
    th: {
      title: "รับคู่มือ Sam Roi Yot Insider ฟรี",
      description: "ค้นพบหาดที่ดีที่สุด เคล็ดลับวีซ่า สถานที่ลับ และความลับของการอยู่อาศัยใน Sam Roi Yot",
      firstName: "ชื่อจริง (ไม่บังคับ)",
      email: "ที่อยู่อีเมล",
      subscribe: "รับคู่มือฟรี",
      success: "ตรวจสอบอีเมลของคุณเพื่อรับคู่มือฟรี!",
      error: "มีบางอย่างผิดพลาด",
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <Card className={`p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 ${className}`}>
      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t.description}
        </p>

        {submitted ? (
          <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-3 rounded">
            <p className="font-semibold">{t.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder={t.firstName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder={t.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-800 dark:text-red-200 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Subscribing..." : t.subscribe}
            </Button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {language === "en"
                ? "We respect your privacy. Unsubscribe at any time."
                : "เรารักษาความเป็นส่วนตัวของคุณ ยกเลิกการสมัครสมาชิกได้ตลอดเวลา"}
            </p>
          </form>
        )}
      </div>
    </Card>
  );
}
