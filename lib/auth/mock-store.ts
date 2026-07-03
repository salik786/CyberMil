'use client'

import type { MockUser, SignUpData, SignInData, AuthResult } from './types'

const USERS_KEY = 'cybermil_users'
const SESSION_KEY = 'cybermil_session'
const COOKIE_NAME = 'auth-session'

function getStoredUsers(): (MockUser & { password: string })[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]')
  } catch {
    return []
  }
}

function setSessionCookie(user: MockUser | null) {
  if (user) {
    const value = encodeURIComponent(JSON.stringify(user))
    const maxAge = 60 * 60 * 24 * 7 // 7 days
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
  } else {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`
  }
}

export function signUp(data: SignUpData): AuthResult {
  const users = getStoredUsers()

  if (users.some((u) => u.email === data.email)) {
    return { user: null, error: 'An account with this email already exists.' }
  }

  const user: MockUser = {
    id: crypto.randomUUID(),
    email: data.email,
    name: data.name,
    role: data.role,
    ...(data.companyName ? { companyName: data.companyName } : {}),
  }

  users.push({ ...user, password: data.password })
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  setSessionCookie(user)

  return { user, error: null }
}

export function signIn(data: SignInData): AuthResult {
  const users = getStoredUsers()
  const match = users.find((u) => u.email === data.email && u.password === data.password)

  if (!match) {
    return { user: null, error: 'Invalid email or password.' }
  }

  const { password: _, ...user } = match
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  setSessionCookie(user)

  return { user, error: null }
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY)
  setSessionCookie(null)
}

export function getSession(): MockUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as MockUser) : null
  } catch {
    return null
  }
}
