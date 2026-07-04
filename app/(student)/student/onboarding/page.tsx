'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap, ArrowLeft, Plus, Check, EyeOff, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth/context'
import { getStudentProfile, completeOnboarding } from '@/lib/student/mock-store'
import { AVAILABILITY_LABELS, PAY_PERIOD_LABELS } from '@/lib/student/types'
import type { Availability, PayPeriod } from '@/lib/student/types'

// ── Step definitions ──────────────────────────────────────────────────────────

const TOTAL_STEPS = 6

const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Apprenticeship',
  'Traineeship',
  'Contract',
  'Casual',
  'Graduate',
  'Internship / Placement',
]

const SKILLS_LIST = [
  // Trades
  'MIG Welding', 'TIG Welding', 'Oxy-Acetylene Welding',
  'Electrical Wiring', 'PLC Programming', 'Fault Finding',
  'Hydraulics', 'Pneumatics', 'CNC Machining',
  'Formwork', 'Concrete', 'Carpentry', 'Plastering', 'Tiling',
  // Engineering & design
  'AutoCAD', 'Revit', 'SolidWorks', 'Surveying', 'STAAD Pro',
  // Safety & compliance
  'OH&S', 'First Aid (HLTAID011)', 'White Card', 'Forklift Licence', 'EWP Licence',
  // General
  'Microsoft Office', 'Project Management', 'Cost Estimation', 'Report Writing',
]

// ── Form state ────────────────────────────────────────────────────────────────

interface WizardData {
  // Step 0 – TAFE details
  tafeCampus: string
  course: string
  availability: Availability
  // Step 1 – Job types
  preferredJobTypes: string[]
  // Step 2 – Desired titles
  desiredTitles: string[]
  // Step 3 – Location
  location: string
  postcode: string
  remoteWork: boolean
  // Step 4 – Min pay
  minSalary: string
  payPeriod: PayPeriod
  // Step 5 – Skills
  skills: string[]
}

const DEFAULT: WizardData = {
  tafeCampus: '',
  course: '',
  availability: 'full-time',
  preferredJobTypes: [],
  desiredTitles: [''],
  location: '',
  postcode: '',
  remoteWork: false,
  minSalary: '',
  payPeriod: 'per-year',
  skills: [],
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ToggleRow({
  label,
  selected,
  onToggle,
}: {
  label: string
  selected: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'w-full flex items-center gap-4 px-4 py-4 rounded-2xl border text-left transition-all',
        selected
          ? 'border-navy-700 bg-navy-50'
          : 'border-gray-200 bg-white hover:border-gray-300',
      )}
    >
      <span className={cn(
        'size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
        selected ? 'border-navy-700 bg-navy-700' : 'border-gray-300',
      )}>
        {selected
          ? <Check className="size-3.5 text-white" strokeWidth={2.5} />
          : <Plus className="size-3.5 text-gray-400" strokeWidth={2} />
        }
      </span>
      <span className={cn(
        'text-[15px] font-medium',
        selected ? 'text-navy-800' : 'text-gray-700',
      )}>
        {label}
      </span>
    </button>
  )
}

// ── Step screens ───────────────────────────────────────────────────────────────

function StepTafe({ data, onChange }: { data: WizardData; onChange: (d: Partial<WizardData>) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Tell us about your TAFE journey</h1>
        <p className="text-gray-500 text-sm">This helps us match you with employers who value your qualification.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">TAFE campus</label>
          <input
            type="text"
            value={data.tafeCampus}
            onChange={(e) => onChange({ tafeCampus: e.target.value })}
            placeholder="e.g. TAFE NSW Western Sydney"
            className="w-full h-14 px-4 rounded-2xl border border-gray-200 text-[15px] focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Course name</label>
          <input
            type="text"
            value={data.course}
            onChange={(e) => onChange({ course: e.target.value })}
            placeholder="e.g. Certificate IV in Information Technology"
            className="w-full h-14 px-4 rounded-2xl border border-gray-200 text-[15px] focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">I&apos;m looking for</label>
          <div className="space-y-2">
            {(Object.entries(AVAILABILITY_LABELS) as [Availability, string][]).map(([val, label]) => (
              <ToggleRow
                key={val}
                label={label}
                selected={data.availability === val}
                onToggle={() => onChange({ availability: val })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StepJobTypes({ data, onChange }: { data: WizardData; onChange: (d: Partial<WizardData>) => void }) {
  function toggle(t: string) {
    const next = data.preferredJobTypes.includes(t)
      ? data.preferredJobTypes.filter((x) => x !== t)
      : [...data.preferredJobTypes, t]
    onChange({ preferredJobTypes: next })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">What type of job are you interested in?</h1>
        <p className="text-gray-500 text-sm">Select all that apply.</p>
      </div>
      <div className="space-y-2">
        {JOB_TYPES.map((t) => (
          <ToggleRow
            key={t}
            label={t}
            selected={data.preferredJobTypes.includes(t)}
            onToggle={() => toggle(t)}
          />
        ))}
      </div>
    </div>
  )
}

function StepTitles({ data, onChange }: { data: WizardData; onChange: (d: Partial<WizardData>) => void }) {
  function setTitle(i: number, val: string) {
    const next = [...data.desiredTitles]
    next[i] = val
    onChange({ desiredTitles: next })
  }

  function addTitle() {
    if (data.desiredTitles.length >= 10) return
    onChange({ desiredTitles: [...data.desiredTitles, ''] })
  }

  function removeTitle(i: number) {
    const next = data.desiredTitles.filter((_, idx) => idx !== i)
    onChange({ desiredTitles: next.length ? next : [''] })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">What job are you looking for?</h1>
        <p className="text-gray-500 text-sm">
          This helps us show you the most relevant jobs. You can always change this later.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">Job title</label>
        <p className="text-xs text-gray-400 mb-3">Add up to 10 job titles</p>

        <div className="space-y-2">
          {data.desiredTitles.map((title, i) => (
            <div key={i} className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(i, e.target.value)}
                placeholder="e.g. Electrician, Boilermaker, Civil Engineer"
                className="w-full h-14 px-4 pr-10 rounded-2xl border border-gray-200 text-[15px] focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
              />
              {data.desiredTitles.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTitle(i)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="size-3.5 text-gray-500" strokeWidth={2} />
                </button>
              )}
            </div>
          ))}
        </div>

        {data.desiredTitles.length < 10 && (
          <button
            type="button"
            onClick={addTitle}
            className="mt-3 flex items-center gap-2 text-navy-700 font-semibold text-sm hover:text-navy-900 transition-colors"
          >
            <Plus className="size-4" strokeWidth={2.5} />
            Add another
          </button>
        )}
      </div>
    </div>
  )
}

function StepLocation({ data, onChange }: { data: WizardData; onChange: (d: Partial<WizardData>) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Where are you located?</h1>
        <p className="text-gray-500 text-sm">We use this to match you with jobs nearby.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">City, State/Territory</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="e.g. Sydney NSW"
            className="w-full h-14 px-4 rounded-2xl border border-gray-200 text-[15px] focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Postcode</label>
          <input
            type="text"
            inputMode="numeric"
            value={data.postcode}
            onChange={(e) => onChange({ postcode: e.target.value.replace(/\D/g, '').slice(0, 4) })}
            placeholder="e.g. 2000"
            className="w-full h-14 px-4 rounded-2xl border border-gray-200 text-[15px] focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
          />
        </div>

        <button
          type="button"
          onClick={() => onChange({ remoteWork: !data.remoteWork })}
          className="w-full flex items-center justify-between px-4 py-4 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-colors"
        >
          <span className="text-[15px] font-medium text-gray-700">I&apos;m interested in remote work</span>
          <span
            className={cn(
              'relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200',
              data.remoteWork ? 'bg-navy-800' : 'bg-gray-200',
            )}
          >
            <span
              className={cn(
                'inline-block size-5 rounded-full bg-white shadow transition-transform duration-200',
                data.remoteWork ? 'translate-x-6' : 'translate-x-1',
              )}
            />
          </span>
        </button>
      </div>
    </div>
  )
}

function StepPay({ data, onChange }: { data: WizardData; onChange: (d: Partial<WizardData>) => void }) {
  const [showMore, setShowMore] = useState(false)

  const primaryPeriods: [PayPeriod, string][] = [
    ['per-hour', 'Per hour'],
    ['per-year', 'Per year'],
  ]
  const morePeriods: [PayPeriod, string][] = [
    ['per-week', 'Per week'],
    ['per-month', 'Per month'],
  ]
  const visiblePeriods = showMore ? [...primaryPeriods, ...morePeriods] : primaryPeriods

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">What&apos;s the minimum pay you&apos;re looking for?</h1>
        <p className="text-gray-500 text-sm">We use this to match you with jobs that pay around and above this amount.</p>
      </div>

      {/* Privacy note */}
      <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-2xl">
        <EyeOff className="size-4 text-blue-500 shrink-0" strokeWidth={1.75} />
        <p className="text-sm text-blue-700">Not shown to employers.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">Minimum base salary</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[15px]">$</span>
            <input
              type="text"
              inputMode="numeric"
              value={data.minSalary}
              onChange={(e) => onChange({ minSalary: e.target.value.replace(/[^0-9]/g, '') })}
              placeholder="0"
              className="w-full h-14 pl-8 pr-4 rounded-2xl border border-gray-200 text-[15px] focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Pay period</label>
          <div className="flex flex-wrap gap-2">
            {visiblePeriods.map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => onChange({ payPeriod: val })}
                className={cn(
                  'h-10 px-5 rounded-full border text-sm font-medium transition-colors',
                  data.payPeriod === val
                    ? 'border-navy-700 bg-navy-700 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {!showMore && (
            <button
              type="button"
              onClick={() => setShowMore(true)}
              className="mt-3 text-sm font-semibold text-navy-700 hover:text-navy-900 flex items-center gap-1 transition-colors"
            >
              Show more pay periods
              <span className="text-xs">↓</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function StepSkills({ data, onChange }: { data: WizardData; onChange: (d: Partial<WizardData>) => void }) {
  function toggle(s: string) {
    const next = data.skills.includes(s)
      ? data.skills.filter((x) => x !== s)
      : [...data.skills, s]
    onChange({ skills: next })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Tell us about the skills that make you stand out</h1>
        <p className="text-gray-500 text-sm">
          These questions are optional, but your answers help us make better job recommendations.
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 mb-3">Which skills have you used regularly?</p>
        <div className="space-y-2">
          {SKILLS_LIST.map((s) => (
            <ToggleRow
              key={s}
              label={s}
              selected={data.skills.includes(s)}
              onToggle={() => toggle(s)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main wizard ───────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<WizardData>(DEFAULT)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isLoading) return
    if (!user) { router.push('/login'); return }
    const profile = getStudentProfile(user.id)
    if (profile?.completedOnboarding) router.push('/student/dashboard')
  }, [user, isLoading, router])

  function patch(partial: Partial<WizardData>) {
    setData((prev) => ({ ...prev, ...partial }))
  }

  function canContinue() {
    if (step === 0) return data.tafeCampus.trim().length >= 2 && data.course.trim().length >= 2
    if (step === 2) return data.desiredTitles.some((t) => t.trim().length > 0)
    return true  // all other steps are optional
  }

  async function handleContinue() {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1)
      return
    }
    // Last step — save and go to dashboard
    if (!user) return
    setSaving(true)
    completeOnboarding(user.id, {
      tafeCampus: data.tafeCampus,
      course: data.course,
      availability: data.availability,
      preferredJobTypes: data.preferredJobTypes,
      desiredTitles: data.desiredTitles.filter((t) => t.trim()),
      location: data.location,
      postcode: data.postcode,
      remoteWork: data.remoteWork,
      minSalary: data.minSalary,
      payPeriod: data.payPeriod,
      skills: data.skills,
    })
    router.push('/student/dashboard')
  }

  function handleBack() {
    if (step === 0) return
    setStep((s) => s - 1)
  }

  const pct = Math.round(((step + 1) / TOTAL_STEPS) * 100)

  const steps = [
    <StepTafe key="tafe" data={data} onChange={patch} />,
    <StepJobTypes key="jobtypes" data={data} onChange={patch} />,
    <StepTitles key="titles" data={data} onChange={patch} />,
    <StepLocation key="location" data={data} onChange={patch} />,
    <StepPay key="pay" data={data} onChange={patch} />,
    <StepSkills key="skills" data={data} onChange={patch} />,
  ]

  if (isLoading || !user) return null

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Top bar (back + progress) ──────────────────────────────── */}
      <div className="shrink-0 px-5 pt-safe pt-5 pb-4">
        {/* Back arrow */}
        <div className="h-10 flex items-center mb-3">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="size-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="size-5 text-gray-700" strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Progress bar */}
        <p className="text-xs text-gray-400 text-center mb-1.5">{pct}% complete</p>
        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-navy-800 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* ── Step content ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-32">
        {steps[step]}
      </div>

      {/* ── Fixed bottom button ────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 px-5 py-4 pb-safe">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue() || saving}
          className={cn(
            'w-full h-14 rounded-2xl text-white text-[15px] font-semibold transition-colors',
            canContinue() && !saving
              ? 'bg-navy-800 hover:bg-navy-700 active:bg-navy-900'
              : 'bg-gray-200 cursor-not-allowed text-gray-400',
          )}
        >
          {saving ? 'Setting up your profile…' : step === TOTAL_STEPS - 1 ? 'Go to my dashboard →' : 'Continue'}
        </button>

        {step !== 0 && step !== 2 && (
          <button
            type="button"
            onClick={handleContinue}
            className="w-full mt-2 h-10 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  )
}
