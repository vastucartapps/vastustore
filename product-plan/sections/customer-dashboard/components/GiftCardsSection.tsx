import { Gift, Search } from 'lucide-react'
import { useState } from 'react'
import type { GiftCard } from '../types'

interface GiftCardsSectionProps {
  giftCards: GiftCard[]
  onCheckGiftCardBalance?: (code: string) => void
}

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

export function GiftCardsSection({ giftCards, onCheckGiftCardBalance }: GiftCardsSectionProps) {
  const [checkCode, setCheckCode] = useState('')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const handleCheckBalance = () => {
    if (checkCode.trim() && onCheckGiftCardBalance) {
      onCheckGiftCardBalance(checkCode.trim())
      setCheckCode('')
    }
  }

  return (
    <div>
      {/* Section Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ flex: 1, height: '2px', background: c.gradientAccent }} />
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: '24px', fontWeight: 700, color: c.earth700, margin: 0 }}>
            Gift Cards
          </h2>
          <div style={{ flex: 1, height: '2px', background: c.gradientAccent }} />
        </div>
      </div>

      {/* Check Balance Section */}
      <div style={{
        background: c.bgCard,
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        border: `1px solid ${c.primary50}`
      }}>
        <h3 style={{
          fontFamily: "'Lora', serif",
          fontSize: '18px',
          fontWeight: 700,
          color: c.earth700,
          marginBottom: '16px',
          marginTop: 0
        }}>
          Check Gift Card Balance
        </h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={checkCode}
            onChange={(e) => setCheckCode(e.target.value)}
            placeholder="Enter gift card code"
            style={{
              flex: 1,
              padding: '12px 16px',
              border: `1px solid ${c.primary50}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: "'IBM Plex Mono', monospace",
              color: c.earth700,
              background: c.bgPrimary,
              outline: 'none'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = c.primary500}
            onBlur={(e) => e.currentTarget.style.borderColor = c.primary50}
          />
          <button
            onClick={handleCheckBalance}
            disabled={!checkCode.trim()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: checkCode.trim() ? c.primary500 : c.earth300,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: "'Open Sans', sans-serif",
              cursor: checkCode.trim() ? 'pointer' : 'not-allowed',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => {
              if (checkCode.trim()) e.currentTarget.style.opacity = '0.9'
            }}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <Search size={16} />
            Check
          </button>
        </div>
      </div>

      {/* Gift Cards Display */}
      {giftCards.length === 0 ? (
        <div style={{
          background: c.bgCard,
          borderRadius: '16px',
          padding: '48px 32px',
          textAlign: 'center',
          border: `1px solid ${c.primary50}`
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: c.primary50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Gift size={32} style={{ color: c.primary500 }} />
          </div>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '14px',
            color: c.earth400,
            margin: 0
          }}>
            You don't have any gift cards yet
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {giftCards.map((card) => (
            <div
              key={card.id}
              style={{
                background: c.gradientAccent,
                borderRadius: '16px',
                padding: '32px 24px',
                color: '#ffffff',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              {/* Decorative Gift Icon */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                opacity: 0.2
              }}>
                <Gift size={48} />
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontSize: '12px',
                  fontFamily: "'Open Sans', sans-serif",
                  opacity: 0.9,
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Gift Card
                </div>

                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '24px',
                  fontWeight: 700,
                  marginBottom: '24px',
                  letterSpacing: '2px'
                }}>
                  {card.code}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  borderTop: '1px solid rgba(255,255,255,0.3)',
                  paddingTop: '16px'
                }}>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontFamily: "'Open Sans', sans-serif",
                      opacity: 0.9,
                      marginBottom: '4px'
                    }}>
                      Balance
                    </div>
                    <div style={{
                      fontFamily: "'Lora', serif",
                      fontSize: '28px',
                      fontWeight: 700
                    }}>
                      ₹{card.balance.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '12px',
                      fontFamily: "'Open Sans', sans-serif",
                      opacity: 0.9,
                      marginBottom: '4px'
                    }}>
                      Original Amount
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: 600
                    }}>
                      ₹{card.originalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: '16px',
                  fontSize: '12px',
                  fontFamily: "'Open Sans', sans-serif",
                  opacity: 0.9
                }}>
                  Expires: {formatDate(card.expiryDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
