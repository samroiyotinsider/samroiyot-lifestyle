import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestWhatsApp?: boolean;
}

export function AIChatbot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: language === "th"
        ? "สวัสดีค่ะ! ฉันเป็นผู้ช่วยของ Sam Roi Yot Lifestyle ฉันสามารถช่วยคุณเกี่ยวกับทรัพย์สิน วีซ่า การย้ายถิ่น และการใช้ชีวิตในสามร้อยยอด มีอะไรให้ฉันช่วยไหมคะ?"
        : "Hello! I'm the Sam Roi Yot Lifestyle assistant. I can help you with properties, visas, relocation, and living in Sam Roi Yot. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessageMutation = trpc.chatbot.sendMessage.useMutation({
    onSuccess: (data) => {
      const assistantMessage: Message = {
        role: "assistant",
        content: typeof data.message === "string" ? data.message : "",
        suggestWhatsApp: data.suggestWhatsApp,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
    onError: (error) => {
      console.error("[Chatbot] Error:", error);
      toast.error(
        language === "th"
          ? "ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
          : "Sorry, something went wrong. Please try again."
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            language === "th"
              ? "ขออภัย ฉันไม่สามารถประมวลผลคำถามของคุณได้ในขณะนี้ กรุณาติดต่อทีมงานของเราผ่าน WhatsApp"
              : "I'm sorry, I couldn't process your question. Please contact our team via WhatsApp for assistance.",
          suggestWhatsApp: true,
        },
      ]);
    },
  });

  const handleSend = async () => {
    if (!input.trim() || sendMessageMutation.isPending) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const messageText = input;
    setInput("");

    // Call the backend LLM API
    sendMessageMutation.mutate({
      message: messageText,
      language: language as "en" | "th",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <CardTitle className="text-lg">
          {t("Chat with Us", "แชทกับเรา")}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, idx) => (
              <div key={idx}>
                <div
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>

              </div>
            ))}
            {sendMessageMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("Type your message...", "พิมพ์ข้อความของคุณ...")}
              disabled={sendMessageMutation.isPending}
            />
            <Button
              onClick={handleSend}
              size="icon"
              disabled={!input.trim() || sendMessageMutation.isPending}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
