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
  label = "walkthrough on youtube",
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
      <div className="flex items-center justify-center w-5 h-5 bg-red-600 rounded-full">
        <Play className="h-3 w-3 text-white fill-white" />
      </div>
      <span className="text-white font-medium text-sm">{label}</span>
    </a>
  );
}
