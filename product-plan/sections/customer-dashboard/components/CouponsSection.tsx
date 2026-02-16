import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import type { Coupon } from '../types'

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

interface CouponsSectionProps {
  coupons: Coupon[]
  onCopyCoupon?: (code: string) => void
}

export function CouponsSection({ coupons, onCopyCoupon }: CouponsSectionProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'expired'>('active')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const activeCoupons = coupons.filter(c => c.isActive)
  const expiredCoupons = coupons.filter(c => !c.isActive)

  const handleCopy = (code: string) => {
    onCopyCoupon?.(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 1500)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const displayedCoupons = activeTab === 'active' ? activeCoupons : expiredCoupons

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '3px', background: c.gradientAccent }} />
          <h2 style={{
            fontFamily: "'Lora', serif",
            fontSize: '1.875rem',
            fontWeight: '600',
            color: c.earth700,
            margin: 0,
          }}>
            My Coupons
          </h2>
          <div style={{ flex: 1, height: '3px', background: c.gradientAccent }} />
        </div>

        {/* Tab Toggle */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => setActiveTab('active')}
            style={{
              backgroundColor: activeTab === 'active' ? c.primary500 : 'transparent',
              color: activeTab === 'active' ? 'white' : c.earth600,
              border: `1.5px solid ${activeTab === 'active' ? c.primary500 : c.earth300}`,
              borderRadius: '9999px',
              padding: '0.625rem 1.5rem',
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '0.9375rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'active') {
                e.currentTarget.style.borderColor = c.primary400
                e.currentTarget.style.color = c.primary500
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'active') {
                e.currentTarget.style.borderColor = c.earth300
                e.currentTarget.style.color = c.earth600
              }
            }}
          >
            Active ({activeCoupons.length})
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            style={{
              backgroundColor: activeTab === 'expired' ? c.primary500 : 'transparent',
              color: activeTab === 'expired' ? 'white' : c.earth600,
              border: `1.5px solid ${activeTab === 'expired' ? c.primary500 : c.earth300}`,
              borderRadius: '9999px',
              padding: '0.625rem 1.5rem',
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '0.9375rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'expired') {
                e.currentTarget.style.borderColor = c.primary400
                e.currentTarget.style.color = c.primary500
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'expired') {
                e.currentTarget.style.borderColor = c.earth300
                e.currentTarget.style.color = c.earth600
              }
            }}
          >
            Expired ({expiredCoupons.length})
          </button>
        </div>
      </div>

      {/* Coupons List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        {displayedCoupons.map((coupon) => (
          <div
            key={coupon.id}
            style={{
              backgroundColor: c.bgCard,
              border: `2px dashed ${coupon.isActive ? c.primary400 : c.earth300}`,
              borderRadius: '1rem',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              position: 'relative',
              opacity: coupon.isActive ? 1 : 0.6,
              transition: 'all 0.2s',
            }}
          >
            {/* Discount Badge */}
            <div style={{
              minWidth: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: coupon.discountType === 'percentage' ? c.primary500 : c.secondary500,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'white',
                lineHeight: 1,
              }}>
                {coupon.discountType === 'percentage' ? `${coupon.discount}%` : `₹${coupon.discount}`}
              </div>
              <div style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '0.75rem',
                fontWeight: '600',
                color: 'white',
                marginTop: '0.25rem',
              }}>
                OFF
              </div>
            </div>

            {/* Coupon Details */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '1.125rem',
                fontWeight: '700',
                color: c.earth700,
                letterSpacing: '0.05em',
                marginBottom: '0.5rem',
              }}>
                {coupon.code}
              </div>
              <div style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '0.9375rem',
                color: c.earth600,
                marginBottom: '0.75rem',
                lineHeight: '1.5',
              }}>
                {coupon.description}
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '0.8125rem',
                color: c.earth400,
              }}>
                <div>
                  Min order: <span style={{ fontWeight: '600', color: c.earth600 }}>₹{coupon.minOrderValue.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  Valid until: <span style={{ fontWeight: '600', color: c.earth600 }}>{formatDate(coupon.validUntil)}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div style={{ flexShrink: 0 }}>
              {coupon.isActive ? (
                <button
                  onClick={() => handleCopy(coupon.code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: copiedCode === coupon.code ? c.primary500 : 'transparent',
                    color: copiedCode === coupon.code ? 'white' : c.primary500,
                    border: `1.5px solid ${c.primary500}`,
                    borderRadius: '0.75rem',
                    padding: '0.75rem 1.25rem',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    minWidth: '100px',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    if (copiedCode !== coupon.code) {
                      e.currentTarget.style.backgroundColor = c.primary50
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (copiedCode !== coupon.code) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check size={16} strokeWidth={2.5} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              ) : (
                <div style={{
                  backgroundColor: c.earth300,
                  color: 'white',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1.25rem',
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  minWidth: '100px',
                  textAlign: 'center',
                }}>
                  Expired
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {displayedCoupons.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1rem',
          color: c.earth400,
        }}>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '1rem',
          }}>
            {activeTab === 'active'
              ? 'No active coupons available'
              : 'No expired coupons'}
          </p>
        </div>
      )}
    </div>
  )
}
