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
  label = "Watch Full Video on YouTube",
  size = "default",
  variant = "default",
  className = "",
}: YouTubeButtonProps) {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={className}
    >
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <Play className="h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}
