"use client"

import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/store'
import { CartDrawer } from './CartDrawer'
import { transformToComponentCartItem, calculateSubtotal, getDefaultCurrency } from '@/lib/cart-utils'

/**
 * Container component that connects CartDrawer to Zustand store
 * Handles data transformation and callback wiring
 */
export function CartDrawerContainer() {
  const router = useRouter()
  const {
    items: storeItems,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCartStore()

  // Transform store items to component items
  const componentItems = storeItems.map(item =>
    transformToComponentCartItem(item, {
      // TODO: Fetch additional product data from Medusa if needed
      // For now, use defaults from transformer
    })
  )

  const subtotal = calculateSubtotal(storeItems)
  const currency = getDefaultCurrency()

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    await updateQuantity(itemId, quantity)
  }

  const handleRemoveItem = async (itemId: string) => {
    await removeItem(itemId)
  }

  const handleProceedToCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  const handleViewProduct = (slug: string) => {
    closeCart()
    router.push(`/product/${slug}`)
  }

  return (
    <CartDrawer
      items={componentItems}
      subtotal={subtotal}
      currency={currency}
      isOpen={isOpen}
      onClose={closeCart}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onProceedToCheckout={handleProceedToCheckout}
      onViewProduct={handleViewProduct}
    />
  )
}
