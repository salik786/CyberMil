'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bookmark,
  GraduationCap,
  LogOut,
  Lightbulb,
  HelpCircle,
  Crown,
  Menu,
} from 'lucide-react'
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
  { href: '/student/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/student/jobs',         label: 'Jobs',         icon: Briefcase },
  { href: '/student/applications', label: 'Applications', icon: FileText },
  { href: '/student/saved',        label: 'Saved',        icon: Bookmark },
]

const RESOURCES = [
  { href: '#', label: 'Profile tips', icon: Lightbulb },
  { href: '#', label: 'Help center',  icon: HelpCircle },
]

export function StudentNav() {
  const pathname = usePathname()
  const router   = useRouter()
  const { user, signOut } = useAuth()

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
      {/* ── DESKTOP SIDEBAR ─────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-60 bg-navy-800 z-40">

        {/* Logo */}
        <div className="px-5 py-5 shrink-0">
          <Link href="/student/dashboard" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-9 rounded-xl bg-ochre-500 shrink-0">
              <GraduationCap className="size-5 text-white" strokeWidth={2} />
            </div>
            <span className="font-display font-semibold text-white text-base tracking-tight">CyberMil</span>
          </Link>
        </div>

        {/* Primary nav */}
        <nav className="px-3 space-y-0.5" aria-label="Student navigation">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/6',
                )}
              >
                <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Divider + Resources */}
        <div className="mt-6 px-3">
          <div className="border-t border-white/8 mb-4" />
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/30 mb-2">
            Resources
          </p>
          {RESOURCES.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/6 transition-colors"
            >
              <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
              {label}
            </Link>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Stand out to employers card */}
        <div className="px-3 pb-4 shrink-0">
          <div className="rounded-2xl bg-navy-900/70 border border-white/8 p-4">
            <div className="size-8 rounded-lg bg-ochre-500/20 flex items-center justify-center mb-3">
              <Crown className="size-4 text-ochre-400" strokeWidth={1.75} />
            </div>
            <p className="text-white text-sm font-semibold mb-1 leading-snug">Stand out to employers</p>
            <p className="text-white/45 text-xs leading-relaxed mb-4">
              Complete your profile to get more views and opportunities.
            </p>
            <Link
              href="/student/profile"
              className="block w-full text-center h-9 leading-9 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>

        {/* Sign out at very bottom */}
        <div className="px-3 pb-3 shrink-0 border-t border-white/8 pt-3">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
          >
            <LogOut className="size-4 shrink-0" strokeWidth={1.75} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── MOBILE TOP BAR ──────────────────────────────────────────── */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-100 h-14 flex items-center justify-between px-4">
        {/* Hamburger (mobile — opens bottom sheet or we just leave as decoration for now) */}
        <button className="text-gray-500 hover:text-gray-700" aria-label="Open menu">
          <Menu className="size-5" />
        </button>

        {/* Logo centre */}
        <Link href="/student/dashboard" className="flex items-center gap-2">
          <div className="flex items-center justify-center size-7 rounded-lg bg-ochre-500">
            <GraduationCap className="size-3.5 text-white" strokeWidth={2} />
          </div>
          <span className="font-display font-semibold text-navy-800 tracking-tight text-sm">CyberMil</span>
        </Link>

        {/* Right: avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger aria-label="Account menu" className="focus-visible:outline-none">
            <Avatar className="size-8">
              <AvatarFallback className="bg-navy-700 text-white text-xs font-semibold">
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
      </header>

      {/* ── MOBILE BOTTOM TAB BAR ───────────────────────────────────── */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 pb-safe"
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
