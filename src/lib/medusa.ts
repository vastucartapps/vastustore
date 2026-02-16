import Medusa from "@medusajs/js-sdk"

const MEDUSA_API_URL =
  process.env.NEXT_PUBLIC_MEDUSA_API_URL || "https://api-store.vastucart.in"

export const medusa = new Medusa({
  baseUrl: MEDUSA_API_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

// Type helpers for Medusa responses
export type MedusaProduct = {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  images: Array<{ id: string; url: string }>
  variants: Array<{
    id: string
    title: string
    prices: Array<{ amount: number; currency_code: string }>
    inventory_quantity: number
  }>
  tags: Array<{ id: string; value: string }>
  metadata: Record<string, any> | null
  created_at: string
  updated_at: string
}

export type MedusaCategory = {
  id: string
  name: string
  handle: string
  description: string | null
  parent_category_id: string | null
  parent_category: MedusaCategory | null
  category_children: MedusaCategory[]
  metadata: Record<string, any> | null
}

export type MedusaCart = {
  id: string
  items: Array<{
    id: string
    title: string
    variant_id: string
    quantity: number
    unit_price: number
    total: number
  }>
  total: number
  subtotal: number
  tax_total: number
  shipping_total: number
}
