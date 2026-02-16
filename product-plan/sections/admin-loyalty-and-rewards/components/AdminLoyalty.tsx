import { useState } from 'react'
import { Save, Award, TrendingUp, Users, Calendar, Edit2, UserPlus, UserMinus } from 'lucide-react'
import type { AdminLoyaltyProps, PointsConfig } from '../types'

const c = {
  primary500: '#013f47', primary400: '#2a7a72', primary200: '#71c1ae',
  primary100: '#c5e8e2', primary50: '#e8f5f3',
  secondary500: '#c85103', secondary300: '#fd8630', secondary50: '#fff5ed',
  bg: '#fffbf5', card: '#ffffff', subtle: '#f5dfbb',
  earth300: '#a39585', earth400: '#75615a', earth500: '#71685b', earth600: '#5a4f47', earth700: '#433b35',
  success: '#10B981', successLight: '#D1FAE5',
  warning: '#F59E0B', warningLight: '#FEF3C7',
  error: '#EF4444', errorLight: '#FEE2E2',
  gradient: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
  shadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
}
const fonts = { heading: "'Lora', serif", body: "'Open Sans', sans-serif", mono: "'IBM Plex Mono', monospace" }

export function AdminLoyalty({
  programEnabled,
  config: initialConfig,
  tiers,
  recentAdjustments,
  stats,
  onToggleProgram,
  onSaveConfig,
  onEditTier,
  onSubmitAdjustment,
}: AdminLoyaltyProps) {
  const [config, setConfig] = useState(initialConfig)
  const [adjustmentEmail, setAdjustmentEmail] = useState('')
  const [adjustmentType, setAdjustmentType] = useState<'credit' | 'debit'>('credit')
  const [adjustmentPoints, setAdjustmentPoints] = useState(0)
  const [adjustmentReason, setAdjustmentReason] = useState('')

  const handleSubmitAdjustment = () => {
    if (adjustmentEmail && adjustmentPoints > 0 && adjustmentReason) {
      onSubmitAdjustment({
        customerEmail: adjustmentEmail,
        type: adjustmentType,
        points: adjustmentPoints,
        reason: adjustmentReason,
      })
      setAdjustmentEmail('')
      setAdjustmentPoints(0)
      setAdjustmentReason('')
    }
  }

  return (
    <div style={{ fontFamily: fonts.body, maxWidth: '1200px' }}>
      {/* Program Toggle */}
      <div
        style={{
          background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
          borderTop: '4px solid transparent',
          borderRadius: '12px',
          padding: '24px 32px',
          boxShadow: c.shadow,
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Award size={28} style={{ color: c.primary500 }} />
          <div>
            <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: '0 0 4px 0' }}>
              Loyalty Program
            </h2>
            <p style={{ fontSize: '14px', color: c.earth500, margin: 0 }}>
              Manage points, tiers, and manual adjustments
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              background: programEnabled ? c.successLight : c.warningLight,
              color: programEnabled ? c.success : c.warning,
              padding: '6px 14px',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {programEnabled ? 'Enabled' : 'Disabled'}
          </span>
          <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '32px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={programEnabled}
              onChange={e => onToggleProgram(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: programEnabled ? c.primary500 : c.earth300,
                borderRadius: '32px',
                transition: 'all 200ms',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  height: '26px',
                  width: '26px',
                  left: programEnabled ? '31px' : '3px',
                  bottom: '3px',
                  background: '#ffffff',
                  borderRadius: '50%',
                  transition: 'all 200ms',
                }}
              />
            </span>
          </label>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div
          style={{
            background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
            borderTop: '4px solid transparent',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: c.shadow,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <TrendingUp size={24} style={{ color: c.primary500 }} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: c.earth500 }}>Total Issued</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: c.earth700 }}>
            {stats.totalPointsIssued.toLocaleString()}
          </div>
        </div>

        <div
          style={{
            background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
            borderTop: '4px solid transparent',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: c.shadow,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Award size={24} style={{ color: c.success }} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: c.earth500 }}>Total Redeemed</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: c.earth700 }}>
            {stats.totalPointsRedeemed.toLocaleString()}
          </div>
        </div>

        <div
          style={{
            background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
            borderTop: '4px solid transparent',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: c.shadow,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Calendar size={24} style={{ color: c.warning }} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: c.earth500 }}>Total Expired</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: c.earth700 }}>
            {stats.totalPointsExpired.toLocaleString()}
          </div>
        </div>

        <div
          style={{
            background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
            borderTop: '4px solid transparent',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: c.shadow,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Users size={24} style={{ color: c.secondary500 }} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: c.earth500 }}>Active Members</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: c.earth700 }}>
            {stats.activeMembers.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Points Configuration */}
      <div
        style={{
          background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
          borderTop: '4px solid transparent',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: c.shadow,
          marginBottom: '24px',
        }}
      >
        <h3 style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 600, color: c.earth700, margin: '0 0 24px 0' }}>
          Points Configuration
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
              Points per ₹1
            </label>
            <input
              type="number"
              value={config.pointsPerRupee}
              onChange={e => setConfig({ ...config, pointsPerRupee: Number(e.target.value) })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.earth300}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: fonts.body,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = c.primary400}
              onBlur={e => e.target.style.borderColor = c.earth300}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
              Points per $1
            </label>
            <input
              type="number"
              value={config.pointsPerDollar}
              onChange={e => setConfig({ ...config, pointsPerDollar: Number(e.target.value) })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.earth300}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: fonts.body,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = c.primary400}
              onBlur={e => e.target.style.borderColor = c.earth300}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
              Min Redemption Points
            </label>
            <input
              type="number"
              value={config.minRedemptionPoints}
              onChange={e => setConfig({ ...config, minRedemptionPoints: Number(e.target.value) })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.earth300}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: fonts.body,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = c.primary400}
              onBlur={e => e.target.style.borderColor = c.earth300}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
              Points Expiry (Days)
            </label>
            <input
              type="number"
              value={config.pointsExpiryDays}
              onChange={e => setConfig({ ...config, pointsExpiryDays: Number(e.target.value) })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.earth300}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: fonts.body,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = c.primary400}
              onBlur={e => e.target.style.borderColor = c.earth300}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
              Point Value (₹)
            </label>
            <input
              type="number"
              step="0.01"
              value={config.pointsValueINR}
              onChange={e => setConfig({ ...config, pointsValueINR: Number(e.target.value) })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.earth300}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: fonts.body,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = c.primary400}
              onBlur={e => e.target.style.borderColor = c.earth300}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
              Point Value ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={config.pointsValueUSD}
              onChange={e => setConfig({ ...config, pointsValueUSD: Number(e.target.value) })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.earth300}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: fonts.body,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = c.primary400}
              onBlur={e => e.target.style.borderColor = c.earth300}
            />
          </div>
        </div>

        <button
          onClick={() => onSaveConfig(config)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: c.primary500,
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 200ms',
          }}
          onMouseEnter={e => e.currentTarget.style.background = c.primary400}
          onMouseLeave={e => e.currentTarget.style.background = c.primary500}
        >
          <Save size={16} />
          Save Configuration
        </button>
      </div>

      {/* Tiers */}
      <div
        style={{
          background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
          borderTop: '4px solid transparent',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: c.shadow,
          marginBottom: '24px',
        }}
      >
        <h3 style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 600, color: c.earth700, margin: '0 0 24px 0' }}>
          Loyalty Tiers
        </h3>

        <div style={{ display: 'grid', gap: '16px' }}>
          {tiers.map(tier => (
            <div
              key={tier.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                background: c.subtle,
                borderRadius: '8px',
                borderLeft: `6px solid ${tier.color}`,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: c.earth700, margin: 0 }}>
                    {tier.name}
                  </h4>
                  <span style={{ fontSize: '14px', color: c.earth500 }}>
                    {tier.minPoints}+ points • {tier.multiplier}x multiplier
                  </span>
                </div>
                <ul style={{ fontSize: '14px', color: c.earth600, margin: '8px 0 0 20px', padding: 0 }}>
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => onEditTier(tier.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  background: c.card,
                  color: c.primary500,
                  border: `1px solid ${c.primary500}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Edit2 size={14} />
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Adjustment */}
      <div
        style={{
          background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
          borderTop: '4px solid transparent',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: c.shadow,
          marginBottom: '24px',
        }}
      >
        <h3 style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 600, color: c.earth700, margin: '0 0 24px 0' }}>
          Manual Points Adjustment
        </h3>

        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
              Customer Email
            </label>
            <input
              type="email"
              value={adjustmentEmail}
              onChange={e => setAdjustmentEmail(e.target.value)}
              placeholder="customer@example.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.earth300}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: fonts.body,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = c.primary400}
              onBlur={e => e.target.style.borderColor = c.earth300}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '12px' }}>
                Adjustment Type
              </label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="adjustmentType"
                    checked={adjustmentType === 'credit'}
                    onChange={() => setAdjustmentType('credit')}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: c.primary500 }}
                  />
                  <UserPlus size={18} style={{ color: c.success }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: c.earth700 }}>Credit</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="adjustmentType"
                    checked={adjustmentType === 'debit'}
                    onChange={() => setAdjustmentType('debit')}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: c.primary500 }}
                  />
                  <UserMinus size={18} style={{ color: c.error }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: c.earth700 }}>Debit</span>
                </label>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                Points Amount
              </label>
              <input
                type="number"
                value={adjustmentPoints}
                onChange={e => setAdjustmentPoints(Number(e.target.value))}
                placeholder="100"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${c.earth300}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: fonts.body,
                  outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = c.primary400}
                onBlur={e => e.target.style.borderColor = c.earth300}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
              Reason
            </label>
            <textarea
              value={adjustmentReason}
              onChange={e => setAdjustmentReason(e.target.value)}
              placeholder="Reason for adjustment..."
              style={{
                width: '100%',
                minHeight: '80px',
                padding: '10px 12px',
                border: `1px solid ${c.earth300}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: fonts.body,
                resize: 'vertical',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = c.primary400}
              onBlur={e => e.target.style.borderColor = c.earth300}
            />
          </div>

          <button
            onClick={handleSubmitAdjustment}
            disabled={!adjustmentEmail || !adjustmentPoints || !adjustmentReason}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: (adjustmentEmail && adjustmentPoints && adjustmentReason) ? c.primary500 : c.earth300,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: (adjustmentEmail && adjustmentPoints && adjustmentReason) ? 'pointer' : 'not-allowed',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => (adjustmentEmail && adjustmentPoints && adjustmentReason) && (e.currentTarget.style.background = c.primary400)}
            onMouseLeave={e => (adjustmentEmail && adjustmentPoints && adjustmentReason) && (e.currentTarget.style.background = c.primary500)}
          >
            <Save size={16} />
            Submit Adjustment
          </button>
        </div>
      </div>

      {/* Recent Adjustments */}
      <div
        style={{
          background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
          borderTop: '4px solid transparent',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: c.shadow,
        }}
      >
        <h3 style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 600, color: c.earth700, margin: '0 0 24px 0' }}>
          Recent Adjustments
        </h3>

        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: c.subtle }}>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Customer
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Type
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Points
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Reason
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentAdjustments.map((adj, idx) => (
                <tr
                  key={adj.id}
                  style={{
                    borderTop: idx === 0 ? 'none' : `1px solid ${c.subtle}`,
                    background: c.card,
                  }}
                >
                  <td style={{ padding: '16px', fontSize: '14px', color: c.earth700 }}>
                    <div style={{ fontWeight: 600 }}>{adj.customerName}</div>
                    <div style={{ fontSize: '13px', color: c.earth500 }}>{adj.customerEmail}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: adj.type === 'credit' ? c.successLight : c.errorLight,
                        color: adj.type === 'credit' ? c.success : c.error,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    >
                      {adj.type === 'credit' ? <UserPlus size={12} /> : <UserMinus size={12} />}
                      {adj.type}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: c.earth700, fontFamily: fonts.mono }}>
                    {adj.type === 'credit' ? '+' : '-'}{adj.points.toLocaleString()}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: c.earth600 }}>
                    {adj.reason}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: c.earth600 }}>
                    {new Date(adj.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
