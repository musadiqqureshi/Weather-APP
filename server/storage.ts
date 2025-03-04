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

export class MemStorage implements IStorage {
  private cities: Map<number, City>;
  private places: Map<number, PlaceOfInterest>;
  private comments: Map<number, Comment>;
  private currentIds: { city: number; place: number; comment: number };

  constructor() {
    this.cities = new Map();
    this.places = new Map();
    this.comments = new Map();
    this.currentIds = { city: 1, place: 1, comment: 1 };
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
