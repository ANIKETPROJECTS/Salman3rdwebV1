import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(), // email
  password: text("password").notNull(),
  role: text("role", { enum: ["admin", "teacher"] }).notNull().default("teacher"),
  name: text("name").notNull(),
  institution: text("institution"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type", { enum: ["study_material", "question_paper", "video"] }).notNull(),
  year: integer("year").notNull(),
  classLevel: text("class_level"), // e.g. "9", "10"
  subject: text("subject").default("Physics"),
  author: text("author"),
  link: text("link").notNull(), // URL to file or video
  isNew: boolean("is_new").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertResourceSchema = createInsertSchema(resources).omit({ id: true, createdAt: true });

// === EXPLICIT TYPES ===

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

// Request types
export type CreateUserRequest = InsertUser;
export type CreateResourceRequest = InsertResource;
export type UpdateResourceRequest = Partial<InsertResource>;

// Response types
export type UserResponse = Omit<User, "password">;
export type ResourceResponse = Resource;
