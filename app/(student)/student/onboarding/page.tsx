'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GraduationCap, Loader2 } from 'lucide-react'

import { useAuth } from '@/lib/auth/context'
import { getStudentProfile, completeOnboarding } from '@/lib/student/mock-store'
import { AVAILABILITY_LABELS } from '@/lib/student/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const schema = z.object({
  tafeCampus: z.string().min(2, 'Enter your TAFE campus'),
  course: z.string().min(2, 'Enter your course name'),
  availability: z.enum(['full-time', 'part-time', 'casual', 'internship']),
})

type FormValues = z.infer<typeof schema>

const inputClass =
  'h-11 border-gray-200 bg-gray-50 focus-visible:ring-navy-500 focus-visible:border-navy-500 placeholder:text-gray-400'

export default function OnboardingPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { availability: 'full-time' },
  })

  const selectedAvailability = watch('availability')

  useEffect(() => {
    if (isLoading) return
    if (!user) { router.push('/login'); return }
    // If already onboarded, go straight to dashboard
    const profile = getStudentProfile(user.id)
    if (profile?.completedOnboarding) router.push('/student/dashboard')
  }, [user, isLoading, router])

  async function onSubmit(values: FormValues) {
    if (!user) return
    completeOnboarding(user.id, values)
    router.push('/student/dashboard')
  }

  if (isLoading || !user) return null

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6"
      style={{
        backgroundImage: 'radial-gradient(circle, #C9C5BC 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center size-9 rounded-lg bg-ochre-500">
            <GraduationCap className="size-5 text-white" strokeWidth={2} />
          </div>
          <span className="font-display font-semibold text-xl text-navy-700 tracking-tight">
            CyberMil
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-md px-8 py-10 space-y-7">
          {/* Header */}
          <div className="space-y-1">
            <p className="text-ochre-600 text-xs font-semibold uppercase tracking-[0.08em]">
              Step 1 of 1 — Quick setup
            </p>
            <h1 className="font-display text-2xl font-semibold text-gray-800 tracking-tight">
              Welcome, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-500 text-sm">
              Tell us the basics so employers can start finding you. Takes 30 seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* TAFE Campus */}
            <div className="space-y-1.5">
              <Label htmlFor="tafeCampus" className="text-sm font-medium text-gray-700">
                TAFE campus
              </Label>
              <Input
                id="tafeCampus"
                placeholder="e.g. TAFE NSW Western Sydney"
                aria-invalid={!!errors.tafeCampus}
                aria-describedby={errors.tafeCampus ? 'campus-error' : undefined}
                className={inputClass}
                {...register('tafeCampus')}
              />
              {errors.tafeCampus && (
                <p id="campus-error" className="text-xs" style={{ color: '#7A2323' }}>
                  {errors.tafeCampus.message}
                </p>
              )}
            </div>

            {/* Course */}
            <div className="space-y-1.5">
              <Label htmlFor="course" className="text-sm font-medium text-gray-700">
                Course name
              </Label>
              <Input
                id="course"
                placeholder="e.g. Certificate IV in Information Technology"
                aria-invalid={!!errors.course}
                aria-describedby={errors.course ? 'course-error' : undefined}
                className={inputClass}
                {...register('course')}
              />
              {errors.course && (
                <p id="course-error" className="text-xs" style={{ color: '#7A2323' }}>
                  {errors.course.message}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                I&apos;m looking for
              </Label>
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Availability">
                {(Object.entries(AVAILABILITY_LABELS) as [FormValues['availability'], string][]).map(
                  ([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={selectedAvailability === value}
                      onClick={() => setValue('availability', value, { shouldValidate: true })}
                      className={cn(
                        'flex items-center justify-center h-11 px-4 rounded-md border text-sm font-medium transition-colors',
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-ochre-500 hover:bg-ochre-600 active:bg-ochre-700 text-white font-semibold rounded-md transition-colors"
            >
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
              Go to my dashboard →
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400">
            You can fill in the rest of your profile any time from your dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
