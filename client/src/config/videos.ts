/**
 * Video Configuration
 * Maps video placeholders to S3 URLs
 * Replace placeholder URLs with actual S3 URLs after uploading videos
 */

export const videoConfig = {
  // Home Page Videos
  hero: {
    id: "PLACEHOLDER_HERO_VIDEO",
    s3Url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/usUXtEazzvpPslZK.mp4",
    youtubeUrl: "#",
    autoplay: true,
    controls: true,
    thumbnailUrl: "", // Hero video doesn't need thumbnail
  },
  why1: {
    id: "PLACEHOLDER_WHY_1",
    s3Url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/zEUOmnhDHnkhoiAO.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/wiuQSHRkbJjVCsWI.png",
  },
  why2: {
    id: "PLACEHOLDER_WHY_2",
    s3Url: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/JJxjJvoEGfMzxGcY.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663314810987/fdWPLImhQIxwShEq.png",
  },
  why3: {
    id: "PLACEHOLDER_WHY_3",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/why-sam-roi-yot-3.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
  why4: {
    id: "PLACEHOLDER_WHY_4",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/why-sam-roi-yot-4.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },

  // Buying Guide Videos
  buyingGuideHero: {
    id: "PLACEHOLDER_MONEY_VIDEO",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/buying-guide-overview.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
  faq1: {
    id: "PLACEHOLDER_FAQ_1",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/faq-foreigners-own-property.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
  faq2: {
    id: "PLACEHOLDER_FAQ_2",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/faq-leasehold-vs-freehold.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
  faq3: {
    id: "PLACEHOLDER_FAQ_3",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/faq-true-costs.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
  faq4: {
    id: "PLACEHOLDER_FAQ_4",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/faq-buying-process.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },

  // Area Guide Videos
  areaGuideHero: {
    id: "PLACEHOLDER_AREA_OVERVIEW",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/area-guide-overview.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
  beaches: {
    id: "PLACEHOLDER_BEACH_VIDEO",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/best-beaches.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
  costOfLiving: {
    id: "PLACEHOLDER_COST_VIDEO",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/cost-of-living.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
  activities: {
    id: "PLACEHOLDER_ACTIVITIES_VIDEO",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/things-to-do.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
  nationalPark: {
    id: "PLACEHOLDER_PARK_VIDEO",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/national-park.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
  dining: {
    id: "PLACEHOLDER_DINING_VIDEO",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/restaurants-dining.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
  healthcare: {
    id: "PLACEHOLDER_HEALTH_VIDEO",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/healthcare-expat-services.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },

  // Property Videos
  propertyWalkthrough: {
    id: "PLACEHOLDER_PROPERTY_VIDEO",
    s3Url: "https://samroiyot-videos.s3.amazonaws.com/property-case-study.mp4",
    youtubeUrl: "#",
    autoplay: false,
    controls: false,
    thumbnailUrl: "", // Add thumbnail URL here
  },
};

/**
 * Helper function to get video config by placeholder ID
 */
export function getVideoByPlaceholder(placeholderId: string) {
  const video = Object.values(videoConfig).find(
    (v) => v.id === placeholderId
  );
  return video || null;
}

/**
 * Helper function to update video URL (for when you provide YouTube URLs)
 */
export function updateVideoYoutubeUrl(
  videoKey: keyof typeof videoConfig,
  youtubeUrl: string
) {
  videoConfig[videoKey].youtubeUrl = youtubeUrl;
}

/**
 * Helper function to update video S3 URL
 */
export function updateVideoS3Url(
  videoKey: keyof typeof videoConfig,
  s3Url: string
) {
  videoConfig[videoKey].s3Url = s3Url;
}
