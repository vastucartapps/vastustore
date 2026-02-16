import { useState } from 'react'
import { X, Star, ShoppingCart, Minus, Plus, Truck } from 'lucide-react'
import { VariantSelector } from './VariantSelector'
import type { QuickViewProps, SwatchValue } from '../types'

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

export function QuickViewModal({
  product,
  images,
  variants,
  variantAttributes,
  isOpen,
  onClose,
  onAddToCart,
  onViewFullDetails,
  onVariantChange,
}: QuickViewProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    for (const attr of variantAttributes) {
      const val = variants[0]?.attributes[attr.name]
      if (val) init[attr.name] = val
    }
    return init
  })

  if (!isOpen) return null

  const primaryImage = images.find((img) => img.type === 'primary') || images[0]
  const discountPercent = selectedVariant
    ? Math.round(((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100)
    : product.discountPercent

  const handleVariantSelect = (attrName: string, value: string) => {
    const next = { ...selectedValues, [attrName]: value }
    setSelectedValues(next)
    const match = variants.find((v) =>
      Object.entries(next).every(([k, val]) => v.attributes[k] === val)
    )
    if (match) {
      setSelectedVariant(match)
      onVariantChange?.(match.id)
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[80] bg-black/40"
        onClick={onClose}
      />
      <div
        className="fixed inset-0 z-[81] flex items-center justify-center p-4"
      >
        <div
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
          style={{ background: c.bgCard }}
        >
          {/* Accent border top */}
          <div className="h-1 rounded-t-2xl" style={{ background: c.gradientAccent }} />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10"
            style={{ background: '#f5f0ea' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#e8e0d8')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#f5f0ea')}
          >
            <X className="w-4 h-4" style={{ color: c.earth600 }} />
          </button>

          <div className="flex flex-col sm:flex-row gap-5 p-5 sm:p-6">
            {/* Image */}
            <div className="sm:w-2/5 flex-shrink-0">
              <img
                src={primaryImage.url}
                alt={primaryImage.alt}
                className="w-full aspect-square object-cover rounded-xl"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3
                className="text-lg font-bold leading-snug"
                style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
              >
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5"
                      fill={s <= Math.round(product.rating) ? '#F59E0B' : 'none'}
                      stroke={s <= Math.round(product.rating) ? '#F59E0B' : '#d1c9c0'}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="text-xs" style={{ color: c.earth300 }}>
                  ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mt-3">
                <span
                  className="text-2xl font-bold"
                  style={{ color: c.primary500, fontFamily: "'Lora', serif" }}
                >
                  ₹{(selectedVariant?.price ?? product.price).toLocaleString()}
                </span>
                <span
                  className="text-sm line-through"
                  style={{ color: c.earth300 }}
                >
                  ₹{(selectedVariant?.mrp ?? product.mrp).toLocaleString()}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: c.secondary500 }}
                >
                  {discountPercent}% OFF
                </span>
              </div>

              {/* Variants */}
              <div className="mt-4">
                <VariantSelector
                  attributes={variantAttributes}
                  selectedValues={selectedValues}
                  onSelect={handleVariantSelect}
                />
              </div>

              {/* Stock */}
              {selectedVariant && !selectedVariant.inStock && (
                <p
                  className="text-sm font-medium mt-3"
                  style={{ color: c.secondary500, fontFamily: "'Open Sans', sans-serif" }}
                >
                  Out of Stock
                </p>
              )}

              {/* Express */}
              {product.expressShipping && (
                <div className="flex items-center gap-2 mt-3">
                  <Truck className="w-4 h-4" style={{ color: c.primary400 }} />
                  <span className="text-xs font-medium" style={{ color: c.primary500 }}>
                    Express Shipping Available
                  </span>
                </div>
              )}

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-3 mt-5">
                <div
                  className="flex items-center rounded-xl overflow-hidden"
                  style={{ border: '1px solid #e8e0d8' }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 transition-colors"
                    style={{ color: c.earth400 }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f0ea')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span
                    className="px-3 py-2 text-sm font-medium min-w-[36px] text-center"
                    style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 transition-colors"
                    style={{ color: c.earth400 }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f0ea')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => onAddToCart?.(selectedVariant?.id || '', quantity)}
                  disabled={!selectedVariant?.inStock}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-40"
                  style={{
                    background: c.primary500,
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                  onMouseEnter={(e) => { if (selectedVariant?.inStock) e.currentTarget.style.background = c.primary400 }}
                  onMouseLeave={(e) => (e.currentTarget.style.background = c.primary500)}
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </div>

              {/* View full details */}
              <button
                onClick={() => onViewFullDetails?.(product.slug)}
                className="w-full mt-3 py-2 rounded-xl text-sm font-medium transition-colors text-center"
                style={{
                  border: `1px solid ${c.primary500}`,
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
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
