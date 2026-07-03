export type QualificationLevel =
  | 'cert1'
  | 'cert2'
  | 'cert3'
  | 'cert4'
  | 'diploma'
  | 'adv_diploma'

export type Availability = 'full-time' | 'part-time' | 'casual' | 'internship'

export const QUALIFICATION_LABELS: Record<QualificationLevel, string> = {
  cert1: 'Certificate I',
  cert2: 'Certificate II',
  cert3: 'Certificate III',
  cert4: 'Certificate IV',
  diploma: 'Diploma',
  adv_diploma: 'Advanced Diploma',
}

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  casual: 'Casual',
  internship: 'Internship / Placement',
}

export interface StudentProfile {
  userId: string

  // ── Quick onboarding (required) ─────────────
  tafeCampus: string
  course: string
  availability: Availability

  // ── Detailed profile ─────────────────────────
  qualificationLevel?: QualificationLevel
  graduationYear?: number
  unitsStudied: string[]
  bio: string
  skills: string[]
  phone: string
  location: string          // suburb / city
  resumeUrl: string
  isVisible: boolean

  // ── Meta ─────────────────────────────────────
  completedOnboarding: boolean
  updatedAt: string
}

export type OnboardingData = Pick<StudentProfile, 'tafeCampus' | 'course' | 'availability'>

/** Fields that count toward profile completion % */
export const COMPLETION_FIELDS: Array<{
  key: keyof StudentProfile
  label: string
  weight: number
}> = [
  { key: 'bio',               label: 'Add a bio',               weight: 15 },
  { key: 'qualificationLevel',label: 'Qualification level',      weight: 10 },
  { key: 'graduationYear',    label: 'Graduation year',          weight: 10 },
  { key: 'unitsStudied',      label: 'Units studied',            weight: 10 },
  { key: 'skills',            label: 'Add skills',               weight: 15 },
  { key: 'phone',             label: 'Phone number',             weight: 10 },
  { key: 'location',          label: 'Your location',            weight: 10 },
  { key: 'resumeUrl',         label: 'Upload resume',            weight: 20 },
]
