'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  FileText,
  Bookmark,
  Eye,
  Upload,
  MapPin,
  Clock,
  ChevronRight,
  Star,
  CheckCircle2,
} from 'lucide-react'

import { useAuth } from '@/lib/auth/context'
import { getStudentProfile, getCompletionPct } from '@/lib/student/mock-store'
import { COMPLETION_FIELDS } from '@/lib/student/types'
import type { StudentProfile } from '@/lib/student/types'
import { StudentNav } from '@/components/student/student-nav'
import { ChecklistItem } from '@/components/shared/checklist-item'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// ── Constants ─────────────────────────────────────────────────────────────────

const PROOF_KEY: keyof StudentProfile = 'resumeUrl'
const SECONDARY_FIELDS = COMPLETION_FIELDS.filter(({ key }) => key !== PROOF_KEY)

const STATS = [
  { label: 'Applications', icon: FileText,  value: 0, hint: 'Apply to roles to see them here',       href: '/student/applications' },
  { label: 'Saved jobs',   icon: Bookmark,  value: 0, hint: 'Bookmark roles you want to revisit',    href: '/student/saved' },
  { label: 'Profile views',icon: Eye,       value: 0, hint: 'Employers who viewed your profile',     href: '/student/profile' },
]

// Placeholder job cards — real workplace photography per DS §8
const PLACEHOLDER_JOBS = [
  {
    id: 1,
    title: 'Electrical Apprentice',
    company: 'Ausgrid',
    location: 'Western Sydney, NSW',
    type: 'Apprenticeship',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=480&h=360&fit=crop&auto=format&q=80',
    alt: 'Electrician working with wiring in an industrial setting',
  },
  {
    id: 2,
    title: 'IT Support Technician',
    company: 'Service NSW',
    location: 'Parramatta, NSW',
    type: 'Full-time',
    img: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=480&h=360&fit=crop&auto=format&q=80',
    alt: 'IT technician at a server rack in a data centre',
  },
  {
    id: 3,
    title: 'Construction Labourer',
    company: 'Lendlease',
    location: 'Sydney CBD, NSW',
    type: 'Casual',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=480&h=360&fit=crop&auto=format&q=80',
    alt: 'Workers on an active building site wearing hi-vis vests',
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0]
}

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

// Plain-div progress bar — the base-ui Progress component's outer-div
// layout conflicts with arbitrary height/color overrides.
function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn('h-1.5 w-full rounded-full bg-gray-100 overflow-hidden', className)}>
      <div
        className="h-full rounded-full bg-navy-600 transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [profile, setProfile] = useState<StudentProfile | null>(null)

  useEffect(() => {
    if (isLoading) return
    if (!user) { router.push('/login'); return }
    const p = getStudentProfile(user.id)
    if (!p?.completedOnboarding) { router.push('/student/onboarding'); return }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(p)
  }, [user, isLoading, router])

  if (isLoading || !profile) return null

  const pct = getCompletionPct(profile)
  const proofDone = isFieldFilled(profile, PROOF_KEY)
  const firstName = getFirstName(user!.name)

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNav />

      {/* ══════════════════════════════════════════════════════════════
          HERO — navy-800, compact ~260px, stats integrated inside
          No separate white stat row below — everything in one band.
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-navy-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-0">

          {/* Top row: name block + ring (desktop side-by-side, mobile stacked) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            {/* Name block */}
            <div className="min-w-0">
              <p className="text-white/40 text-xs font-medium uppercase tracking-[0.12em] mb-2">
                {getGreeting()}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-[-0.015em] leading-[1.1]">
                {firstName}
              </h1>
              <p className="text-white/50 text-sm mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>{profile.course}</span>
                {profile.location && (
                  <>
                    <span className="text-white/20" aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                      {profile.location}
                    </span>
                  </>
                )}
              </p>
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium capitalize">
                  <Clock className="size-3 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  {profile.availability}
                  <Link
                    href="/student/profile"
                    className="text-white/35 hover:text-white/60 transition-colors ml-0.5"
                    aria-label="Change availability"
                  >
                    · change
                  </Link>
                </span>
              </div>
            </div>

            {/* Completion ring + CTA (desktop) */}
            <div className="hidden sm:flex flex-col items-center gap-4 shrink-0">
              <div className="relative size-20" aria-label={`Profile ${pct}% complete`}>
                <svg className="size-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
                  <circle
                    cx="40" cy="40" r="34" fill="none"
                    stroke="#D97B29" strokeWidth="7" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 34}`}
                    strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
                    style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="font-mono text-white text-lg font-semibold leading-none">{pct}%</span>
                  <span className="text-white/35 text-[10px] mt-0.5 leading-none">complete</span>
                </div>
              </div>
              <Link href="/student/jobs">
                <Button className="bg-ochre-500 hover:bg-ochre-600 active:bg-ochre-700 text-white h-10 px-5 font-semibold text-sm">
                  Browse jobs <ArrowRight className="ml-1.5 size-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* ── Stats row — bottom of hero, flush with band ─────────── */}
          {/* Divider line */}
          <div className="mt-8 border-t border-white/10" />
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {STATS.map(({ label, icon: Icon, value, hint, href }, i) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  'group flex items-center gap-4 px-0 py-5 transition-colors hover:bg-white/5',
                  'sm:px-6 sm:first:pl-0 sm:last:pr-0',
                  // vertical divider between cols on desktop
                  i > 0 && 'sm:border-l sm:border-white/10',
                  // horizontal divider between rows on mobile
                  i > 0 && 'border-t border-white/10 sm:border-t-0',
                )}
              >
                <div className="size-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-white/50 group-hover:text-white/80 transition-colors" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-2xl font-semibold text-white leading-none">{value}</p>
                  <p className="text-white/40 text-xs mt-1 leading-snug truncate">
                    {value === 0 ? hint : label}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile: ring + CTA below stats */}
          <div className="sm:hidden flex items-center justify-between border-t border-white/10 py-4">
            <div className="text-white/50 text-xs">
              <span className="font-mono text-white text-xl font-semibold">{pct}%</span>
              {' '}profile complete
            </div>
            <Link href="/student/jobs">
              <Button size="sm" className="bg-ochre-500 hover:bg-ochre-600 text-white text-sm">
                Browse jobs <ArrowRight className="ml-1.5 size-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BODY — centered max-w-[1200px], section gaps vary by weight
      ══════════════════════════════════════════════════════════════ */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">

        {/* ── Profile completeness — elevated card, priority action ─── */}
        {pct < 100 && (
          <div
            className="bg-white rounded-2xl border border-gray-200"
            style={{ boxShadow: '0 4px 8px rgba(6,15,28,0.08), 0 1px 2px rgba(6,15,28,0.06)' }}
          >
            {/* Card header */}
            <div className="px-6 pt-6 pb-5 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-semibold text-gray-800 tracking-tight">
                    Complete your profile
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    A complete profile gets{' '}
                    <strong className="text-navy-700 font-semibold">3× more employer views</strong>
                  </p>
                </div>
                <Link
                  href="/student/profile"
                  className="shrink-0 text-sm text-navy-500 hover:text-navy-700 font-medium transition-colors flex items-center gap-0.5 mt-0.5"
                >
                  Edit <ChevronRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
              <ProgressBar value={pct} className="mt-4" />
            </div>

            <div className="p-6 space-y-5">
              {/* ── Tier 1: Proof-of-capability — tinted ochre-50 panel ── */}
              <div
                className={cn(
                  'rounded-xl p-5',
                  proofDone
                    ? 'bg-teal-50 border border-teal-100'
                    : 'bg-ochre-50 border border-ochre-200',
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'size-10 rounded-lg flex items-center justify-center shrink-0',
                      proofDone ? 'bg-teal-100' : 'bg-ochre-100',
                    )}
                    aria-hidden="true"
                  >
                    {proofDone
                      ? <CheckCircle2 className="size-5 text-teal-600" strokeWidth={2} />
                      : <Star className="size-5 text-ochre-600" strokeWidth={1.75} />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-sm font-semibold leading-tight', proofDone ? 'text-teal-800' : 'text-ochre-800')}>
                      {proofDone ? 'Resume uploaded' : 'Upload a resume — highest impact step'}
                    </p>
                    <p className={cn('text-xs mt-1 leading-relaxed', proofDone ? 'text-teal-700' : 'text-ochre-700')}>
                      {proofDone
                        ? 'Employers can download your resume directly. This is your most important credential on the platform.'
                        : 'This accounts for 20% of your score — more than any other single field. Profiles with a resume get 3× more employer contact.'}
                    </p>
                    {!proofDone && (
                      <Link href="/student/profile#resume" className="mt-3 inline-block">
                        <Button size="sm" className="h-8 px-4 text-xs bg-ochre-500 hover:bg-ochre-600 text-white">
                          <Upload className="mr-1.5 size-3" strokeWidth={2} aria-hidden="true" />
                          Upload resume
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Tier 2: Supporting details — ChecklistItem, single col mobile ── */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.08em] mb-3">
                  Supporting details
                </p>
                {/* grid-cols-1 on mobile, 2-col on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {SECONDARY_FIELDS.map(({ key, label }) => (
                    <ChecklistItem
                      key={String(key)}
                      done={isFieldFilled(profile, key)}
                      label={label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Jobs for you — larger top margin separates it as a distinct section ── */}
        <div className="pt-6">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="font-display text-xl font-semibold text-gray-800 tracking-tight">
                Jobs for you
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">
                Based on your course and availability — complete your profile for real matches
              </p>
            </div>
            <Link
              href="/student/jobs"
              className="text-sm text-navy-500 hover:text-navy-700 font-medium transition-colors flex items-center gap-0.5 shrink-0"
            >
              Browse all <ChevronRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* grid-cols-1 mobile, 2-col sm, 3-col lg — per DS layout spec */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLACEHOLDER_JOBS.map((job) => (
              <div
                key={job.id}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
                aria-label={`Example: ${job.title} at ${job.company}`}
              >
                {/* 4:3 photo thumbnail per DS §8 */}
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                  <Image
                    src={job.img}
                    alt={job.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                  {/* Navy duotone overlay (DS §8: multiply at 38–45%) */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'rgba(10,24,43,0.40)', mixBlendMode: 'multiply' }}
                    aria-hidden="true"
                  />
                  {/* Job type badge over photo */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-navy-700 text-xs font-semibold backdrop-blur-sm">
                    {job.type}
                  </span>
                  {/* "Example" watermark so it's clear these are placeholders */}
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/30 text-white/70 text-[10px] font-medium uppercase tracking-wide">
                    Example
                  </span>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className="font-semibold text-gray-800 text-sm leading-tight">{job.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{job.company}</p>
                  <div className="flex items-center gap-1 mt-2.5 text-gray-400 text-xs">
                    <MapPin className="size-3 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    {job.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Profile-incomplete nudge below cards */}
          {pct < 60 && (
            <div className="mt-5 rounded-xl border border-dashed border-gray-300 bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">These are example roles.</span>{' '}
                Complete your profile to unlock real job matches for your course.
              </p>
              <Link href="/student/profile" className="shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-navy-200 text-navy-700 hover:bg-navy-50 hover:border-navy-300 w-full sm:w-auto"
                >
                  Complete profile
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* ── Availability footer meta ─────────────────────────────── */}
        <div className="flex items-center gap-2 text-xs text-gray-400 pb-6">
          <span>Availability:</span>
          <Badge variant="secondary" className="bg-teal-50 text-teal-700 border border-teal-100 font-medium capitalize">
            {profile.availability}
          </Badge>
          <Link href="/student/profile" className="text-navy-500 hover:text-navy-700 transition-colors">
            Change
          </Link>
        </div>
      </main>
    </div>
  )
}
