import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building, Landmark, School, Camera } from "lucide-react";
import type { PlaceOfInterest } from "@shared/schema";

interface PlacesOfInterestProps {
  places: PlaceOfInterest[];
}

function getIconForType(type: string) {
  switch (type.toLowerCase()) {
    case 'landmark':
      return <Landmark className="h-5 w-5" />;
    case 'building':
      return <Building className="h-5 w-5" />;
    case 'university':
      return <School className="h-5 w-5" />;
    case 'museum':
      return <Camera className="h-5 w-5" />;
    default:
      return <MapPin className="h-5 w-5" />;
  }
}

export function PlacesOfInterest({ places }: PlacesOfInterestProps) {
  if (!places.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Places of Interest
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No places of interest found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Places of Interest
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {places.map((place) => (
            <Card key={place.id} className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getIconForType(place.type)}</div>
                  <div>
                    <h3 className="font-semibold">{place.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {place.type}
                    </p>
                    {place.description && (
                      <p className="text-sm">{place.description}</p>
                    )}
                    <div className="text-xs text-muted-foreground mt-2">
                      Location: {place.latitude}, {place.longitude}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
