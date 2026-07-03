import type { Database, UserRole, JobType, JobStatus, ApplicationStatus } from './database.types'

export type { UserRole, JobType, JobStatus, ApplicationStatus }

export type Profile = Database['public']['Tables']['profiles']['Row']
export type StudentProfile = Database['public']['Tables']['student_profiles']['Row']
export type EmployerProfile = Database['public']['Tables']['employer_profiles']['Row']
export type JobListing = Database['public']['Tables']['job_listings']['Row']
export type Application = Database['public']['Tables']['applications']['Row']
export type SavedJob = Database['public']['Tables']['saved_jobs']['Row']

// Joined types used in UI
export type JobListingWithEmployer = JobListing & {
  employer_profiles: Pick<EmployerProfile, 'company_name' | 'logo_url' | 'location' | 'is_verified'>
}

export type ApplicationWithJob = Application & {
  job_listings: Pick<JobListing, 'title' | 'job_type' | 'location'> & {
    employer_profiles: Pick<EmployerProfile, 'company_name' | 'logo_url'>
  }
}

export type ApplicantWithProfile = Application & {
  profiles: Pick<Profile, 'full_name' | 'avatar_url'>
  student_profiles: Pick<StudentProfile, 'skills' | 'resume_url' | 'course' | 'tafe_campus'>
}

// Server Action result shape
export type ActionResult<T = null> = { data: T; error: null } | { data: null; error: string }
