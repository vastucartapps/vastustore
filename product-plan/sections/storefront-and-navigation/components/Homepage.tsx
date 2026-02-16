import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star, Truck, Shield, RefreshCw, BadgeCheck, ArrowRight, Send } from 'lucide-react'
import type { HomepageProps, ProductCard as ProductCardType, DealProduct } from '../types'
import { ProductCard } from './ProductCard'

const c = {
  primary500: '#013f47',
  primary400: '#2a7a72',
  primary200: '#71c1ae',
  primary100: '#c5e8e2',
  primary50: '#e8f5f3',
  secondary500: '#c85103',
  secondary300: '#fd8630',
  secondary100: '#ffc187',
  secondary50: '#fff5ed',
  bgPrimary: '#fffbf5',
  bgCard: '#ffffff',
  bgSubtle: '#f5dfbb',
  earth300: '#a39585',
  earth400: '#75615a',
  earth600: '#5a4f47',
  earth700: '#433b35',
  gradientAccent: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
  gradientPrimary: 'linear-gradient(135deg, #013f47, #054348)',
  gradientSaffron: 'linear-gradient(135deg, #c85103, #fd8630)',
}

const trustIcons: Record<string, typeof Truck> = {
  truck: Truck,
  shield: Shield,
  refresh: RefreshCw,
  'badge-check': BadgeCheck,
}

function useCountdown(expiresAt: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = new Date(expiresAt).getTime() - Date.now()
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [expiresAt])
  return timeLeft
}

function ProductCarousel({
  title,
  products,
  onProductClick,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
}: {
  title: string
  products: ProductCardType[]
  onProductClick?: (slug: string) => void
  onQuickView?: (id: string) => void
  onAddToCart?: (id: string) => void
  onToggleWishlist?: (id: string) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.offsetWidth * 0.7
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="w-10 h-[3px] rounded-full mb-3" style={{ background: c.gradientAccent }} />
            <h2
              className="text-2xl sm:text-3xl font-semibold"
              style={{ fontFamily: "'Lora', serif", color: c.primary500 }}
            >
              {title}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all border"
              style={{ borderColor: '#e8e0d8', color: c.earth400 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = c.primary500; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = c.primary500 }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = c.earth400; e.currentTarget.style.borderColor = '#e8e0d8' }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all border"
              style={{ borderColor: '#e8e0d8', color: c.earth400 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = c.primary500; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = c.primary500 }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = c.earth400; e.currentTarget.style.borderColor = '#e8e0d8' }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-[220px] sm:w-[240px] flex-shrink-0 snap-start">
              <ProductCard
                product={product}
                onProductClick={onProductClick}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DealCard({ deal, onProductClick }: { deal: DealProduct; onProductClick?: (slug: string) => void }) {
  const t = useCountdown(deal.expiresAt)
  return (
    <div
      className="flex-shrink-0 w-[280px] sm:w-[300px] rounded-xl overflow-hidden snap-start cursor-pointer group"
      style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
      onClick={() => onProductClick?.(deal.slug)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={deal.imageUrl} alt={deal.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: c.secondary500, fontFamily: "'Open Sans', sans-serif" }}
        >
          {deal.discountPercent}% OFF
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-sm font-medium line-clamp-1" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
          {deal.name}
        </h4>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold" style={{ color: c.secondary500, fontFamily: "'Open Sans', sans-serif" }}>
            ₹{deal.price.toLocaleString()}
          </span>
          <span className="text-xs line-through" style={{ color: c.earth300 }}>₹{deal.mrp.toLocaleString()}</span>
        </div>
        {/* Countdown */}
        <div className="flex gap-2 mt-3">
          {[
            { v: t.days, l: 'D' },
            { v: t.hours, l: 'H' },
            { v: t.minutes, l: 'M' },
            { v: t.seconds, l: 'S' },
          ].map(({ v, l }) => (
            <div
              key={l}
              className="flex-1 text-center py-1.5 rounded-lg"
              style={{ background: c.primary50 }}
            >
              <div className="text-sm font-bold" style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}>
                {String(v).padStart(2, '0')}
              </div>
              <div className="text-[9px] uppercase tracking-wider" style={{ color: c.earth300 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Homepage({
  announcement,
  heroSlides,
  categories,
  featuredProducts,
  newArrivals,
  bestsellers,
  deals,
  testimonials,
  trustBadges,
  onHeroCtaClick,
  onCategoryClick,
  onProductClick,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  onNewsletterSubscribe,
}: HomepageProps) {
  const [heroIndex, setHeroIndex] = useState(0)
  const [heroFade, setHeroFade] = useState(true)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const dealsScrollRef = useRef<HTMLDivElement>(null)

  // Hero auto-rotation
  useEffect(() => {
    if (heroSlides.length <= 1) return
    const id = setInterval(() => {
      setHeroFade(false)
      setTimeout(() => {
        setHeroIndex((i) => (i + 1) % heroSlides.length)
        setHeroFade(true)
      }, 500)
    }, 5000)
    return () => clearInterval(id)
  }, [heroSlides.length])

  const hero = heroSlides[heroIndex]

  return (
    <div style={{ background: c.bgPrimary }}>
      {/* ═══ HERO SLIDER ═══ */}
      <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url(${hero?.imageUrl})`, opacity: heroFade ? 1 : 0 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(1,63,71,0.88) 0%, rgba(1,63,71,0.6) 50%, rgba(1,63,71,0.3) 100%)' }}
        />
        {/* Diamond pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
          <div
            className="max-w-xl transition-opacity duration-700"
            style={{ opacity: heroFade ? 1 : 0 }}
          >
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {hero?.heading}
            </h1>
            <p
              className="mt-4 text-base sm:text-lg leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Open Sans', sans-serif" }}
            >
              {hero?.subtext}
            </p>
            <button
              onClick={() => onHeroCtaClick?.(hero?.ctaLink || '')}
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
              style={{ background: c.gradientSaffron, fontFamily: "'Open Sans', sans-serif" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(200,81,3,0.35)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              {hero?.ctaLabel} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setHeroFade(false); setTimeout(() => { setHeroIndex(idx); setHeroFade(true) }, 300) }}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: idx === heroIndex ? 36 : 12,
                  background: idx === heroIndex ? c.gradientSaffron : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATEGORY GRID ═══ */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="w-10 h-[3px] rounded-full mx-auto mb-3" style={{ background: c.gradientAccent }} />
            <h2
              className="text-2xl sm:text-3xl font-semibold"
              style={{ fontFamily: "'Lora', serif", color: c.primary500 }}
            >
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => onCategoryClick?.(cat.slug)}
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(180deg, rgba(1,63,71,0.1) 0%, rgba(1,63,71,0.6) 50%, rgba(1,63,71,0.92) 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3
                    className="text-base font-semibold text-white"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Open Sans', sans-serif" }}>
                    {cat.productCount} products
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <ProductCarousel
        title="Featured Products"
        products={featuredProducts}
        onProductClick={onProductClick}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
      />

      {/* ═══ DEALS ═══ */}
      {deals.length > 0 && (
        <section className="py-10 sm:py-14" style={{ background: c.secondary50 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="w-10 h-[3px] rounded-full mb-3" style={{ background: c.gradientSaffron }} />
                <h2
                  className="text-2xl sm:text-3xl font-semibold"
                  style={{ fontFamily: "'Lora', serif", color: c.secondary500 }}
                >
                  Deals & Offers
                </h2>
                <p className="text-sm mt-1" style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}>
                  Limited time — grab them before they're gone
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => dealsScrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all"
                  style={{ borderColor: c.secondary100, color: c.secondary500 }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => dealsScrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all"
                  style={{ borderColor: c.secondary100, color: c.secondary500 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              ref={dealsScrollRef}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none' }}
            >
              {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} onProductClick={onProductClick} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ NEW ARRIVALS ═══ */}
      <ProductCarousel
        title="New Arrivals"
        products={newArrivals}
        onProductClick={onProductClick}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
      />

      {/* ═══ TRUST BADGES ═══ */}
      <section className="py-10 border-y" style={{ borderColor: '#f0ebe4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge) => {
              const Icon = trustIcons[badge.icon] || Shield
              return (
                <div key={badge.id} className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: c.primary50 }}
                  >
                    <Icon className="w-5 h-5" style={{ color: c.primary500 }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                      {badge.label}
                    </p>
                    <p className="text-xs" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                      {badge.sublabel}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ BESTSELLERS ═══ */}
      <ProductCarousel
        title="Bestsellers"
        products={bestsellers}
        onProductClick={onProductClick}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
      />

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-10 sm:py-14" style={{ background: c.primary50 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="w-10 h-[3px] rounded-full mx-auto mb-3" style={{ background: c.gradientAccent }} />
            <h2
              className="text-2xl sm:text-3xl font-semibold"
              style={{ fontFamily: "'Lora', serif", color: c.primary500 }}
            >
              What Our Customers Say
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="relative rounded-xl p-6"
                style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
              >
                {/* Gradient accent top */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-b"
                  style={{ background: c.gradientAccent }}
                />
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5"
                      fill={s <= t.rating ? '#F59E0B' : 'none'}
                      stroke={s <= t.rating ? '#F59E0B' : '#d1c9c0'}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed line-clamp-4"
                  style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                >
                  "{t.quote}"
                </p>
                <div className="mt-4 pt-3 border-t" style={{ borderColor: '#f0ebe4' }}>
                  <p className="text-sm font-semibold" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                    {t.location}
                    {t.productName && <> · <span style={{ color: c.primary400 }}>{t.productName}</span></>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="py-12 sm:py-16" style={{ background: c.gradientPrimary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-white"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Stay Connected with VastuCart
          </h2>
          <p
            className="mt-2 text-sm sm:text-base"
            style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Open Sans', sans-serif" }}
          >
            Get exclusive offers, new arrivals, and Vastu tips delivered to your inbox
          </p>
          {subscribed ? (
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <BadgeCheck className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Thank you for subscribing!
              </span>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) { onNewsletterSubscribe?.(email); setSubscribed(true) } }}
              className="mt-6 flex gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontFamily: "'Open Sans', sans-serif",
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-all"
                style={{ background: c.gradientSaffron, fontFamily: "'Open Sans', sans-serif" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(200,81,3,0.4)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                Subscribe <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
