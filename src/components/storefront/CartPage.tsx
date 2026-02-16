import { useState } from 'react'
import {
  Minus, Plus, Trash2, ShoppingBag, Tag, Gift, ChevronDown,
  ChevronRight, Copy, Check, Sparkles, ArrowRight, ArrowLeft,
} from 'lucide-react'
import type { CartPageProps, Coupon } from './types'

const c = {
  primary500: '#013f47',
  primary400: '#2a7a72',
  primary50: '#e8f5f3',
  secondary500: '#c85103',
  secondary300: '#fd8630',
  bgPrimary: '#fffbf5',
  bgCard: '#ffffff',
  earth300: '#a39585',
  earth400: '#75615a',
  earth600: '#5a4f47',
  earth700: '#433b35',
  gradientAccent: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
}

function formatPrice(amount: number, currency: 'INR' | 'USD') {
  return currency === 'INR'
    ? `₹${amount.toLocaleString('en-IN')}`
    : `$${amount.toLocaleString('en-US')}`
}

function CouponCard({ coupon, onApply }: { coupon: Coupon; onApply: (code: string) => void }) {
  const [copied, setCopied] = useState(false)
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl transition-all"
      style={{
        background: coupon.isApplicable ? c.bgPrimary : '#fafaf8',
        border: `1px dashed ${coupon.isApplicable ? c.primary400 + '60' : '#e8e0d8'}`,
        opacity: coupon.isApplicable ? 1 : 0.6,
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: coupon.isApplicable ? `${c.primary500}12` : '#f0ebe4' }}
      >
        <Tag className="w-4 h-4" style={{ color: coupon.isApplicable ? c.primary500 : c.earth300 }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold tracking-wider"
            style={{ color: c.primary500, fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {coupon.code}
          </span>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(coupon.code)
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            }}
            className="w-5 h-5 flex items-center justify-center"
          >
            {copied ? (
              <Check className="w-3 h-3" style={{ color: c.primary500 }} />
            ) : (
              <Copy className="w-3 h-3" style={{ color: c.earth300 }} />
            )}
          </button>
        </div>
        <p
          className="text-xs mt-0.5"
          style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
        >
          {coupon.description}
        </p>
      </div>
      {coupon.isApplicable && (
        <button
          onClick={() => onApply(coupon.code)}
          className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex-shrink-0"
          style={{
            background: c.primary500,
            color: '#fff',
            fontFamily: "'Open Sans', sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = c.primary400)}
          onMouseLeave={(e) => (e.currentTarget.style.background = c.primary500)}
        >
          Apply
        </button>
      )}
    </div>
  )
}

export function CartPage({
  items,
  orderSummary,
  availableCoupons,
  appliedCoupon,
  giftCardBalance,
  prepaidDiscount,
  emptyCartState,
  onUpdateQuantity,
  onRemoveItem,
  onApplyCoupon,
  onRemoveCoupon,
  onApplyGiftCard,
  onProceedToCheckout,
  onViewProduct,
  onContinueShopping,
}: CartPageProps) {
  const [couponInput, setCouponInput] = useState('')
  const [giftCardInput, setGiftCardInput] = useState('')
  const [showCoupons, setShowCoupons] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const isEmpty = items.length === 0

  const handleRemove = (id: string) => {
    setRemovingId(id)
    setTimeout(() => {
      onRemoveItem?.(id)
      setRemovingId(null)
    }, 300)
  }

  if (isEmpty) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: '#f5f0ea' }}
        >
          <ShoppingBag className="w-11 h-11" style={{ color: c.earth300 }} />
        </div>
        <h1
          className="text-2xl font-bold mb-3"
          style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
        >
          {emptyCartState.title}
        </h1>
        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
        >
          {emptyCartState.description}
        </p>
        <button
          onClick={() => onContinueShopping?.()}
          className="px-8 py-3 rounded-xl text-sm font-bold text-white transition-all"
          style={{
            background: c.gradientAccent,
            fontFamily: "'Open Sans', sans-serif",
            boxShadow: '0 4px 14px rgba(1, 63, 71, 0.25)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          {emptyCartState.ctaLabel}
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onContinueShopping?.()}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ border: '1px solid #e8e0d8', color: c.earth400 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f0ea')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
          >
            Shopping Cart
          </h1>
          <span
            className="text-sm px-3 py-1 rounded-full"
            style={{
              background: c.primary50,
              color: c.primary500,
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 600,
            }}
          >
            {orderSummary.itemCount} {orderSummary.itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ═══ Left: Cart Items ═══ */}
        <div className="flex-1 min-w-0">
          <div className="space-y-4">
            {items.map((item) => {
              const isRemoving = removingId === item.id
              const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100)
              return (
                <div
                  key={item.id}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: c.bgCard,
                    border: '1px solid #f0ebe4',
                    opacity: isRemoving ? 0 : 1,
                    transform: isRemoving ? 'translateX(-100%)' : 'translateX(0)',
                  }}
                >
                  <div className="flex gap-4 sm:gap-6 p-4 sm:p-5">
                    {/* Image */}
                    <button
                      onClick={() => onViewProduct?.(item.productSlug)}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 transition-transform hover:scale-105"
                      style={{ border: '1px solid #f0ebe4' }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </button>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <button
                            onClick={() => onViewProduct?.(item.productSlug)}
                            className="text-left"
                          >
                            <h3
                              className="text-sm sm:text-base font-bold leading-tight"
                              style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                            >
                              {item.productName}
                            </h3>
                          </button>
                          <p
                            className="text-xs mt-1"
                            style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}
                          >
                            Variant: {item.variantLabel}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                          style={{ color: c.earth300 }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fef2f2'
                            e.currentTarget.style.color = '#ef4444'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.color = c.earth300
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <span
                          className="text-base font-bold"
                          style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                        >
                          {formatPrice(item.price, item.currency)}
                        </span>
                        {item.mrp > item.price && (
                          <>
                            <span
                              className="text-xs line-through"
                              style={{ color: c.earth300 }}
                            >
                              {formatPrice(item.mrp, item.currency)}
                            </span>
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: `${c.secondary500}15`, color: c.secondary500 }}
                            >
                              {discount}% OFF
                            </span>
                          </>
                        )}
                      </div>

                      {/* Quantity + Line total row */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) onUpdateQuantity?.(item.id, item.quantity - 1)
                            }}
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            style={{
                              border: '1px solid #e8e0d8',
                              background: c.bgCard,
                              color: item.quantity <= 1 ? c.earth300 : c.earth600,
                              opacity: item.quantity <= 1 ? 0.5 : 1,
                            }}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span
                            className="w-10 text-center text-sm font-semibold"
                            style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              if (item.quantity < item.maxQuantity) onUpdateQuantity?.(item.id, item.quantity + 1)
                            }}
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            style={{
                              border: '1px solid #e8e0d8',
                              background: c.bgCard,
                              color: item.quantity >= item.maxQuantity ? c.earth300 : c.earth600,
                              opacity: item.quantity >= item.maxQuantity ? 0.5 : 1,
                            }}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span
                          className="text-base font-bold"
                          style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                        >
                          {formatPrice(item.price * item.quantity, item.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Continue Shopping link */}
          <button
            onClick={() => onContinueShopping?.()}
            className="flex items-center gap-2 mt-6 text-sm font-semibold transition-colors"
            style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c.primary400)}
            onMouseLeave={(e) => (e.currentTarget.style.color = c.primary500)}
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>
        </div>

        {/* ═══ Right: Order Summary ═══ */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div
            className="rounded-2xl overflow-hidden lg:sticky lg:top-24"
            style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
          >
            <div className="h-1" style={{ background: c.gradientAccent }} />

            <div className="p-5 sm:p-6">
              <h2
                className="text-lg font-bold mb-5"
                style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
              >
                Order Summary
              </h2>

              {/* Coupon section */}
              <div className="mb-5">
                {appliedCoupon ? (
                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: c.primary50, border: `1px solid ${c.primary400}30` }}
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" style={{ color: c.primary500 }} />
                      <span
                        className="text-xs font-bold tracking-wider"
                        style={{ color: c.primary500, fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {appliedCoupon.code}
                      </span>
                      <span className="text-xs" style={{ color: c.earth400 }}>
                        applied
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveCoupon?.()}
                      className="text-xs font-semibold transition-colors"
                      style={{ color: '#ef4444', fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        border: '1.5px solid #e8e0d8',
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: c.earth700,
                        background: c.bgPrimary,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = c.primary400
                        e.currentTarget.style.boxShadow = `0 0 0 3px ${c.primary500}10`
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e8e0d8'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    />
                    <button
                      onClick={() => {
                        if (couponInput.trim()) {
                          onApplyCoupon?.(couponInput.trim())
                          setCouponInput('')
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: couponInput.trim() ? c.primary500 : c.earth300,
                        color: '#fff',
                        fontFamily: "'Open Sans', sans-serif",
                      }}
                      onMouseEnter={(e) => {
                        if (couponInput.trim()) e.currentTarget.style.background = c.primary400
                      }}
                      onMouseLeave={(e) => {
                        if (couponInput.trim()) e.currentTarget.style.background = c.primary500
                      }}
                    >
                      Apply
                    </button>
                  </div>
                )}

                {/* Available coupons expandable */}
                {!appliedCoupon && availableCoupons.length > 0 && (
                  <div className="mt-3">
                    <button
                      onClick={() => setShowCoupons(!showCoupons)}
                      className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                      style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {availableCoupons.length} coupons available
                      <ChevronDown
                        className="w-3.5 h-3.5 transition-transform duration-200"
                        style={{ transform: showCoupons ? 'rotate(180deg)' : 'rotate(0)' }}
                      />
                    </button>
                    {showCoupons && (
                      <div className="mt-3 space-y-2">
                        {availableCoupons.map((cp) => (
                          <CouponCard
                            key={cp.id}
                            coupon={cp}
                            onApply={(code) => {
                              onApplyCoupon?.(code)
                              setShowCoupons(false)
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Gift card section */}
              <div className="mb-5">
                {giftCardBalance ? (
                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: `${c.secondary500}08`, border: `1px solid ${c.secondary500}20` }}
                  >
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4" style={{ color: c.secondary500 }} />
                      <div>
                        <span
                          className="text-xs font-bold block"
                          style={{ color: c.earth700, fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          {giftCardBalance.code}
                        </span>
                        <span className="text-[10px]" style={{ color: c.earth300 }}>
                          Balance: {formatPrice(giftCardBalance.balance, giftCardBalance.currency)}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-sm font-bold"
                      style={{ color: c.secondary500 }}
                    >
                      -{formatPrice(giftCardBalance.appliedAmount, giftCardBalance.currency)}
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={giftCardInput}
                      onChange={(e) => setGiftCardInput(e.target.value.toUpperCase())}
                      placeholder="Gift card code"
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        border: '1.5px solid #e8e0d8',
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: c.earth700,
                        background: c.bgPrimary,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = c.secondary500
                        e.currentTarget.style.boxShadow = `0 0 0 3px ${c.secondary500}10`
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e8e0d8'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    />
                    <button
                      onClick={() => {
                        if (giftCardInput.trim()) {
                          onApplyGiftCard?.(giftCardInput.trim())
                          setGiftCardInput('')
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: giftCardInput.trim() ? c.secondary500 : c.earth300,
                        color: '#fff',
                        fontFamily: "'Open Sans', sans-serif",
                      }}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px mb-4" style={{ background: '#f0ebe4' }} />

              {/* Price breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  <span style={{ color: c.earth400 }}>Subtotal (MRP)</span>
                  <span style={{ color: c.earth300, textDecoration: 'line-through' }}>
                    {formatPrice(orderSummary.mrpTotal, orderSummary.currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  <span style={{ color: c.earth400 }}>Subtotal</span>
                  <span className="font-semibold" style={{ color: c.earth700 }}>
                    {formatPrice(orderSummary.subtotal, orderSummary.currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  <span style={{ color: '#16a34a' }}>Product Savings</span>
                  <span className="font-semibold" style={{ color: '#16a34a' }}>
                    -{formatPrice(orderSummary.totalSavings, orderSummary.currency)}
                  </span>
                </div>
                {orderSummary.couponDiscount > 0 && (
                  <div className="flex justify-between text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    <span style={{ color: c.primary500 }}>Coupon Discount</span>
                    <span className="font-semibold" style={{ color: c.primary500 }}>
                      -{formatPrice(orderSummary.couponDiscount, orderSummary.currency)}
                    </span>
                  </div>
                )}
                {orderSummary.giftCardApplied > 0 && (
                  <div className="flex justify-between text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    <span style={{ color: c.secondary500 }}>Gift Card</span>
                    <span className="font-semibold" style={{ color: c.secondary500 }}>
                      -{formatPrice(orderSummary.giftCardApplied, orderSummary.currency)}
                    </span>
                  </div>
                )}
                {orderSummary.shippingFee > 0 ? (
                  <div className="flex justify-between text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    <span style={{ color: c.earth400 }}>Shipping</span>
                    <span className="font-semibold" style={{ color: c.earth700 }}>
                      {formatPrice(orderSummary.shippingFee, orderSummary.currency)}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    <span style={{ color: c.earth400 }}>Shipping</span>
                    <span className="font-semibold" style={{ color: '#16a34a' }}>FREE</span>
                  </div>
                )}
              </div>

              {/* Prepaid discount badge */}
              {prepaidDiscount.enabled && (
                <div
                  className="flex items-center gap-2 mt-4 p-3 rounded-xl"
                  style={{ background: c.primary50, border: `1px solid ${c.primary400}25` }}
                >
                  <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: c.primary500 }} />
                  <span
                    className="text-xs font-medium"
                    style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {prepaidDiscount.label}
                  </span>
                </div>
              )}

              {/* Grand total */}
              <div className="h-px my-4" style={{ background: c.gradientAccent }} />
              <div className="flex justify-between items-center mb-5">
                <span
                  className="text-base font-bold"
                  style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                >
                  Grand Total
                </span>
                <span
                  className="text-xl font-bold"
                  style={{ color: c.primary500, fontFamily: "'Lora', serif" }}
                >
                  {formatPrice(orderSummary.grandTotal, orderSummary.currency)}
                </span>
              </div>

              {/* Total savings callout */}
              <div
                className="rounded-xl p-3 mb-5 text-center"
                style={{ background: '#f0fdf4' }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: '#16a34a', fontFamily: "'Open Sans', sans-serif" }}
                >
                  You save {formatPrice(
                    orderSummary.totalSavings + orderSummary.couponDiscount + orderSummary.giftCardApplied,
                    orderSummary.currency
                  )} on this order!
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={() => onProceedToCheckout?.()}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  background: c.gradientAccent,
                  fontFamily: "'Open Sans', sans-serif",
                  boxShadow: '0 4px 14px rgba(1, 63, 71, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(1, 63, 71, 0.35)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(1, 63, 71, 0.25)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
