import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface YouTubeButtonProps {
  youtubeUrl?: string;
  label?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

export function YouTubeButton({
  youtubeUrl = "#",
  label = "Walk through on YouTube",
  size = "default",
  variant = "default",
  className = "",
}: YouTubeButtonProps) {
  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-gray-900 transition-colors ${className}`}
    >
      <div className="flex items-center justify-center w-6 h-6 bg-red-600 rounded">
        <svg className="w-3.5 h-3.5 text-white fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polygon points="8,5 8,19 19,12" />
        </svg>
      </div>
      <span className="text-white font-medium text-sm">{label}</span>
    </a>
  );
}
