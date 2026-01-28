import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Property } from "../../../drizzle/schema";

interface PropertyFormProps {
  property?: Property;
  onSubmit: (data: PropertyFormData) => Promise<void>;
  onCancel: () => void;
}

export interface PropertyFormData {
  title: string;
  titleTh?: string;
  description: string;
  descriptionTh?: string;
  propertyType: "condo" | "house" | "villa" | "land";
  price: number;
  priceUsd?: number;
  sizeSqm?: number;
  sizeRai?: string;
  bedrooms?: number;
  bathrooms?: number;
  features: string[];
  images: string[];
  videoUrl?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  addressTh?: string;
  fazwazUrl?: string;
  status?: "available" | "sold" | "pending";
  featured?: number;
}

const FEATURE_OPTIONS = [
  { value: "seaView", label: "Sea View" },
  { value: "beachfront", label: "Beachfront" },
  { value: "pool", label: "Swimming Pool" },
  { value: "mountainView", label: "Mountain View" },
  { value: "renovated", label: "Newly Renovated" },
  { value: "furnished", label: "Fully Furnished" },
];

export function PropertyForm({ property, onSubmit, onCancel }: PropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: property?.title || "",
    titleTh: property?.titleTh || "",
    description: property?.description || "",
    descriptionTh: property?.descriptionTh || "",
    propertyType: property?.propertyType || "condo",
    price: property?.price || 0,
    priceUsd: property?.priceUsd || undefined,
    sizeSqm: property?.sizeSqm || undefined,
    sizeRai: property?.sizeRai || "",
    bedrooms: property?.bedrooms || undefined,
    bathrooms: property?.bathrooms || undefined,
    features: property ? JSON.parse(property.features || "[]") : [],
    images: property ? JSON.parse(property.images || "[]") : [],
    videoUrl: property?.videoUrl || "",
    latitude: property?.latitude || "",
    longitude: property?.longitude || "",
    address: property?.address || "",
    addressTh: property?.addressTh || "",
    fazwazUrl: property?.fazwazUrl || "",
    status: property?.status || "available",
    featured: property?.featured || 0,
  });

  const [imageUrls, setImageUrls] = useState<string[]>(formData.images);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleAddImage = () => {
    if (!newImageUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }
    const updatedImages = [...imageUrls, newImageUrl.trim()];
    setImageUrls(updatedImages);
    setFormData({ ...formData, images: updatedImages });
    setNewImageUrl("");
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleFeatureToggle = (feature: string) => {
    const updatedFeatures = formData.features.includes(feature)
      ? formData.features.filter((f) => f !== feature)
      : [...formData.features, feature];
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || formData.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (imageUrls.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      toast.success(property ? "Property updated successfully" : "Property created successfully");
    } catch (error) {
      toast.error("Failed to save property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title (English) *</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="titleTh">Title (Thai)</Label>
              <Input
                id="titleTh"
                value={formData.titleTh}
                onChange={(e) => setFormData({ ...formData, titleTh: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description (English) *</Label>
            <Textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="descriptionTh">Description (Thai)</Label>
            <Textarea
              id="descriptionTh"
              rows={4}
              value={formData.descriptionTh}
              onChange={(e) => setFormData({ ...formData, descriptionTh: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="propertyType">Property Type *</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value: "condo" | "house" | "villa" | "land") =>
                  setFormData({ ...formData, propertyType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "available" | "sold" | "pending") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Size */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Size</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (THB) *</Label>
              <Input
                id="price"
                type="number"
                required
                min="0"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="priceUsd">Price (USD)</Label>
              <Input
                id="priceUsd"
                type="number"
                min="0"
                value={formData.priceUsd || ""}
                onChange={(e) => setFormData({ ...formData, priceUsd: parseInt(e.target.value) || undefined })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sizeSqm">Size (sqm)</Label>
              <Input
                id="sizeSqm"
                type="number"
                min="0"
                value={formData.sizeSqm || ""}
                onChange={(e) => setFormData({ ...formData, sizeSqm: parseInt(e.target.value) || undefined })}
              />
            </div>
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                min="0"
                value={formData.bedrooms || ""}
                onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || undefined })}
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                min="0"
                value={formData.bathrooms || ""}
                onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || undefined })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="sizeRai">Land Size (e.g., "1 Rai 2 Ngan 41 sq.wah")</Label>
            <Input
              id="sizeRai"
              value={formData.sizeRai}
              onChange={(e) => setFormData({ ...formData, sizeRai: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURE_OPTIONS.map((feature) => (
              <div key={feature.value} className="flex items-center space-x-2">
                <Checkbox
                  id={feature.value}
                  checked={formData.features.includes(feature.value)}
                  onCheckedChange={() => handleFeatureToggle(feature.value)}
                />
                <Label htmlFor={feature.value} className="cursor-pointer">
                  {feature.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Images *</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddImage())}
            />
            <Button type="button" onClick={handleAddImage}>
              <Upload className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address">Address (English)</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="addressTh">Address (Thai)</Label>
              <Input
                id="addressTh"
                value={formData.addressTh}
                onChange={(e) => setFormData({ ...formData, addressTh: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                placeholder="12.3456"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                placeholder="99.7890"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="videoUrl">Video URL (YouTube, etc.)</Label>
            <Input
              id="videoUrl"
              placeholder="https://youtube.com/watch?v=..."
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="fazwazUrl">FazWaz Listing URL</Label>
            <Input
              id="fazwazUrl"
              placeholder="https://www.fazwaz.com/property/..."
              value={formData.fazwazUrl}
              onChange={(e) => setFormData({ ...formData, fazwazUrl: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured === 1}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked ? 1 : 0 })}
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Featured Property (show on homepage)
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {property ? "Update Property" : "Create Property"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
