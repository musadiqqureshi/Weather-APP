import {
  type City,
  type InsertCity,
  type PlaceOfInterest,
  type InsertPlaceOfInterest,
  type Comment,
  type InsertComment,
} from "@shared/schema";

export interface IStorage {
  // Cities
  getCities(): Promise<City[]>;
  getCity(id: number): Promise<City | undefined>;
  getCityByName(name: string): Promise<City | undefined>;
  createCity(city: InsertCity): Promise<City>;

  // Places of Interest
  getPlacesByCity(cityId: number): Promise<PlaceOfInterest[]>;
  createPlace(place: InsertPlaceOfInterest): Promise<PlaceOfInterest>;

  // Comments
  getCommentsByCity(cityId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
}

// Initial mock data
const initialCities: City[] = [
  {
    id: 1,
    name: "London",
    country: "United Kingdom",
    population: 8982000,
    latitude: "51.5074",
    longitude: "-0.1278",
    description: "Capital city of the United Kingdom, known for its rich history and iconic landmarks.",
    twinCities: ["Berlin", "Paris", "New York", "Tokyo"],
  },
  {
    id: 2,
    name: "Manchester",
    country: "United Kingdom",
    population: 547627,
    latitude: "53.4808",
    longitude: "-2.2426",
    description: "Major city in the northwest of England, famous for its industrial heritage and football clubs.",
    twinCities: ["Dusseldorf", "St Petersburg", "Los Angeles"],
  }
];

const initialPlaces: PlaceOfInterest[] = [
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
  {
    id: 3,
    cityId: 2,
    name: "Old Trafford",
    type: "Stadium",
    latitude: "53.4631",
    longitude: "-2.2913",
    description: "Home stadium of Manchester United Football Club",
  },
];

export class MemStorage implements IStorage {
  private cities: Map<number, City>;
  private places: Map<number, PlaceOfInterest>;
  private comments: Map<number, Comment>;
  private currentIds: { city: number; place: number; comment: number };

  constructor() {
    this.cities = new Map();
    this.places = new Map();
    this.comments = new Map();
    this.currentIds = { 
      city: Math.max(...initialCities.map(c => c.id)) + 1,
      place: Math.max(...initialPlaces.map(p => p.id)) + 1,
      comment: 1 
    };

    // Initialize with mock data
    initialCities.forEach(city => this.cities.set(city.id, city));
    initialPlaces.forEach(place => this.places.set(place.id, place));
  }

  async getCities(): Promise<City[]> {
    return Array.from(this.cities.values());
  }

  async getCity(id: number): Promise<City | undefined> {
    return this.cities.get(id);
  }

  async getCityByName(name: string): Promise<City | undefined> {
    return Array.from(this.cities.values()).find(
      (city) => city.name.toLowerCase() === name.toLowerCase()
    );
  }

  async createCity(insertCity: InsertCity): Promise<City> {
    const id = this.currentIds.city++;
    const city: City = { ...insertCity, id };
    this.cities.set(id, city);
    return city;
  }

  async getPlacesByCity(cityId: number): Promise<PlaceOfInterest[]> {
    return Array.from(this.places.values()).filter(
      (place) => place.cityId === cityId
    );
  }

  async createPlace(insertPlace: InsertPlaceOfInterest): Promise<PlaceOfInterest> {
    const id = this.currentIds.place++;
    const place: PlaceOfInterest = { ...insertPlace, id };
    this.places.set(id, place);
    return place;
  }

  async getCommentsByCity(cityId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter((comment) => comment.cityId === cityId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentIds.comment++;
    const comment: Comment = {
      ...insertComment,
      id,
      createdAt: new Date(),
    };
    this.comments.set(id, comment);
    return comment;
  }
}

export const storage = new MemStorage();