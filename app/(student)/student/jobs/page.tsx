'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Briefcase, MapPin, Clock, Bookmark, BookmarkCheck,
  Search, SlidersHorizontal, X, ChevronLeft, ChevronRight,
  Building2, Zap, Wrench, HardHat, Cog, FlaskConical,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { StudentTopNav } from '@/components/student/student-top-nav'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Job {
  id: number
  title: string
  company: string
  companyInitials: string
  companyBg: string
  location: string
  jobType: 'Full-time' | 'Part-time' | 'Apprenticeship' | 'Contract' | 'Casual'
  salary: string
  experience: string
  category: string
  postedDaysAgo: number
  featured?: boolean
  skills: string[]
}

// ── Dummy Data ─────────────────────────────────────────────────────────────────

const JOBS: Job[] = [
  {
    id: 1,
    title: 'Electrical Apprentice (Certificate III)',
    company: 'Ausgrid',
    companyInitials: 'AG',
    companyBg: 'bg-yellow-500',
    location: 'Sydney, NSW',
    jobType: 'Apprenticeship',
    salary: '$18 – $24/hr',
    experience: 'Entry level',
    category: 'Electrical',
    postedDaysAgo: 1,
    featured: true,
    skills: ['Wiring', 'Safety Compliance', 'Fault Finding'],
  },
  {
    id: 2,
    title: 'Site Supervisor – Civil Construction',
    company: 'CPB Contractors',
    companyInitials: 'CPB',
    companyBg: 'bg-orange-500',
    location: 'Newcastle, NSW',
    jobType: 'Full-time',
    salary: '$95,000 – $115,000/yr',
    experience: '3–5 years',
    category: 'Construction',
    postedDaysAgo: 2,
    skills: ['Project Management', 'Concrete', 'OH&S'],
  },
  {
    id: 3,
    title: 'Mechanical Fitter – Mining Operations',
    company: 'UGL Limited',
    companyInitials: 'UGL',
    companyBg: 'bg-gray-700',
    location: 'Perth, WA',
    jobType: 'Contract',
    salary: '$55 – $70/hr',
    experience: '2–3 years',
    category: 'Mechanical',
    postedDaysAgo: 3,
    skills: ['Hydraulics', 'Pneumatics', 'Preventive Maintenance'],
  },
  {
    id: 4,
    title: 'Boilermaker / Structural Welder',
    company: 'BlueScope Steel',
    companyInitials: 'BS',
    companyBg: 'bg-blue-600',
    location: 'Wollongong, NSW',
    jobType: 'Full-time',
    salary: '$78,000 – $92,000/yr',
    experience: '1–2 years',
    category: 'Fabrication',
    postedDaysAgo: 4,
    skills: ['MIG Welding', 'TIG Welding', 'Blueprint Reading'],
  },
  {
    id: 5,
    title: 'Graduate Civil Engineer',
    company: 'John Holland',
    companyInitials: 'JH',
    companyBg: 'bg-red-700',
    location: 'Brisbane, QLD',
    jobType: 'Full-time',
    salary: '$68,000 – $78,000/yr',
    experience: 'Entry level',
    category: 'Engineering',
    postedDaysAgo: 5,
    skills: ['AutoCAD', 'Revit', 'Surveying'],
  },
  {
    id: 6,
    title: 'Instrumentation Technician',
    company: 'Ventia',
    companyInitials: 'V',
    companyBg: 'bg-teal-600',
    location: 'Melbourne, VIC',
    jobType: 'Full-time',
    salary: '$85,000 – $100,000/yr',
    experience: '2–3 years',
    category: 'Electrical',
    postedDaysAgo: 6,
    skills: ['PLC Programming', 'SCADA', 'Calibration'],
  },
  {
    id: 7,
    title: 'Carpenter – Residential & Commercial',
    company: 'Lendlease',
    companyInitials: 'LL',
    companyBg: 'bg-green-700',
    location: 'Sydney, NSW',
    jobType: 'Casual',
    salary: '$35 – $45/hr',
    experience: '1–2 years',
    category: 'Construction',
    postedDaysAgo: 7,
    skills: ['Formwork', 'Framing', 'Finishing'],
  },
  {
    id: 8,
    title: 'Maintenance Planner',
    company: 'Downer Group',
    companyInitials: 'DW',
    companyBg: 'bg-blue-800',
    location: 'Adelaide, SA',
    jobType: 'Full-time',
    salary: '$88,000 – $105,000/yr',
    experience: '3–5 years',
    category: 'Mechanical',
    postedDaysAgo: 8,
    skills: ['SAP PM', 'CMMS', 'Reliability Engineering'],
  },
  {
    id: 9,
    title: 'Sheet Metal Worker – HVAC',
    company: 'Ventia',
    companyInitials: 'V',
    companyBg: 'bg-teal-600',
    location: 'Sydney, NSW',
    jobType: 'Part-time',
    salary: '$28 – $36/hr',
    experience: 'Entry level',
    category: 'Fabrication',
    postedDaysAgo: 9,
    skills: ['Duct Fabrication', 'Sheet Metal', 'Tool Operation'],
  },
  {
    id: 10,
    title: 'Process Engineer – Chemical Plant',
    company: 'UGL Limited',
    companyInitials: 'UGL',
    companyBg: 'bg-gray-700',
    location: 'Geelong, VIC',
    jobType: 'Full-time',
    salary: '$90,000 – $110,000/yr',
    experience: '2–3 years',
    category: 'Engineering',
    postedDaysAgo: 10,
    skills: ['Process Simulation', 'P&ID', 'Root Cause Analysis'],
  },
  {
    id: 11,
    title: 'Electrical Estimator',
    company: 'CPB Contractors',
    companyInitials: 'CPB',
    companyBg: 'bg-orange-500',
    location: 'Brisbane, QLD',
    jobType: 'Full-time',
    salary: '$75,000 – $90,000/yr',
    experience: '1–2 years',
    category: 'Electrical',
    postedDaysAgo: 12,
    skills: ['Cost Estimation', 'Tendering', 'Cable Schedules'],
  },
  {
    id: 12,
    title: 'Rigger / Dogman – Crane Operations',
    company: 'John Holland',
    companyInitials: 'JH',
    companyBg: 'bg-red-700',
    location: 'Perth, WA',
    jobType: 'Contract',
    salary: '$60 – $80/hr',
    experience: '2–3 years',
    category: 'Construction',
    postedDaysAgo: 14,
    skills: ['Rigging Licence', 'Dogman Ticket', 'Load Calculations'],
  },
  {
    id: 13,
    title: 'CNC Machinist – Precision Engineering',
    company: 'BlueScope Steel',
    companyInitials: 'BS',
    companyBg: 'bg-blue-600',
    location: 'Wollongong, NSW',
    jobType: 'Full-time',
    salary: '$60,000 – $75,000/yr',
    experience: '1–2 years',
    category: 'Mechanical',
    postedDaysAgo: 15,
    skills: ['G-Code', 'Fanuc', 'Quality Inspection'],
  },
  {
    id: 14,
    title: 'Structural Engineer (Graduate)',
    company: 'Lendlease',
    companyInitials: 'LL',
    companyBg: 'bg-green-700',
    location: 'Melbourne, VIC',
    jobType: 'Full-time',
    salary: '$70,000 – $82,000/yr',
    experience: 'Entry level',
    category: 'Engineering',
    postedDaysAgo: 18,
    skills: ['STAAD Pro', 'Steel Design', 'Concrete Design'],
  },
  {
    id: 15,
    title: 'Refrigeration & Air-Con Mechanic',
    company: 'Ausgrid',
    companyInitials: 'AG',
    companyBg: 'bg-yellow-500',
    location: 'Sydney, NSW',
    jobType: 'Apprenticeship',
    salary: '$20 – $28/hr',
    experience: 'Entry level',
    category: 'Mechanical',
    postedDaysAgo: 20,
    skills: ['RAC Systems', 'Gas Handling', 'Electrical Circuits'],
  },
]

const CATEGORIES = [
  { label: 'All Jobs', value: 'all', icon: Briefcase },
  { label: 'Construction', value: 'Construction', icon: HardHat },
  { label: 'Electrical', value: 'Electrical', icon: Zap },
  { label: 'Mechanical', value: 'Mechanical', icon: Cog },
  { label: 'Fabrication', value: 'Fabrication', icon: Wrench },
  { label: 'Engineering', value: 'Engineering', icon: FlaskConical },
]

const JOB_TYPES = ['Full-time', 'Part-time', 'Apprenticeship', 'Contract', 'Casual']
const LOCATIONS = ['Sydney, NSW', 'Newcastle, NSW', 'Wollongong, NSW', 'Brisbane, QLD', 'Melbourne, VIC', 'Perth, WA', 'Adelaide, SA', 'Geelong, VIC']
const EXPERIENCE_LEVELS = ['Entry level', '1–2 years', '2–3 years', '3–5 years']
const DATE_OPTIONS = ['Anytime', 'Last 24 hours', 'Last 7 days', 'Last 30 days']

const PAGE_SIZE = 5

// ── Helpers ───────────────────────────────────────────────────────────────────

function daysLabel(d: number) {
  if (d === 0) return 'Today'
  if (d === 1) return 'Yesterday'
  return `${d}d ago`
}

function typeColor(t: Job['jobType']) {
  const map: Record<string, string> = {
    'Full-time':    'bg-blue-50 text-blue-700',
    'Part-time':    'bg-purple-50 text-purple-700',
    'Apprenticeship': 'bg-ochre-50 text-ochre-700',
    'Contract':     'bg-green-50 text-green-700',
    'Casual':       'bg-gray-100 text-gray-600',
  }
  return map[t] ?? 'bg-gray-100 text-gray-600'
}

// ── Filter Panel (reused desktop + mobile) ────────────────────────────────────

interface FilterState {
  jobTypes: string[]
  locations: string[]
  experience: string[]
  datePosted: string
}

interface FilterPanelProps {
  filters: FilterState
  onChange: (f: FilterState) => void
  onReset: () => void
}

function FilterPanel({ filters, onChange, onReset }: FilterPanelProps) {
  function toggleArr(key: keyof FilterState, val: string) {
    const arr = filters[key] as string[]
    onChange({
      ...filters,
      [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
    })
  }

  const totalActive =
    filters.jobTypes.length + filters.locations.length + filters.experience.length + (filters.datePosted !== 'Anytime' ? 1 : 0)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">
          Filters {totalActive > 0 && <span className="ml-1 text-ochre-600">({totalActive})</span>}
        </span>
        {totalActive > 0 && (
          <button onClick={onReset} className="text-xs text-ochre-600 hover:text-ochre-700 font-medium">
            Reset all
          </button>
        )}
      </div>

      {/* Job type */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5">Job Type</p>
        <div className="space-y-2">
          {JOB_TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2.5 cursor-pointer">
              <span
                className={cn(
                  'size-4 rounded border flex items-center justify-center shrink-0 transition-colors',
                  filters.jobTypes.includes(t)
                    ? 'bg-ochre-500 border-ochre-500'
                    : 'border-gray-300 bg-white',
                )}
                onClick={() => toggleArr('jobTypes', t)}
              >
                {filters.jobTypes.includes(t) && <CheckCircle2 className="size-3 text-white" strokeWidth={3} />}
              </span>
              <span className="text-sm text-gray-700">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5">Location</p>
        <div className="space-y-2">
          {LOCATIONS.map((loc) => (
            <label key={loc} className="flex items-center gap-2.5 cursor-pointer">
              <span
                className={cn(
                  'size-4 rounded border flex items-center justify-center shrink-0 transition-colors',
                  filters.locations.includes(loc)
                    ? 'bg-ochre-500 border-ochre-500'
                    : 'border-gray-300 bg-white',
                )}
                onClick={() => toggleArr('locations', loc)}
              >
                {filters.locations.includes(loc) && <CheckCircle2 className="size-3 text-white" strokeWidth={3} />}
              </span>
              <span className="text-sm text-gray-700">{loc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5">Experience</p>
        <div className="space-y-2">
          {EXPERIENCE_LEVELS.map((e) => (
            <label key={e} className="flex items-center gap-2.5 cursor-pointer">
              <span
                className={cn(
                  'size-4 rounded border flex items-center justify-center shrink-0 transition-colors',
                  filters.experience.includes(e)
                    ? 'bg-ochre-500 border-ochre-500'
                    : 'border-gray-300 bg-white',
                )}
                onClick={() => toggleArr('experience', e)}
              >
                {filters.experience.includes(e) && <CheckCircle2 className="size-3 text-white" strokeWidth={3} />}
              </span>
              <span className="text-sm text-gray-700">{e}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date posted */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5">Date Posted</p>
        <div className="space-y-2">
          {DATE_OPTIONS.map((d) => (
            <label key={d} className="flex items-center gap-2.5 cursor-pointer" onClick={() => onChange({ ...filters, datePosted: d })}>
              <span
                className={cn(
                  'size-4 rounded-full border flex items-center justify-center shrink-0 transition-colors',
                  filters.datePosted === d
                    ? 'border-ochre-500'
                    : 'border-gray-300',
                )}
              >
                {filters.datePosted === d && <span className="size-2 rounded-full bg-ochre-500" />}
              </span>
              <span className="text-sm text-gray-700">{d}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Job Card ──────────────────────────────────────────────────────────────────

function JobCard({ job, saved, onToggleSave }: { job: Job; saved: boolean; onToggleSave: () => void }) {
  return (
    <div className={cn(
      'bg-white rounded-2xl border p-4 sm:p-5 flex flex-col gap-3 transition-shadow hover:shadow-md',
      job.featured ? 'border-ochre-200 ring-1 ring-ochre-100' : 'border-gray-100',
    )}>
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Company logo */}
          <div className={cn(
            'size-10 sm:size-11 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs',
            job.companyBg,
          )}>
            {job.companyInitials}
          </div>
          <div className="min-w-0">
            {job.featured && (
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-ochre-600 bg-ochre-50 px-2 py-0.5 rounded-full mb-1">
                Featured
              </span>
            )}
            <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2">{job.title}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Building2 className="size-3 text-gray-400 shrink-0" strokeWidth={1.75} />
              <span className="text-xs text-gray-500 truncate">{job.company}</span>
            </div>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={onToggleSave}
          aria-label={saved ? 'Unsave job' : 'Save job'}
          className={cn(
            'shrink-0 size-8 rounded-lg flex items-center justify-center transition-colors',
            saved ? 'text-ochre-500 bg-ochre-50' : 'text-gray-300 hover:text-ochre-400 hover:bg-gray-50',
          )}
        >
          {saved ? <BookmarkCheck className="size-4" strokeWidth={2} /> : <Bookmark className="size-4" strokeWidth={1.75} />}
        </button>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="size-3.5 shrink-0" strokeWidth={1.75} />
          {job.location}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="size-3.5 shrink-0" strokeWidth={1.75} />
          {daysLabel(job.postedDaysAgo)}
        </div>
        <div className="text-xs font-medium text-gray-700">{job.salary}</div>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-1.5">
        <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full', typeColor(job.jobType))}>
          {job.jobType}
        </span>
        {job.skills.slice(0, 3).map((s) => (
          <span key={s} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {s}
          </span>
        ))}
      </div>

      {/* Action */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
        <Link
          href={`/student/jobs/${job.id}`}
          className="flex-1 h-8 flex items-center justify-center rounded-lg bg-navy-800 text-white text-xs font-semibold hover:bg-navy-700 transition-colors"
        >
          View & Apply
        </Link>
        <button
          onClick={onToggleSave}
          className="h-8 px-3 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function JobsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [filters, setFilters] = useState<FilterState>({
    jobTypes: [],
    locations: [],
    experience: [],
    datePosted: 'Anytime',
  })
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  function resetFilters() {
    setFilters({ jobTypes: [], locations: [], experience: [], datePosted: 'Anytime' })
  }

  const activeFilterCount =
    filters.jobTypes.length + filters.locations.length + filters.experience.length + (filters.datePosted !== 'Anytime' ? 1 : 0)

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      if (category !== 'all' && j.category !== category) return false
      if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false
      if (filters.jobTypes.length && !filters.jobTypes.includes(j.jobType)) return false
      if (filters.locations.length && !filters.locations.includes(j.location)) return false
      if (filters.experience.length && !filters.experience.includes(j.experience)) return false
      if (filters.datePosted !== 'Anytime') {
        const map: Record<string, number> = { 'Last 24 hours': 1, 'Last 7 days': 7, 'Last 30 days': 30 }
        if (j.postedDaysAgo > (map[filters.datePosted] ?? 9999)) return false
      }
      return true
    })
  }, [search, category, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleCategoryChange(val: string) {
    setCategory(val)
    setPage(1)
  }

  function handleFiltersChange(f: FilterState) {
    setFilters(f)
    setPage(1)
  }

  function toggleSave(id: number) {
    setSavedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentTopNav />

      {/* ── Hero / Search ──────────────────────────────────────────────── */}
      <div className="bg-navy-800 pt-8 pb-6 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-xl sm:text-2xl font-display font-semibold text-white mb-1">Find Your Next Role</h1>
          <p className="text-white/55 text-sm mb-5">
            {JOBS.length} verified opportunities matched to your TAFE qualifications
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" strokeWidth={1.75} />
            <input
              type="search"
              placeholder="Search job title or company…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-white/10 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ochre-400"
            />
          </div>
        </div>
      </div>

      {/* ── Category Tabs ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-14 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <div className="flex gap-0.5 min-w-max py-1">
            {CATEGORIES.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleCategoryChange(value)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                  category === value
                    ? 'bg-navy-800 text-white'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50',
                )}
              >
                <Icon className="size-3.5 shrink-0" strokeWidth={1.75} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Layout ───────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">

          {/* ── Desktop Sidebar Filters ─────────────────────────────── */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-32">
              <FilterPanel filters={filters} onChange={handleFiltersChange} onReset={resetFilters} />
            </div>
          </aside>

          {/* ── Job List ─────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Results bar + mobile filter button */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{filtered.length}</span> jobs found
              </p>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className={cn(
                  'lg:hidden flex items-center gap-1.5 h-8 px-3 rounded-lg border text-sm font-medium transition-colors',
                  activeFilterCount > 0
                    ? 'border-ochre-400 text-ochre-600 bg-ochre-50'
                    : 'border-gray-200 text-gray-600 bg-white',
                )}
              >
                <SlidersHorizontal className="size-3.5" strokeWidth={1.75} />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            </div>

            {/* Job cards */}
            {paged.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <Briefcase className="size-10 text-gray-200 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-sm font-medium text-gray-500">No jobs match your filters</p>
                <button onClick={resetFilters} className="mt-3 text-sm text-ochre-600 hover:underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {paged.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    saved={savedIds.has(job.id)}
                    onToggleSave={() => toggleSave(job.id)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Page {currentPage} of {totalPages} · {filtered.length} results
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
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Overlay ─────────────────────────────────────── */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Drawer */}
          <div className="relative ml-auto w-[85vw] max-w-sm h-full bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <h2 className="text-base font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
              >
                <X className="size-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <FilterPanel filters={filters} onChange={handleFiltersChange} onReset={resetFilters} />
            </div>

            {/* Apply */}
            <div className="px-5 py-4 border-t border-gray-100 shrink-0">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full h-11 rounded-xl bg-navy-800 text-white text-sm font-semibold hover:bg-navy-700 transition-colors"
              >
                Show {filtered.length} jobs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom padding so content doesn't hide behind mobile tab bar */}
      <div className="h-20 md:h-6" />
    </div>
  )
}
