'use client'

import { useEffect, useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, X, Plus } from 'lucide-react'

import { useAuth } from '@/lib/auth/context'
import { getStudentProfile, updateStudentProfile } from '@/lib/student/mock-store'
import {
  QUALIFICATION_LABELS,
  AVAILABILITY_LABELS,
  type StudentProfile,
  type QualificationLevel,
  type Availability,
} from '@/lib/student/types'
import { StudentNav } from '@/components/student/student-nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const schema = z.object({
  tafeCampus: z.string().min(2, 'Campus is required'),
  course: z.string().min(2, 'Course is required'),
  qualificationLevel: z.enum(['cert1','cert2','cert3','cert4','diploma','adv_diploma']).optional(),
  graduationYear: z.string().optional(),
  bio: z.string().max(500, 'Max 500 characters').optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  resumeUrl: z.string().optional(),
  availability: z.enum(['full-time', 'part-time', 'casual', 'internship']),
  isVisible: z.boolean(),
})

type FormValues = z.infer<typeof schema>

const inputClass =
  'h-11 border-gray-200 bg-gray-50 focus-visible:ring-navy-500 focus-visible:border-navy-500 placeholder:text-gray-400'

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-0.5 mb-5">
      <h2 className="font-display text-lg font-semibold text-gray-800">{title}</h2>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [units, setUnits] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState('')
  const [unitInput, setUnitInput] = useState('')
  const [saved, setSaved] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const selectedAvailability = watch('availability')
  const selectedQual = watch('qualificationLevel')
  const isVisible = watch('isVisible')

  useEffect(() => {
    if (isLoading) return
    if (!user) { router.push('/login'); return }
    const p = getStudentProfile(user.id)
    if (!p?.completedOnboarding) { router.push('/student/onboarding'); return }
    setProfile(p)
    setSkills(p.skills)
    setUnits(p.unitsStudied)
    // Populate form
    setValue('tafeCampus', p.tafeCampus)
    setValue('course', p.course)
    setValue('availability', p.availability)
    setValue('isVisible', p.isVisible)
    if (p.qualificationLevel) setValue('qualificationLevel', p.qualificationLevel)
    if (p.graduationYear) setValue('graduationYear', String(p.graduationYear))
    if (p.bio) setValue('bio', p.bio)
    if (p.phone) setValue('phone', p.phone)
    if (p.location) setValue('location', p.location)
    if (p.resumeUrl) setValue('resumeUrl', p.resumeUrl)
  }, [user, isLoading, router, setValue])

  function addTag(
    val: string,
    list: string[],
    setList: (v: string[]) => void,
    setInput: (v: string) => void,
  ) {
    const trimmed = val.trim()
    if (trimmed && !list.includes(trimmed)) setList([...list, trimmed])
    setInput('')
  }

  function removeTag(val: string, list: string[], setList: (v: string[]) => void) {
    setList(list.filter((t) => t !== val))
  }

  function handleTagKeyDown(
    e: KeyboardEvent<HTMLInputElement>,
    val: string,
    list: string[],
    setList: (v: string[]) => void,
    setInput: (v: string) => void,
  ) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(val, list, setList, setInput)
    }
  }

  async function onSubmit(values: FormValues) {
    if (!user) return
    const year = values.graduationYear ? parseInt(values.graduationYear, 10) : undefined
    const updated = updateStudentProfile(user.id, {
      ...values,
      graduationYear: year && !isNaN(year) ? year : undefined,
      skills,
      unitsStudied: units,
    })
    setProfile(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (isLoading || !profile) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNav />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-0.5">
            <h1 className="font-display text-3xl font-semibold text-gray-800 tracking-tight">
              My Profile
            </h1>
            <p className="text-gray-500 text-sm">
              Employers see this when you apply or appear in search.
            </p>
          </div>
          {saved && (
            <span className="text-sm font-medium text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-full">
              ✓ Saved
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">

          {/* ── 1. Personal ──────────────────────────────────── */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <SectionHeader title="Personal details" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Full name</Label>
                <Input
                  value={user!.name}
                  readOnly
                  className={cn(inputClass, 'cursor-not-allowed opacity-60')}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                <Input
                  value={user!.email}
                  readOnly
                  className={cn(inputClass, 'cursor-not-allowed opacity-60')}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone <span className="text-gray-400 font-normal">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="04xx xxx xxx"
                  className={inputClass}
                  {...register('phone')}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location <span className="text-gray-400 font-normal">(suburb / city)</span>
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Parramatta, NSW"
                  className={inputClass}
                  {...register('location')}
                />
              </div>
            </div>

            <div className="space-y-1.5 mt-4">
              <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                Bio <span className="text-gray-400 font-normal">(max 500 characters)</span>
              </Label>
              <textarea
                id="bio"
                rows={4}
                placeholder="A short paragraph about yourself, your goals, and what you bring to a team."
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 resize-none"
                {...register('bio')}
              />
              {errors.bio && (
                <p className="text-xs" style={{ color: '#7A2323' }}>{errors.bio.message}</p>
              )}
            </div>
          </section>

          {/* ── 2. TAFE details ───────────────────────────────── */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <SectionHeader
              title="TAFE details"
              subtitle="Your qualification information — shown prominently to employers."
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="tafeCampus" className="text-sm font-medium text-gray-700">
                  TAFE campus
                </Label>
                <Input
                  id="tafeCampus"
                  placeholder="e.g. TAFE NSW Western Sydney"
                  aria-invalid={!!errors.tafeCampus}
                  className={inputClass}
                  {...register('tafeCampus')}
                />
                {errors.tafeCampus && (
                  <p className="text-xs" style={{ color: '#7A2323' }}>{errors.tafeCampus.message}</p>
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="course" className="text-sm font-medium text-gray-700">
                  Course name
                </Label>
                <Input
                  id="course"
                  placeholder="e.g. Certificate IV in Information Technology"
                  aria-invalid={!!errors.course}
                  className={inputClass}
                  {...register('course')}
                />
                {errors.course && (
                  <p className="text-xs" style={{ color: '#7A2323' }}>{errors.course.message}</p>
                )}
              </div>

              {/* Qualification level */}
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-sm font-medium text-gray-700">Qualification level</Label>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(QUALIFICATION_LABELS) as [QualificationLevel, string][]).map(
                    ([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setValue('qualificationLevel', value, { shouldValidate: true })
                        }
                        className={cn(
                          'px-3 py-1.5 rounded-full border text-sm font-medium transition-colors',
                          selectedQual === value
                            ? 'border-navy-700 bg-navy-700 text-white'
                            : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-navy-300 hover:text-navy-700',
                        )}
                      >
                        {label}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="graduationYear" className="text-sm font-medium text-gray-700">
                  Graduation year
                </Label>
                <Input
                  id="graduationYear"
                  type="number"
                  placeholder="e.g. 2025"
                  min={2000}
                  max={2035}
                  className={inputClass}
                  {...register('graduationYear')}
                />
              </div>
            </div>

            {/* Units studied — tag input */}
            <div className="space-y-2 mt-4">
              <Label className="text-sm font-medium text-gray-700">
                Units / subjects studied{' '}
                <span className="text-gray-400 font-normal">(press Enter to add)</span>
              </Label>
              <div className="flex flex-wrap gap-2 min-h-[2.75rem] rounded-md border border-gray-200 bg-gray-50 p-2">
                {units.map((u) => (
                  <span
                    key={u}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-50 text-navy-700 text-xs font-medium border border-navy-100"
                  >
                    {u}
                    <button
                      type="button"
                      aria-label={`Remove ${u}`}
                      onClick={() => removeTag(u, units, setUnits)}
                      className="text-navy-400 hover:text-navy-700 transition-colors"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={unitInput}
                  onChange={(e) => setUnitInput(e.target.value)}
                  onKeyDown={(e) => handleTagKeyDown(e, unitInput, units, setUnits, setUnitInput)}
                  placeholder={units.length === 0 ? 'e.g. Networking Fundamentals' : ''}
                  className="flex-1 min-w-[120px] bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
                />
              </div>
              {unitInput && (
                <button
                  type="button"
                  onClick={() => addTag(unitInput, units, setUnits, setUnitInput)}
                  className="flex items-center gap-1 text-xs text-navy-500 hover:text-navy-700 transition-colors"
                >
                  <Plus className="size-3" /> Add &quot;{unitInput}&quot;
                </button>
              )}
            </div>
          </section>

          {/* ── 3. Skills ─────────────────────────────────────── */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <SectionHeader
              title="Skills"
              subtitle="Add skills that match the roles you want. Press Enter after each."
            />
            <div className="flex flex-wrap gap-2 min-h-[2.75rem] rounded-md border border-gray-200 bg-gray-50 p-2">
              {skills.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="bg-ochre-50 text-ochre-700 border border-ochre-100 pr-1 gap-1 font-medium"
                >
                  {s}
                  <button
                    type="button"
                    aria-label={`Remove ${s}`}
                    onClick={() => removeTag(s, skills, setSkills)}
                    className="text-ochre-400 hover:text-ochre-700 transition-colors ml-0.5"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => handleTagKeyDown(e, skillInput, skills, setSkills, setSkillInput)}
                placeholder={skills.length === 0 ? 'e.g. JavaScript, Customer Service' : ''}
                className="flex-1 min-w-[160px] bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
              />
            </div>
            {skillInput && (
              <button
                type="button"
                onClick={() => addTag(skillInput, skills, setSkills, setSkillInput)}
                className="flex items-center gap-1 text-xs text-navy-500 hover:text-navy-700 transition-colors mt-2"
              >
                <Plus className="size-3" /> Add &quot;{skillInput}&quot;
              </button>
            )}
          </section>

          {/* ── 4. Job preferences ───────────────────────────── */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <SectionHeader title="Job preferences" />
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Looking for</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(Object.entries(AVAILABILITY_LABELS) as [Availability, string][]).map(
                  ([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setValue('availability', value, { shouldValidate: true })}
                      className={cn(
                        'flex items-center justify-center h-11 px-3 rounded-md border text-sm font-medium transition-colors',
                        selectedAvailability === value
                          ? 'border-navy-700 bg-navy-700 text-white'
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-navy-300 hover:bg-white hover:text-navy-700',
                      )}
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>
            </div>
          </section>

          {/* ── 5. Resume ─────────────────────────────────────── */}
          <section id="resume" className="bg-white rounded-xl border border-gray-200 p-6">
            <SectionHeader
              title="Resume"
              subtitle="Upload your resume so employers can download it directly."
            />
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <p className="text-sm text-gray-400">
                Resume upload coming soon — paste a link below for now.
              </p>
              <Input
                placeholder="https://drive.google.com/..."
                className={cn(inputClass, 'mt-4 max-w-sm mx-auto')}
                {...register('resumeUrl')}
              />
            </div>
          </section>

          {/* ── 6. Visibility ────────────────────────────────── */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-gray-800">
                  Visible to employers
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  When on, your profile appears in employer search results.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isVisible}
                onClick={() => setValue('isVisible', !isVisible)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500',
                  isVisible ? 'bg-teal-500' : 'bg-gray-200',
                )}
              >
                <span
                  className={cn(
                    'inline-block size-4 rounded-full bg-white shadow-sm transition-transform',
                    isVisible ? 'translate-x-6' : 'translate-x-1',
                  )}
                />
              </button>
            </div>
          </section>

          <Separator className="bg-gray-200" />

          {/* Save button */}
          <div className="flex justify-end pb-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-8 bg-ochre-500 hover:bg-ochre-600 active:bg-ochre-700 text-white font-semibold rounded-md transition-colors"
            >
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
              Save profile
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
