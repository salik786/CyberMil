'use client'

import type { StudentProfile, OnboardingData } from './types'

const KEY = 'cybermil_student_profiles'

function getAllProfiles(): Record<string, StudentProfile> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

function save(profiles: Record<string, StudentProfile>) {
  localStorage.setItem(KEY, JSON.stringify(profiles))
}

export function getStudentProfile(userId: string): StudentProfile | null {
  return getAllProfiles()[userId] ?? null
}

export function completeOnboarding(userId: string, data: OnboardingData): StudentProfile {
  const profiles = getAllProfiles()
  const existing = profiles[userId]

  const profile: StudentProfile = {
    ...(existing ?? {}),
    userId,
    ...data,
    unitsStudied: existing?.unitsStudied ?? [],
    bio: existing?.bio ?? '',
    skills: existing?.skills ?? [],
    phone: existing?.phone ?? '',
    location: existing?.location ?? '',
    resumeUrl: existing?.resumeUrl ?? '',
    isVisible: existing?.isVisible ?? true,
    completedOnboarding: true,
    updatedAt: new Date().toISOString(),
  }

  profiles[userId] = profile
  save(profiles)
  return profile
}

export function updateStudentProfile(
  userId: string,
  data: Partial<Omit<StudentProfile, 'userId' | 'completedOnboarding'>>,
): StudentProfile {
  const profiles = getAllProfiles()
  const existing = profiles[userId]
  if (!existing) throw new Error('Profile not found — complete onboarding first')

  const updated: StudentProfile = {
    ...existing,
    ...data,
    userId,
    updatedAt: new Date().toISOString(),
  }

  profiles[userId] = updated
  save(profiles)
  return updated
}

/** Returns 0–100 */
export function getCompletionPct(profile: StudentProfile): number {
  const { COMPLETION_FIELDS } = require('./types') as typeof import('./types')
  let earned = 30 // base 30% for completing onboarding

  for (const { key, weight } of COMPLETION_FIELDS) {
    const val = profile[key]
    const filled =
      val !== undefined &&
      val !== '' &&
      val !== null &&
      !(Array.isArray(val) && val.length === 0)
    if (filled) earned += weight
  }

  return Math.min(earned, 100)
}
