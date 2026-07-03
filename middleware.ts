import { type NextRequest, NextResponse } from 'next/server'
import type { MockUser } from '@/lib/auth/types'

function getSessionFromCookie(request: NextRequest): MockUser | null {
  try {
    const raw = request.cookies.get('auth-session')?.value
    return raw ? (JSON.parse(decodeURIComponent(raw)) as MockUser) : null
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const user = getSessionFromCookie(request)
  const { pathname } = request.nextUrl

  const isAuthPage = pathname === '/login' || pathname === '/register'
  const isProtected =
    pathname.startsWith('/student') ||
    pathname.startsWith('/employer') ||
    pathname.startsWith('/admin')

  if (!user && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && isAuthPage) {
    const dest = user.role === 'employer' ? '/employer/dashboard' : '/student/dashboard'
    return NextResponse.redirect(new URL(dest, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
