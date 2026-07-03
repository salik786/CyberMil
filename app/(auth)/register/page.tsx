'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, GraduationCap, Briefcase } from 'lucide-react'

import { useAuth } from '@/lib/auth/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    role: z.enum(['student', 'employer']),
    companyName: z.string().optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don’t match",
    path: ['confirmPassword'],
  })
  .refine((d) => d.role !== 'employer' || (d.companyName && d.companyName.trim().length > 0), {
    message: 'Company name is required',
    path: ['companyName'],
  })

type FormValues = z.infer<typeof schema>

const inputClass =
  'h-11 border-gray-200 bg-gray-50 focus-visible:ring-navy-500 focus-visible:border-navy-500 placeholder:text-gray-400'

export default function RegisterPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'student' },
  })

  const selectedRole = watch('role')

  async function onSubmit(values: FormValues) {
    setServerError('')
    const result = signUp(values)
    if (result.error) {
      setServerError(result.error)
      return
    }
    router.push(values.role === 'employer' ? '/employer/dashboard' : '/student/dashboard')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-semibold text-gray-800 tracking-tight">
          Create your account
        </h1>
        <p className="text-gray-500 text-sm">Join CyberMil and get started today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {serverError && (
          <div
            role="alert"
            className="rounded-md border px-3.5 py-3 text-sm"
            style={{ background: '#FEF2F2', borderColor: '#FECACA', color: '#7A2323' }}
          >
            {serverError}
          </div>
        )}

        {/* Role selector — space-3 (12px) gap, space-4 (16px) horizontal padding, h-11 (44px) tap target */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-gray-700">I am a</Label>
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Account type">
            {(
              [
                { value: 'student', label: 'Student', icon: GraduationCap },
                { value: 'employer', label: 'Employer', icon: Briefcase },
              ] as const
            ).map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selectedRole === value}
                onClick={() => setValue('role', value, { shouldValidate: true })}
                className={cn(
                  'flex items-center gap-3 rounded-md border h-11 px-4 text-sm font-medium transition-colors',
                  selectedRole === value
                    ? 'border-navy-700 bg-navy-700 text-white'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-navy-300 hover:bg-white hover:text-navy-700',
                )}
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full name
          </Label>
          <Input
            id="name"
            placeholder="Alex Johnson"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClass}
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" className="text-xs" style={{ color: '#7A2323' }}>
              {errors.name.message}
            </p>
          )}
        </div>

        {selectedRole === 'employer' && (
          <div className="space-y-1.5">
            <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
              Company name
            </Label>
            <Input
              id="companyName"
              placeholder="Acme Pty Ltd"
              autoComplete="organization"
              aria-invalid={!!errors.companyName}
              aria-describedby={errors.companyName ? 'company-error' : undefined}
              className={inputClass}
              {...register('companyName')}
            />
            {errors.companyName && (
              <p id="company-error" className="text-xs" style={{ color: '#7A2323' }}>
                {errors.companyName.message}
              </p>
            )}
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="text-xs" style={{ color: '#7A2323' }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={cn(inputClass, 'pr-11')}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-xs" style={{ color: '#7A2323' }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
            className={inputClass}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p id="confirm-error" className="text-xs" style={{ color: '#7A2323' }}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-ochre-500 hover:bg-ochre-600 active:bg-ochre-700 text-white font-semibold rounded-md transition-colors mt-2"
        >
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          Create account
        </Button>

        <p className="text-center text-xs text-gray-400">
          By signing up you agree to our{' '}
          <Link href="/terms" className="underline hover:text-gray-600 transition-colors">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-gray-600 transition-colors">
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      <div className="relative flex items-center gap-3">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-xs text-gray-400 shrink-0">Already have an account?</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      <Link
        href="/login"
        className="flex items-center justify-center w-full h-11 rounded-md border border-gray-200 text-sm font-medium text-navy-700 hover:bg-navy-50 hover:border-navy-200 transition-colors"
      >
        Sign in instead
      </Link>
    </div>
  )
}
