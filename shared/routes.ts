import { z } from 'zod';
import { insertUserSchema, insertResourceSchema, users, resources } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/auth/login',
      input: z.object({
        username: z.string(),
        password: z.string(),
      }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(), // returns user object
        401: errorSchemas.unauthorized,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout',
      responses: {
        200: z.void(),
      },
    },
    register: {
      method: 'POST' as const,
      path: '/api/auth/register',
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  resources: {
    list: {
      method: 'GET' as const,
      path: '/api/resources',
      input: z.object({
        type: z.enum(["study_material", "question_paper", "video"]).optional(),
        year: z.coerce.number().optional(),
        classLevel: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof resources.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/resources',
      input: insertResourceSchema,
      responses: {
        201: z.custom<typeof resources.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/resources/:id',
      input: insertResourceSchema.partial(),
      responses: {
        200: z.custom<typeof resources.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/resources/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
};

// ============================================
// HELPERS
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPES
// ============================================
export type LoginInput = z.infer<typeof api.auth.login.input>;
export type ResourceInput = z.infer<typeof api.resources.create.input>;
