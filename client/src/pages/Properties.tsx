import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import { useState, useMemo } from "react";

export default function Properties() {
  const { t, language } = useLanguage();
  const [propertyType, setPropertyType] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  const { data: properties, isLoading } = trpc.properties.list.useQuery({
    propertyType: propertyType || undefined,
    features: selectedFeatures.length > 0 ? selectedFeatures : undefined,
    status: "available",
  });

  const features = [
    { value: "seaView", label: t("Sea View", "วิวทะเล") },
    { value: "beachfront", label: t("Beachfront", "ริมชายหาด") },
    { value: "pool", label: t("Pool", "สระว่ายน้ำ") },
    { value: "mountainView", label: t("Mountain View", "วิวภูเขา") },
    { value: "renovated", label: t("Renovated", "ปรับปรุงใหม่") },
    { value: "furnished", label: t("Furnished", "ตกแต่งแล้ว") },
  ];

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("Properties for Sale", "ทรัพย์สินขาย")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t(
              "Discover your perfect property in Sam Roi Yot - from beachfront condos to spacious villas",
              "ค้นพบทรัพย์สินที่สมบูรณ์แบบของคุณในแสนร้อยยอด - จากคอนโดริมชายหาดไปจนถึงวิลล่าขนาดใหญ่"
            )}
          </p>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    {t("Property Type", "ประเภททรัพย์สิน")}
                  </Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("All Types", "ทุกประเภท")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("All Types", "ทุกประเภท")}</SelectItem>
                      <SelectItem value="condo">{t("Condo", "คอนโด")}</SelectItem>
                      <SelectItem value="house">{t("House", "บ้าน")}</SelectItem>
                      <SelectItem value="villa">{t("Villa", "วิลล่า")}</SelectItem>
                      <SelectItem value="land">{t("Land", "ที่ดิน")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    {t("Features", "คุณสมบัติ")}
                  </Label>
                  <div className="space-y-3">
                    {features.map((feature) => (
                      <div key={feature.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature.value}
                          checked={selectedFeatures.includes(feature.value)}
                          onCheckedChange={() => toggleFeature(feature.value)}
                        />
                        <Label
                          htmlFor={feature.value}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {feature.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {(propertyType || selectedFeatures.length > 0) && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPropertyType("");
                      setSelectedFeatures([]);
                    }}
                  >
                    {t("Clear Filters", "ล้างตัวกรอง")}
                  </Button>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="h-64 bg-muted" />
                    <CardContent className="p-6 space-y-3">
                      <div className="h-6 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : properties && properties.length > 0 ? (
              <>
                <div className="mb-6 text-muted-foreground">
                  {t(`${properties.length} properties found`, `พบ ${properties.length} ทรัพย์สิน`)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map((property) => {
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
                    
                    return (
                      <Link key={property.id} href={`/properties/${property.id}`} className="block h-full">
                        <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'}
                              alt={title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            {property.status === 'sold' && (
                              <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-md font-semibold">
                                {t("SOLD", "ขายแล้ว")}
                              </div>
                            )}
                            {property.featured === 1 && property.status === 'available' && (
                              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-md font-semibold">
                                {t("FEATURED", "แนะนำ")}
                              </div>
                            )}
                          </div>
                          <CardContent className="p-6 space-y-3">
                            <h3 className="text-xl font-semibold line-clamp-2 min-h-[3.5rem]">
                              {title}
                            </h3>
                            <p className="text-2xl font-bold text-primary">
                              {property.priceEur ? (
                                `€${property.priceEur.toLocaleString()}`
                              ) : property.price ? (
                                `${property.price.toLocaleString()} THB`
                              ) : (
                                'Price on request'
                              )}
                              {property.priceUsd && (
                                <span className="text-sm font-normal text-muted-foreground ml-2">
                                  (${property.priceUsd.toLocaleString()})
                                </span>
                              )}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {property.bedrooms && (
                                <div className="flex items-center gap-1">
                                  <Bed className="h-4 w-4" />
                                  <span>{property.bedrooms}</span>
                                </div>
                              )}
                              {property.bathrooms && (
                                <div className="flex items-center gap-1">
                                  <Bath className="h-4 w-4" />
                                  <span>{property.bathrooms}</span>
                                </div>
                              )}
                              {property.sizeSqm && (
                                <div className="flex items-center gap-1">
                                  <Maximize className="h-4 w-4" />
                                  <span>{property.sizeSqm} {t("sqm", "ตร.ม.")}</span>
                                </div>
                              )}
                            </div>
                            {(propFeatures.includes('seaView') || propFeatures.includes('beachfront')) && (
                              <div className="flex items-center gap-1 text-sm text-secondary font-medium">
                                <MapPin className="h-4 w-4" />
                                {propFeatures.includes('beachfront') 
                                  ? t("Beachfront", "ริมชายหาด")
                                  : t("Sea View", "วิวทะเล")}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    {t(
                      "No properties match your criteria. Try adjusting your filters.",
                      "ไม่มีทรัพย์สินที่ตรงกับเกณฑ์ของคุณ ลองปรับตัวกรองของคุณ"
                    )}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
