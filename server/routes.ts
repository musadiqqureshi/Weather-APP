import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertCitySchema, insertCommentSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Cities
  app.get("/api/cities", async (_req, res) => {
    const cities = await storage.getCities();
    res.json(cities);
  });

  app.get("/api/cities/:id", async (req, res) => {
    const city = await storage.getCity(parseInt(req.params.id));
    if (!city) {
      res.status(404).json({ message: "City not found" });
      return;
    }
    res.json(city);
  });

  app.get("/api/cities/search/:name", async (req, res) => {
    const city = await storage.getCityByName(req.params.name);
    if (!city) {
      res.status(404).json({ message: "City not found" });
      return;
    }
    res.json(city);
  });

  // Places of Interest
  app.get("/api/cities/:cityId/places", async (req, res) => {
    const places = await storage.getPlacesByCity(parseInt(req.params.cityId));
    res.json(places);
  });

  // Comments
  app.get("/api/cities/:cityId/comments", async (req, res) => {
    const comments = await storage.getCommentsByCity(parseInt(req.params.cityId));
    res.json(comments);
  });

  app.post("/api/cities/:cityId/comments", async (req, res) => {
    try {
      const cityId = parseInt(req.params.cityId);
      const comment = insertCommentSchema.parse({ ...req.body, cityId });
      const newComment = await storage.createComment(comment);
      res.json(newComment);
    } catch (error) {
      res.status(400).json({ message: "Invalid comment data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
