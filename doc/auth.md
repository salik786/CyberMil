# Auth Feature

## Overview

Handles user registration and sign-in for two roles: **Student** and **Employer**.
Auth is currently implemented as a **mock** (localStorage + cookie) with no backend dependency, enabling full UI development and testing before Supabase is wired in.

---

## Pages

| Route | File | Description |
|---|---|---|
| `/login` | `app/(auth)/login/page.tsx` | Email + password sign-in |
| `/register` | `app/(auth)/register/page.tsx` | Role-based sign-up (student / employer) |

Both pages share the two-column layout in `app/(auth)/layout.tsx`:
- **Left panel** (desktop only): branding, quote, logo
- **Right panel**: centered form, max-width 384px

---

## Mock Auth System

All auth logic lives in `lib/auth/`:

```
lib/auth/
├── types.ts        — MockUser, SignUpData, SignInData, AuthResult
├── mock-store.ts   — localStorage read/write + cookie sync
└── context.tsx     — AuthProvider + useAuth() hook
```

### Storage
- **Users list**: `localStorage['cybermil_users']` — array of `{...MockUser, password}`
- **Active session**: `localStorage['cybermil_session']` — `MockUser` (no password)
- **Middleware cookie**: `auth-session` — URL-encoded JSON of `MockUser`, 7-day max-age

### Why two stores?
The `localStorage` session is read by the client-side `AuthProvider` on mount. The `auth-session` cookie is read by the Next.js `middleware.ts` (which has no access to localStorage) to enforce route protection server-side.

### `AuthResult` type
All auth functions return a discriminated union — never throw:
```ts
type AuthResult =
  | { user: MockUser; error: null }
  | { user: null; error: string }
```

### `useAuth()` hook
Available in any Client Component wrapped by `Providers`:
```ts
const { user, isLoading, signIn, signUp, signOut } = useAuth()
```

---

## Middleware Route Protection

`middleware.ts` reads the `auth-session` cookie and enforces:

| Condition | Action |
|---|---|
| No session + accessing `/student/*`, `/employer/*`, `/admin/*` | Redirect → `/login` |
| Has session + accessing `/login` or `/register` | Redirect → role dashboard |

---

## Register Flow

1. User selects role (Student / Employer) — visual toggle, not a dropdown
2. Employer role reveals the **Company name** field
3. Fields: Full name, Email, Password (min 8 chars), Confirm password
4. Zod validates client-side; server-level errors (e.g. duplicate email) shown inline
5. On success → redirect to `/student/dashboard` or `/employer/dashboard`

## Sign-in Flow

1. Email + password with show/hide toggle
2. On success → redirect based on stored role

---

## Validation (Zod schemas)

**Register schema** (`app/(auth)/register/page.tsx`):
- `name`: min 2 chars
- `email`: valid email format
- `password`: min 8 chars
- `confirmPassword`: must match `password`
- `role`: `'student' | 'employer'`
- `companyName`: required when `role === 'employer'`

**Login schema** (`app/(auth)/login/page.tsx`):
- `email`: valid email format
- `password`: required (non-empty)

---

## Replacing Mock with Supabase

When ready to swap in real auth:

1. Delete `lib/auth/mock-store.ts` and `lib/auth/context.tsx`
2. Replace with Supabase session using `lib/supabase/client.ts` + `lib/supabase/server.ts`
3. Update `AuthProvider` to use `supabase.auth.getUser()` and `onAuthStateChange`
4. Restore `middleware.ts` to use `lib/supabase/middleware.ts` (`updateSession`)
5. The page components (`login/page.tsx`, `register/page.tsx`) need minimal changes — just swap `signIn`/`signUp` calls to Supabase equivalents and update the `AuthResult` shape

---

## Accessibility

- All form fields have associated `<Label>` with `htmlFor`
- Errors linked via `aria-describedby` and `aria-invalid`
- Role selector is a `radiogroup` with `aria-checked` on each option
- Password toggle has `aria-label` that changes with state
- `noValidate` on forms prevents browser-native popups (custom errors used)
