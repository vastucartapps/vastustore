/**
 * AstroEngine Auth Client
 *
 * All authentication goes through api.vastucart.in (the shared auth gateway).
 * This client wraps the auth endpoints for use in Next.js server actions and API routes.
 */

const AUTH_API_URL = process.env.ASTROENGINE_API_URL || "https://api.vastucart.in"

interface AuthTokens {
  access_token: string
  refresh_token: string
  token_type: string
}

interface UserProfile {
  id: string
  email: string
  name: string
  role: string          // 'free' | 'pro' | 'admin'
  ecom_role: string     // 'customer' | 'ecom_admin'
  phone: string | null
  phone_country_code: string
  avatar_url: string | null
  default_currency: string
  is_active: boolean
  is_verified: boolean
  created_at: string
  last_login: string
}

async function authFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${AUTH_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Unknown error" }))
    throw new AuthError(error.error || "Auth request failed", error.code, res.status)
  }

  return res.json()
}

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string = "AUTH_ERROR",
    public status: number = 401
  ) {
    super(message)
    this.name = "AuthError"
  }
}

export async function register(email: string, password: string, name?: string): Promise<AuthTokens> {
  return authFetch<AuthTokens>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  })
}

export async function login(email: string, password: string): Promise<AuthTokens> {
  return authFetch<AuthTokens>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export async function refreshToken(refresh_token: string): Promise<AuthTokens> {
  return authFetch<AuthTokens>("/api/v1/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token }),
  })
}

export async function getMe(accessToken: string): Promise<UserProfile> {
  return authFetch<UserProfile>("/api/v1/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
}

export async function updateProfile(
  accessToken: string,
  data: Partial<Pick<UserProfile, "name" | "phone" | "phone_country_code" | "avatar_url" | "default_currency">>
): Promise<UserProfile> {
  return authFetch<UserProfile>("/api/v1/auth/me", {
    method: "PATCH",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(data),
  })
}

export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  return authFetch("/api/v1/auth/password/reset", {
    method: "POST",
    body: JSON.stringify({ email }),
  })
}

export async function confirmPasswordReset(token: string, newPassword: string): Promise<{ message: string }> {
  return authFetch("/api/v1/auth/password/reset/confirm", {
    method: "POST",
    body: JSON.stringify({ token, new_password: newPassword }),
  })
}

export type { AuthTokens, UserProfile }
