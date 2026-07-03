export type UserRole = 'student' | 'employer'

export interface MockUser {
  id: string
  email: string
  name: string
  role: UserRole
  companyName?: string
}

export interface SignUpData {
  name: string
  email: string
  password: string
  role: UserRole
  companyName?: string
}

export interface SignInData {
  email: string
  password: string
}

export type AuthResult =
  | { user: MockUser; error: null }
  | { user: null; error: string }
