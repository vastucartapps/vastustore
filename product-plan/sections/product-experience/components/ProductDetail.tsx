import { useState, useRef } from 'react'
import {
  ChevronRight, Star, Heart, ShoppingCart, Minus, Plus,
  Truck, RotateCcw, ChevronLeft, Zap, ShieldCheck, Link2,
  Settings, Gem, Leaf,
} from 'lucide-react'
import type {
  ProductDetailProps, SwatchValue,
} from '../types'
import { ImageGallery } from './ImageGallery'
import { VariantSelector } from './VariantSelector'
import { RichContent } from './RichContent'
import { ReviewsSection } from './ReviewsSection'
import { QASection } from './QASection'

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

export function ProductDetail({
  product,
  images,
  variants,
  variantAttributes,
  richContent,
  specificationGroups,
  faqs,
  questions,
  reviews,
  ratingBreakdown,
  relatedProducts,
  breadcrumbs,
  onAddToCart,
  onToggleWishlist,
  onShare,
  onVariantChange,
  onAskQuestion,
  onProductClick,
  onQuickView,
  onBreadcrumbClick,
  onScrollToReviews,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description')
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    for (const attr of variantAttributes) {
      const val = variants[0]?.attributes[attr.name]
      if (val) init[attr.name] = val
    }
    return init
  })
  const reviewsRef = useRef<HTMLDivElement>(null)
  const relatedRef = useRef<HTMLDivElement>(null)

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

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' })
    onScrollToReviews?.()
  }

  const handleWishlist = () => {
    setWishlisted(!wishlisted)
    onToggleWishlist?.(product.id)
  }

  const scrollRelated = (dir: 'left' | 'right') => {
    if (relatedRef.current) {
      relatedRef.current.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' })
    }
  }

  return (
    <div style={{ background: c.bgPrimary, minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 mb-6 flex-wrap">
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5" style={{ color: c.earth300 }} />}
              {crumb.href ? (
                <button
                  onClick={() => onBreadcrumbClick?.(crumb.href!)}
                  className="text-sm transition-colors"
                  style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.primary500)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = c.earth400)}
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-sm font-medium" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* ═══ TOP SECTION: Gallery + Product Info ═══ */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="lg:w-[45%] flex-shrink-0">
            <ImageGallery images={images} />
          </div>

          {/* Product info */}
          <div className="flex-1">
            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl font-bold leading-snug"
              style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
            >
              {product.name}
            </h1>

            {/* Rating anchor */}
            <button
              onClick={scrollToReviews}
              className="flex items-center gap-2 mt-2 group"
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4"
                    fill={s <= Math.round(product.rating) ? '#F59E0B' : 'none'}
                    stroke={s <= Math.round(product.rating) ? '#F59E0B' : '#d1c9c0'}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: c.primary500 }}
              >
                {product.rating}
              </span>
              <span
                className="text-sm transition-colors"
                style={{ color: c.earth400 }}
                onMouseOver={(e) => (e.currentTarget.style.color = c.primary500)}
                onMouseOut={(e) => (e.currentTarget.style.color = c.earth400)}
              >
                ({product.reviewCount} reviews)
              </span>
            </button>

            {/* Short description */}
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
            >
              {product.shortDescription}
            </p>

            {/* Divider */}
            <div className="my-5 h-px" style={{ background: '#f0ebe4' }} />

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span
                className="text-3xl font-bold"
                style={{ color: c.primary500, fontFamily: "'Lora', serif" }}
              >
                ₹{(selectedVariant?.price ?? product.price).toLocaleString()}
              </span>
              <span
                className="text-base line-through"
                style={{ color: c.earth300 }}
              >
                ₹{(selectedVariant?.mrp ?? product.mrp).toLocaleString()}
              </span>
              <span
                className="text-sm font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: c.secondary500 }}
              >
                {discountPercent}% OFF
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
              Inclusive of all taxes
            </p>

            {/* Variants */}
            <div className="mt-5">
              <VariantSelector
                attributes={variantAttributes}
                selectedValues={selectedValues}
                onSelect={handleVariantSelect}
              />
            </div>

            {/* Stock status */}
            {selectedVariant && (
              <p
                className="text-sm font-medium mt-4"
                style={{
                  color: selectedVariant.inStock ? c.primary400 : c.secondary500,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                {selectedVariant.inStock
                  ? selectedVariant.stockCount <= 10
                    ? `Only ${selectedVariant.stockCount} left in stock!`
                    : 'In Stock'
                  : 'Out of Stock'}
              </p>
            )}

            {/* Delivery & return — 3-column info strip */}
            <div
              className="mt-5 rounded-2xl overflow-hidden"
              style={{ border: '1px solid #f0ebe4' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ divideColor: '#f0ebe4' }}>
                {/* Delivery */}
                <div className="flex items-center gap-3 p-4" style={{ background: c.bgCard }}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: c.primary50 }}
                  >
                    <Truck className="w-5 h-5" style={{ color: c.primary500 }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                      Delivery
                    </p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                      {product.deliveryEstimate}
                    </p>
                  </div>
                </div>

                {/* Express */}
                {product.expressShipping && (
                  <div className="flex items-center gap-3 p-4" style={{ background: c.bgCard }}>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${c.secondary500}12` }}
                    >
                      <Zap className="w-5 h-5" style={{ color: c.secondary500 }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                        Express
                      </p>
                      <p className="text-sm font-medium mt-0.5" style={{ color: c.secondary500, fontFamily: "'Open Sans', sans-serif" }}>
                        Fast Shipping Available
                      </p>
                    </div>
                  </div>
                )}

                {/* Returns */}
                <div className="flex items-center gap-3 p-4" style={{ background: c.bgCard }}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: c.primary50 }}
                  >
                    <RotateCcw className="w-5 h-5" style={{ color: c.primary500 }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                      Returns
                    </p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                      {product.returnPolicy}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity + Actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Quantity */}
              <div
                className="flex items-center rounded-xl overflow-hidden self-start"
                style={{ border: '1px solid #e8e0d8' }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 transition-colors"
                  style={{ color: c.earth400 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f0ea')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  className="px-4 py-3 text-sm font-semibold min-w-[44px] text-center"
                  style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 transition-colors"
                  style={{ color: c.earth400 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f0ea')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={() => onAddToCart?.(selectedVariant?.id || '', quantity)}
                disabled={!selectedVariant?.inStock}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-40"
                style={{
                  background: c.primary500,
                  fontFamily: "'Open Sans', sans-serif",
                }}
                onMouseEnter={(e) => { if (selectedVariant?.inStock) e.currentTarget.style.background = c.primary400 }}
                onMouseLeave={(e) => (e.currentTarget.style.background = c.primary500)}
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>

              {/* Wishlist */}
              <button
                onClick={handleWishlist}
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                style={{
                  border: `1px solid ${wishlisted ? c.secondary500 : '#e8e0d8'}`,
                  background: wishlisted ? `${c.secondary500}10` : 'transparent',
                }}
                onMouseEnter={(e) => { if (!wishlisted) e.currentTarget.style.borderColor = c.secondary300 }}
                onMouseLeave={(e) => { if (!wishlisted) e.currentTarget.style.borderColor = '#e8e0d8' }}
              >
                <Heart
                  className="w-5 h-5"
                  fill={wishlisted ? c.secondary500 : 'none'}
                  stroke={wishlisted ? c.secondary500 : c.earth400}
                />
              </button>
            </div>

            {/* Share */}
            <div className="mt-5 flex items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider mr-1" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                Share
              </span>
              {([
                { ch: 'whatsapp' as const, label: 'WhatsApp', icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                )},
                { ch: 'facebook' as const, label: 'Facebook', icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                )},
                { ch: 'pinterest' as const, label: 'Pinterest', icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
                )},
                { ch: 'copy' as const, label: 'Copy', icon: <Link2 className="w-4 h-4" /> },
              ]).map(({ ch, label, icon }) => (
                <button
                  key={ch}
                  onClick={() => onShare?.(ch)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    border: '1.5px solid #e8e0d8',
                    color: c.earth400,
                  }}
                  title={label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = c.primary400
                    e.currentTarget.style.color = c.primary500
                    e.currentTarget.style.background = c.primary50
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e8e0d8'
                    e.currentTarget.style.color = c.earth400
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>

            {/* SKU */}
            <p className="mt-4 text-xs" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
              SKU: {selectedVariant?.sku || product.sku}
            </p>
          </div>
        </div>

        {/* ═══ TABS: Description + Specifications ═══ */}
        <div className="mt-14">
          {/* Tab buttons */}
          <div
            className="inline-flex rounded-xl overflow-hidden"
            style={{ border: '1.5px solid #f0ebe4' }}
          >
            {(['description', 'specs'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 sm:px-8 py-3 text-sm font-semibold transition-all duration-200"
                style={{
                  color: activeTab === tab ? '#fff' : c.earth400,
                  background: activeTab === tab ? c.primary500 : 'transparent',
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                {tab === 'description' ? 'Description' : 'Specifications'}
              </button>
            ))}
          </div>

          <div
            className="mt-5 rounded-2xl p-6 sm:p-8"
            style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
          >
            {activeTab === 'description' && (
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif", lineHeight: 1.8 }}
              >
                {product.description}
              </p>
            )}

            {activeTab === 'specs' && (() => {
              const groupIcons: Record<string, React.ReactNode> = {
                'General': <Settings className="w-4.5 h-4.5" style={{ color: c.primary500 }} />,
                'Chakra Stones': <Gem className="w-4.5 h-4.5" style={{ color: c.primary500 }} />,
                'Care & Usage': <Leaf className="w-4.5 h-4.5" style={{ color: c.primary500 }} />,
              }
              return (
                <div className="space-y-8">
                  {specificationGroups.map((group) => (
                    <div key={group.groupName}>
                      <h4
                        className="text-sm font-bold mb-3 flex items-center gap-2.5"
                        style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: c.primary50 }}
                        >
                          {groupIcons[group.groupName] || <Settings className="w-4.5 h-4.5" style={{ color: c.primary500 }} />}
                        </span>
                        {group.groupName}
                      </h4>
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{ border: '1px solid #f0ebe4' }}
                      >
                        {group.specs.map((spec, idx) => (
                          <div
                            key={spec.key}
                            className="flex"
                            style={{
                              background: idx % 2 === 0 ? c.bgCard : c.bgPrimary,
                              borderBottom: idx < group.specs.length - 1 ? '1px solid #f0ebe4' : 'none',
                            }}
                          >
                            <span
                              className="w-44 sm:w-56 flex-shrink-0 px-5 py-3 text-sm font-bold"
                              style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                            >
                              {spec.key}
                            </span>
                            <span
                              className="px-5 py-3 text-sm"
                              style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                            >
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>
        </div>

        {/* ═══ RICH PRODUCT CONTENT (A+) ═══ */}
        {richContent.length > 0 && (
          <div className="mt-8">
            <RichContent blocks={richContent} />
          </div>
        )}

        {/* ═══ FAQ & Q&A ═══ */}
        <div className="mt-12">
          <QASection
            faqs={faqs}
            questions={questions}
            onAskQuestion={onAskQuestion}
          />
        </div>

        {/* ═══ REVIEWS ═══ */}
        <div className="mt-12" ref={reviewsRef}>
          <ReviewsSection
            reviews={reviews}
            ratingBreakdown={ratingBreakdown}
          />
        </div>

        {/* ═══ RELATED PRODUCTS ═══ */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 mb-8">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
              <h2
                className="text-xl sm:text-2xl font-bold text-center px-4"
                style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
              >
                You May Also Like
              </h2>
              <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
            </div>

            <div className="flex items-center justify-end gap-2 mb-4">
              <button
                onClick={() => scrollRelated('left')}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ border: '1.5px solid #e8e0d8' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary400; e.currentTarget.style.background = c.primary50 }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e8e0d8'; e.currentTarget.style.background = 'transparent' }}
              >
                <ChevronLeft className="w-4 h-4" style={{ color: c.earth400 }} />
              </button>
              <button
                onClick={() => scrollRelated('right')}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ border: '1.5px solid #e8e0d8' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary400; e.currentTarget.style.background = c.primary50 }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e8e0d8'; e.currentTarget.style.background = 'transparent' }}
              >
                <ChevronRight className="w-4 h-4" style={{ color: c.earth400 }} />
              </button>
            </div>

            <div
              ref={relatedRef}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollbarWidth: 'none' }}
            >
              {relatedProducts.map((rp) => {
                const rpDiscount = Math.round(((rp.mrp - rp.price) / rp.mrp) * 100)
                return (
                  <div
                    key={rp.id}
                    className="flex-shrink-0 w-60 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-200 hover:shadow-md"
                    style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
                    onClick={() => onProductClick?.(rp.slug)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={rp.imageUrl}
                        alt={rp.name}
                        className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {rp.isNew && (
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                            style={{ background: c.primary500 }}
                          >
                            New
                          </span>
                        )}
                        {rpDiscount > 0 && (
                          <span
                            className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                            style={{ background: c.secondary500 }}
                          >
                            {rpDiscount}% OFF
                          </span>
                        )}
                      </div>
                      {!rp.inStock && (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ background: 'rgba(255,251,245,0.75)' }}
                        >
                          <span
                            className="text-xs font-bold px-4 py-1.5 rounded-full text-white"
                            style={{ background: c.earth400 }}
                          >
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p
                        className="text-sm font-semibold line-clamp-2 leading-snug"
                        style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        {rp.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className="w-3.5 h-3.5"
                              fill={s <= Math.round(rp.rating) ? '#F59E0B' : 'none'}
                              stroke={s <= Math.round(rp.rating) ? '#F59E0B' : '#d1c9c0'}
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-medium" style={{ color: c.earth300 }}>
                          ({rp.reviewCount})
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2.5 mt-2.5">
                        <span
                          className="text-lg font-bold"
                          style={{ color: c.primary500, fontFamily: "'Lora', serif" }}
                        >
                          ₹{rp.price.toLocaleString()}
                        </span>
                        <span className="text-xs line-through" style={{ color: c.earth300 }}>
                          ₹{rp.mrp.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
