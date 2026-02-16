import { medusa } from './medusa'

const CART_ID_KEY = 'medusa_cart_id'

/**
 * Get or create a Medusa cart session
 */
export async function getOrCreateCart(): Promise<{ id: string; items: any[] }> {
  try {
    // Check for existing cart ID in localStorage
    const existingCartId = typeof window !== 'undefined'
      ? localStorage.getItem(CART_ID_KEY)
      : null

    if (existingCartId) {
      // Try to retrieve existing cart
      try {
        const cart = await medusa.store.cart.retrieve(existingCartId)
        if (cart) {
          return {
            id: cart.id,
            items: cart.items || [],
          }
        }
      } catch (error) {
        // Cart not found or expired, create new one
        console.log('Existing cart not found, creating new one')
      }
    }

    // Create new cart
    const newCart = await medusa.store.cart.create({
      region_id: process.env.NEXT_PUBLIC_MEDUSA_REGION_ID,
    })

    // Store cart ID
    if (typeof window !== 'undefined' && newCart.id) {
      localStorage.setItem(CART_ID_KEY, newCart.id)
    }

    return {
      id: newCart.id,
      items: [],
    }
  } catch (error) {
    console.error('Error getting/creating cart:', error)
    throw error
  }
}

/**
 * Add item to Medusa cart
 */
export async function addToCart(variantId: string, quantity: number = 1): Promise<any> {
  try {
    const cart = await getOrCreateCart()

    // Medusa v2 uses 'createLineItem' instead of 'addLineItem'
    const updatedCart = await medusa.store.cart.createLineItem(cart.id, {
      variant_id: variantId,
      quantity,
    })

    return {
      cart: updatedCart,
      success: true,
    }
  } catch (error) {
    console.error('Error adding to cart:', error)
    return {
      cart: null,
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add to cart',
    }
  }
}

/**
 * Update cart line item quantity
 */
export async function updateCartItem(lineItemId: string, quantity: number): Promise<any> {
  try {
    const cart = await getOrCreateCart()

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      return await removeFromCart(lineItemId)
    }

    const updatedCart = await medusa.store.cart.updateLineItem(cart.id, lineItemId, {
      quantity,
    })

    return {
      cart: updatedCart,
      success: true,
    }
  } catch (error) {
    console.error('Error updating cart item:', error)
    return {
      cart: null,
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update cart',
    }
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(lineItemId: string): Promise<any> {
  try {
    const cart = await getOrCreateCart()

    const updatedCart = await medusa.store.cart.deleteLineItem(cart.id, lineItemId)

    return {
      cart: updatedCart,
      success: true,
    }
  } catch (error) {
    console.error('Error removing from cart:', error)
    return {
      cart: null,
      success: false,
      error: error instanceof Error ? error.message : 'Failed to remove from cart',
    }
  }
}

/**
 * Clear entire cart
 */
export async function clearCart(): Promise<void> {
  try {
    const cart = await getOrCreateCart()

    // Remove all line items
    const items = cart.items || []
    await Promise.all(
      items.map((item: any) => medusa.store.cart.deleteLineItem(cart.id, item.id))
    )

    // Or create a new cart
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_ID_KEY)
    }
    await getOrCreateCart()
  } catch (error) {
    console.error('Error clearing cart:', error)
  }
}

/**
 * Get current cart
 */
export async function getCart(): Promise<any> {
  try {
    const cart = await getOrCreateCart()
    return cart
  } catch (error) {
    console.error('Error getting cart:', error)
    return { id: null, items: [] }
  }
}

/**
 * Complete cart and create order
 */
export async function completeCart(cartId: string): Promise<any> {
  try {
    const order = await medusa.store.cart.complete(cartId)

    // Clear local cart ID after successful order
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_ID_KEY)
    }

    return {
      order,
      success: true,
    }
  } catch (error) {
    console.error('Error completing cart:', error)
    return {
      order: null,
      success: false,
      error: error instanceof Error ? error.message : 'Failed to complete order',
    }
  }
}

/**
 * Transform Medusa cart to our CartItem format
 */
export function transformMedusaCartItems(medusaCart: any): any[] {
  if (!medusaCart || !medusaCart.items) return []

  return medusaCart.items.map((item: any) => ({
    id: item.id,
    productId: item.variant?.product_id || '',
    variantId: item.variant_id,
    name: item.title || '',
    imageUrl: item.thumbnail || item.variant?.product?.thumbnail || '',
    price: (item.unit_price || 0) / 100, // Medusa stores in cents
    quantity: item.quantity,
    currency: medusaCart.region?.currency_code?.toUpperCase() || 'INR',
  }))
}
