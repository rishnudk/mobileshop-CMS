# Mobile Repair Shop CMS — AI IDE Implementation Plan

# Project Goal

Build a scalable full-stack CMS software for a mobile repair shop using modern production-grade architecture.

The system should support:
- Complaint registration
- Repair workflow management
- Staff/admin login
- WhatsApp notifications
- Search & filtering
- Activity logs
- Future scalability

This project should be structured like a real SaaS/business application.

---

# Core Requirements

## Authentication
- Login only
- No public signup
- Admin/staff added manually via database
- Role-based access control
- Use NextAuth/Auth.js only if necessary

---

# Tech Stack

## Frontend
- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Lucide Icons

---

## Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

## Database
- PostgreSQL (local database for now)

---

## Notifications
- WhatsApp Cloud API (future integration)

---

# Architecture Style

Use scalable modular architecture.

The codebase must support:
- Future feature modules
- Large business logic
- Multiple developers
- SaaS expansion later

Avoid tightly coupled code.

Use:
- feature-based modules
- service layer
- repository pattern
- shared validation
- centralized configs
- reusable UI system

---

# Monorepo Structure

Create a monorepo using pnpm workspaces.

Structure:

apps/
├── frontend/
├── backend/

packages/
├── shared/
│   ├── types/
│   ├── constants/
│   ├── validators/
│   └── utils/

---

# Frontend Requirements

# Initialize Next.js App

Create:
apps/frontend

Use:
- App Router
- TypeScript
- TailwindCSS
- ESLint

---

# Install Frontend Dependencies

Install:

UI & Styling:
- tailwindcss
- class-variance-authority
- clsx
- tailwind-merge
- lucide-react
- next-themes
- framer-motion

Forms & Validation:
- react-hook-form
- zod
- @hookform/resolvers

State Management:
- zustand

Data Fetching:
- @tanstack/react-query

Tables:
- @tanstack/react-table

Utilities:
- date-fns
- sonner

Auth:
- next-auth (only if frontend session handling is needed)

---

# Setup shadcn/ui

Initialize shadcn/ui.

Use a modern admin dashboard style suitable for:
- CRM
- CMS
- ERP
- Dashboard software

Recommended design direction:
- Minimal
- Clean
- Sidebar layout
- Responsive
- Soft neutral colors
- Enterprise style UI

Install commonly used components:
- button
- input
- form
- dialog
- dropdown-menu
- card
- table
- sheet
- tabs
- badge
- avatar
- select
- textarea
- sonner
- skeleton
- alert-dialog
- tooltip
- command
- pagination

---

# Frontend Folder Structure

apps/frontend/src/

app/
├── (auth)/
│   └── login/
│
├── (dashboard)/
│   ├── dashboard/
│   ├── complaints/
│   │   ├── new/
│   │   ├── [id]/
│   │   └── page.tsx
│   ├── customers/
│   ├── staff/
│   ├── settings/
│   └── layout.tsx
│
└── api/

components/
├── ui/
├── layout/
├── forms/
├── tables/
├── dashboard/
├── complaints/
├── shared/
└── providers/

features/
├── auth/
├── complaints/
├── dashboard/
├── staff/
└── customers/

hooks/

lib/
├── api/
├── auth/
├── prisma/
├── validations/
└── utils/

services/

store/

types/

constants/

styles/

middleware.ts

---

# Backend Requirements

# Initialize Express Backend

Create:
apps/backend

Use:
- TypeScript
- Express.js

---

# Install Backend Dependencies

Core:
- express
- cors
- dotenv
- helmet
- morgan
- compression

Validation:
- zod

Database:
- prisma
- @prisma/client

Authentication:
- bcryptjs
- jsonwebtoken

Utilities:
- dayjs
- uuid

Development:
- typescript
- ts-node-dev
- nodemon

Future-ready:
- bullmq
- ioredis

---

# Backend Folder Structure

apps/backend/src/

config/
├── env.ts
├── db.ts
└── app.ts

modules/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.repository.ts
│   ├── auth.routes.ts
│   ├── auth.schema.ts
│   └── auth.types.ts
│
├── users/
├── complaints/
├── dashboard/
├── whatsapp/
└── logs/

common/
├── middleware/
├── errors/
├── validators/
├── helpers/
└── constants/

routes/

services/

repositories/

jobs/

queue/

events/

utils/

app.ts

server.ts

---

# Database Setup

Use PostgreSQL locally.

Setup:
- Prisma ORM
- Prisma migrations
- Prisma seed

---

# Prisma Requirements

Create initial models:

## User
Fields:
- id
- name
- email
- password
- role
- createdAt

---

## Complaint
Fields:
- id
- complaintId
- customerName
- customerPhone
- deviceBrand
- deviceModel
- imei
- issueDescription
- status
- estimatedCost
- advancePaid
- assignedTechnicianId
- createdAt

---

## ComplaintLog
Fields:
- id
- complaintId
- oldStatus
- newStatus
- updatedBy
- createdAt

---

# Backend Architecture Rules

Use clean architecture principles.

Each module should contain:
- controller
- service
- repository
- validation schema
- routes
- types

Business logic must stay inside services.

Database queries must stay inside repositories.

Controllers should remain thin.

---

# API Structure

Base API:
api/v1/

Example:
- /api/v1/auth/login
- /api/v1/complaints
- /api/v1/dashboard

---

# Authentication Plan

Preferred:
Custom JWT authentication.

Why:
- Simpler for internal CMS
- Easier RBAC
- Easier backend separation

Use NextAuth only if:
- frontend session management becomes complex
- OAuth is added later

---

# Initial Features To Build

# MVP

Build ONLY:

1. Login
2. Dashboard layout
3. Complaint creation
4. Complaint listing
5. Complaint detail page
6. Complaint status updates
7. Search complaints
8. Staff management

Do NOT build:
- inventory
- analytics
- billing
- QR tracking
- realtime sockets

yet.

---

# Frontend Layout Requirements

Create:
- Sidebar layout
- Top navbar
- Dashboard shell
- Mobile responsive sidebar

Sidebar Items:
- Dashboard
- Complaints
- Customers
- Staff
- Settings

---

# State Management Rules

Use:
- Zustand for UI/global state
- React Query for server state

Do NOT overuse Zustand.

---

# Form Handling Rules

Use:
- React Hook Form
- Zod validation

Validation should exist:
- frontend
- backend

Shared validation types should go inside:
packages/shared

---

# Environment Variables

Frontend:
- NEXT_PUBLIC_API_URL

Backend:
- PORT
- DATABASE_URL
- JWT_SECRET

---

# Development Scripts

Root scripts:
- dev
- build
- lint
- format

Use concurrent dev servers.

---

# Code Quality Rules

Use:
- ESLint
- Prettier
- strict TypeScript

Naming:
- kebab-case folders
- PascalCase components
- camelCase functions

---

# Future Scalability Preparation

Architecture should support future additions:

Future Modules:
- inventory
- billing
- analytics
- QR tracking
- notifications
- multi-branch support
- customer portal
- mobile app

Prepare for:
- Redis queues
- WebSockets
- Event-driven workflows
- SaaS multi-tenancy

---

# Deployment Preparation

Frontend:
- Vercel

Backend:
- Railway / VPS / Render

Database:
- PostgreSQL

---

# Final AI IDE Instructions

Now perform these tasks in order:

1. Initialize monorepo using pnpm workspaces
2. Create frontend app
3. Create backend app
4. Setup shared package
5. Install all dependencies
6. Configure TypeScript
7. Configure TailwindCSS
8. Setup shadcn/ui admin-style template
9. Setup Express backend
10. Setup Prisma
11. Connect PostgreSQL
12. Configure environment variables
13. Setup authentication foundation
14. Create scalable folder structure
15. Configure path aliases
16. Setup API connection between frontend and backend
17. Create base dashboard layout
18. Create sidebar navigation
19. Create reusable UI architecture
20. Prepare project for feature-based scaling

Do not build business features yet.

Only setup architecture and foundation properly.