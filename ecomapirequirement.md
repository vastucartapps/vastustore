# AstroEngine API — Ecommerce Requirements

> **Carry this file to the AstroEngine API terminal.** These are modifications needed on `api.vastucart.in` to support VastuCart ecommerce.

## 1. User Model Extensions

Add these fields to the `users` table:

```sql
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users ADD COLUMN phone_country_code VARCHAR(5) DEFAULT '+91';
ALTER TABLE users ADD COLUMN avatar_url TEXT;
ALTER TABLE users ADD COLUMN default_currency VARCHAR(3) DEFAULT 'INR';
ALTER TABLE users ADD COLUMN ecom_role VARCHAR(20) DEFAULT 'customer';  -- 'customer' | 'ecom_admin'
```

The `ecom_role` field is separate from the existing `role` (free/pro/admin). A user can be `role: free` (astrology) and `ecom_role: ecom_admin` (store admin).

## 2. Update Profile Endpoint

**`PATCH /api/v1/auth/me`** (Auth Required)

Currently missing. Add ability to update user profile fields.

```json
// Request
{
  "name": "Updated Name",        // optional
  "phone": "9876543210",         // optional
  "phone_country_code": "+91",   // optional
  "avatar_url": "https://...",   // optional
  "default_currency": "INR"      // optional, 'INR' or 'USD'
}

// Response (200) — same as GET /auth/me with updated fields
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Updated Name",
  "role": "free",
  "ecom_role": "customer",
  "phone": "9876543210",
  "phone_country_code": "+91",
  "avatar_url": "https://...",
  "default_currency": "INR",
  "is_active": true,
  "is_verified": false,
  "created_at": "...",
  "last_login": "..."
}
```

## 3. Update GET /auth/me Response

Include the new fields in the response:

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "role": "free",
  "ecom_role": "customer",       // NEW
  "phone": "9876543210",          // NEW
  "phone_country_code": "+91",    // NEW
  "avatar_url": null,             // NEW
  "default_currency": "INR",      // NEW
  "is_active": true,
  "is_verified": false,
  "created_at": "...",
  "last_login": "..."
}
```

## 4. Email Verification Endpoint

**`POST /api/v1/auth/verify-email`** (No Auth)

Send verification email to the user.

```json
// Request
{ "email": "user@example.com" }

// Response (200)
{ "message": "Verification email sent." }
```

**`POST /api/v1/auth/verify-email/confirm`** (No Auth)

Confirm email with token from the email link.

```json
// Request
{ "token": "verification-token-string" }

// Response (200)
{ "message": "Email verified successfully." }
```

## 5. Session Management Endpoints

**`GET /api/v1/auth/sessions`** (Auth Required)

List all active sessions for the current user.

```json
// Response (200)
[
  {
    "id": "session-uuid",
    "device": "Chrome on Windows",
    "ip": "103.x.x.x",
    "last_active": "2026-02-15T10:00:00Z",
    "is_current": true
  }
]
```

**`DELETE /api/v1/auth/sessions/{session_id}`** (Auth Required)

Revoke a specific session.

**`DELETE /api/v1/auth/sessions`** (Auth Required)

Revoke ALL sessions except current (logout all devices).

## 6. Guest-to-Account Conversion

**`POST /api/v1/auth/convert-guest`** (No Auth)

Convert a guest checkout email into a full account. Used after guest checkout when the user decides to create an account.

```json
// Request
{
  "email": "guest@example.com",
  "password": "NewPassword8!",
  "name": "Guest Name"           // optional
}

// Response (201) — same as register
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer"
}
```

**Logic:**
- If email already exists as a verified account → return error `EMAIL_ALREADY_EXISTS`
- If email exists but unverified (created during guest checkout) → set password, activate
- If email doesn't exist → create new account (same as register)

## 7. CORS Update

Add these origins to the CORS allowed list:

```
https://vastucart.com
https://www.vastucart.com
```

Update the `CORS_ORIGINS` env var in Coolify or add to the hardcoded list.

## 8. Admin Endpoint: Set Ecom Role

**`PATCH /api/v1/admin/users/{user_id}/ecom-role`** (Admin Only)

```json
// Request
{ "ecom_role": "ecom_admin" }

// Response (200)
{ "message": "Ecom role updated.", "user_id": "uuid", "ecom_role": "ecom_admin" }
```

## 9. Webhook (Optional, Future)

**`POST` webhook** when user registers or updates profile.

VastuCart can subscribe to receive user events so it can sync the `profiles` table in `vastucart_app` database automatically.

```json
// Webhook payload
{
  "event": "user.registered" | "user.updated",
  "user": {
    "id": "uuid",
    "email": "...",
    "name": "...",
    "ecom_role": "customer"
  },
  "timestamp": "2026-02-15T10:00:00Z"
}
```

**Webhook URL:** `https://vastucart.com/api/webhooks/auth`

---

## Priority Order

1. **PATCH /auth/me** + extended fields on user model — needed immediately for profile editing
2. **CORS update** — needed for VastuCart to call the API
3. **GET /auth/me** response update — include new fields
4. **Email verification** — needed for registration flow
5. **Session management** — needed for account settings
6. **Guest conversion** — needed for guest checkout
7. **Admin ecom-role** — needed for admin access control
8. **Webhooks** — nice to have, can sync manually for now
