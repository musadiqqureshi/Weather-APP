import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, Thermometer } from "lucide-react";
import { mockWeather } from "@/lib/mockData";

interface WeatherWidgetProps {
  cityName: string;
}

export function WeatherWidget({ cityName }: WeatherWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Weather in {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            <span>{Math.round(mockWeather.main.temp)}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            <span>{mockWeather.weather[0].main}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}