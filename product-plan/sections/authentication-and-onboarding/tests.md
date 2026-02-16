# Test Specs: Authentication & Onboarding

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Registration
**Success Path:**
- Fill name, email, password fields
- Password strength meter updates in real-time as user types
- Submit form triggers `onRegister` with name, email, password
- User gains immediate access; verification banner appears

**Failure Path:**
- Submit with empty fields shows inline validation errors
- Submit with weak password shows strength meter in red
- Submit with existing email shows inline error message

### Flow 2: Login
**Success Path:**
- Enter valid email and password
- Toggle "Remember me" checkbox
- Submit triggers `onLogin` with email, password, rememberMe=true
- Admin role users redirect to /admin dashboard

**Failure Path:**
- Invalid credentials show inline error message
- Empty fields show validation errors

### Flow 3: Forgot / Reset Password
**Success Path:**
- Enter email, submit triggers `onForgotPassword`
- On reset page, enter new password with strength meter
- Submit triggers `onResetPassword`

**Failure Path:**
- Empty email shows validation error
- Password mismatch on reset shows error

### Flow 4: Guest-to-Account Conversion
**Success Path:**
- Email pre-filled from guest order
- User enters only password
- Submit triggers `onGuestConvert`

### Flow 5: Session Management
- Active sessions list displays device, location, last active
- Current session marked distinctly
- Click revoke triggers `onRevokeSession` with session ID
- "Logout all" triggers `onRevokeAllSessions`

## Empty State Tests
- No marketing slides: marketing panel shows default fallback
- No active sessions: sessions list shows empty message

## Edge Cases
- Password strength meter handles all requirement combinations
- Split-screen layout hides marketing panel on mobile
- Navigation between auth views updates correctly via `onNavigate`
- Verification banner is dismissible via `onDismissVerification`
- Loading state shown on submit buttons during async operations
