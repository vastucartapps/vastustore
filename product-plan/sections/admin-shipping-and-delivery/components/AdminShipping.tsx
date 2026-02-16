import { useState } from 'react'
import { Save, Package, DollarSign, Truck, FileText, MapPin } from 'lucide-react'
import type { AdminShippingProps } from '../types'

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
  shadowHover: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
}
const fonts = { heading: "'Lora', serif", body: "'Open Sans', sans-serif", mono: "'IBM Plex Mono', monospace" }

export function AdminShipping({
  zones: initialZones,
  freeShipping: initialFreeShipping,
  cod: initialCOD,
  deliveryEstimates: initialEstimates,
  shippingPolicy: initialPolicy,
  onSaveZones,
  onSaveFreeShipping,
  onSaveCOD,
  onSaveDeliveryEstimates,
  onSaveShippingPolicy,
}: AdminShippingProps) {
  // Simplify to just Domestic and International zones
  const [domesticRate, setDomesticRate] = useState(
    initialZones.find(z => z.currency === 'INR')?.rate || 49
  )
  const [internationalRate, setInternationalRate] = useState(
    initialZones.find(z => z.currency === 'USD')?.rate || 15
  )

  const [freeShipping, setFreeShipping] = useState(initialFreeShipping)
  const [cod, setCod] = useState(initialCOD)
  const [estimates, setEstimates] = useState(initialEstimates)
  const [policy, setPolicy] = useState(initialPolicy)

  const handleSaveZones = () => {
    const zones = [
      { id: 'zone-domestic', name: 'Domestic (India)', rate: domesticRate, currency: 'INR' as const, isEnabled: true },
      { id: 'zone-international', name: 'International', rate: internationalRate, currency: 'USD' as const, isEnabled: true },
    ]
    onSaveZones?.(zones)
  }

  return (
    <div style={{ fontFamily: fonts.body, maxWidth: '1200px' }}>
      {/* Shipping Zones */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Package size={24} style={{ color: c.primary500 }} />
          <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: 0 }}>
            Shipping Zones
          </h2>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Domestic Zone */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 200px 120px',
              gap: '16px',
              alignItems: 'center',
              padding: '20px',
              background: c.subtle,
              borderRadius: '8px',
            }}
          >
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: c.earth700, marginBottom: '4px' }}>
                Domestic (India)
              </div>
              <div style={{ fontSize: '13px', color: c.earth500 }}>
                All India shipping
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: c.earth600 }}>₹</span>
              <input
                type="number"
                value={domesticRate}
                onChange={e => setDomesticRate(Number(e.target.value))}
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
            <span
              style={{
                background: c.successLight,
                color: c.success,
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Enabled
            </span>
          </div>

          {/* International Zone */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 200px 120px',
              gap: '16px',
              alignItems: 'center',
              padding: '20px',
              background: c.subtle,
              borderRadius: '8px',
            }}
          >
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: c.earth700, marginBottom: '4px' }}>
                International
              </div>
              <div style={{ fontSize: '13px', color: c.earth500 }}>
                Worldwide shipping
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: c.earth600 }}>$</span>
              <input
                type="number"
                value={internationalRate}
                onChange={e => setInternationalRate(Number(e.target.value))}
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
            <span
              style={{
                background: c.successLight,
                color: c.success,
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Enabled
            </span>
          </div>
        </div>

        <button
          onClick={handleSaveZones}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '24px',
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
          Save Zones
        </button>
      </div>

      {/* Free Shipping */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <DollarSign size={24} style={{ color: c.primary500 }} />
          <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: 0 }}>
            Free Shipping
          </h2>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={freeShipping.enabled}
              onChange={e => setFreeShipping({ ...freeShipping, enabled: e.target.checked })}
              style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: c.primary500 }}
            />
            <span style={{ fontSize: '15px', fontWeight: 600, color: c.earth700 }}>
              Enable Free Shipping
            </span>
          </label>
        </div>

        {freeShipping.enabled && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                Domestic Threshold (INR)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', color: c.earth600 }}>₹</span>
                <input
                  type="number"
                  value={freeShipping.thresholdINR}
                  onChange={e => setFreeShipping({ ...freeShipping, thresholdINR: Number(e.target.value) })}
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
                International Threshold (USD)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', color: c.earth600 }}>$</span>
                <input
                  type="number"
                  value={freeShipping.thresholdUSD}
                  onChange={e => setFreeShipping({ ...freeShipping, thresholdUSD: Number(e.target.value) })}
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
          </div>
        )}

        <button
          onClick={() => onSaveFreeShipping?.(freeShipping)}
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
          Save Free Shipping
        </button>
      </div>

      {/* COD Settings */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Truck size={24} style={{ color: c.primary500 }} />
          <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: 0 }}>
            Cash on Delivery (COD)
          </h2>
          <span
            style={{
              background: c.secondary50,
              color: c.secondary500,
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            India Only
          </span>
        </div>
        <p style={{ fontSize: '13px', color: c.earth500, margin: '0 0 24px 0' }}>
          COD is available only for domestic orders within India
        </p>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={cod.enabled}
              onChange={e => setCod({ ...cod, enabled: e.target.checked })}
              style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: c.primary500 }}
            />
            <span style={{ fontSize: '15px', fontWeight: 600, color: c.earth700 }}>
              Enable COD
            </span>
          </label>
        </div>

        {cod.enabled && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                COD Fee (₹)
              </label>
              <input
                type="number"
                value={cod.fee}
                onChange={e => setCod({ ...cod, fee: Number(e.target.value) })}
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
                Minimum Order (₹)
              </label>
              <input
                type="number"
                value={cod.minOrder}
                onChange={e => setCod({ ...cod, minOrder: Number(e.target.value) })}
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
                Maximum Order (₹)
              </label>
              <input
                type="number"
                value={cod.maxOrder}
                onChange={e => setCod({ ...cod, maxOrder: Number(e.target.value) })}
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
        )}

        <button
          onClick={() => onSaveCOD?.(cod)}
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
          Save COD Settings
        </button>
      </div>

      {/* Delivery Estimates */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <MapPin size={24} style={{ color: c.primary500 }} />
          <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: 0 }}>
            Delivery Estimates
          </h2>
        </div>

        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: c.subtle }}>
                <th
                  style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: c.earth700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Region
                </th>
                <th
                  style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: c.earth700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Pincode Prefix
                </th>
                <th
                  style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: c.earth700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Delivery Time
                </th>
              </tr>
            </thead>
            <tbody>
              {estimates.map((est, idx) => (
                <tr
                  key={est.id}
                  style={{
                    borderTop: idx === 0 ? 'none' : `1px solid ${c.subtle}`,
                    background: c.card,
                  }}
                >
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: c.earth700 }}>
                    {est.region}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: c.earth600, fontFamily: fonts.mono }}>
                    {est.pincodePrefix || '—'}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: c.earth600 }}>
                    {est.minDays}–{est.maxDays} days
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => onSaveDeliveryEstimates?.(estimates)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '24px',
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
          Save Delivery Estimates
        </button>
      </div>

      {/* Shipping Policy */}
      <div
        style={{
          background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
          borderTop: '4px solid transparent',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: c.shadow,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <FileText size={24} style={{ color: c.primary500 }} />
          <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: 0 }}>
            Shipping Policy
          </h2>
        </div>

        <textarea
          value={policy}
          onChange={e => setPolicy(e.target.value)}
          placeholder="Enter your shipping policy content (markdown supported)..."
          style={{
            width: '100%',
            minHeight: '300px',
            padding: '16px',
            border: `1px solid ${c.earth300}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: fonts.mono,
            lineHeight: 1.6,
            resize: 'vertical',
            outline: 'none',
            marginBottom: '20px',
          }}
          onFocus={e => e.target.style.borderColor = c.primary400}
          onBlur={e => e.target.style.borderColor = c.earth300}
        />

        <button
          onClick={() => onSaveShippingPolicy?.(policy)}
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
          Save Shipping Policy
        </button>
      </div>
    </div>
  )
}
