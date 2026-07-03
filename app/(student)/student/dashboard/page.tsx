'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Briefcase,
  FileText,
  Bookmark,
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  Upload,
} from 'lucide-react'

import { useAuth } from '@/lib/auth/context'
import { getStudentProfile, getCompletionPct } from '@/lib/student/mock-store'
import { COMPLETION_FIELDS } from '@/lib/student/types'
import type { StudentProfile } from '@/lib/student/types'
import { StudentNav } from '@/components/student/student-nav'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const STATS = [
  { label: 'Applications', icon: FileText, value: 0, href: '/student/applications' },
  { label: 'Saved jobs',   icon: Bookmark, value: 0, href: '/student/saved' },
  { label: 'Jobs for you', icon: Briefcase, value: 0, href: '/student/jobs' },
]

function greeting(name: string) {
  const h = new Date().getHours()
  const tod = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'
  return `Good ${tod}, ${name.split(' ')[0]}`
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [profile, setProfile] = useState<StudentProfile | null>(null)

  useEffect(() => {
    if (isLoading) return
    if (!user) { router.push('/login'); return }
    const p = getStudentProfile(user.id)
    if (!p?.completedOnboarding) { router.push('/student/onboarding'); return }
    setProfile(p)
  }, [user, isLoading, router])

  if (isLoading || !profile) return null

  const pct = getCompletionPct(profile)
  const incomplete = COMPLETION_FIELDS.filter(({ key }) => {
    const val = profile[key]
    return (
      val === undefined ||
      val === '' ||
      val === null ||
      (Array.isArray(val) && val.length === 0)
    )
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── Welcome header ───────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold text-gray-800 tracking-tight">
              {greeting(user!.name)}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {profile.course} · {profile.tafeCampus}
            </p>
          </div>
          <Link href="/student/jobs">
            <Button className="bg-ochre-500 hover:bg-ochre-600 text-white shrink-0 hidden sm:flex">
              Browse jobs <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>

        {/* ── Stats row ─────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4">
          {STATS.map(({ label, icon: Icon, value, href }) => (
            <Link
              key={label}
              href={href}
              className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{label}</span>
                <Icon className="size-4 text-gray-400 group-hover:text-navy-500 transition-colors" strokeWidth={1.75} />
              </div>
              <p className="font-mono text-3xl font-medium text-gray-800">{value}</p>
            </Link>
          ))}
        </div>

        {/* ── Profile completion card ───────────────────────── */}
        {pct < 100 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-gray-800">
                  Complete your profile
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  A complete profile gets{' '}
                  <span className="text-navy-700 font-medium">3× more employer views</span>
                </p>
              </div>
              <span className="font-mono text-2xl font-medium text-navy-700 shrink-0">
                {pct}%
              </span>
            </div>

            <Progress
              value={pct}
              className="h-2 bg-gray-100"
            />

            {/* Checklist */}
            <ul className="space-y-2">
              {COMPLETION_FIELDS.map(({ key, label }) => {
                const val = profile[key]
                const done =
                  val !== undefined &&
                  val !== '' &&
                  val !== null &&
                  !(Array.isArray(val) && val.length === 0)
                return (
                  <li key={String(key)} className="flex items-center gap-3 text-sm">
                    {done ? (
                      <CheckCircle2 className="size-4 text-teal-500 shrink-0" />
                    ) : (
                      <CircleDashed className="size-4 text-gray-300 shrink-0" />
                    )}
                    <span className={cn(done ? 'text-gray-400 line-through' : 'text-gray-700')}>
                      {label}
                    </span>
                  </li>
                )
              })}
            </ul>

            <Link href="/student/profile">
              <Button
                variant="outline"
                className="border-navy-200 text-navy-700 hover:bg-navy-50 hover:border-navy-300 w-full sm:w-auto"
              >
                Complete profile →
              </Button>
            </Link>
          </div>
        )}

        {/* ── Job matches (empty state) ─────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold text-gray-800">Jobs for you</h2>
            <Link href="/student/jobs" className="text-sm text-navy-500 hover:text-navy-700 font-medium transition-colors">
              Browse all →
            </Link>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="size-12 rounded-full bg-navy-50 flex items-center justify-center mb-4">
              <Briefcase className="size-6 text-navy-300" strokeWidth={1.5} />
            </div>
            <p className="font-medium text-gray-700 text-sm">No job matches yet</p>
            <p className="text-gray-400 text-xs mt-1 max-w-xs">
              Add your skills and qualification level to your profile so we can match you with relevant roles.
            </p>
            <Link href="/student/profile" className="mt-4">
              <Button
                size="sm"
                className="bg-ochre-500 hover:bg-ochre-600 text-white"
              >
                Add skills to profile
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Resume nudge ─────────────────────────────────── */}
        {!profile.resumeUrl && (
          <div className="bg-navy-700 rounded-xl p-6 flex items-center gap-6">
            <div className="size-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Upload className="size-6 text-white" strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-white text-lg">Upload your resume</p>
              <p className="text-white/60 text-sm mt-0.5">
                Employers who see a resume are 5× more likely to reach out.
              </p>
            </div>
            <Link href="/student/profile#resume" className="shrink-0">
              <Button className="bg-ochre-500 hover:bg-ochre-600 text-white whitespace-nowrap">
                Upload now
              </Button>
            </Link>
          </div>
        )}

        {/* ── Availability badge ───────────────────────────── */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Your availability:</span>
          <Badge
            variant="secondary"
            className="bg-teal-50 text-teal-700 border-teal-100 font-medium capitalize"
          >
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
