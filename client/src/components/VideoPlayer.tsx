import { useState, useEffect, useRef } from "react";
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
  thumbnailUrl?: string; // Custom thumbnail/poster image URL
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
  thumbnailUrl,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle autoplay with Intersection Observer
  useEffect(() => {
    const video = videoRef.current;
    if (!autoplay || !video) return;

    // Function to attempt playing the video
    const attemptPlay = () => {
      video.play().catch((err) => {
        // Autoplay might fail due to browser policies, that's ok
      });
    };

    // Try to play immediately if video is ready
    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      // Wait for video to be ready
      const handleCanPlay = () => {
        attemptPlay();
        video.removeEventListener("canplay", handleCanPlay);
      };
      video.addEventListener("canplay", handleCanPlay);
    }

    // Set up Intersection Observer for videos that scroll into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [autoplay]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative bg-black rounded-lg overflow-hidden video-container">
        <video
          ref={videoRef}
          src={videoUrl}
          muted={autoplay}
          loop={loop}
          controls={controls}
          controlsList="nofullscreen"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full"
          poster={thumbnailUrl}
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
