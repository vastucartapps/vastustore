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

/** Props for the Authentication & Onboarding section */
export interface AuthenticationOnboardingProps {
  /** Current auth view to display */
  view: AuthView
  /** Marketing slides for the split-screen side */
  marketingSlides: MarketingSlide[]
  /** Password validation requirements */
  passwordRequirements: PasswordRequirement[]
  /** Verification banner config (shown for unverified users) */
  verificationBanner: VerificationBanner
  /** Guest conversion data (when view is 'guest-conversion') */
  guestConversion?: GuestConversion
  /** Active sessions (for account security settings) */
  activeSessions?: ActiveSession[]

  /** Called when user submits login form */
  onLogin?: (email: string, password: string, rememberMe: boolean) => void
  /** Called when user submits registration form */
  onRegister?: (name: string, email: string, password: string) => void
  /** Called when user requests password reset */
  onForgotPassword?: (email: string) => void
  /** Called when user submits new password */
  onResetPassword?: (newPassword: string) => void
  /** Called when guest creates account */
  onGuestConvert?: (password: string) => void
  /** Called when user resends verification email */
  onResendVerification?: () => void
  /** Called when user dismisses verification banner */
  onDismissVerification?: () => void
  /** Called when user logs out a specific session */
  onRevokeSession?: (sessionId: string) => void
  /** Called when user logs out all other sessions */
  onRevokeAllSessions?: () => void
  /** Called to navigate between auth views */
  onNavigate?: (view: AuthView) => void
}
