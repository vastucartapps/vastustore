/** User account with authentication details */
export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
  isEmailVerified: boolean
  avatarUrl: string | null
  createdAt: string
  lastLoginAt: string
}

/** Active login session record */
export interface ActiveSession {
  id: string
  device: string
  ipAddress: string
  location: string
  lastActive: string
  isCurrent: boolean
}

/** Admin-configurable marketing content for auth page split-screen */
export interface MarketingSlide {
  id: string
  imageUrl: string
  quote: string
  attribution: string
  isActive: boolean
  order: number
}

/** Password validation rule for strength meter */
export interface PasswordRequirement {
  label: string
  key: 'minLength' | 'uppercase' | 'lowercase' | 'number' | 'special'
}

/** Guest checkout to account conversion prompt */
export interface GuestConversion {
  email: string
  orderNumber: string
  orderTotal: string
  message: string
}

/** Email verification banner */
export interface VerificationBanner {
  message: string
  actionLabel: string
  isDismissible: boolean
}

/** Password strength level */
export type PasswordStrength = 'weak' | 'medium' | 'strong'

/** Auth page view */
export type AuthView = 'login' | 'register' | 'forgot-password' | 'reset-password' | 'guest-conversion'
