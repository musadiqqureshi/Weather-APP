import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBar } from "@/components/SearchBar";
import type { City } from "@shared/schema";

export default function Home() {
  const { data: cities } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        UK Twin Cities Explorer
      </h1>
      
      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {cities?.map((city) => (
          <Card key={city.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{city.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{city.description}</p>
              <div className="space-y-2">
                <p>Population: {city.population?.toLocaleString()}</p>
                <p>Twin Cities: {city.twinCities.join(", ")}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
