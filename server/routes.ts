import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Password verification endpoint for review gate
  app.post("/api/verify-password", (req, res) => {
    const { password } = req.body;
    const reviewPassword = process.env.REVIEW_PASSWORD || "tecnis2026";
    
    if (password === reviewPassword) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
