import { useRef } from 'react'
import {
  Package, Award, Heart, Tag, ChevronRight, ChevronLeft,
  Sparkles, Copy, ArrowRight, Star,
} from 'lucide-react'
import type {
  UserProfile, DashboardStats, Order, DashboardSection,
  NewArrival, DashboardOffer,
} from './types'

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

interface DashboardHomeProps {
  userProfile: UserProfile
  stats: DashboardStats
  recentOrders: Order[]
  newArrivals: NewArrival[]
  offers: DashboardOffer[]
  onViewOrder?: (orderId: string) => void
  onNavigate?: (section: DashboardSection) => void
  onViewProduct?: (slug: string) => void
}

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

const statusColors: Record<string, { bg: string; label: string }> = {
  delivered: { bg: '#16a34a', label: 'Delivered' },
  in_transit: { bg: c.primary500, label: 'In Transit' },
  shipped: { bg: c.primary400, label: 'Shipped' },
  processing: { bg: '#f59e0b', label: 'Processing' },
  cancelled: { bg: '#ef4444', label: 'Cancelled' },
  returned: { bg: c.secondary500, label: 'Returned' },
  accepted: { bg: c.primary400, label: 'Accepted' },
}

const badgeColors: Record<string, { bg: string; text: string }> = {
  primary: { bg: c.primary500, text: '#fff' },
  secondary: { bg: c.secondary500, text: '#fff' },
  green: { bg: '#16a34a', text: '#fff' },
}

export function DashboardHome({
  userProfile,
  stats,
  recentOrders,
  newArrivals,
  offers,
  onViewOrder,
  onNavigate,
  onViewProduct,
}: DashboardHomeProps) {
  const firstName = userProfile.name.split(' ')[0]
  const arrivalsRef = useRef<HTMLDivElement>(null)

  const scrollArrivals = (dir: 'left' | 'right') => {
    arrivalsRef.current?.scrollBy({ left: dir === 'left' ? -240 : 240, behavior: 'smooth' })
  }

  const statCards: { id: DashboardSection; label: string; value: number; icon: typeof Package; iconBg: string }[] = [
    { id: 'orders', label: 'Total Orders', value: stats.totalOrders, icon: Package, iconBg: c.primary500 },
    { id: 'loyalty', label: 'Loyalty Points', value: stats.loyaltyPoints, icon: Award, iconBg: c.secondary500 },
    { id: 'wishlist', label: 'Wishlist Items', value: stats.wishlistItems, icon: Heart, iconBg: '#e11d48' },
    { id: 'coupons', label: 'Active Coupons', value: stats.activeCoupons, icon: Tag, iconBg: c.primary400 },
  ]

  return (
    <div>
      {/* ═══ Welcome ═══ */}
      <h1
        className="text-2xl sm:text-3xl font-bold mb-6"
        style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
      >
        Welcome back, {firstName}!
      </h1>

      {/* ═══ Stat Cards ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <button
              key={card.id}
              onClick={() => onNavigate?.(card.id)}
              className="text-left rounded-2xl overflow-hidden transition-all hover:shadow-lg group"
              style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
            >
              <div className="h-1" style={{ background: c.gradientAccent }} />
              <div className="p-4 sm:p-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: card.iconBg }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                >
                  {card.value.toLocaleString('en-IN')}
                </div>
                <div
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                >
                  {card.label}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* ═══ Active Offers & Special Deals ═══ */}
      {offers.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
            <h2
              className="text-xl sm:text-2xl font-bold text-center px-3 flex items-center gap-2"
              style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
            >
              <Sparkles className="w-5 h-5" style={{ color: c.secondary500 }} />
              Offers For You
            </h2>
            <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.map((offer) => {
              const badge = badgeColors[offer.badgeColor] || badgeColors.primary
              return (
                <div
                  key={offer.id}
                  className="rounded-2xl overflow-hidden transition-all hover:shadow-lg group"
                  style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
                >
                  {/* Offer image */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}
                    />
                    <span
                      className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: badge.bg, color: badge.text }}
                    >
                      {offer.badgeLabel}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3
                      className="text-sm font-bold mb-1.5"
                      style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                    >
                      {offer.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed mb-3"
                      style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {offer.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {offer.code && (
                        <div
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                          style={{ background: c.bgPrimary, border: '1px dashed #e8e0d8' }}
                        >
                          <span
                            className="text-[11px] font-bold tracking-wider"
                            style={{ color: c.primary500, fontFamily: "'IBM Plex Mono', monospace" }}
                          >
                            {offer.code}
                          </span>
                          <Copy className="w-3 h-3" style={{ color: c.earth300 }} />
                        </div>
                      )}
                      <button
                        className="flex items-center gap-1 text-xs font-semibold transition-colors ml-auto"
                        style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = c.primary400)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = c.primary500)}
                      >
                        {offer.ctaLabel} <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ═══ New Arrivals Carousel ═══ */}
      {newArrivals.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
            <h2
              className="text-xl sm:text-2xl font-bold text-center px-3"
              style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
            >
              New Arrivals
            </h2>
            <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
          </div>

          <div className="relative">
            <button
              onClick={() => scrollArrivals('left')}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hidden sm:flex"
              style={{ background: c.bgCard, border: '1px solid #f0ebe4', color: c.earth400, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = c.primary50; e.currentTarget.style.color = c.primary500 }}
              onMouseLeave={(e) => { e.currentTarget.style.background = c.bgCard; e.currentTarget.style.color = c.earth400 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollArrivals('right')}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hidden sm:flex"
              style={{ background: c.bgCard, border: '1px solid #f0ebe4', color: c.earth400, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = c.primary50; e.currentTarget.style.color = c.primary500 }}
              onMouseLeave={(e) => { e.currentTarget.style.background = c.bgCard; e.currentTarget.style.color = c.earth400 }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div
              ref={arrivalsRef}
              className="flex gap-4 overflow-x-auto pb-2"
              style={{ scrollbarWidth: 'none' }}
            >
              {newArrivals.map((item) => {
                const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100)
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewProduct?.(item.slug)}
                    className="w-48 sm:w-52 flex-shrink-0 rounded-2xl overflow-hidden text-left transition-all group"
                    style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(1,63,71,0.1)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span
                        className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: c.primary500 }}
                      >
                        {item.badge}
                      </span>
                      {discount > 0 && (
                        <span
                          className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                          style={{ background: c.secondary500 }}
                        >
                          {discount}% OFF
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <h4
                        className="text-xs font-bold leading-tight line-clamp-2 mb-2"
                        style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                      >
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-sm font-bold"
                          style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                        >
                          {formatPrice(item.price)}
                        </span>
                        {item.mrp > item.price && (
                          <span className="text-[10px] line-through" style={{ color: c.earth300 }}>
                            {formatPrice(item.mrp)}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ Recent Orders ═══ */}
      <div>
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
          <h2
            className="text-xl sm:text-2xl font-bold text-center px-3"
            style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
          >
            Recent Orders
          </h2>
          <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
        >
          <div className="h-1" style={{ background: c.gradientAccent }} />

          {recentOrders.length === 0 ? (
            <div
              className="p-8 text-center text-sm"
              style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
            >
              No orders yet
            </div>
          ) : (
            <div>
              {recentOrders.map((order, idx) => {
                const st = statusColors[order.status] || { bg: c.earth400, label: order.status }
                const isLast = idx === recentOrders.length - 1
                return (
                  <button
                    key={order.id}
                    onClick={() => onViewOrder?.(order.id)}
                    className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors"
                    style={{ borderBottom: isLast ? 'none' : '1px solid #f0ebe4' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = c.bgPrimary)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: c.earth300 }}>
                          Order
                        </div>
                        <div
                          className="text-xs font-semibold"
                          style={{ color: c.earth700, fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          {order.orderNumber}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: c.earth300 }}>
                          Date
                        </div>
                        <div className="text-xs font-semibold" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                          {formatDate(order.orderDate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: c.earth300 }}>
                          Items
                        </div>
                        <div className="text-xs font-semibold" style={{ color: c.earth700 }}>
                          {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: c.earth300 }}>
                          Total
                        </div>
                        <div className="text-xs font-bold" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                          {formatPrice(order.total)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wider"
                        style={{ background: st.bg }}
                      >
                        {st.label}
                      </span>
                      <ChevronRight className="w-4 h-4 hidden sm:block" style={{ color: c.earth300 }} />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {recentOrders.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate?.('orders')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: c.primary500, color: '#fff', fontFamily: "'Open Sans', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = c.primary400)}
              onMouseLeave={(e) => (e.currentTarget.style.background = c.primary500)}
            >
              View All Orders <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
