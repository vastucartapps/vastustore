# Milestone 02 — Authentication & Onboarding

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend (Medusa v2 APIs + Supabase)
- Implement loading, error, and empty states
- Every touch point must be functional — no dead buttons, no hardcoded data

The components are props-based — they accept data and fire callbacks. Wire them to Medusa v2 APIs, Supabase auth, and your state management.

---

## Overview

Authentication handles user registration, login, password recovery, email verification, guest-to-account conversion, and session management. All auth pages use a split-screen layout on desktop (form left, marketing content right). A single login form serves both customers and admins with role-based redirection.

## Key Functionality

- Email/password registration with real-time password strength meter
- Login with "Remember me" and role-based redirection (customer to storefront, admin to `/admin`)
- Forgot password flow with email reset link
- Email verification with dismissible reminder banner on storefront
- Guest-to-account conversion after guest checkout (email pre-filled, just needs password)
- Active session management (view devices, revoke individual or all sessions)
- Admin auth guard — protected `/admin/*` routes with access denied page for non-admins

## Components Provided

From `sections/authentication-and-onboarding/components/`:

| Component | Purpose |
|---|---|
| **AuthScreen.tsx** | Main auth view container — renders login, register, forgot-password, reset-password, or guest-conversion based on `view` prop |
| **MarketingPanel.tsx** | Right-side split-screen panel with slideshow of marketing images, quotes, and VastuCart logo overlay |
| **PasswordStrengthMeter.tsx** | Color-coded strength bar (red/amber/green) with requirements checklist |

## Props Reference

### Key Types

- `AuthView`: `'login' | 'register' | 'forgot-password' | 'reset-password' | 'guest-conversion'`
- `PasswordStrength`: `'weak' | 'medium' | 'strong'`
- `AuthUser`: `{ id, name, email, role: 'customer' | 'admin', isEmailVerified, avatarUrl, createdAt, lastLoginAt }`
- `ActiveSession`: `{ id, device, ipAddress, location, lastActive, isCurrent }`
- `MarketingSlide`: `{ id, imageUrl, quote, attribution, isActive, order }`
- `GuestConversion`: `{ email, orderNumber, orderTotal, message }`
- `VerificationBanner`: `{ message, actionLabel, isDismissible }`

### Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onLogin` | `(email, password, rememberMe) => void` | Supabase `signInWithPassword()`. On success, check role: admin goes to `/admin`, customer goes to `/` or return URL. |
| `onRegister` | `(name, email, password) => void` | Supabase `signUp()` + create Medusa v2 customer record. Show success, log user in immediately. |
| `onForgotPassword` | `(email) => void` | Supabase `resetPasswordForEmail()`. Show confirmation message regardless of whether email exists. |
| `onResetPassword` | `(newPassword) => void` | Supabase `updateUser({ password })` using the recovery token from the email link. |
| `onGuestConvert` | `(password) => void` | Create Supabase account with the guest's email, set password, link the guest order to the new account in Medusa. |
| `onResendVerification` | `() => void` | Supabase `resend()` for email verification. |
| `onDismissVerification` | `() => void` | Store dismissal in localStorage or cookie so banner doesn't reappear for this session. |
| `onRevokeSession` | `(sessionId) => void` | Call Supabase admin API or custom endpoint to revoke a specific session. |
| `onRevokeAllSessions` | `() => void` | Revoke all sessions except current via Supabase. |
| `onNavigate` | `(view: AuthView) => void` | `router.push()` to `/login`, `/register`, `/forgot-password`, etc. |

## User Flows

### Registration
1. User navigates to `/register`
2. Enters name, email, password
3. Password strength meter updates in real-time (checks: 8+ chars, uppercase, lowercase, number, special char)
4. On submit: create Supabase user + Medusa customer, log in immediately
5. Gentle banner appears on storefront: "Please verify your email" with resend link
6. User clicks email verification link — account marked verified, banner disappears

### Login
1. User navigates to `/login`
2. Enters email, password, optionally checks "Remember me"
3. On submit: Supabase `signInWithPassword()`
4. If `role === 'admin'`, redirect to `/admin`
5. If `role === 'customer'`, redirect to `/` or the URL they were trying to access
6. Invalid credentials: inline error "Invalid email or password"
7. "Remember me" extends session duration

### Forgot Password
1. User clicks "Forgot Password?" on login page
2. Enters email, submits
3. Show success message: "If an account exists, you'll receive a reset link"
4. User clicks link in email, lands on `/reset-password?token=...`
5. Enters new password + confirm, strength meter validates
6. On submit: password updated, redirect to login with success message

### Guest-to-Account Conversion
1. After guest checkout, order confirmation page shows conversion prompt
2. Email is pre-filled from the guest order
3. User only needs to set a password
4. On submit: create account, link guest order to new account
5. Redirect to customer dashboard

### Admin Login
1. Same `/login` page — no separate admin login URL
2. After authentication, backend checks role
3. Admin role: redirect to `/admin`
4. Non-admin trying to access `/admin/*`: show "Access Denied" page with link back to storefront

## Supabase Auth Integration

- Use `@supabase/supabase-js` client for all auth operations
- Store user role in Supabase user metadata or a separate `profiles` table
- Use Supabase Row Level Security (RLS) policies for admin vs customer data access
- Session persistence: Supabase handles this automatically; "Remember me" can extend via session config
- Email verification: use Supabase's built-in email verification flow
- Password reset: use Supabase's built-in recovery flow with custom redirect URL

## Empty States

- **No marketing slides configured**: Show a solid deep teal panel with VastuCart logo and tagline
- **Session list empty**: Show "No other active sessions" message

## Files to Reference

- `sections/authentication-and-onboarding/components/AuthScreen.tsx`
- `sections/authentication-and-onboarding/components/MarketingPanel.tsx`
- `sections/authentication-and-onboarding/components/PasswordStrengthMeter.tsx`
- `data-shapes/authentication-and-onboarding/types.ts`
- `design-system/theme.json`

## Done Checklist

- [ ] Login page with email, password, "Remember me", inline validation
- [ ] Registration page with name, email, password, real-time strength meter
- [ ] Split-screen layout: form left, marketing panel right (desktop); form only (mobile)
- [ ] Forgot password page sends reset email via Supabase
- [ ] Reset password page with token validation and strength meter
- [ ] Role-based redirect: customers to storefront, admins to `/admin`
- [ ] Email verification banner on storefront for unverified users (dismissible, with resend)
- [ ] Guest-to-account conversion on order confirmation page
- [ ] Active session management (list sessions, revoke individual, revoke all)
- [ ] Admin route protection with access denied page
- [ ] Loading states on all submit buttons
- [ ] Inline form validation errors
- [ ] Marketing panel shows admin-configurable slides (falls back to logo + teal)
- [ ] Gradient accent border on the auth form card
- [ ] Dark mode support
