import { users, resources, type User, type InsertUser, type Resource, type InsertResource, type UpdateResourceRequest } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Resources
  getResources(filters?: { type?: string; year?: number; classLevel?: string }): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: number, updates: UpdateResourceRequest): Promise<Resource>;
  deleteResource(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resources: Map<number, Resource>;
  private userIdCounter: number;
  private resourceIdCounter: number;

  constructor() {
    this.users = new Map();
    this.resources = new Map();
    this.userIdCounter = 1;
    this.resourceIdCounter = 1;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Resources
  async getResources(filters?: { type?: string; year?: number; classLevel?: string }): Promise<Resource[]> {
    let allResources = Array.from(this.resources.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );

    if (filters) {
      if (filters.type) {
        allResources = allResources.filter(r => r.type === filters.type);
      }
      if (filters.year) {
        allResources = allResources.filter(r => r.year === filters.year);
      }
      if (filters.classLevel) {
        allResources = allResources.filter(r => r.classLevel === filters.classLevel);
      }
    }
    
    return allResources;
  }

  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const id = this.resourceIdCounter++;
    const newResource: Resource = { 
      ...resource, 
      id, 
      createdAt: new Date(),
      description: resource.description || null,
      classLevel: resource.classLevel || null,
      subject: resource.subject || "Physics",
      author: resource.author || null,
      isNew: resource.isNew || false
    };
    this.resources.set(id, newResource);
    return newResource;
  }

  async updateResource(id: number, updates: UpdateResourceRequest): Promise<Resource> {
    const existing = this.resources.get(id);
    if (!existing) throw new Error("Resource not found");
    
    const updated: Resource = { ...existing, ...updates };
    this.resources.set(id, updated);
    return updated;
  }

  async deleteResource(id: number): Promise<void> {
    this.resources.delete(id);
  }
}

export const storage = new MemStorage();
