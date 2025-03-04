import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { PlaceOfInterest } from "@shared/schema";

interface CityMapProps {
  lat: number;
  lon: number;
  places: PlaceOfInterest[];
}

export function CityMap({ lat, lon, places }: CityMapProps) {
  // Convert lat/lon to simple x,y coordinates for visualization
  const getPosition = (latitude: string, longitude: string) => {
    const centerLat = Number(lat);
    const centerLon = Number(lon);
    const latDiff = Number(latitude) - centerLat;
    const lonDiff = Number(longitude) - centerLon;

    // Scale the differences to fit in our 400x400 viewport
    const x = 200 + (lonDiff * 1000);
    const y = 200 - (latDiff * 1000);

    return { x, y };
  };

  return (
    <Card className="p-4">
      <div className="w-full h-[400px] relative bg-slate-100 rounded-lg overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          {/* Center point */}
          <circle cx="200" cy="200" r="5" fill="red" />
          <text x="210" y="200" fontSize="12">City Center</text>

          {/* Places of interest */}
          {places.map((place) => {
            const pos = getPosition(place.latitude, place.longitude);
            return (
              <g key={place.id}>
                <circle cx={pos.x} cy={pos.y} r="4" fill="blue" />
                <text x={pos.x + 10} y={pos.y} fontSize="10">{place.name}</text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span>Places of Interest</span>
          </div>
        </div>
      </div>
    </Card>
  );
}