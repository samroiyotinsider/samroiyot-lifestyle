import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export default function FloatingChatButtons() {
  const [isExpanded, setIsExpanded] = useState(false);

  const whatsappNumber = "66922746524";
  const whatsappMessage = encodeURIComponent("Hi, interested in Sam Roi Yot properties or relocation?");
  const lineId = "samroiyotinsider";

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
          {/* WhatsApp Section */}
          <div className="bg-white rounded-lg shadow-xl p-4 border-2 border-[#25D366]">
            <h3 className="font-bold text-sm mb-3 text-gray-800">WhatsApp</h3>
            <div className="mb-3 bg-gray-100 p-2 rounded flex justify-center">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/hNKNSJtOxJZSDipM.png"
                alt="WhatsApp QR Code"
                className="w-40 h-40 rounded"
                loading="lazy"
              />
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#25D366] text-white py-2 rounded-lg text-center font-medium hover:bg-[#20BA5A] transition-colors text-sm"
            >
              Open WhatsApp
            </a>
          </div>

          {/* Line Section */}
          <div className="bg-white rounded-lg shadow-xl p-4 border-2 border-[#00B900]">
            <h3 className="font-bold text-sm mb-3 text-gray-800">Line</h3>
            <div className="mb-3 bg-gray-100 p-2 rounded flex justify-center">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/WFLLyWYOXTkvEzSx.jpeg"
                alt="Line QR Code"
                className="w-40 h-40 rounded"
                loading="lazy"
              />
            </div>
            <a
              href={`https://line.me/R/ti/p/${lineId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#00B900] text-white py-2 rounded-lg text-center font-medium hover:bg-[#009600] transition-colors text-sm"
            >
              Open Line
            </a>
          </div>
        </div>
      )}
    </>
  );
}
