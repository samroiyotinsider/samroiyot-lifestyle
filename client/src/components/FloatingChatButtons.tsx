import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export default function FloatingChatButtons() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          aria-label="Toggle chat options"
        >
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Expanded Menu - Positioned above button */}
      {isExpanded && (
        <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-4 w-80">
          {/* WhatsApp QR Code */}
          <div className="bg-white rounded-lg shadow-xl p-4 border-2 border-[#25D366]">
            <h3 className="font-bold text-sm mb-3 text-gray-800">WhatsApp</h3>
            <p className="text-xs text-gray-600 mb-3">Scan with your phone</p>
            <div className="bg-gray-100 p-2 rounded flex justify-center">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/hNKNSJtOxJZSDipM.png"
                alt="WhatsApp QR Code"
                className="w-48 h-48 rounded"
                loading="lazy"
              />
            </div>
          </div>

          {/* Line QR Code */}
          <div className="bg-white rounded-lg shadow-xl p-4 border-2 border-[#00B900]">
            <h3 className="font-bold text-sm mb-3 text-gray-800">Line</h3>
            <p className="text-xs text-gray-600 mb-3">Scan with your phone</p>
            <div className="bg-gray-100 p-2 rounded flex justify-center">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/WFLLyWYOXTkvEzSx.jpeg"
                alt="Line QR Code"
                className="w-48 h-48 rounded"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
