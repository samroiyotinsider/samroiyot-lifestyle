import { useState } from "react";
import { YouTubeButton } from "./YouTubeButton";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string; // S3 URL or local path
  youtubeUrl: string; // YouTube link for "Watch Full Video" button
  title?: string;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
  showYouTubeButton?: boolean;
  youtubeButtonLabel?: string;
  youtubeButtonSize?: "default" | "sm" | "lg";
  youtubeButtonVariant?: "default" | "secondary" | "outline";
  loop?: boolean;
  preventFullscreen?: boolean;
}

export function VideoPlayer({
  videoUrl,
  youtubeUrl,
  title,
  autoplay = false,
  controls = true,
  className = "",
  showYouTubeButton = true,
  youtubeButtonLabel = "Full Video on Youtube",
  youtubeButtonSize = "default",
  youtubeButtonVariant = "secondary",
  loop = false,
  preventFullscreen = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative bg-black rounded-lg overflow-hidden video-container">
        <video
          src={videoUrl}
          autoPlay={autoplay}
          muted={autoplay}
          loop={loop}
          controls={controls}
          controlsList={preventFullscreen ? "nofullscreen" : undefined}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full"
          poster={`${videoUrl}?time=0`}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {title && <h3 className="text-lg font-semibold">{title}</h3>}

      {showYouTubeButton && youtubeUrl && (
        <YouTubeButton
          youtubeUrl={youtubeUrl}
          label={youtubeButtonLabel}
          size={youtubeButtonSize}
          variant={youtubeButtonVariant}
          className="w-full"
        />
      )}
    </div>
  );
}
