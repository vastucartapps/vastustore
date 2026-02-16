# Authentication & Onboarding

## Overview
Handles user registration, login, password recovery, and session management for VastuCart. Uses a split-screen layout on desktop with the auth form on the left and admin-configurable marketing content on the right. A single login form serves both customers and admins with role-based redirection.

## Components
| Component | Description |
|-----------|-------------|
| `AuthScreen.tsx` | Main auth container handling login, register, forgot/reset password, and guest conversion views |
| `MarketingPanel.tsx` | Right-side split-screen panel with configurable lifestyle imagery and quote overlay |
| `PasswordStrengthMeter.tsx` | Color-coded strength bar (red/amber/green) with requirements checklist |

## Data Shapes
| Type | Description |
|------|-------------|
| `AuthUser` | User account with id, name, email, role, verification status |
| `ActiveSession` | Login session record with device, IP, location |
| `MarketingSlide` | Configurable image + quote for the split-screen panel |
| `PasswordRequirement` | Validation rule for the strength meter |
| `GuestConversion` | Data for guest-to-account conversion prompt |
| `VerificationBanner` | Email verification reminder banner config |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onLogin` | User submits login form (email, password, rememberMe) |
| `onRegister` | User submits registration form |
| `onForgotPassword` | User requests password reset email |
| `onResetPassword` | User submits new password |
| `onGuestConvert` | Guest creates account after checkout |
| `onResendVerification` | User requests another verification email |
| `onRevokeSession` | User logs out a specific session |
| `onRevokeAllSessions` | User logs out all other sessions |
| `onNavigate` | User switches between auth views |
