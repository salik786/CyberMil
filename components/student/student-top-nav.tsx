'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Briefcase, FileText, Bookmark,
  GraduationCap, Bell, ChevronDown, LogOut, Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth/context'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const NAV_LINKS = [
  { href: '/student/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/student/jobs',         label: 'Jobs',         icon: Briefcase },
  { href: '/student/applications', label: 'Applications', icon: FileText },
  { href: '/student/saved',        label: 'Saved',        icon: Bookmark },
]

export function StudentTopNav() {
  const pathname = usePathname()
  const router   = useRouter()
  const { user, signOut } = useAuth()

  const initials = user?.name
    ?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() ?? 'S'

  function handleSignOut() { signOut(); router.push('/login') }

  return (
    <>
      {/* ── DESKTOP + TABLET TOP NAV ─────────────────────── */}
      <header className="sticky top-0 z-40 bg-navy-800 border-b border-white/8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">

          {/* Logo */}
          <Link href="/student/dashboard" className="flex items-center gap-2 shrink-0">
            <div className="size-8 rounded-lg bg-ochre-500 flex items-center justify-center">
              <GraduationCap className="size-4 text-white" strokeWidth={2} />
            </div>
            <span className="font-display font-semibold text-white text-sm tracking-tight hidden sm:block">
              CyberMil
            </span>
          </Link>

          {/* Nav tabs — desktop */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center" aria-label="Student navigation">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || (href !== '/student/dashboard' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    active
                      ? 'bg-white/15 text-white'
                      : 'text-white/55 hover:text-white hover:bg-white/8',
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Right: bell + avatar */}
          <div className="ml-auto flex items-center gap-3 shrink-0">
            <button
              className="relative text-white/55 hover:text-white transition-colors"
              aria-label="Notifications"
            >
              <Bell className="size-[18px]" strokeWidth={1.75} />
              <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-ochre-500" aria-hidden />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 focus-visible:outline-none">
                <Avatar className="size-7">
                  <AvatarFallback className="bg-white/20 text-white text-[11px] font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="size-3 text-white/35 hidden sm:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/student/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/student/profile')}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                >
                  <LogOut className="size-4 mr-2" strokeWidth={1.75} />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* ── MOBILE BOTTOM TAB BAR ─────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100"
        aria-label="Mobile navigation"
      >
        <div className="grid grid-cols-5 h-16">
          {[...NAV_LINKS, { href: '#', label: 'Menu', icon: Menu }].map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? 'page' : undefined}
                className="flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors"
              >
                <Icon
                  className={cn('size-5 shrink-0', active ? 'text-ochre-500' : 'text-gray-400')}
                  strokeWidth={1.75}
                />
                <span className={active ? 'text-ochre-500' : 'text-gray-400'}>{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
