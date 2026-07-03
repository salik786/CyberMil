'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { MockUser } from './types'
import { getSession, signIn as storeSignIn, signOut as storeSignOut, signUp as storeSignUp } from './mock-store'
import type { SignInData, SignUpData, AuthResult } from './types'

interface AuthContextValue {
  user: MockUser | null
  isLoading: boolean
  signIn: (data: SignInData) => AuthResult
  signUp: (data: SignUpData) => AuthResult
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUser(getSession())
    setIsLoading(false)
  }, [])

  function signIn(data: SignInData): AuthResult {
    const result = storeSignIn(data)
    if (result.user) setUser(result.user)
    return result
  }

  function signUp(data: SignUpData): AuthResult {
    const result = storeSignUp(data)
    if (result.user) setUser(result.user)
    return result
  }

  function signOut() {
    storeSignOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
