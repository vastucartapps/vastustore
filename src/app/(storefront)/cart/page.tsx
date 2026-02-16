"use client"

import { useRouter } from 'next/navigation'
import { useState, useMemo, useEffect } from 'react'
import { useCartStore } from '@/lib/store'
import { CartPage } from '@/components/storefront'
import { transformToComponentCartItem, calculateSubtotal, calculateTotalSavings, getDefaultCurrency } from '@/lib/cart-utils'
import type { OrderSummary, AppliedCoupon, GiftCardBalance, PrepaidDiscount, EmptyCartState, Coupon } from '@/components/storefront/types'

export default function CartPageRoute() {
  const router = useRouter()
  const { items: storeItems, updateQuantity, removeItem } = useCartStore()

  // State for coupons and gift cards
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)
  const [giftCardBalance, setGiftCardBalance] = useState<GiftCardBalance | null>(null)
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([])
  const [prepaidDiscount, setPrepaidDiscount] = useState<PrepaidDiscount>({
    enabled: true,
    percentage: 5,
    maxDiscount: 500,
    label: 'Save 5% on prepaid orders',
  })

  // Fetch coupons and prepaid discount config on mount
  useEffect(() => {
    async function fetchCartData() {
      try {
        // Fetch available coupons
        const couponsRes = await fetch('/api/coupons/active')
        if (couponsRes.ok) {
          const data = await couponsRes.json()
          setAvailableCoupons(data.coupons || [])
        }

        // Fetch prepaid discount config
        const prepaidRes = await fetch('/api/config/prepaid-discount')
        if (prepaidRes.ok) {
          const data = await prepaidRes.json()
          const config = data.config
          setPrepaidDiscount({
            enabled: config.is_enabled,
            percentage: config.discount_percentage,
            maxDiscount: config.max_discount_amount,
            label: config.label,
          })
        }
      } catch (error) {
        console.error('Error fetching cart data:', error)
      }
    }

    fetchCartData()
  }, [])

  // Transform store items to component items
  const componentItems = storeItems.map(item =>
    transformToComponentCartItem(item)
  )

  const currency = getDefaultCurrency()

  // Calculate order summary
  const orderSummary: OrderSummary = useMemo(() => {
    const subtotal = calculateSubtotal(storeItems)
    const mrpTotal = componentItems.reduce((total, item) => total + item.mrp * item.quantity, 0)
    const totalSavings = calculateTotalSavings(componentItems)
    const couponDiscount = appliedCoupon?.discountAmount || 0
    const giftCardApplied = giftCardBalance?.appliedAmount || 0

    // Prepaid discount will be calculated at checkout (not on cart page)
    const prepaidDiscount = 0

    // Shipping and tax will be calculated at checkout
    const shippingFee = 0
    const codFee = 0
    const taxAmount = 0

    const grandTotal = Math.max(0, subtotal - couponDiscount - giftCardApplied)

    return {
      subtotal,
      mrpTotal,
      totalSavings,
      couponDiscount,
      giftCardApplied,
      prepaidDiscount,
      shippingFee,
      codFee,
      taxAmount,
      grandTotal,
      currency,
      itemCount: storeItems.length,
    }
  }, [storeItems, componentItems, appliedCoupon, giftCardBalance, currency])

  const emptyCartState: EmptyCartState = {
    title: 'Your cart is empty',
    description: 'Add some items to your cart to get started',
    ctaLabel: 'Continue Shopping',
    ctaHref: '/',
  }

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    await updateQuantity(itemId, quantity)
  }

  const handleRemoveItem = async (itemId: string) => {
    await removeItem(itemId)
  }

  const handleApplyCoupon = async (code: string) => {
    try {
      // Apply coupon to Medusa cart
      // Note: Medusa promotions will be fully integrated when promotions module is configured
      // For now, validate against available coupons and apply discount locally
      const coupon = availableCoupons.find(c => c.code.toLowerCase() === code.toLowerCase())

      if (!coupon) {
        alert('Invalid coupon code')
        return
      }

      // Calculate discount amount based on type
      const subtotal = calculateSubtotal(storeItems)
      let discountAmount = 0

      if (coupon.discountType === 'flat') {
        discountAmount = coupon.discountValue
      } else {
        // Percentage discount
        discountAmount = (subtotal * coupon.discountValue) / 100
        if (coupon.maxDiscount) {
          discountAmount = Math.min(discountAmount, coupon.maxDiscount)
        }
      }

      setAppliedCoupon({
        code: coupon.code,
        discountAmount: Math.round(discountAmount),
        description: coupon.description,
      })
    } catch (error) {
      console.error('Error applying coupon:', error)
      alert('Failed to apply coupon. Please try again.')
    }
  }

  const handleRemoveCoupon = async () => {
    setAppliedCoupon(null)
  }

  const handleApplyGiftCard = async (code: string) => {
    try {
      // Validate gift card
      const response = await fetch('/api/gift-cards/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (!response.ok || !data.valid) {
        alert(data.error || 'Invalid gift card')
        return
      }

      // Calculate how much to apply (can't exceed order total)
      const appliedAmount = Math.min(data.balance, orderSummary.grandTotal)

      setGiftCardBalance({
        code: data.code,
        balance: data.balance,
        appliedAmount,
        currency: data.currency,
      })
    } catch (error) {
      console.error('Error applying gift card:', error)
      alert('Failed to apply gift card. Please try again.')
    }
  }

  const handleProceedToCheckout = () => {
    router.push('/checkout')
  }

  const handleViewProduct = (slug: string) => {
    router.push(`/product/${slug}`)
  }

  const handleContinueShopping = () => {
    router.push('/')
  }

  return (
    <CartPage
      items={componentItems}
      orderSummary={orderSummary}
      availableCoupons={availableCoupons}
      appliedCoupon={appliedCoupon}
      giftCardBalance={giftCardBalance}
      prepaidDiscount={prepaidDiscount}
      emptyCartState={emptyCartState}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
      onApplyCoupon={handleApplyCoupon}
      onRemoveCoupon={handleRemoveCoupon}
      onApplyGiftCard={handleApplyGiftCard}
      onProceedToCheckout={handleProceedToCheckout}
      onViewProduct={handleViewProduct}
      onContinueShopping={handleContinueShopping}
    />
  )
}
