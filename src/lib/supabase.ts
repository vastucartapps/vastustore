import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials not configured. Reviews, Q&A, and Wishlist features will not work.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface ProductReviewRow {
  id: string
  product_id: string
  user_id: string | null
  reviewer_name: string
  reviewer_location: string
  rating: number
  title: string
  text: string
  is_verified_purchase: boolean
  variant: string
  photos: string[]
  created_at: string
  updated_at: string
}

export interface ProductQuestionRow {
  id: string
  product_id: string
  question: string
  asked_by: string
  asked_at: string
  answer: string | null
  answered_by: string | null
  answered_at: string | null
  is_admin_answer: boolean
  created_at: string
  updated_at: string
}

export interface ProductFAQRow {
  id: string
  product_id: string
  question: string
  answer: string
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface WishlistRow {
  id: string
  user_id: string
  product_id: string
  created_at: string
}
