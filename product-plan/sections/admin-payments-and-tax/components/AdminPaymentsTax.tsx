import { useState } from 'react'
import { Save, Eye, EyeOff, CheckCircle, Smartphone, CreditCard, Landmark, Wallet, Banknote, DollarSign } from 'lucide-react'
import type { AdminPaymentsTaxProps, GatewayConfig } from '../types'

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

const paymentIcons = {
  smartphone: Smartphone,
  'credit-card': CreditCard,
  landmark: Landmark,
  wallet: Wallet,
  banknote: Banknote,
}

export function AdminPaymentsTax({
  mode,
  gateways: initialGateways,
  paymentMethods,
  gstConfig: initialGST,
  internationalTax: initialIntlTax,
  productOverrides,
  activeTaxTab,
  onToggleMode,
  onSaveGateways,
  onTestConnection,
  onTogglePaymentMethod,
  onChangeTaxTab,
  onSaveGST,
  onSaveInternationalTax,
}: AdminPaymentsTaxProps) {
  const [gateways, setGateways] = useState(initialGateways)
  const [gstConfig, setGstConfig] = useState(initialGST)
  const [intlTax, setIntlTax] = useState(initialIntlTax)
  const [showKeys, setShowKeys] = useState({
    razorpayKeyId: false,
    razorpaySecret: false,
    stripePublishable: false,
    stripeSecret: false,
  })

  const maskKey = (key: string, visible: boolean) => {
    if (visible) return key
    return key.slice(0, 8) + 'x'.repeat(Math.max(0, key.length - 8))
  }

  return (
    <div style={{ fontFamily: fonts.body, space: '24px' }}>
      {/* Payment Gateways */}
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <DollarSign size={24} style={{ color: c.primary500 }} />
            <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: 0 }}>
              Payment Gateways
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px', background: c.subtle, borderRadius: '8px', padding: '4px' }}>
            <button
              onClick={() => onToggleMode?.('test')}
              style={{
                padding: '8px 16px',
                background: mode === 'test' ? c.card : 'transparent',
                color: mode === 'test' ? c.earth700 : c.earth500,
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: mode === 'test' ? c.shadow : 'none',
                transition: 'all 200ms',
              }}
            >
              Test
            </button>
            <button
              onClick={() => onToggleMode?.('live')}
              style={{
                padding: '8px 16px',
                background: mode === 'live' ? c.card : 'transparent',
                color: mode === 'live' ? c.earth700 : c.earth500,
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: mode === 'live' ? c.shadow : 'none',
                transition: 'all 200ms',
              }}
            >
              Live
            </button>
          </div>
        </div>

        {/* Razorpay */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 600, color: c.earth700, margin: 0 }}>
              Razorpay
            </h3>
            {gateways.razorpay.isConnected && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: c.successLight, color: c.success, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                <CheckCircle size={14} />
                Connected
              </span>
            )}
          </div>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                Key ID
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={maskKey(gateways.razorpay.keyId, showKeys.razorpayKeyId)}
                  onChange={e => setGateways({ ...gateways, razorpay: { ...gateways.razorpay, keyId: e.target.value } })}
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.mono,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
                <button
                  onClick={() => setShowKeys({ ...showKeys, razorpayKeyId: !showKeys.razorpayKeyId })}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: c.earth400,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showKeys.razorpayKeyId ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                Key Secret
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={maskKey(gateways.razorpay.keySecret, showKeys.razorpaySecret)}
                  onChange={e => setGateways({ ...gateways, razorpay: { ...gateways.razorpay, keySecret: e.target.value } })}
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.mono,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
                <button
                  onClick={() => setShowKeys({ ...showKeys, razorpaySecret: !showKeys.razorpaySecret })}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: c.earth400,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showKeys.razorpaySecret ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => onTestConnection?.('razorpay')}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              background: 'transparent',
              color: c.primary500,
              border: `1px solid ${c.primary500}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Test Connection
          </button>
        </div>

        {/* Stripe */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 600, color: c.earth700, margin: 0 }}>
              Stripe
            </h3>
            {gateways.stripe.isConnected && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: c.successLight, color: c.success, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                <CheckCircle size={14} />
                Connected
              </span>
            )}
          </div>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                Publishable Key
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={maskKey(gateways.stripe.publishableKey, showKeys.stripePublishable)}
                  onChange={e => setGateways({ ...gateways, stripe: { ...gateways.stripe, publishableKey: e.target.value } })}
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.mono,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
                <button
                  onClick={() => setShowKeys({ ...showKeys, stripePublishable: !showKeys.stripePublishable })}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: c.earth400,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showKeys.stripePublishable ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                Secret Key
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={maskKey(gateways.stripe.secretKey, showKeys.stripeSecret)}
                  onChange={e => setGateways({ ...gateways, stripe: { ...gateways.stripe, secretKey: e.target.value } })}
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.mono,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
                <button
                  onClick={() => setShowKeys({ ...showKeys, stripeSecret: !showKeys.stripeSecret })}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: c.earth400,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showKeys.stripeSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => onTestConnection?.('stripe')}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              background: 'transparent',
              color: c.primary500,
              border: `1px solid ${c.primary500}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Test Connection
          </button>
        </div>

        <button
          onClick={() => onSaveGateways?.(gateways)}
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
          Save Gateway Settings
        </button>
      </div>

      {/* Payment Methods */}
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
        <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: '0 0 24px 0' }}>
          Payment Methods
        </h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          {paymentMethods.map(method => {
            const Icon = paymentIcons[method.icon as keyof typeof paymentIcons]
            return (
              <div
                key={method.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px',
                  background: c.subtle,
                  borderRadius: '8px',
                  border: method.enabled ? `2px solid ${c.primary200}` : `2px solid transparent`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {Icon && <Icon size={28} style={{ color: method.enabled ? c.primary500 : c.earth400 }} />}
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: c.earth700, marginBottom: '4px' }}>
                      {method.name}
                    </div>
                    <div style={{ fontSize: '13px', color: c.earth500 }}>
                      {method.description}
                    </div>
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '52px', height: '28px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={method.enabled}
                    onChange={() => onTogglePaymentMethod?.(method.id)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: method.enabled ? c.primary500 : c.earth300,
                      borderRadius: '28px',
                      transition: 'all 200ms',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        height: '22px',
                        width: '22px',
                        left: method.enabled ? '27px' : '3px',
                        bottom: '3px',
                        background: '#ffffff',
                        borderRadius: '50%',
                        transition: 'all 200ms',
                      }}
                    />
                  </span>
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tax Settings */}
      <div
        style={{
          background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
          borderTop: '4px solid transparent',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: c.shadow,
        }}
      >
        <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: '0 0 24px 0' }}>
          Tax Settings
        </h2>

        {/* Tax Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', borderBottom: `2px solid ${c.subtle}` }}>
          {[
            { key: 'gst', label: 'GST' },
            { key: 'international', label: 'International' },
            { key: 'per-product', label: 'Per-Product' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => onChangeTaxTab?.(tab.key as any)}
              style={{
                padding: '12px 24px',
                background: activeTaxTab === tab.key ? c.primary50 : 'transparent',
                color: activeTaxTab === tab.key ? c.primary500 : c.earth600,
                border: 'none',
                borderBottom: activeTaxTab === tab.key ? `3px solid ${c.primary500}` : '3px solid transparent',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: fonts.body,
                cursor: 'pointer',
                transition: 'all 200ms',
                marginBottom: '-2px',
              }}
              onMouseEnter={e => {
                if (activeTaxTab !== tab.key) {
                  e.currentTarget.style.background = c.subtle
                }
              }}
              onMouseLeave={e => {
                if (activeTaxTab !== tab.key) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GST Tab */}
        {activeTaxTab === 'gst' && (
          <div>
            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr 1fr', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  GSTIN
                </label>
                <input
                  type="text"
                  value={gstConfig.gstin}
                  onChange={e => setGstConfig({ ...gstConfig, gstin: e.target.value })}
                  placeholder="29AABCV1234F1Z5"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.mono,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  Default GST Rate (%)
                </label>
                <input
                  type="number"
                  value={gstConfig.defaultRate}
                  onChange={e => setGstConfig({ ...gstConfig, defaultRate: Number(e.target.value) })}
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
                  Default HSN Code
                </label>
                <input
                  type="text"
                  value={gstConfig.defaultHSN}
                  onChange={e => setGstConfig({ ...gstConfig, defaultHSN: e.target.value })}
                  placeholder="8306"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.mono,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
              </div>
            </div>
            <button
              onClick={() => onSaveGST?.(gstConfig)}
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
              Save GST Settings
            </button>
          </div>
        )}

        {/* International Tab */}
        {activeTaxTab === 'international' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={intlTax.taxExempt}
                  onChange={e => setIntlTax({ ...intlTax, taxExempt: e.target.checked })}
                  style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: c.primary500 }}
                />
                <span style={{ fontSize: '15px', fontWeight: 600, color: c.earth700 }}>
                  Tax Exempt (Export under LUT)
                </span>
              </label>
            </div>
            {intlTax.taxExempt && (
              <div style={{ marginBottom: '24px', maxWidth: '400px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  LUT Number
                </label>
                <input
                  type="text"
                  value={intlTax.lutNumber}
                  onChange={e => setIntlTax({ ...intlTax, lutNumber: e.target.value })}
                  placeholder="AD290225000012345"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.mono,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
              </div>
            )}
            <button
              onClick={() => onSaveInternationalTax?.(intlTax)}
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
              Save International Tax Settings
            </button>
          </div>
        )}

        {/* Per-Product Tab */}
        {activeTaxTab === 'per-product' && (
          <div>
            <div style={{ overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: c.subtle }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Product
                    </th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      SKU
                    </th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      GST Rate (%)
                    </th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      HSN Code
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productOverrides.map((override, idx) => (
                    <tr
                      key={override.productId}
                      style={{
                        borderTop: idx === 0 ? 'none' : `1px solid ${c.subtle}`,
                        background: c.card,
                      }}
                    >
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: c.earth700 }}>
                        {override.productName}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: c.earth600, fontFamily: fonts.mono }}>
                        {override.sku}
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: c.earth600 }}>
                        {override.gstRate}%
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: c.earth600, fontFamily: fonts.mono }}>
                        {override.hsnCode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
