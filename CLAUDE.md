# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CyberMil** is an MVP job-matching platform connecting TAFE (Technical and Further Education) students with employers — a niche version of Seek/Indeed tailored to vocational education graduates.

Two primary user roles: **Students** (job seekers) and **Employers** (job posters). An **Admin** role manages platform integrity.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Database + Auth | Supabase (PostgreSQL + Auth + Storage) |
| UI | Tailwind CSS + shadcn/ui |
| ORM | Supabase JS client (direct, no Prisma) |
| Deployment | Vercel (frontend) + Supabase cloud |

---

## Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Supabase local dev (requires Supabase CLI)
supabase start          # start local Supabase stack
supabase db reset       # reset DB and re-run migrations
supabase migration new <name>   # create a new migration
supabase gen types typescript --local > lib/types/database.types.ts  # regenerate DB types
```

---

## Project Structure

```
cybermil/
├── app/
│   ├── (auth)/                    # login, register (route group, no layout)
│   │   ├── login/
│   │   └── register/
│   ├── (student)/                 # student-facing pages (requires student role)
│   │   └── student/
│   │       ├── dashboard/
│   │       ├── profile/
│   │       ├── jobs/
│   │       ├── applications/
│   │       └── saved/
│   ├── (employer)/                # employer-facing pages (requires employer role)
│   │   └── employer/
│   │       ├── dashboard/
│   │       ├── profile/
│   │       └── jobs/
│   │           ├── new/
│   │           └── [id]/
│   │               └── applicants/
│   ├── (public)/                  # public pages (no auth required)
│   │   ├── page.tsx               # landing page
│   │   └── jobs/
│   │       ├── page.tsx           # public job board
│   │       └── [id]/page.tsx      # job detail
│   ├── admin/                     # admin panel
│   └── api/                       # API route handlers (webhooks, etc.)
│
├── components/
│   ├── ui/                        # shadcn/ui components (auto-generated, do not edit)
│   ├── jobs/                      # JobCard, JobFilters, JobList
│   ├── student/                   # StudentCard, ProfileForm, ApplicationStatus
│   ├── employer/                  # EmployerCard, JobForm, ApplicantTable
│   └── shared/                    # Navbar, Footer, Avatar, Badge
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # browser Supabase client (singleton)
│   │   ├── server.ts              # server-side Supabase client (cookies)
│   │   └── middleware.ts          # auth session refresh helper
│   ├── types/
│   │   ├── database.types.ts      # auto-generated from Supabase schema
│   │   └── index.ts               # app-level derived types
│   └── utils/
│       └── index.ts               # shared helpers
│
├── supabase/
│   ├── migrations/                # SQL migration files (source of truth for schema)
│   └── seed.sql                   # dev seed data
│
└── middleware.ts                  # Next.js middleware — protects routes by role
```

---

## Database Schema

All schema changes go in `supabase/migrations/`. Never edit the DB directly in production.

**Key tables:**

```sql
-- Extends Supabase auth.users
profiles (id, role, full_name, avatar_url, created_at)

student_profiles (
  user_id, tafe_campus, course, graduation_year,
  bio, skills text[], resume_url, availability,  -- availability: full-time|part-time|casual|internship
  is_visible  -- controls whether employer can discover them
)

employer_profiles (
  user_id, company_name, logo_url, website,
  industry, description, location, is_verified
)

job_listings (
  id, employer_id, title, description, location,
  job_type, required_skills text[], salary_min, salary_max,
  status,  -- draft|active|closed
  created_at, expires_at
)

applications (
  id, student_id, job_id, cover_letter,
  status,  -- pending|reviewed|shortlisted|rejected
  created_at
)

saved_jobs (student_id, job_id, saved_at)
```

Row Level Security (RLS) is enabled on all tables. Policies enforce:
- Students can only read/write their own profiles and applications
- Employers can only manage their own job listings and read applicants on their listings
- Public can read `active` job listings and `is_verified` employers

---

## Architecture Patterns

### Auth & Role Routing
Supabase Auth handles sessions. `middleware.ts` reads the session and the user's `role` from `profiles` table, then redirects unauthenticated users to `/login` and enforces role-based access (students → `/student/*`, employers → `/employer/*`).

### Server vs Client Components
- Prefer **Server Components** for data fetching (use `lib/supabase/server.ts`)
- Use **Client Components** only for interactivity (forms, modals, filters)
- Pass data down as props; avoid redundant client-side fetches for initial page load

### Supabase Clients
- `lib/supabase/server.ts` — use in Server Components, Route Handlers, Server Actions
- `lib/supabase/client.ts` — use in Client Components only
- Never import server client in a `"use client"` file

### Server Actions
Mutations (create application, update profile, post job) are done via Next.js Server Actions, not separate API routes. Co-locate actions in `actions.ts` files next to the relevant page.

### Type Safety
Run `supabase gen types` after any migration to keep `database.types.ts` in sync. Build derived app types in `lib/types/index.ts` rather than repeating inline.

---

## Key User Flows

1. **Student registers** → selects "Student" role → completes TAFE profile → browses job board → applies with cover letter
2. **Employer registers** → selects "Employer" role → creates company profile → posts job listing → reviews applicants → shortlists
3. **Job board** is publicly visible (no login required to browse) but applying requires a student account

---

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # server-only, never expose to client
```
