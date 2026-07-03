'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bookmark,
  User,
  GraduationCap,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth/context'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const NAV_LINKS = [
  { href: '/student/dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/student/jobs',          label: 'Jobs',          icon: Briefcase },
  { href: '/student/applications',  label: 'Applications',  icon: FileText },
  { href: '/student/saved',         label: 'Saved',         icon: Bookmark },
]

export function StudentNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleSignOut() {
    signOut()
    router.push('/login')
  }

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? 'S'

  return (
    <>
      <header className="sticky top-0 z-40 bg-navy-700 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/student/dashboard" className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center justify-center size-8 rounded-lg bg-ochre-500">
              <GraduationCap className="size-4 text-white" strokeWidth={2} />
            </div>
            <span className="font-display font-semibold text-white tracking-tight hidden sm:block">
              CyberMil
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Student navigation">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Right: avatar dropdown */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Account menu"
                className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <Avatar className="size-8">
                  <AvatarFallback className="bg-navy-600 text-white text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => router.push('/student/profile')}
                >
                  <User className="size-4" strokeWidth={1.75} />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                >
                  <LogOut className="size-4" strokeWidth={1.75} />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white/70 hover:text-white transition-colors p-1"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-navy-800 border-t border-white/10 px-4 pb-4 pt-2 space-y-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5',
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {label}
                </Link>
              )
            })}
          </div>
        )}
      </header>
    </>
  )
}
