/**
 * Cart utilities for transforming between store and component types
 */

import type { CartItem as StoreCartItem } from './store'
import type { CartItem as ComponentCartItem } from '@/components/storefront/types'

/**
 * Transform store CartItem to component CartItem
 * Enriches with additional fields needed by UI components
 */
export function transformToComponentCartItem(
  storeItem: StoreCartItem,
  additionalData?: {
    productSlug?: string
    variantLabel?: string
    mrp?: number
    maxQuantity?: number
    inStock?: boolean
  }
): ComponentCartItem {
  return {
    id: storeItem.id,
    productId: storeItem.productId,
    productName: storeItem.name,
    productSlug: additionalData?.productSlug || '',
    variantId: storeItem.variantId,
    variantLabel: additionalData?.variantLabel || '',
    imageUrl: storeItem.imageUrl,
    price: storeItem.price,
    mrp: additionalData?.mrp || storeItem.price, // Default to price if no MRP
    currency: (storeItem.currency.toUpperCase() as 'INR' | 'USD') || 'INR',
    quantity: storeItem.quantity,
    maxQuantity: additionalData?.maxQuantity || 99,
    inStock: additionalData?.inStock !== undefined ? additionalData.inStock : true,
  }
}

/**
 * Calculate cart subtotal
 */
export function calculateSubtotal(items: StoreCartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

/**
 * Calculate total savings (MRP - Price)
 */
export function calculateTotalSavings(items: ComponentCartItem[]): number {
  return items.reduce((total, item) => {
    const itemSavings = (item.mrp - item.price) * item.quantity
    return total + itemSavings
  }, 0)
}

/**
 * Get default currency based on user location or preference
 */
export function getDefaultCurrency(): 'INR' | 'USD' {
  // TODO: Detect from user's country or account settings
  // For now, default to INR
  return 'INR'
}
