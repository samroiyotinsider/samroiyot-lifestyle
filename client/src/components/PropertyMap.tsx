import { useEffect, useRef, useState } from "react";
import { MapView } from "@/components/Map";

interface PropertyMapProps {
  latitude: string;
  longitude: string;
  title: string;
  address?: string;
  className?: string;
}

export function PropertyMap({ latitude, longitude, title, address, className = "" }: PropertyMapProps) {
  const [mapReady, setMapReady] = useState(false);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  // Validate coordinates
  if (!latitude || !longitude || isNaN(lat) || isNaN(lng)) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
        <div className="text-center p-8">
          <svg
            className="mx-auto h-12 w-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="mt-2 text-sm text-muted-foreground">Map location not available</p>
        </div>
      </div>
    );
  }

  const handleMapReady = (map: google.maps.Map) => {
    setMapReady(true);

    // Create marker for the property
    const position = { lat, lng };
    
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    markerRef.current = new google.maps.Marker({
      position,
      map,
      title,
      animation: google.maps.Animation.DROP,
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 8px;">
          <h3 style="font-weight: 600; margin-bottom: 4px;">${title}</h3>
          ${address ? `<p style="font-size: 14px; color: #666;">${address}</p>` : ''}
        </div>
      `,
    });

    markerRef.current.addListener("click", () => {
      infoWindow.open(map, markerRef.current);
    });

    // Center map on property
    map.setCenter(position);
    map.setZoom(15);
  };

  return (
    <div className={className}>
      <MapView
        onMapReady={handleMapReady}
        className="w-full h-full rounded-lg overflow-hidden min-h-[400px]"
      />
    </div>
  );
}
