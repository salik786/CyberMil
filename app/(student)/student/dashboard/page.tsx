'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight,
  FileText,
  Bookmark,
  Eye,
  Upload,
  Bell,
  Sun,
  ChevronDown,
  Star,
  CheckCircle2,
  Pencil,
  User,
  GraduationCap,
  MapPin,
  Phone,
  ClipboardList,
} from 'lucide-react'

import { useAuth } from '@/lib/auth/context'
import { getStudentProfile, getCompletionPct } from '@/lib/student/mock-store'
import { COMPLETION_FIELDS } from '@/lib/student/types'
import type { StudentProfile } from '@/lib/student/types'
import { StudentNav } from '@/components/student/student-nav'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

// ── Constants ────────────────────────────────────────────────────────────────

const PROOF_KEY: keyof StudentProfile = 'resumeUrl'
const SECONDARY_FIELDS = COMPLETION_FIELDS.filter(({ key }) => key !== PROOF_KEY)

const STATS = [
  {
    label: 'Applications',
    hint: 'Apply to roles\nto see them here',
    icon: FileText,
    value: 0,
    href: '/student/applications',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
  {
    label: 'Saved jobs',
    hint: 'Bookmark roles\nyou want to revisit',
    icon: Bookmark,
    value: 0,
    href: '/student/saved',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    label: 'Profile views',
    hint: 'Employers who viewed\nyour profile',
    icon: Eye,
    value: 0,
    href: '/student/profile',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
]

// Icon map for supporting detail fields
const FIELD_ICONS: Partial<Record<keyof StudentProfile, React.ComponentType<{ className?: string; strokeWidth?: number }>>> = {
  bio:               User,
  graduationYear:    GraduationCap,
  skills:            ClipboardList,
  location:          MapPin,
  qualificationLevel: FileText,
  unitsStudied:      FileText,
  phone:             Phone,
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function isFieldFilled(profile: StudentProfile, key: keyof StudentProfile) {
  const val = profile[key]
  return val !== undefined && val !== '' && val !== null &&
    !(Array.isArray(val) && val.length === 0)
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
      <div
        className="h-full rounded-full bg-navy-700 transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}

// SVG completion ring
function CompletionRing({ pct }: { pct: number }) {
  const r = 44
  const circ = 2 * Math.PI * r
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" className="-rotate-90" aria-hidden>
      <circle cx="55" cy="55" r={r} fill="none" stroke="#f0ede9" strokeWidth="9" />
      <circle
        cx="55" cy="55" r={r} fill="none"
        stroke="#D97B29" strokeWidth="9" strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct / 100)}
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)' }}
      />
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<StudentProfile | null>(null)

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    const p = getStudentProfile(user.id)
    if (!p?.completedOnboarding) { router.push('/student/onboarding'); return }
    setProfile(p)
  }, [user, router])

  if (!profile) return null

  const pct       = getCompletionPct(profile)
  const proofDone = isFieldFilled(profile, PROOF_KEY)
  const firstName = user!.name.trim().split(/\s+/)[0]
  const greeting  = getGreeting()

  const initials = user!.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  function handleSignOut() {
    signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (renders itself as fixed aside on desktop) */}
      <StudentNav />

      {/* Main content — offset by sidebar width on desktop */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">

        {/* ── DESKTOP HEADER ─────────────────────────────────────── */}
        <header className="hidden lg:flex items-center justify-between h-16 bg-white border-b border-gray-100 px-6 shrink-0">
          {/* Greeting */}
          <div className="flex items-center gap-2">
            <Sun className="size-5 text-ochre-400" strokeWidth={1.75} />
            <span className="text-gray-600 text-sm">{greeting},</span>
          </div>

          {/* Tab nav */}
          <nav className="flex items-center gap-1" aria-label="Section navigation">
            {[
              { href: '/student/dashboard',    label: 'Dashboard' },
              { href: '/student/jobs',         label: 'Jobs' },
              { href: '/student/applications', label: 'Applications' },
              { href: '/student/saved',        label: 'Saved' },
            ].map(({ href, label }) => {
              const active = router && href === '/student/dashboard'
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                    active
                      ? 'bg-navy-50 text-navy-700 border border-navy-100'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50',
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Right: bell + avatar */}
          <div className="flex items-center gap-3">
            <button className="relative text-gray-400 hover:text-gray-600 transition-colors" aria-label="Notifications">
              <Bell className="size-5" strokeWidth={1.75} />
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-ochre-500" aria-hidden />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 focus-visible:outline-none">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-navy-700 text-white text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="size-3.5 text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-800 truncate">{user!.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user!.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/student/profile')}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600 cursor-pointer">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* ── PAGE CONTENT ────────────────────────────────────────── */}
        <main className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-8 space-y-5">

          {/* ── USER IDENTITY + PROFILE RING ROW ──────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

            {/* Name block */}
            <div>
              <h1 className="font-display text-4xl font-bold text-gray-900 tracking-tight leading-none">
                {firstName}
              </h1>
              <p className="text-gray-500 text-sm mt-1.5">{profile.course}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 text-gray-700 text-xs font-medium">
                  <span className="size-1.5 rounded-full bg-green-500" aria-hidden />
                  {profile.availability === 'full-time' ? 'Full-Time'
                    : profile.availability === 'part-time' ? 'Part-Time'
                    : profile.availability === 'casual' ? 'Casual'
                    : 'Internship'}
                </span>
                <Link href="/student/profile" className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors">
                  Change
                </Link>
              </div>
            </div>

            {/* Profile completion card */}
            <div className="sm:shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5 sm:min-w-[280px]">
              {/* Ring */}
              <div className="relative shrink-0">
                <CompletionRing pct={pct} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="font-bold text-gray-900 text-xl leading-none">{pct}%</span>
                  <span className="text-gray-400 text-[10px] mt-0.5">Complete</span>
                </div>
              </div>
              {/* Text + CTA */}
              <div>
                <p className="font-semibold text-gray-800 text-sm leading-snug mb-1">
                  Complete your profile
                </p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">
                  A complete profile gets 3× more employer views.
                </p>
                <Link href="/student/jobs">
                  <Button className="h-9 px-4 bg-ochre-500 hover:bg-ochre-600 text-white text-xs font-semibold">
                    Browse jobs <ArrowRight className="ml-1.5 size-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* ── STATS ROW ────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {STATS.map(({ label, hint, icon: Icon, value, href, iconBg, iconColor }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50 transition-colors"
                >
                  <div className={cn('size-11 rounded-xl flex items-center justify-center shrink-0', iconBg)}>
                    <Icon className={cn('size-5', iconColor)} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-2xl leading-none">{value}</p>
                    <p className="text-gray-400 text-xs mt-1 leading-snug whitespace-pre-line">{hint}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── COMPLETE YOUR PROFILE CARD ──────────────────────────── */}
          {pct < 100 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display font-semibold text-gray-900 text-lg tracking-tight">
                      Complete your profile
                    </h2>
                    <p className="text-gray-500 text-sm mt-0.5">
                      A complete profile gets 3× more employer views
                    </p>
                  </div>
                  <Link
                    href="/student/profile"
                    className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-800 border border-gray-200 hover:border-gray-300 rounded-lg px-3 py-1.5 transition-colors mt-0.5"
                  >
                    <Pencil className="size-3.5" strokeWidth={1.75} />
                    Edit profile
                  </Link>
                </div>
                <ProgressBar value={pct} />
              </div>

              <div className="p-6 space-y-6">
                {/* ── Resume upload — highest impact ─────────────────── */}
                <div
                  className={cn(
                    'rounded-2xl p-5',
                    proofDone ? 'bg-teal-50 border border-teal-100' : 'bg-ochre-50 border border-ochre-100',
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'size-11 rounded-xl flex items-center justify-center shrink-0',
                        proofDone ? 'bg-teal-100' : 'bg-ochre-100',
                      )}
                      aria-hidden
                    >
                      {proofDone
                        ? <CheckCircle2 className="size-6 text-teal-600" strokeWidth={2} />
                        : <Star className="size-6 text-ochre-500" strokeWidth={1.75} />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('font-semibold text-sm leading-snug', proofDone ? 'text-teal-800' : 'text-gray-800')}>
                        {proofDone
                          ? 'Resume uploaded'
                          : 'Upload a resume — highest impact step'}
                      </p>
                      <p className={cn('text-xs mt-1 leading-relaxed', proofDone ? 'text-teal-700' : 'text-gray-600')}>
                        {proofDone
                          ? 'Employers can download your resume directly. This is your most important credential on the platform.'
                          : 'This accounts for 20% of your score — more than any other single field. Profiles with a resume get 3× more employer contact.'}
                      </p>
                      {!proofDone && (
                        <Link href="/student/profile#resume" className="mt-4 inline-block">
                          <Button
                            size="sm"
                            className="h-9 px-4 bg-ochre-500 hover:bg-ochre-600 text-white text-xs font-semibold"
                          >
                            <Upload className="mr-1.5 size-3.5" strokeWidth={2} />
                            Upload resume
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Supporting details ─────────────────────────────── */}
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.1em] mb-4">
                    Supporting details
                  </p>

                  {/* Desktop: 2-column checkbox grid */}
                  <div className="hidden sm:grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {SECONDARY_FIELDS.map(({ key, label }) => {
                      const done = isFieldFilled(profile, key)
                      return (
                        <div key={String(key)} className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className={cn(
                              'size-4 rounded flex items-center justify-center shrink-0 border transition-colors',
                              done ? 'bg-navy-700 border-navy-700' : 'border-gray-300 bg-white',
                            )}
                          >
                            {done && (
                              <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden>
                                <path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className={cn('text-sm', done ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-700')}>
                            {label}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Mobile: list rows with icons and "Add >" links */}
                  <div className="sm:hidden divide-y divide-gray-100 rounded-xl border border-gray-100 overflow-hidden">
                    {SECONDARY_FIELDS.map(({ key, label }) => {
                      const done = isFieldFilled(profile, key)
                      const Icon = FIELD_ICONS[key] ?? FileText
                      return (
                        <Link
                          key={String(key)}
                          href="/student/profile"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="size-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <Icon className="size-4 text-gray-500" strokeWidth={1.75} />
                          </div>
                          <span className={cn('flex-1 text-sm', done ? 'text-gray-400 line-through' : 'text-gray-700')}>
                            {label}
                          </span>
                          {!done && (
                            <span className="text-blue-600 text-xs font-medium shrink-0">
                              Add &gt;
                            </span>
                          )}
                          {done && (
                            <CheckCircle2 className="size-4 text-teal-500 shrink-0" strokeWidth={2} />
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Mobile: View full profile CTA */}
                <Link
                  href="/student/profile"
                  className="sm:hidden flex items-center justify-center gap-2 h-11 w-full rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <Eye className="size-4 text-gray-400" strokeWidth={1.75} />
                  View full profile
                </Link>

                {/* Mobile: Stand out to employers card */}
                <div className="sm:hidden rounded-2xl bg-navy-800 p-5">
                  <div className="size-8 rounded-lg bg-ochre-500/20 flex items-center justify-center mb-3">
                    <svg className="size-4 text-ochre-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">Stand out to employers</p>
                  <p className="text-white/50 text-xs leading-relaxed mb-4">
                    Complete your profile to get more views and opportunities.
                  </p>
                  <Link href="/student/profile">
                    <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">
                      Get started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
