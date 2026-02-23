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
}

export function VideoPlayer({
  videoUrl,
  youtubeUrl,
  title,
  autoplay = false,
  controls = true,
  className = "",
  showYouTubeButton = true,
  youtubeButtonLabel = "Watch Full Video on YouTube",
  youtubeButtonSize = "default",
  youtubeButtonVariant = "secondary",
  loop = false,
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
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full"
          poster={`${videoUrl}?time=0`}
        >
          Your browser does not support the video tag.
        </video>

        {/* Play button overlay for non-autoplay videos */}
        {!isPlaying && !autoplay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors cursor-pointer group">
            <div className="bg-primary rounded-full p-4 group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        )}
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
