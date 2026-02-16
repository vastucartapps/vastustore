/**
 * Client-side helpers for wishlist operations
 * These wrap the API routes for easier use in components
 */

import type { WishlistRow } from './supabase'

/**
 * Fetch user's wishlist
 */
export async function fetchWishlist(): Promise<WishlistRow[]> {
  const response = await fetch('/api/wishlist')

  if (!response.ok) {
    if (response.status === 401) {
      // User not logged in - return empty wishlist
      return []
    }
    throw new Error('Failed to fetch wishlist')
  }

  const data = await response.json()
  return data.wishlist || []
}

/**
 * Add product to wishlist
 */
export async function addToWishlist(productId: string): Promise<boolean> {
  const response = await fetch('/api/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId }),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication required')
    }
    if (response.status === 409) {
      // Already in wishlist
      return false
    }
    throw new Error('Failed to add to wishlist')
  }

  return true
}

/**
 * Remove product from wishlist
 */
export async function removeFromWishlist(productId: string): Promise<boolean> {
  const response = await fetch(`/api/wishlist?product_id=${productId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication required')
    }
    throw new Error('Failed to remove from wishlist')
  }

  return true
}

/**
 * Check if product is in wishlist
 */
export async function isInWishlist(productId: string): Promise<boolean> {
  try {
    const wishlist = await fetchWishlist()
    return wishlist.some((item) => item.product_id === productId)
  } catch (error) {
    return false
  }
}
