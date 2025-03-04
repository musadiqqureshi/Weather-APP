import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { CityMap } from "@/components/CityMap";
import { WeatherWidget } from "@/components/WeatherWidget";
import { CommentSection } from "@/components/CommentSection";
import type { City, PlaceOfInterest } from "@shared/schema";

export default function CityDetail() {
  const { cityName } = useParams();

  const { data: city } = useQuery<City>({
    queryKey: [`/api/cities/search/${cityName}`],
  });

  const { data: places } = useQuery<PlaceOfInterest[]>({
    queryKey: [`/api/cities/${city?.id}/places`],
    enabled: !!city?.id,
  });

  if (!city) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{city.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-lg mb-4">{city.description}</p>
          <p className="mb-2">Population: {city.population?.toLocaleString()}</p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Twin Cities</h2>
            <ul className="list-disc list-inside">
              {city.twinCities.map((twinCity) => (
                <li key={twinCity}>{twinCity}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <WeatherWidget
          lat={Number(city.latitude)}
          lon={Number(city.longitude)}
          cityName={city.name}
        />
      </div>

      <div className="mb-8">
        <CityMap
          lat={Number(city.latitude)}
          lon={Number(city.longitude)}
          places={places || []}
        />
      </div>

      <CommentSection cityId={city.id} />
    </div>
  );
}
