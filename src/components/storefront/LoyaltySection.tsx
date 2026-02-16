import { AlertTriangle } from 'lucide-react'
import type { LoyaltyBalance, LoyaltyTransaction } from './types'

interface LoyaltySectionProps {
  balance: LoyaltyBalance
  transactions: LoyaltyTransaction[]
  onRedeemPoints?: (points: number) => void
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

export function LoyaltySection({ balance, transactions, onRedeemPoints }: LoyaltySectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getPointsColor = (type: string) => {
    if (type === 'earned') return '#16a34a'
    if (type === 'redeemed') return c.secondary500
    return c.earth400
  }

  return (
    <div>
      {/* Section Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ flex: 1, height: '2px', background: c.gradientAccent }} />
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: '24px', fontWeight: 700, color: c.earth700, margin: 0 }}>
            Loyalty Points
          </h2>
          <div style={{ flex: 1, height: '2px', background: c.gradientAccent }} />
        </div>
      </div>

      {/* Balance Card */}
      <div style={{
        background: c.bgCard,
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ height: '4px', background: c.gradientAccent }} />
        <div style={{ padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              fontFamily: "'Lora', serif",
              fontSize: '48px',
              fontWeight: 700,
              color: c.primary500,
              marginBottom: '8px'
            }}>
              {balance.points.toLocaleString('en-IN')}
            </div>
            <div style={{
              fontSize: '18px',
              color: c.earth400,
              fontFamily: "'Open Sans', sans-serif"
            }}>
              Worth ₹{balance.equivalentValue.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            paddingTop: '24px',
            borderTop: `1px solid ${c.primary50}`
          }}>
            <div>
              <div style={{ fontSize: '14px', color: c.earth400, marginBottom: '4px', fontFamily: "'Open Sans', sans-serif" }}>
                Earn Rate
              </div>
              <div style={{ fontSize: '16px', color: c.earth700, fontWeight: 600, fontFamily: "'Open Sans', sans-serif" }}>
                ₹{balance.earnRate} = 1 point
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: c.earth400, marginBottom: '4px', fontFamily: "'Open Sans', sans-serif" }}>
                Redeem Rate
              </div>
              <div style={{ fontSize: '16px', color: c.earth700, fontWeight: 600, fontFamily: "'Open Sans', sans-serif" }}>
                {balance.redeemRate} points = ₹1
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expiring Points Warning */}
      {balance.expiringPoints > 0 && (
        <div style={{
          background: '#fef3c7',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid #fde047'
        }}>
          <AlertTriangle size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
          <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', color: '#92400e' }}>
            <strong>{balance.expiringPoints.toLocaleString('en-IN')} points</strong> expiring on{' '}
            <strong>{formatDate(balance.expiringDate)}</strong>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div style={{
        background: c.bgCard,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ height: '4px', background: c.gradientAccent }} />
        <div style={{ padding: '24px' }}>
          <h3 style={{
            fontFamily: "'Lora', serif",
            fontSize: '18px',
            fontWeight: 700,
            color: c.earth700,
            marginBottom: '16px',
            marginTop: 0
          }}>
            Transaction History
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{
                    textAlign: 'left',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: c.earth600,
                    fontFamily: "'Open Sans', sans-serif",
                    borderBottom: `2px solid ${c.primary50}`
                  }}>
                    Date
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: c.earth600,
                    fontFamily: "'Open Sans', sans-serif",
                    borderBottom: `2px solid ${c.primary50}`
                  }}>
                    Description
                  </th>
                  <th style={{
                    textAlign: 'right',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: c.earth600,
                    fontFamily: "'Open Sans', sans-serif",
                    borderBottom: `2px solid ${c.primary50}`
                  }}>
                    Points
                  </th>
                  <th style={{
                    textAlign: 'right',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: c.earth600,
                    fontFamily: "'Open Sans', sans-serif",
                    borderBottom: `2px solid ${c.primary50}`
                  }}>
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={txn.id} style={{ background: index % 2 === 0 ? c.bgPrimary : c.bgCard }}>
                    <td style={{
                      padding: '12px',
                      fontSize: '14px',
                      color: c.earth600,
                      fontFamily: "'Open Sans', sans-serif"
                    }}>
                      {formatDate(txn.date)}
                    </td>
                    <td style={{
                      padding: '12px',
                      fontSize: '14px',
                      color: c.earth700,
                      fontFamily: "'Open Sans', sans-serif"
                    }}>
                      {txn.description}
                    </td>
                    <td style={{
                      padding: '12px',
                      fontSize: '14px',
                      fontFamily: "'IBM Plex Mono', monospace",
                      textAlign: 'right',
                      color: getPointsColor(txn.type),
                      fontWeight: 600
                    }}>
                      {txn.type === 'redeemed' ? '-' : '+'}
                      {txn.points.toLocaleString('en-IN')}
                    </td>
                    <td style={{
                      padding: '12px',
                      fontSize: '14px',
                      fontFamily: "'IBM Plex Mono', monospace",
                      textAlign: 'right',
                      color: c.earth700,
                      fontWeight: 600
                    }}>
                      {txn.balance.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
