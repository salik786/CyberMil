# Student Dashboard Feature

## Overview
The student dashboard flow covers three pages: quick onboarding, dashboard home, and full profile editor. All data is stored in localStorage (mock; no Supabase yet).

## Routes
| Route | File | Purpose |
|---|---|---|
| `/student/onboarding` | `app/(student)/student/onboarding/page.tsx` | 3-field quick setup (first visit only) |
| `/student/dashboard` | `app/(student)/student/dashboard/page.tsx` | Home dashboard with stats + completion card |
| `/student/profile` | `app/(student)/student/profile/page.tsx` | Full detailed profile editor |

## Data layer
- **Types**: `lib/student/types.ts` — `StudentProfile`, `QualificationLevel`, `Availability`, `COMPLETION_FIELDS`
- **Store**: `lib/student/mock-store.ts` — `getStudentProfile`, `completeOnboarding`, `updateStudentProfile`, `getCompletionPct`
- **Storage key**: `cybermil_student_profiles` in `localStorage` (keyed by `userId`)

## Completion scoring
- Base 30% for completing onboarding
- 8 optional fields with weights summing to 70%: bio (15), skills (15), resumeUrl (20), qualificationLevel (10), graduationYear (10), unitsStudied (10), phone (10), location (10)
- `getCompletionPct(profile)` returns 0–100

## Nav
`components/student/student-nav.tsx` — sticky navy-700 header, desktop nav links, avatar dropdown. Uses `@base-ui/react` Menu primitives (shadcn v4) — no `asChild` prop.

## UX flow
1. Register as student → middleware redirects to `/student/onboarding`
2. Fill 3 fields (campus, course, availability) → stored via `completeOnboarding()` → redirect to `/student/dashboard`
3. Dashboard shows: completion progress card, zero-state stats, empty job matches, resume nudge
4. Profile page allows editing all fields + tag inputs for skills and units

## Middleware routing
`middleware.ts` redirects unauthenticated users away from `/student/*`. After login, role `student` is sent to `/student/dashboard` where a redirect to `/student/onboarding` happens if `completedOnboarding` is false.

## Swap to Supabase
Replace `localStorage` calls in `lib/student/mock-store.ts` with Supabase queries against the `student_profiles` table. The `userId` key maps to `auth.uid()`. All function signatures stay the same.
