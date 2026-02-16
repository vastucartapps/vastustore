/**
 * Client-side helpers for reviews, Q&A, and FAQs
 * These wrap the API routes for easier use in components
 */

export interface RatingBreakdown {
  average: number
  total: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export interface SubmitReviewData {
  reviewer_name: string
  reviewer_location: string
  rating: number
  title: string
  text: string
  variant?: string
  photos?: string[]
  is_verified_purchase?: boolean
}

export interface SubmitQuestionData {
  question: string
  asked_by: string
}

/**
 * Fetch reviews for a product
 */
export async function fetchReviews(productId: string, options?: {
  sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest'
  limit?: number
  offset?: number
}) {
  const params = new URLSearchParams({
    sortBy: options?.sortBy || 'newest',
    limit: String(options?.limit || 50),
    offset: String(options?.offset || 0),
  })

  const response = await fetch(`/api/reviews/${productId}?${params}`)
  if (!response.ok) {
    throw new Error('Failed to fetch reviews')
  }

  return response.json() as Promise<{
    reviews: any[]
    ratingBreakdown: RatingBreakdown
  }>
}

/**
 * Submit a new review
 */
export async function submitReview(productId: string, data: SubmitReviewData) {
  const response = await fetch(`/api/reviews/${productId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to submit review')
  }

  return response.json() as Promise<{ success: boolean; review: any }>
}

/**
 * Fetch questions for a product
 */
export async function fetchQuestions(productId: string, options?: {
  sortBy?: 'newest' | 'oldest' | 'answered' | 'unanswered'
  limit?: number
  offset?: number
}) {
  const params = new URLSearchParams({
    sortBy: options?.sortBy || 'newest',
    limit: String(options?.limit || 50),
    offset: String(options?.offset || 0),
  })

  const response = await fetch(`/api/questions/${productId}?${params}`)
  if (!response.ok) {
    throw new Error('Failed to fetch questions')
  }

  return response.json() as Promise<{ questions: any[] }>
}

/**
 * Submit a new question
 */
export async function submitQuestion(productId: string, data: SubmitQuestionData) {
  const response = await fetch(`/api/questions/${productId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to submit question')
  }

  return response.json() as Promise<{ success: boolean; question: any }>
}

/**
 * Fetch FAQs for a product
 */
export async function fetchFAQs(productId: string) {
  const response = await fetch(`/api/faqs/${productId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch FAQs')
  }

  return response.json() as Promise<{ faqs: any[] }>
}
