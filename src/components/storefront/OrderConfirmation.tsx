import { useState, useRef } from 'react'
import {
  CheckCircle, Download, ShoppingBag, Star, ChevronLeft, ChevronRight,
  Mail, Phone, MapPin, CreditCard, Calendar, Package, Heart,
} from 'lucide-react'
import type { OrderConfirmationProps, RelatedProduct } from './types'

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

function ProductCard({
  product,
  onClick,
}: {
  product: RelatedProduct
  onClick?: () => void
}) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)
  return (
    <button
      onClick={onClick}
      className="w-56 sm:w-60 flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-200 text-left group"
      style={{
        background: c.bgCard,
        border: '1px solid #f0ebe4',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(1, 63, 71, 0.1)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span
            className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full text-white"
            style={{ background: c.secondary500 }}
          >
            {discount}% OFF
          </span>
        )}
        {product.isNew && (
          <span
            className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full text-white"
            style={{ background: c.primary500 }}
          >
            NEW
          </span>
        )}
      </div>
      <div className="p-4">
        <h4
          className="text-sm font-bold leading-tight line-clamp-2 mb-2"
          style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
        >
          {product.name}
        </h4>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="w-3 h-3"
                fill={s <= Math.round(product.rating) ? '#f59e0b' : 'none'}
                style={{ color: s <= Math.round(product.rating) ? '#f59e0b' : c.earth300 }}
              />
            ))}
          </div>
          <span className="text-[10px]" style={{ color: c.earth300 }}>
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-bold"
            style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
          >
            {formatPrice(product.price, product.currency)}
          </span>
          {product.mrp > product.price && (
            <span
              className="text-xs line-through"
              style={{ color: c.earth300 }}
            >
              {formatPrice(product.mrp, product.currency)}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export function OrderConfirmation({
  confirmation,
  relatedProducts,
  onDownloadInvoice,
  onContinueShopping,
  onProductClick,
}: OrderConfirmationProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -280 : 280,
        behavior: 'smooth',
      })
    }
  }

  const conf = confirmation

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* ═══ Success header ═══ */}
      <div className="text-center mb-10">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: '#f0fdf4' }}
        >
          <CheckCircle className="w-10 h-10" style={{ color: '#16a34a' }} />
        </div>
        <h1
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
        >
          Thank You for Your Order!
        </h1>
        <p
          className="text-sm"
          style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
        >
          Your sacred treasures are on their way to you
        </p>
      </div>

      {/* ═══ Order details card ═══ */}
      <div
        className="rounded-2xl overflow-hidden mb-8"
        style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
      >
        <div className="h-1" style={{ background: c.gradientAccent }} />
        <div className="p-5 sm:p-7">
          {/* Order ID + Date row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs block mb-1" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                Order Number
              </span>
              <span
                className="text-base font-bold"
                style={{ color: c.primary500, fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {conf.orderId}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs block mb-1" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                Order Date
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
              >
                {new Date(conf.orderDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Info grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl mb-6"
            style={{ background: c.bgPrimary }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${c.primary500}10` }}
              >
                <Package className="w-4 h-4" style={{ color: c.primary500 }} />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold block" style={{ color: c.earth300 }}>
                  Delivery
                </span>
                <span className="text-sm font-semibold" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                  {conf.estimatedDelivery}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${c.primary500}10` }}
              >
                <CreditCard className="w-4 h-4" style={{ color: c.primary500 }} />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold block" style={{ color: c.earth300 }}>
                  Payment
                </span>
                <span className="text-sm font-semibold" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                  {conf.paymentMethod}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${c.primary500}10` }}
              >
                <MapPin className="w-4 h-4" style={{ color: c.primary500 }} />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold block" style={{ color: c.earth300 }}>
                  Shipping To
                </span>
                <span className="text-sm font-semibold" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                  {conf.shippingAddress}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${c.secondary500}10` }}
              >
                <IndianRupeeIcon />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold block" style={{ color: c.earth300 }}>
                  Total Paid
                </span>
                <span
                  className="text-base font-bold"
                  style={{ color: c.primary500, fontFamily: "'Lora', serif" }}
                >
                  {formatPrice(conf.totalPaid, conf.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div
            className="rounded-xl p-4 mb-6"
            style={{ background: c.primary50, border: `1px solid ${c.primary400}20` }}
          >
            <p
              className="text-xs leading-relaxed"
              style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
            >
              <span className="font-bold">Confirmation sent!</span> We've sent order details to{' '}
              <span className="font-semibold">{conf.email}</span> and{' '}
              <span className="font-semibold">{conf.phone}</span>.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onDownloadInvoice?.()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                border: `1.5px solid ${c.primary500}`,
                color: c.primary500,
                fontFamily: "'Open Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = c.primary50
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <Download className="w-4 h-4" /> Download Invoice
            </button>
            <button
              onClick={() => onContinueShopping?.()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{
                background: c.primary500,
                fontFamily: "'Open Sans', sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = c.primary400)}
              onMouseLeave={(e) => (e.currentTarget.style.background = c.primary500)}
            >
              <ShoppingBag className="w-4 h-4" /> Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* ═══ Related Products Carousel ═══ */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
            <h2
              className="text-xl sm:text-2xl font-bold text-center px-4"
              style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
            >
              You May Also Like
            </h2>
            <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
          </div>

          <div className="relative">
            {/* Scroll arrows */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hidden sm:flex"
              style={{
                background: c.bgCard,
                border: '1px solid #f0ebe4',
                color: c.earth400,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = c.primary50
                e.currentTarget.style.color = c.primary500
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = c.bgCard
                e.currentTarget.style.color = c.earth400
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hidden sm:flex"
              style={{
                background: c.bgCard,
                border: '1px solid #f0ebe4',
                color: c.earth400,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = c.primary50
                e.currentTarget.style.color = c.primary500
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = c.bgCard
                e.currentTarget.style.color = c.earth400
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={() => onProductClick?.(p.slug)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function IndianRupeeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.secondary500} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3c3.5 0 6-2.5 6-5H6" />
    </svg>
  )
}
