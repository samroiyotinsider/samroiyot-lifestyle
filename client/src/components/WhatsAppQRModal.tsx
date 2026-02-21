import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhatsAppQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppQRModal({ isOpen, onClose }: WhatsAppQRModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("Scan with WhatsApp", "สแกนด้วย WhatsApp")}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-8">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/xQbZQbyllBXuesgP.png"
            alt="WhatsApp QR Code"
            className="w-64 h-64 object-contain"
          />
          <p className="text-sm text-muted-foreground mt-4 text-center">
            {t(
              "Scan this QR code with your phone to chat with us on WhatsApp",
              "สแกน QR code นี้ด้วยโทรศัพท์ของคุณเพื่อแชทกับเราบน WhatsApp"
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
