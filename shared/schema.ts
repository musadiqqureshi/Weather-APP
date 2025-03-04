import { pgTable, text, serial, integer, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  population: integer("population"),
  latitude: numeric("latitude").notNull(),
  longitude: numeric("longitude").notNull(),
  description: text("description"),
  twinCities: text("twin_cities").array(),
});

export const placesOfInterest = pgTable("places_of_interest", {
  id: serial("id").primaryKey(),
  cityId: integer("city_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  latitude: numeric("latitude").notNull(),
  longitude: numeric("longitude").notNull(),
  description: text("description"),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  cityId: integer("city_id").notNull(),
  userName: text("user_name").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCitySchema = createInsertSchema(cities);
export const insertPlaceSchema = createInsertSchema(placesOfInterest);
export const insertCommentSchema = createInsertSchema(comments).omit({ createdAt: true });

export type City = typeof cities.$inferSelect;
export type InsertCity = z.infer<typeof insertCitySchema>;
export type PlaceOfInterest = typeof placesOfInterest.$inferSelect;
export type InsertPlaceOfInterest = z.infer<typeof insertPlaceSchema>;
export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
