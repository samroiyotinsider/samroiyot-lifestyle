import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";

const REVENUE_KEYWORDS = [
  // Property transactions
  "buy", "purchase", "viewing", "visit property", "available", "book", "reserve",
  "interested in", "want to buy", "looking to buy",
  // Services (revenue-generating)
  "bike rental", "rent bike", "motorcycle rental", "scooter rental",
  "transportation", "transfer", "taxi", "driver",
  "concierge", "visa service", "visa assistance", "help with visa",
  "land for sale", "buy land", "plot",
  // Personal appointments
  "meet", "appointment", "schedule", "call me", "contact me",
  "my situation", "my case", "personally",
  // Thai equivalents
  "ซื้อ", "จอง", "ว่าง", "พบ", "นัดหมาย", "โทร", "เช่ารถ", "บริการ",
];

function shouldRouteToWhatsApp(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return REVENUE_KEYWORDS.some((keyword) => lowerMessage.includes(keyword.toLowerCase()));
}

export const chatbotRouter = router({
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string().min(1),
        language: z.enum(["en", "th"]),
      })
    )
    .mutation(async ({ input }) => {
      const { message, language } = input;

      // Check if this should be routed to WhatsApp
      if (shouldRouteToWhatsApp(message)) {
        return {
          message:
            language === "th"
              ? "ขอบคุณสำหรับคำถามของคุณ! สำหรับข้อมูลเฉพาะเจาะจงเกี่ยวกับทรัพย์สิน ราคา หรือการนัดหมายชมบ้าน ทีมงานของเราสามารถช่วยคุณได้ดีที่สุดผ่าน WhatsApp เราจะตอบกลับคุณภายใน 1-2 ชั่วโมง"
              : "Thank you for your question! For specific inquiries about properties, pricing, or scheduling viewings, our team can best assist you via WhatsApp. We'll respond within 1-2 hours.",
          suggestWhatsApp: true,
        };
      }

      // Use LLM for general Sam Roi Yot and Thailand questions
      try {
        const systemPrompt =
          language === "th"
            ? `คุณเป็นผู้ช่วยที่เป็นมิตรสำหรับ Sam Roi Yot Lifestyle บริษัทอสังหาริมทรัพย์ในสามร้อยยอด ประเทศไทย

คุณสามารถตอบคำถามเกี่ยวกับ:
- ข้อมูลทั่วไปเกี่ยวกับสามร้อยยอด (ชายหาด อุทยานแห่งชาติ สภาพอากาศ)
- การใช้ชีวิตในประเทศไทย (ค่าครองชีพ วัฒนธรรม ความปลอดภัย)
- ข้อมูลวีซ่าทั่วไป (ประเภทวีซ่า ข้อกำหนด)
- ข้อมูลการย้ายถิ่นทั่วไป

สำหรับคำถามเฉพาะเจาะจงเกี่ยวกับทรัพย์สิน ราคา การนัดหมาย หรือความช่วยเหลือส่วนบุคคล ให้แนะนำให้ติดต่อทีมงานผ่าน WhatsApp

ตอบอย่างเป็นมิตร กระชับ และให้ข้อมูล ใช้ 2-3 ประโยค`
            : `You are a friendly assistant for Sam Roi Yot Lifestyle, a real estate company in Sam Roi Yot, Thailand.

You can answer questions about:
- General information about Sam Roi Yot (beaches, national park, weather)
- Living in Thailand (cost of living, culture, safety)
- General visa information (types, requirements)
- General relocation information

For specific questions about properties, pricing, appointments, or personal assistance, suggest contacting the team via WhatsApp.

Answer in a friendly, concise, and informative way. Keep responses to 2-3 sentences.`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
        });

        const aiMessage = response.choices[0]?.message?.content || 
          (language === "th" 
            ? "ขออภัย ฉันไม่สามารถประมวลผลคำถามของคุณได้ในขณะนี้ กรุณาติดต่อทีมงานของเราผ่าน WhatsApp"
            : "I'm sorry, I couldn't process your question. Please contact our team via WhatsApp for assistance.");

        return {
          message: aiMessage,
          suggestWhatsApp: false,
        };
      } catch (error) {
        console.error("[Chatbot] LLM error:", error);
        return {
          message:
            language === "th"
              ? "ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งหรือติดต่อทีมงานของเราผ่าน WhatsApp"
              : "Sorry, something went wrong. Please try again or contact our team via WhatsApp.",
          suggestWhatsApp: true,
        };
      }
    }),
});
