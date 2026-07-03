'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bookmark, BookmarkCheck, Building2, MapPin, Clock, Briefcase,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { StudentTopNav } from '@/components/student/student-top-nav'

// Reusing the same dummy job structure from jobs page (abbreviated)
const SAVED_JOBS = [
  {
    id: 1,
    title: 'Electrical Apprentice (Certificate III)',
    company: 'Ausgrid',
    companyInitials: 'AG',
    companyBg: 'bg-yellow-500',
    location: 'Sydney, NSW',
    jobType: 'Apprenticeship',
    salary: '$18 – $24/hr',
    postedDaysAgo: 1,
    skills: ['Wiring', 'Safety Compliance'],
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
    postedDaysAgo: 4,
    skills: ['MIG Welding', 'TIG Welding'],
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
    postedDaysAgo: 5,
    skills: ['AutoCAD', 'Revit'],
  },
]

export default function SavedPage() {
  const [saved, setSaved] = useState(new Set(SAVED_JOBS.map((j) => j.id)))

  function toggleSave(id: number) {
    setSaved((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const visible = SAVED_JOBS.filter((j) => saved.has(j.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentTopNav />

      <div className="bg-navy-800 pt-8 pb-6 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-xl sm:text-2xl font-display font-semibold text-white mb-1">Saved Jobs</h1>
          <p className="text-white/55 text-sm">{visible.length} job{visible.length !== 1 ? 's' : ''} saved</p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 space-y-3">
        {visible.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Bookmark className="size-10 text-gray-200 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm font-medium text-gray-500">No saved jobs yet</p>
            <Link href="/student/jobs" className="mt-3 inline-block text-sm text-ochre-600 hover:underline">
              Browse jobs →
            </Link>
          </div>
        ) : visible.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-3">
              <div className={cn('size-10 sm:size-11 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs', job.companyBg)}>
                {job.companyInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2">{job.title}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Building2 className="size-3 text-gray-400" strokeWidth={1.75} />
                      <span className="text-xs text-gray-500">{job.company}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSave(job.id)}
                    className="shrink-0 size-8 rounded-lg flex items-center justify-center text-ochre-500 bg-ochre-50 hover:bg-ochre-100 transition-colors"
                  >
                    <BookmarkCheck className="size-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500">
              <span className="flex items-center gap-1"><MapPin className="size-3" strokeWidth={1.75} />{job.location}</span>
              <span className="flex items-center gap-1"><Clock className="size-3" strokeWidth={1.75} />{job.postedDaysAgo}d ago</span>
              <span className="font-medium text-gray-700">{job.salary}</span>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
              <Link
                href={`/student/jobs/${job.id}`}
                className="flex-1 h-8 flex items-center justify-center rounded-lg bg-navy-800 text-white text-xs font-semibold hover:bg-navy-700 transition-colors"
              >
                View & Apply
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="h-20 md:h-6" />
    </div>
  )
}
