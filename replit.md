# All India Physics Teachers Association (AIPTA) Portal

## Overview

This is a professional web application for the All India Physics Teachers Association (ICSE), serving 2000+ physics teachers across India and internationally. The platform provides secure access to educational resources, study materials, question papers, and video lectures organized by academic year. The system supports role-based access with Admin (President/Core Team) and Teacher (Member) roles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing with protected route handling
- **State Management**: TanStack React Query for server state, with automatic caching and refetching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom academic blue/emerald theme, CSS variables for theming
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Animations**: Framer Motion for page transitions, Three.js for 3D background effects

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **API Pattern**: RESTful API with typed route contracts defined in `shared/routes.ts`
- **Authentication**: Passport.js with Local Strategy, session-based auth using express-session
- **Password Security**: scrypt hashing with random salt for password storage
- **Session Storage**: MemoryStore (development), configurable for production

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` with Drizzle-Zod for automatic validation schema generation
- **Storage**: Abstract IStorage interface in `server/storage.ts` allows swapping between MemStorage (development) and database implementations
- **Migrations**: Drizzle Kit for database schema migrations (`drizzle.config.ts`)

### Shared Code Structure
- `shared/schema.ts`: Database table definitions, Zod schemas, and TypeScript types
- `shared/routes.ts`: API contract definitions with typed inputs/outputs for type-safe client-server communication

### Build System
- **Development**: Vite dev server with HMR, tsx for TypeScript execution
- **Production**: Custom build script using esbuild for server bundling, Vite for client
- **Output**: `dist/` directory with server bundle and `dist/public/` for static assets

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database interactions with type-safe queries

### Authentication & Sessions
- **Passport.js**: Authentication middleware with Local Strategy
- **express-session**: Session management
- **MemoryStore**: In-memory session storage (swap to connect-pg-simple for production persistence)

### UI Libraries
- **Radix UI**: Accessible, unstyled component primitives (dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-built component library using Radix primitives
- **Lucide React**: Icon library
- **Three.js**: 3D graphics for landing page background effects

### Form & Validation
- **Zod**: Schema validation for API inputs and form data
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Zod integration with React Hook Form

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant styling
- **tailwind-merge**: Intelligent class merging

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret for session encryption (defaults to "secret" in development)