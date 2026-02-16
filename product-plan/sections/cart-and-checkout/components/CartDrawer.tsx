import { useState } from 'react'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import type { CartDrawerProps } from '../types'

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

export function CartDrawer({
  items,
  subtotal,
  currency,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onViewProduct,
}: CartDrawerProps) {
  const [removingId, setRemovingId] = useState<string | null>(null)

  const handleRemove = (id: string) => {
    setRemovingId(id)
    setTimeout(() => {
      onRemoveItem?.(id)
      setRemovingId(null)
    }, 300)
  }

  const isEmpty = items.length === 0
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300"
          style={{ background: 'rgba(67, 59, 53, 0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => onClose?.()}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 z-50 h-full flex flex-col transition-transform duration-400 ease-out"
        style={{
          width: '100%',
          maxWidth: 440,
          background: c.bgPrimary,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: isOpen ? '-8px 0 30px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        {/* Gradient accent top */}
        <div className="h-1 flex-shrink-0" style={{ background: c.gradientAccent }} />

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #f0ebe4' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: c.primary50 }}
            >
              <ShoppingBag className="w-5 h-5" style={{ color: c.primary500 }} />
            </div>
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
              >
                Your Cart
              </h2>
              <span
                className="text-xs"
                style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}
              >
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
          <button
            onClick={() => onClose?.()}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: c.earth400 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f0ea')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: 'thin' }}>
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: '#f5f0ea' }}
              >
                <ShoppingBag className="w-9 h-9" style={{ color: c.earth300 }} />
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
              >
                Your cart is empty
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif", lineHeight: 1.6 }}
              >
                Explore our collection and find the perfect piece for your space.
              </p>
              <button
                onClick={() => onClose?.()}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = c.primary400)}
                onMouseLeave={(e) => (e.currentTarget.style.background = c.primary500)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
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
                      transform: isRemoving ? 'translateX(100%)' : 'translateX(0)',
                    }}
                  >
                    <div className="flex gap-4 p-4">
                      {/* Image */}
                      <button
                        onClick={() => onViewProduct?.(item.productSlug)}
                        className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-transform hover:scale-105"
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
                        <button
                          onClick={() => onViewProduct?.(item.productSlug)}
                          className="text-left"
                        >
                          <h4
                            className="text-sm font-semibold leading-tight line-clamp-2"
                            style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                          >
                            {item.productName}
                          </h4>
                        </button>
                        <p
                          className="text-xs mt-1"
                          style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}
                        >
                          {item.variantLabel}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className="text-sm font-bold"
                            style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                          >
                            {formatPrice(item.price, item.currency)}
                          </span>
                          {item.mrp > item.price && (
                            <>
                              <span
                                className="text-xs line-through"
                                style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}
                              >
                                {formatPrice(item.mrp, item.currency)}
                              </span>
                              <span
                                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                                style={{ background: `${c.secondary500}15`, color: c.secondary500 }}
                              >
                                {discount}% OFF
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors self-start"
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
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div
                      className="flex items-center justify-between px-4 py-2.5"
                      style={{ borderTop: '1px solid #f0ebe4', background: c.bgPrimary }}
                    >
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
                        className="text-sm font-bold"
                        style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        {formatPrice(item.price * item.quantity, item.currency)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div
            className="flex-shrink-0 px-6 py-5"
            style={{ borderTop: '1px solid #f0ebe4', background: c.bgCard }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-sm font-medium"
                style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
              >
                Subtotal
              </span>
              <span
                className="text-lg font-bold"
                style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
              >
                {formatPrice(subtotal, currency)}
              </span>
            </div>
            <p
              className="text-xs mb-4 text-center"
              style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}
            >
              Shipping & taxes calculated at checkout
            </p>
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
        )}
      </div>
    </>
  )
}
