import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import MemoryStore from "memorystore";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // === AUTH SETUP ===
  const SessionStore = MemoryStore(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "secret",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 86400000 },
      store: new SessionStore({ checkPeriod: 86400000 }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) return done(null, false);
        const isValid = await comparePasswords(password, user.password);
        if (!isValid) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // === AUTH ROUTES ===

  app.post(api.auth.register.path, async (req, res) => {
    try {
      const input = api.auth.register.input.parse(req.body);
      const existing = await storage.getUserByUsername(input.username);
      if (existing) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await hashPassword(input.password);
      const user = await storage.createUser({ ...input, password: hashedPassword });
      req.login(user, (err) => {
        if (err) throw err;
        res.status(201).json(user);
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.post(api.auth.login.path, passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });
      res.sendStatus(200);
    });
  });

  app.get(api.auth.me.path, (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    res.json(req.user);
  });

  // === RESOURCE ROUTES ===

  app.get(api.resources.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const filters = api.resources.list.input?.parse(req.query);
    const resources = await storage.getResources(filters);
    res.json(resources);
  });

  app.post(api.resources.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    // Optional: Check if user.role === 'admin'
    const user = req.user as any;
    if (user.role !== 'admin') {
         // Allow for now or restrict? Prompt says Admin Panel.
         // Let's restrict to admin for strictness
         return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const input = api.resources.create.input.parse(req.body);
      const resource = await storage.createResource(input);
      res.status(201).json(resource);
    } catch (err) {
       if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.put(api.resources.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
     const user = req.user as any;
    if (user.role !== 'admin') return res.status(403).json({ message: "Forbidden" });

    const updated = await storage.updateResource(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  });

  app.delete(api.resources.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user as any;
    if (user.role !== 'admin') return res.status(403).json({ message: "Forbidden" });

    await storage.deleteResource(Number(req.params.id));
    res.sendStatus(204);
  });

  return httpServer;
}

// === SEED DATA ===
async function seed() {
  const existingUser = await storage.getUserByUsername("admin");
  if (!existingUser) {
    const hashedPassword = await hashPassword("admin123");
    await storage.createUser({
      username: "admin",
      password: hashedPassword,
      name: "President IAPT",
      role: "admin",
      institution: "IAPT HQ",
    });
    console.log("Seeded admin user");
  }

  const existingTeacher = await storage.getUserByUsername("teacher");
  if (!existingTeacher) {
    const hashedPassword = await hashPassword("teacher123");
    await storage.createUser({
      username: "teacher",
      password: hashedPassword,
      name: "Physics Teacher",
      role: "teacher",
      institution: "St. Xavier's School",
    });
    console.log("Seeded teacher user");
  }

  const resources = await storage.getResources();
  if (resources.length === 0) {
    await storage.createResource({
      title: "ICSE Class 10 Physics Syllabus 2025",
      type: "study_material",
      year: 2025,
      classLevel: "10",
      link: "#",
      description: "Official syllabus for the upcoming academic year.",
      isNew: true,
      author: "Council"
    });
    await storage.createResource({
      title: "2024 Board Question Paper - Physics",
      type: "question_paper",
      year: 2024,
      classLevel: "10",
      link: "#",
      description: "Previous year board examination paper.",
      author: "Board"
    });
    await storage.createResource({
      title: "Force and Laws of Motion - Lecture 1",
      type: "video",
      year: 2025,
      classLevel: "9",
      link: "https://www.youtube.com/watch?v=placeholder",
      description: "Introduction to Newton's laws.",
      author: "Dr. H.C. Verma"
    });
    console.log("Seeded resources");
  }
}

// Call seed (async, don't wait)
seed().catch(console.error);
