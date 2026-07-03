'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PublicNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy-800/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center justify-center size-8 rounded-lg bg-ochre-500">
            <GraduationCap className="size-4 text-white" strokeWidth={2} />
          </div>
          <span className="font-display font-semibold text-white tracking-tight">CyberMil</span>
        </Link>

        {/* Nav right */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="h-9 px-4 flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/8"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="h-9 px-4 flex items-center text-sm font-semibold bg-ochre-500 hover:bg-ochre-600 text-white rounded-md transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
