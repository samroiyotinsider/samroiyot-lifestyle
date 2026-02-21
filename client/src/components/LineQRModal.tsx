import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface LineQRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LineQRModal({ isOpen, onClose }: LineQRModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("Scan with Line", "สแกนด้วย Line")}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-8">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/atRHgDnYaXJZXfvO.jpeg"
            alt="Line QR Code"
            className="w-64 h-64 object-contain"
          />
          <p className="text-sm text-muted-foreground mt-4 text-center">
            {t(
              "Scan this QR code with your phone to chat with us on Line",
              "สแกน QR code นี้ด้วยโทรศัพท์ของคุณเพื่อแชทกับเราบน Line"
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
