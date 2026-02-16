import { useState } from 'react'
import { X, Heart, Bell, Star } from 'lucide-react'
import type { WishlistItem } from './types'

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

interface WishlistGridProps {
  items: WishlistItem[]
  onAddToCart?: (productId: string) => void
  onRemoveFromWishlist?: (itemId: string) => void
  onNotifyMe?: (productId: string) => void
  onViewProduct?: (slug: string) => void
}

export function WishlistGrid({
  items,
  onAddToCart,
  onRemoveFromWishlist,
  onNotifyMe,
  onViewProduct,
}: WishlistGridProps) {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)

  const renderStars = (rating: number) => {
    return (
      <div style={{ display: 'flex', gap: '0.125rem' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            fill={star <= rating ? c.secondary500 : 'none'}
            stroke={star <= rating ? c.secondary500 : c.earth300}
            strokeWidth={1.5}
          />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ flex: 1, height: '3px', background: c.gradientAccent }} />
            <h2 style={{
              fontFamily: "'Lora', serif",
              fontSize: '1.875rem',
              fontWeight: '600',
              color: c.earth700,
              margin: 0,
            }}>
              My Wishlist
            </h2>
            <div style={{ flex: 1, height: '3px', background: c.gradientAccent }} />
          </div>
        </div>

        {/* Empty State */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1rem',
          textAlign: 'center',
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: c.primary50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}>
            <Heart size={48} stroke={c.primary400} strokeWidth={1.5} />
          </div>
          <h3 style={{
            fontFamily: "'Lora', serif",
            fontSize: '1.5rem',
            fontWeight: '600',
            color: c.earth700,
            marginBottom: '0.75rem',
          }}>
            Your wishlist is empty
          </h3>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '1rem',
            color: c.earth600,
            marginBottom: '2rem',
            maxWidth: '400px',
          }}>
            Save your favorite items here and shop them later
          </p>
          <button
            style={{
              backgroundColor: c.primary500,
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              padding: '0.875rem 2rem',
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = c.primary400
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = c.primary500
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
          <div style={{ flex: 1, height: '3px', background: c.gradientAccent }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h2 style={{
              fontFamily: "'Lora', serif",
              fontSize: '1.875rem',
              fontWeight: '600',
              color: c.earth700,
              margin: 0,
            }}>
              My Wishlist
            </h2>
            <div style={{
              backgroundColor: c.primary50,
              color: c.primary500,
              padding: '0.375rem 0.875rem',
              borderRadius: '9999px',
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '0.875rem',
              fontWeight: '600',
            }}>
              {items.length}
            </div>
          </div>
          <div style={{ flex: 1, height: '3px', background: c.gradientAccent }} />
        </div>
      </div>

      {/* Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
      }}
      className="md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => setHoveredItemId(null)}
            style={{
              backgroundColor: c.bgCard,
              border: `1px solid #e8e0d8`,
              borderRadius: '1rem',
              overflow: 'hidden',
              position: 'relative',
              transition: 'all 0.2s',
              cursor: 'pointer',
              ...(hoveredItemId === item.id ? {
                borderColor: c.primary400,
                boxShadow: `0 8px 24px rgba(1, 63, 71, 0.12)`,
                transform: 'translateY(-4px)',
              } : {}),
            }}
          >
            {/* Image Container */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                overflow: 'hidden',
                backgroundColor: c.bgPrimary,
              }}
              onClick={() => onViewProduct?.(item.productSlug)}
            >
              <img
                src={item.imageUrl}
                alt={item.productName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s',
                  ...(hoveredItemId === item.id ? { transform: 'scale(1.05)' } : {}),
                }}
              />

              {/* Discount Badge */}
              {(item.mrp > item.price) && (
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  backgroundColor: c.secondary500,
                  color: 'white',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: '700',
                }}>
                  {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                </div>
              )}

              {/* Remove Button */}
              {hoveredItemId === item.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveFromWishlist?.(item.id)
                  }}
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = c.secondary500
                    const icon = e.currentTarget.querySelector('svg') as SVGElement
                    if (icon) icon.style.stroke = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                    const icon = e.currentTarget.querySelector('svg') as SVGElement
                    if (icon) icon.style.stroke = c.earth700
                  }}
                >
                  <X size={16} stroke={c.earth700} strokeWidth={2} />
                </button>
              )}

              {/* Out of Stock Overlay */}
              {!item.inStock && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onNotifyMe?.(item.id)
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: 'white',
                      color: c.secondary500,
                      border: `1.5px solid ${c.secondary500}`,
                      borderRadius: '0.75rem',
                      padding: '0.75rem 1.5rem',
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = c.secondary500
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white'
                      e.currentTarget.style.color = c.secondary500
                    }}
                  >
                    <Bell size={16} />
                    Notify Me
                  </button>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div style={{ padding: '1rem' }}>
              {/* Product Name */}
              <h3
                onClick={() => onViewProduct?.(item.productSlug)}
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  color: c.earth700,
                  marginBottom: '0.5rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '1.4',
                  minHeight: '2.625rem',
                }}
              >
                {item.productName}
              </h3>

              {/* Rating */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}>
                {renderStars(item.rating)}
                <span style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '0.8125rem',
                  color: c.earth400,
                }}>
                  ({item.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: c.primary500,
                }}>
                  ₹{item.price.toLocaleString('en-IN')}
                </div>
                {item.mrp > item.price && (
                  <div style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.875rem',
                    color: c.earth400,
                    textDecoration: 'line-through',
                  }}>
                    MRP ₹{item.mrp.toLocaleString('en-IN')}
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (item.inStock) {
                    onAddToCart?.(item.id)
                  }
                }}
                disabled={!item.inStock}
                style={{
                  width: '100%',
                  backgroundColor: item.inStock ? c.primary500 : c.earth300,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  padding: '0.75rem',
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: item.inStock ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  opacity: item.inStock ? 1 : 0.6,
                }}
                onMouseEnter={(e) => {
                  if (item.inStock) {
                    e.currentTarget.style.backgroundColor = c.primary400
                  }
                }}
                onMouseLeave={(e) => {
                  if (item.inStock) {
                    e.currentTarget.style.backgroundColor = c.primary500
                  }
                }}
              >
                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
