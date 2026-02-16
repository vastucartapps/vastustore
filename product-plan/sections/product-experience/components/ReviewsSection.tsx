import { useState } from 'react'
import { Star, CheckCircle, ChevronDown, Camera } from 'lucide-react'
import type { ProductReview, RatingBreakdown } from '../types'

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

interface ReviewsSectionProps {
  reviews: ProductReview[]
  ratingBreakdown: RatingBreakdown
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{ width: size, height: size }}
          fill={s <= rating ? '#F59E0B' : 'none'}
          stroke={s <= rating ? '#F59E0B' : '#d1c9c0'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function ReviewsSection({ reviews, ratingBreakdown }: ReviewsSectionProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest')
  const [sortOpen, setSortOpen] = useState(false)

  const sorted = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'highest': return b.rating - a.rating
      case 'lowest': return a.rating - b.rating
      default: return 0
    }
  })

  const sortLabels: Record<string, string> = {
    newest: 'Newest First',
    oldest: 'Oldest First',
    highest: 'Highest Rated',
    lowest: 'Lowest Rated',
  }

  return (
    <div id="reviews-section">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
        <h2
          className="text-xl sm:text-2xl font-bold text-center px-4"
          style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
        >
          Customer Reviews
        </h2>
        <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
      </div>

      {/* Rating breakdown card */}
      <div
        className="rounded-2xl overflow-hidden mb-8"
        style={{ border: '1px solid #f0ebe4' }}
      >
        <div className="h-1" style={{ background: c.gradientAccent }} />
        <div
          className="p-6 sm:p-8 flex flex-col sm:flex-row gap-8 items-center"
          style={{ background: c.bgCard }}
        >
          {/* Average score */}
          <div className="text-center sm:pr-10 sm:border-r flex-shrink-0" style={{ borderColor: '#f0ebe4' }}>
            <p
              className="text-5xl font-bold"
              style={{ color: c.primary500, fontFamily: "'Lora', serif" }}
            >
              {ratingBreakdown.average}
            </p>
            <div className="mt-2">
              <StarRow rating={Math.round(ratingBreakdown.average)} size={18} />
            </div>
            <p
              className="text-sm mt-2 font-medium"
              style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
            >
              Based on {ratingBreakdown.total} reviews
            </p>
          </div>

          {/* Bar chart */}
          <div className="flex-1 w-full space-y-2.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingBreakdown.distribution[String(star)] || 0
              const pct = ratingBreakdown.total > 0 ? (count / ratingBreakdown.total) * 100 : 0
              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12 flex-shrink-0 justify-end">
                    <span
                      className="text-sm font-medium"
                      style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {star}
                    </span>
                    <Star className="w-3.5 h-3.5" fill="#F59E0B" stroke="#F59E0B" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: '#f0ebe4' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: star >= 4
                          ? c.primary400
                          : star === 3
                          ? c.secondary300
                          : c.secondary500,
                      }}
                    />
                  </div>
                  <span
                    className="text-sm w-10 flex-shrink-0 font-medium"
                    style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {count}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Sort bar */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-medium" style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}>
          Showing {sorted.length} of {ratingBreakdown.total} reviews
        </p>
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              border: '1.5px solid #e8e0d8',
              color: c.earth600,
              background: c.bgCard,
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            {sortLabels[sortBy]}
            <ChevronDown
              className="w-3.5 h-3.5 transition-transform duration-200"
              style={{
                color: c.earth300,
                transform: sortOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>
          {sortOpen && (
            <div
              className="absolute right-0 z-50 mt-1.5 w-44 rounded-xl overflow-hidden py-1"
              style={{
                background: c.bgCard,
                border: '1px solid #f0ebe4',
                boxShadow: '0 8px 24px rgba(67,59,53,0.12)',
              }}
            >
              {Object.entries(sortLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setSortBy(key as typeof sortBy); setSortOpen(false) }}
                  className="w-full px-4 py-2.5 text-sm text-left transition-colors"
                  style={{
                    background: key === sortBy ? c.primary50 : 'transparent',
                    color: key === sortBy ? c.primary500 : c.earth600,
                    fontWeight: key === sortBy ? 600 : 400,
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                  onMouseEnter={(e) => { if (key !== sortBy) e.currentTarget.style.background = c.bgPrimary }}
                  onMouseLeave={(e) => { if (key !== sortBy) e.currentTarget.style.background = 'transparent' }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Individual reviews */}
      <div className="space-y-4">
        {sorted.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl overflow-hidden transition-shadow hover:shadow-sm"
            style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
          >
            <div className="p-5 sm:p-6">
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    style={{ background: c.primary50, color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {review.reviewerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {review.reviewerName}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs" style={{ color: c.earth300 }}>
                        {review.reviewerLocation}
                      </span>
                      <span className="text-xs" style={{ color: c.earth300 }}>·</span>
                      <span className="text-xs" style={{ color: c.earth300 }}>
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                {review.isVerifiedPurchase && (
                  <span
                    className="flex items-center gap-1 text-[11px] font-semibold flex-shrink-0 px-2.5 py-1 rounded-full"
                    style={{ background: c.primary50, color: c.primary500 }}
                  >
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>

              {/* Rating + title */}
              <div className="mt-3 flex items-center gap-3">
                <StarRow rating={review.rating} size={15} />
                <span
                  className="text-sm font-bold"
                  style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                >
                  {review.title}
                </span>
              </div>

              {/* Variant badge */}
              <span
                className="inline-block mt-2 text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: '#f5f0ea', color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
              >
                {review.variant}
              </span>

              {/* Body */}
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif", lineHeight: 1.7 }}
              >
                {review.text}
              </p>

              {/* Review photos */}
              {review.photos.length > 0 && (
                <div className="flex gap-2.5 mt-4">
                  {review.photos.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative w-20 h-20 rounded-xl overflow-hidden group cursor-pointer"
                      style={{ border: '1px solid #f0ebe4' }}
                    >
                      <img src={url} alt="Review photo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                        <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
