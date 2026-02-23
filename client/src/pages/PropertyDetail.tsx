import { useLanguage } from "@/contexts/LanguageContext";
import { YouTubeButton } from "@/components/YouTubeButton";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useParams, useLocation } from "wouter";
import { MapPin, Bed, Bath, Maximize, Check, ArrowLeft, ExternalLink } from "lucide-react";
import { useState } from "react";
import { PropertyMap } from "@/components/PropertyMap";
import { toast } from "sonner";
import { videoConfig } from "@/config/videos";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { data: property, isLoading } = trpc.properties.getById.useQuery(
    { id: parseInt(id!) },
    { enabled: !!id }
  );

  const inquiryMutation = trpc.inquiries.create.useMutation({
    onSuccess: () => {
      toast.success(t(
        "Thank you! We'll contact you soon.",
        "ขอบคุณ! เราจะติดต่อคุณเร็วๆ นี้"
      ));
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: () => {
      toast.error(t("Failed to send inquiry. Please try again.", "ไม่สามารถส่งคำถามได้ กรุณาลองอีกครั้ง"));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    
    inquiryMutation.mutate({
      propertyId: property.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
      inquiryType: "property",
    });
  };

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
                <div className="h-32 bg-muted rounded" />
              </div>
              <div className="h-96 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-lg">{t("Property not found", "ไม่พบทรัพย์สิน")}</p>
            <Button onClick={() => setLocation("/properties")}>
              {t("Back to Properties", "กลับไปยังทรัพย์สิน")}
            </Button>
          </CardContent>
        </Card>
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
  let features: string[] = [];
  if (typeof property.features === 'string') {
    try {
      features = JSON.parse(property.features);
    } catch (e) {
      features = [];
    }
  } else if (Array.isArray(property.features)) {
    features = property.features;
  }
  const title = language === 'th' && property.titleTh ? property.titleTh : property.title;
  const description = language === 'th' && property.descriptionTh ? property.descriptionTh : property.description;
  const address = language === 'th' && property.addressTh ? property.addressTh : property.address;

  const featureLabels: Record<string, { en: string; th: string }> = {
    seaView: { en: "Sea View", th: "วิวทะเล" },
    beachfront: { en: "Beachfront", th: "ริมชายหาด" },
    pool: { en: "Swimming Pool", th: "สระว่ายน้ำ" },
    mountainView: { en: "Mountain View", th: "วิวภูเขา" },
    renovated: { en: "Newly Renovated", th: "ปรับปรุงใหม่" },
    furnished: { en: "Fully Furnished", th: "ตกแต่งครบ" },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => setLocation("/properties")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("Back to Properties", "กลับไปยังทรัพย์สิน")}
        </Button>



        {/* Image Gallery */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t("Photo Gallery", "แกลเลอรี่ภาพ")}</h3>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <img
              src={images[selectedImage] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200'}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img} alt={`${title} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Video Walkthrough */}
        <Card>
          <CardHeader>
            <CardTitle>{t("Video Walkthrough", "วิดีโอทัวร์")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <VideoPlayer
              videoUrl={videoConfig.propertyWalkthrough.s3Url}
              youtubeUrl={videoConfig.propertyWalkthrough.youtubeUrl}
              autoplay={false}
              controls={true}
              showYouTubeButton={true}
              youtubeButtonLabel={t("Watch Full Property Case Study on YouTube", "ดูการศึกษากรณีทรัพย์สินเต็มบน YouTube")}
              youtubeButtonSize="default"
              youtubeButtonVariant="secondary"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              <p className="text-3xl font-bold text-primary mb-2">
                {property.priceEur ? (
                  `€${property.priceEur.toLocaleString()}`
                ) : property.price ? (
                  `${property.price.toLocaleString()} THB`
                ) : (
                  'Price on request'
                )}
                {property.priceUsd && (
                  <span className="text-xl font-normal text-muted-foreground ml-3">
                    (${property.priceUsd.toLocaleString()} USD)
                  </span>
                )}
              </p>
              {address && (
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 mt-0.5" />
                  <span>{address}</span>
                </div>
              )}
            </div>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>{t("Property Details", "รายละเอียดทรัพย์สิน")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.propertyType && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Type", "ประเภท")}</p>
                      <p className="font-semibold capitalize">{property.propertyType}</p>
                    </div>
                  )}
                  {property.bedrooms && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Bedrooms", "ห้องนอน")}</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Bed className="h-4 w-4" /> {property.bedrooms}
                      </p>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Bathrooms", "ห้องน้ำ")}</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Bath className="h-4 w-4" /> {property.bathrooms}
                      </p>
                    </div>
                  )}
                  {property.sizeSqm && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t("Size", "ขนาด")}</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Maximize className="h-4 w-4" /> {property.sizeSqm} {t("sqm", "ตร.ม.")}
                      </p>
                    </div>
                  )}
                  {property.sizeRai && (
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">{t("Land Size", "ขนาดที่ดิน")}</p>
                      <p className="font-semibold">{property.sizeRai}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("Features", "คุณสมบัติ")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {features.map((feature: string) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{t(featureLabels[feature]?.en || feature, featureLabels[feature]?.th || feature)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>{t("Description", "คำอธิบาย")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">{description}</p>
              </CardContent>
            </Card>

            {/* Map */}
            {property.latitude && property.longitude ? (
              <PropertyMap
                latitude={property.latitude}
                longitude={property.longitude}
                title={title}
                address={address || undefined}
                className="h-96"
              />
            ) : (
              <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
                <p className="text-muted-foreground">{t("Map location not available", "ไม่มีตำแหน่งแผนที่")}</p>
              </div>
            )}

            {/* FazWaz Link */}
            {property.fazwazUrl && (
              <Card>
                <CardContent className="pt-6">
                  <a
                    href={property.fazwazUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <span className="font-medium">{t("View on FazWaz", "ดูใน FazWaz")}</span>
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>{t("Interested in this property?", "สนใจทรัพย์สินนี้หรือไม่?")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t("Name", "ชื่อ")} *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("Email", "อีเมล")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("Phone", "โทรศัพท์")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">{t("Message", "ข้อความ")} *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t(
                        "I'm interested in this property...",
                        "ฉันสนใจทรัพย์สินนี้..."
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={inquiryMutation.isPending}>
                    {inquiryMutation.isPending
                      ? t("Sending...", "กำลังส่ง...")
                      : t("Send Inquiry", "ส่งคำถาม")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
