import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { CityMap } from "@/components/CityMap";
import { WeatherWidget } from "@/components/WeatherWidget";
import { CommentSection } from "@/components/CommentSection";
import { Building2, Users, Globe } from "lucide-react";
import type { City, PlaceOfInterest } from "@shared/schema";

export default function CityDetail() {
  const { cityName } = useParams();

  const { data: city, isLoading: cityLoading } = useQuery<City>({
    queryKey: [`/api/cities/search/${cityName}`],
  });

  const { data: places } = useQuery<PlaceOfInterest[]>({
    queryKey: [`/api/cities/${city?.id}/places`],
    enabled: !!city?.id,
  });

  if (cityLoading || !city) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-gray-600"
        >
          Loading city details...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-12"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {city.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {city.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-lg">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Population:</span>
              <span>{city.population?.toLocaleString()}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-lg mb-2">
                <Globe className="h-5 w-5 text-primary" />
                <span className="font-medium">Twin Cities:</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {city.twinCities?.map((twinCity) => (
                  <motion.div
                    key={twinCity}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/50 backdrop-blur-sm p-3 rounded-lg border border-gray-100 shadow-sm"
                  >
                    {twinCity}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <WeatherWidget cityName={city.name} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <CityMap
            lat={Number(city.latitude)}
            lon={Number(city.longitude)}
            places={places || []}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <CommentSection cityId={city.id} />
        </motion.div>
      </motion.div>
    </div>
  );
}