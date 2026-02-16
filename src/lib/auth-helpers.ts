/**
 * Helper functions for auth in API routes
 */

import { cookies } from 'next/headers'
import { getMe, type UserProfile } from './auth'

/**
 * Get the current authenticated user from cookies
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
      return null
    }

    const user = await getMe(accessToken)
    return user
  } catch (error) {
    return null
  }
}

/**
 * Require authentication - throws if user is not logged in
 * Use in API routes that require auth
 */
export async function requireAuth(): Promise<UserProfile> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Authentication required')
  }

  return user
}
