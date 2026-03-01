import { useLanguage } from "@/contexts/LanguageContext";
import { YouTubeButton } from "@/components/YouTubeButton";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useParams, useLocation } from "wouter";
import { MapPin, Bed, Bath, Maximize, Check, ArrowLeft, ExternalLink, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { PropertyMap } from "@/components/PropertyMap";
import { videoConfig } from "@/config/videos";
import { WhatsAppQRModal } from "@/components/WhatsAppQRModal";
import { LineQRModal } from "@/components/LineQRModal";

// Convert YouTube URL to embed format
function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  
  // Handle youtube.com/shorts/ format
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }
  
  // Handle youtu.be/ format
  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch) {
    return `https://www.youtube.com/embed/${youtuBeMatch[1]}`;
  }
  
  // Handle youtube.com/watch?v= format
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  
  // If already an embed URL, return as is
  if (url.includes('/embed/')) {
    return url;
  }
  
  return url;
}

export default function PropertyDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showWhatsAppQR, setShowWhatsAppQR] = useState(false);
  const [showLineQR, setShowLineQR] = useState(false);

  const { data: property, isLoading } = trpc.properties.getById.useQuery(
    { id: parseInt(id!) },
    { enabled: !!id }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-96 bg-muted rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-muted rounded" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
              <div className="space-y-4">
                <div className="h-40 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("Property not found", "ไม่พบทรัพย์สิน")}</h1>
          <Button onClick={() => setLocation("/properties")}>
            {t("Back to Properties", "กลับไปที่ทรัพย์สิน")}
          </Button>
        </div>
      </div>
    );
  }

  // Handle images field - it might be a string, array, or null
  let images: string[] = [];
  if (typeof property.images === 'string') {
    try {
      images = JSON.parse(property.images);
    } catch (e) {
      console.error('Failed to parse images for property', property.id, e);
      images = [];
    }
  } else if (Array.isArray(property.images)) {
    images = property.images;
  }

  // Handle features field similarly
  let propFeatures: string[] = [];
  if (typeof property.features === 'string') {
    try {
      propFeatures = JSON.parse(property.features);
    } catch (e) {
      propFeatures = [];
    }
  } else if (Array.isArray(property.features)) {
    propFeatures = property.features;
  }

  const title = language === 'th' && property.titleTh ? property.titleTh : property.title;
  const description = language === 'th' && property.descriptionTh ? property.descriptionTh : property.description;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setLocation("/properties")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("Back to Properties", "กลับไปที่ทรัพย์สิน")}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-lg overflow-hidden bg-muted">
                <img
                  src={images[selectedImage] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-20 rounded overflow-hidden border-2 transition-colors ${
                        selectedImage === idx ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{title}</h1>
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {property.priceEur ? (
                      `€${property.priceEur.toLocaleString()}`
                    ) : property.price ? (
                      `${property.price.toLocaleString()} THB`
                    ) : (
                      'Price on request'
                    )}
                  </p>
                  {property.price && !property.priceEur && (
                    <p className="text-sm text-muted-foreground">
                      {property.price.toLocaleString()} THB
                    </p>
                  )}
                  {property.priceEur && property.price && (
                    <p className="text-sm text-muted-foreground">
                      {property.price.toLocaleString()} THB
                    </p>
                  )}
                </div>
              </div>

              {/* Key Features */}
              <div className="flex flex-wrap gap-4">
                {property.bedrooms && (
                  <div className="flex items-center gap-2 text-sm">
                    <Bed className="h-5 w-5 text-primary" />
                    <span>{property.bedrooms} {t("Bedrooms", "ห้องนอน")}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-2 text-sm">
                    <Bath className="h-5 w-5 text-primary" />
                    <span>{property.bathrooms} {t("Bathrooms", "ห้องน้ำ")}</span>
                  </div>
                )}
                {property.sizeSqm && (
                  <div className="flex items-center gap-2 text-sm">
                    <Maximize className="h-5 w-5 text-primary" />
                    <span>{property.sizeSqm} {t("sqm", "ตร.ม.")}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {description && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">{description}</p>
                </div>
              )}

              {/* Features List */}
              {propFeatures.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">{t("Features", "คุณสมบัติ")}</h3>
                  <ul className="space-y-2">
                    {propFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Location Map */}
              {property.latitude && property.longitude && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("Location", "ที่ตั้ง")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <PropertyMap
                        latitude={property.latitude}
                        longitude={property.longitude}
                        title={title}
                        address={property.address || ''}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}


            </div>
          </div>

          {/* Sidebar - Contact Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>{t("Get in Touch", "ติดต่อเรา")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t("Email", "อีเมล")}</p>
                      <a
                        href="mailto:samroiyot.th@gmail.com"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        samroiyot.th@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t("Location", "ที่ตั้ง")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t(
                          "Sam Roi Yot, Prachuap Khiri Khan, Thailand",
                          "แสนร้อยยอด ประจวบคีรีขันธ์ ประเทศไทย"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button
                    onClick={() => setShowWhatsAppQR(true)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t("WhatsApp", "WhatsApp")}
                  </Button>
                  <Button
                    onClick={() => setShowLineQR(true)}
                    className="w-full bg-[#00B900] hover:bg-[#00A000]"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t("Line", "Line")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <WhatsAppQRModal isOpen={showWhatsAppQR} onClose={() => setShowWhatsAppQR(false)} />
            <LineQRModal isOpen={showLineQR} onClose={() => setShowLineQR(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}
