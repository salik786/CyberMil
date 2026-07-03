'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileText, Clock, CheckCircle2, XCircle, CalendarCheck,
  Star, ArrowRight, Building2, MapPin, ChevronLeft, ChevronRight,
  HelpCircle, ExternalLink, Inbox,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { StudentTopNav } from '@/components/student/student-top-nav'

// ── Types ─────────────────────────────────────────────────────────────────────

type AppStatus = 'pending' | 'under-review' | 'interview' | 'offer' | 'rejected'

interface Application {
  id: number
  jobTitle: string
  company: string
  companyInitials: string
  companyBg: string
  location: string
  jobType: string
  appliedDaysAgo: number
  status: AppStatus
  salary: string
  nextStep?: string
}

// ── Dummy Data ─────────────────────────────────────────────────────────────────

const APPLICATIONS: Application[] = [
  {
    id: 1,
    jobTitle: 'Electrical Apprentice (Certificate III)',
    company: 'Ausgrid',
    companyInitials: 'AG',
    companyBg: 'bg-yellow-500',
    location: 'Sydney, NSW',
    jobType: 'Apprenticeship',
    appliedDaysAgo: 2,
    status: 'under-review',
    salary: '$18 – $24/hr',
    nextStep: 'Recruiter reviewing your application',
  },
  {
    id: 2,
    jobTitle: 'Site Supervisor – Civil Construction',
    company: 'CPB Contractors',
    companyInitials: 'CPB',
    companyBg: 'bg-orange-500',
    location: 'Newcastle, NSW',
    jobType: 'Full-time',
    appliedDaysAgo: 5,
    status: 'interview',
    salary: '$95,000 – $115,000/yr',
    nextStep: 'Interview scheduled for Thursday 3 Jul at 10:00 AM',
  },
  {
    id: 3,
    jobTitle: 'Boilermaker / Structural Welder',
    company: 'BlueScope Steel',
    companyInitials: 'BS',
    companyBg: 'bg-blue-600',
    location: 'Wollongong, NSW',
    jobType: 'Full-time',
    appliedDaysAgo: 10,
    status: 'rejected',
    salary: '$78,000 – $92,000/yr',
  },
  {
    id: 4,
    jobTitle: 'Graduate Civil Engineer',
    company: 'John Holland',
    companyInitials: 'JH',
    companyBg: 'bg-red-700',
    location: 'Brisbane, QLD',
    jobType: 'Full-time',
    appliedDaysAgo: 12,
    status: 'offer',
    salary: '$68,000 – $78,000/yr',
    nextStep: 'Offer letter sent — respond by 8 Jul',
  },
  {
    id: 5,
    jobTitle: 'Mechanical Fitter – Mining Operations',
    company: 'UGL Limited',
    companyInitials: 'UGL',
    companyBg: 'bg-gray-700',
    location: 'Perth, WA',
    jobType: 'Contract',
    appliedDaysAgo: 14,
    status: 'pending',
    salary: '$55 – $70/hr',
  },
  {
    id: 6,
    jobTitle: 'Instrumentation Technician',
    company: 'Ventia',
    companyInitials: 'V',
    companyBg: 'bg-teal-600',
    location: 'Melbourne, VIC',
    jobType: 'Full-time',
    appliedDaysAgo: 18,
    status: 'under-review',
    salary: '$85,000 – $100,000/yr',
    nextStep: 'Shortlist decision expected by end of week',
  },
  {
    id: 7,
    jobTitle: 'Carpenter – Residential & Commercial',
    company: 'Lendlease',
    companyInitials: 'LL',
    companyBg: 'bg-green-700',
    location: 'Sydney, NSW',
    jobType: 'Casual',
    appliedDaysAgo: 21,
    status: 'interview',
    salary: '$35 – $45/hr',
    nextStep: 'Second interview this Friday',
  },
  {
    id: 8,
    jobTitle: 'Refrigeration & Air-Con Mechanic',
    company: 'Ausgrid',
    companyInitials: 'AG',
    companyBg: 'bg-yellow-500',
    location: 'Sydney, NSW',
    jobType: 'Apprenticeship',
    appliedDaysAgo: 25,
    status: 'offer',
    salary: '$20 – $28/hr',
    nextStep: 'Offer accepted — start date TBC',
  },
]

const PAGE_SIZE = 5

// ── Status config ──────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<AppStatus, {
  label: string
  bg: string
  text: string
  dot: string
  icon: React.ElementType
}> = {
  pending:      { label: 'Pending',      bg: 'bg-gray-100',   text: 'text-gray-600',   dot: 'bg-gray-400',   icon: Clock },
  'under-review': { label: 'Under Review', bg: 'bg-blue-50',  text: 'text-blue-700',   dot: 'bg-blue-500',   icon: FileText },
  interview:    { label: 'Interview',    bg: 'bg-purple-50',  text: 'text-purple-700', dot: 'bg-purple-500', icon: CalendarCheck },
  offer:        { label: 'Offer',        bg: 'bg-green-50',   text: 'text-green-700',  dot: 'bg-green-500',  icon: Star },
  rejected:     { label: 'Not Selected', bg: 'bg-red-50',     text: 'text-red-600',    dot: 'bg-red-400',    icon: XCircle },
}

const TABS: { label: string; value: AppStatus | 'all' }[] = [
  { label: 'All',         value: 'all' },
  { label: 'Pending',     value: 'pending' },
  { label: 'Under Review',value: 'under-review' },
  { label: 'Interview',   value: 'interview' },
  { label: 'Offer',       value: 'offer' },
  { label: 'Not Selected',value: 'rejected' },
]

// ── Stat tiles ──────────────────────────────────────────────────────────────────

const STATS = [
  {
    label: 'Submitted',
    value: APPLICATIONS.length,
    icon: FileText,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    label: 'Under Review',
    value: APPLICATIONS.filter((a) => a.status === 'under-review').length,
    icon: Clock,
    iconBg: 'bg-ochre-50',
    iconColor: 'text-ochre-500',
  },
  {
    label: 'Interviews',
    value: APPLICATIONS.filter((a) => a.status === 'interview').length,
    icon: CalendarCheck,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
  {
    label: 'Offers',
    value: APPLICATIONS.filter((a) => a.status === 'offer').length,
    icon: CheckCircle2,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
]

// ── Application Row ────────────────────────────────────────────────────────────

function ApplicationRow({ app }: { app: Application }) {
  const cfg = STATUS_CONFIG[app.status]
  const Icon = cfg.icon

  const appliedLabel =
    app.appliedDaysAgo === 0 ? 'Today'
    : app.appliedDaysAgo === 1 ? 'Yesterday'
    : `${app.appliedDaysAgo}d ago`

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      {/* Top row */}
      <div className="flex items-start gap-3">
        {/* Company logo */}
        <div className={cn(
          'size-10 sm:size-11 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs',
          app.companyBg,
        )}>
          {app.companyInitials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2">
                {app.jobTitle}
              </h3>
              <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                <div className="flex items-center gap-1">
                  <Building2 className="size-3 text-gray-400 shrink-0" strokeWidth={1.75} />
                  <span className="text-xs text-gray-500">{app.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="size-3 text-gray-400 shrink-0" strokeWidth={1.75} />
                  <span className="text-xs text-gray-500">{app.location}</span>
                </div>
              </div>
            </div>

            {/* Status badge */}
            <span className={cn(
              'flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0',
              cfg.bg, cfg.text,
            )}>
              <span className={cn('size-1.5 rounded-full shrink-0', cfg.dot)} />
              {cfg.label}
            </span>
          </div>
        </div>
      </div>

      {/* Meta + next step */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500">
        <span className={cn(
          'font-medium px-2 py-0.5 rounded-full',
          app.jobType === 'Full-time' ? 'bg-blue-50 text-blue-700'
          : app.jobType === 'Apprenticeship' ? 'bg-ochre-50 text-ochre-700'
          : app.jobType === 'Contract' ? 'bg-green-50 text-green-700'
          : app.jobType === 'Casual' ? 'bg-gray-100 text-gray-600'
          : 'bg-purple-50 text-purple-700',
        )}>
          {app.jobType}
        </span>
        <span>{app.salary}</span>
        <span className="flex items-center gap-1">
          <Clock className="size-3" strokeWidth={1.75} />
          Applied {appliedLabel}
        </span>
      </div>

      {/* Next step callout */}
      {app.nextStep && (
        <div className={cn(
          'flex items-start gap-2 px-3 py-2.5 rounded-lg text-xs',
          app.status === 'offer' ? 'bg-green-50 text-green-700'
          : app.status === 'interview' ? 'bg-purple-50 text-purple-700'
          : 'bg-blue-50 text-blue-700',
        )}>
          <Icon className="size-3.5 shrink-0 mt-px" strokeWidth={1.75} />
          <span className="font-medium">{app.nextStep}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
        <Link
          href={`/student/jobs/${app.id}`}
          className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-navy-800 transition-colors"
        >
          View listing
          <ExternalLink className="size-3" strokeWidth={1.75} />
        </Link>
        <span className="text-gray-200">·</span>
        {app.status === 'offer' ? (
          <button className="text-xs font-semibold text-green-700 hover:underline">
            View offer →
          </button>
        ) : app.status !== 'rejected' ? (
          <button className="text-xs font-medium text-gray-500 hover:text-navy-800 transition-colors">
            Withdraw
          </button>
        ) : (
          <span className="text-xs text-gray-400 italic">No further action</span>
        )}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<AppStatus | 'all'>('all')
  const [page, setPage] = useState(1)

  const filtered = activeTab === 'all'
    ? APPLICATIONS
    : APPLICATIONS.filter((a) => a.status === activeTab)

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleTab(val: AppStatus | 'all') {
    setActiveTab(val)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentTopNav />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="bg-navy-800 pt-8 pb-6 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-xl sm:text-2xl font-display font-semibold text-white mb-1">My Applications</h1>
          <p className="text-white/55 text-sm">Track every application and stay on top of next steps.</p>
        </div>
      </div>

      {/* ── Stats Row ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className={cn('size-9 rounded-lg flex items-center justify-center shrink-0', iconBg)}>
                  <Icon className={cn('size-4', iconColor)} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 leading-none">{value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Filter ────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-14 z-30">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <div className="flex gap-0.5 min-w-max py-1">
            {TABS.map(({ label, value }) => {
              const count = value === 'all'
                ? APPLICATIONS.length
                : APPLICATIONS.filter((a) => a.status === value).length
              return (
                <button
                  key={value}
                  onClick={() => handleTab(value)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                    activeTab === value
                      ? 'bg-navy-800 text-white'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50',
                  )}
                >
                  {label}
                  <span className={cn(
                    'text-xs font-semibold px-1.5 py-0.5 rounded-full',
                    activeTab === value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500',
                  )}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Application List ──────────────────────────────────────────── */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 space-y-3">

        {/* Result count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing <span className="font-semibold text-gray-800">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'application' : 'applications'}
        </p>

        {/* Empty state */}
        {paged.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Inbox className="size-10 text-gray-200 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm font-medium text-gray-500">No applications in this category</p>
            <button
              onClick={() => handleTab('all')}
              className="mt-3 text-sm text-ochre-600 hover:underline"
            >
              View all applications
            </button>
          </div>
        )}

        {paged.map((app) => (
          <ApplicationRow key={app.id} app={app} />
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="size-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="size-4" strokeWidth={1.75} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    'size-8 rounded-lg text-sm font-medium transition-colors',
                    p === currentPage
                      ? 'bg-navy-800 text-white'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50',
                  )}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="size-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="size-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        )}

        {/* Need help card */}
        <div className="mt-6 rounded-2xl bg-navy-800 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <HelpCircle className="size-5 text-white/70" strokeWidth={1.75} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Need help with your applications?</p>
            <p className="text-xs text-white/55 mt-0.5">
              Get tips on writing a great cover letter and improving your profile to stand out.
            </p>
          </div>
          <Link
            href="/student/profile"
            className="shrink-0 flex items-center gap-1.5 h-9 px-4 rounded-lg bg-ochre-500 hover:bg-ochre-600 text-white text-sm font-semibold transition-colors"
          >
            Improve profile
            <ArrowRight className="size-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>

      {/* Bottom padding for mobile tab bar */}
      <div className="h-20 md:h-6" />
    </div>
  )
}
