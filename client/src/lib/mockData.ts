import type { City, PlaceOfInterest } from "@shared/schema";

export const mockCities: City[] = [
  {
    id: 1,
    name: "London",
    country: "United Kingdom",
    population: 8982000,
    latitude: "51.5074",
    longitude: "-0.1278",
    description: "Capital city of the United Kingdom",
    twinCities: ["Berlin", "Paris", "New York", "Tokyo"],
  },
  {
    id: 2,
    name: "Manchester",
    country: "United Kingdom",
    population: 547627,
    latitude: "53.4808",
    longitude: "-2.2426",
    description: "Major city in the northwest of England",
    twinCities: ["Dusseldorf", "St Petersburg", "Los Angeles"],
  },
];

export const mockPlaces: PlaceOfInterest[] = [
  {
    id: 1,
    cityId: 1,
    name: "Big Ben",
    type: "Landmark",
    latitude: "51.5007",
    longitude: "-0.1246",
    description: "Famous clock tower at the north end of Houses of Parliament",
  },
  {
    id: 2,
    cityId: 1,
    name: "Tower Bridge",
    type: "Bridge",
    latitude: "51.5055",
    longitude: "-0.0754",
    description: "Combined bascule and suspension bridge",
  },
];

// Mock weather data
export const mockWeather = {
  main: {
    temp: 18,
    humidity: 65,
  },
  weather: [
    {
      main: "Cloudy",
      description: "Scattered clouds",
    },
  ],
};