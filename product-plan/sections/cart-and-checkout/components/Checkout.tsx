import { useState } from 'react'
import {
  Check, ChevronRight, MapPin, Phone, Mail, Truck, Zap,
  CreditCard, ArrowLeft, ShieldCheck, Home, Building, Tag,
  Gift, Sparkles, ChevronDown, Plus, IndianRupee,
} from 'lucide-react'
import type {
  CheckoutProps, CheckoutStep, Address, CartItem,
} from '../types'

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

function formatPrice(amount: number, currency: 'INR' | 'USD') {
  return currency === 'INR'
    ? `₹${amount.toLocaleString('en-IN')}`
    : `$${amount.toLocaleString('en-US')}`
}

const stepIcons: Record<string, typeof Mail> = {
  contact: Mail,
  address: MapPin,
  shipping: Truck,
  payment: CreditCard,
}

function StepIndicator({
  steps,
  onGoToStep,
}: {
  steps: CheckoutStep[]
  onGoToStep?: (id: string) => void
}) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8">
      {steps.map((step, idx) => {
        const Icon = stepIcons[step.id] || Mail
        const isCompleted = step.status === 'completed'
        const isActive = step.status === 'active'
        return (
          <div key={step.id} className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => isCompleted && onGoToStep?.(step.id)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all"
              style={{
                background: isActive
                  ? c.primary500
                  : isCompleted
                  ? c.primary50
                  : '#f5f0ea',
                color: isActive ? '#fff' : isCompleted ? c.primary500 : c.earth300,
                cursor: isCompleted ? 'pointer' : 'default',
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              {isCompleted ? (
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: c.primary500 }}
                >
                  <Check className="w-3 h-3 text-white" />
                </div>
              ) : (
                <Icon className="w-4 h-4" />
              )}
              <span className="text-xs font-semibold hidden sm:inline">{step.label}</span>
            </button>
            {idx < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: c.earth300 }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function MiniCartSummary({
  items,
  orderSummary,
  appliedCoupon,
  giftCardBalance,
  prepaidDiscount,
}: Pick<CheckoutProps, 'items' | 'orderSummary' | 'appliedCoupon' | 'giftCardBalance' | 'prepaidDiscount'>) {
  const [expanded, setExpanded] = useState(false)
  const os = orderSummary
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
    >
      <div className="h-1" style={{ background: c.gradientAccent }} />
      <div className="p-5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full"
        >
          <h3
            className="text-base font-bold"
            style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
          >
            Order Summary ({os.itemCount} items)
          </h3>
          <ChevronDown
            className="w-4 h-4 transition-transform duration-200"
            style={{ color: c.earth400, transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}
          />
        </button>

        {expanded && (
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
                  style={{ border: '1px solid #f0ebe4' }}
                >
                  <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-semibold truncate"
                    style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {item.productName}
                  </p>
                  <p className="text-[10px]" style={{ color: c.earth300 }}>
                    {item.variantLabel} × {item.quantity}
                  </p>
                </div>
                <span
                  className="text-xs font-bold flex-shrink-0"
                  style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                >
                  {formatPrice(item.price * item.quantity, item.currency)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="h-px mt-4 mb-3" style={{ background: '#f0ebe4' }} />

        <div className="space-y-2 text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          <div className="flex justify-between">
            <span style={{ color: c.earth400 }}>Subtotal</span>
            <span className="font-semibold" style={{ color: c.earth700 }}>
              {formatPrice(os.subtotal, os.currency)}
            </span>
          </div>
          {os.couponDiscount > 0 && (
            <div className="flex justify-between">
              <span style={{ color: c.primary500 }}>Coupon</span>
              <span className="font-semibold" style={{ color: c.primary500 }}>
                -{formatPrice(os.couponDiscount, os.currency)}
              </span>
            </div>
          )}
          {os.giftCardApplied > 0 && (
            <div className="flex justify-between">
              <span style={{ color: c.secondary500 }}>Gift Card</span>
              <span className="font-semibold" style={{ color: c.secondary500 }}>
                -{formatPrice(os.giftCardApplied, os.currency)}
              </span>
            </div>
          )}
          {os.shippingFee > 0 ? (
            <div className="flex justify-between">
              <span style={{ color: c.earth400 }}>Shipping</span>
              <span className="font-semibold" style={{ color: c.earth700 }}>
                {formatPrice(os.shippingFee, os.currency)}
              </span>
            </div>
          ) : (
            <div className="flex justify-between">
              <span style={{ color: c.earth400 }}>Shipping</span>
              <span className="font-semibold" style={{ color: '#16a34a' }}>FREE</span>
            </div>
          )}
          {os.codFee > 0 && (
            <div className="flex justify-between">
              <span style={{ color: c.earth400 }}>COD Fee</span>
              <span className="font-semibold" style={{ color: c.earth700 }}>
                {formatPrice(os.codFee, os.currency)}
              </span>
            </div>
          )}
          {os.prepaidDiscount > 0 && (
            <div className="flex justify-between">
              <span style={{ color: c.primary500 }}>Prepaid Discount</span>
              <span className="font-semibold" style={{ color: c.primary500 }}>
                -{formatPrice(os.prepaidDiscount, os.currency)}
              </span>
            </div>
          )}
        </div>

        <div className="h-px my-3" style={{ background: c.gradientAccent }} />

        <div className="flex justify-between items-center">
          <span
            className="text-base font-bold"
            style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
          >
            Total
          </span>
          <span
            className="text-lg font-bold"
            style={{ color: c.primary500, fontFamily: "'Lora', serif" }}
          >
            {formatPrice(os.grandTotal, os.currency)}
          </span>
        </div>

        {prepaidDiscount.enabled && os.prepaidDiscount > 0 && (
          <div
            className="flex items-center gap-2 mt-3 p-2.5 rounded-xl"
            style={{ background: c.primary50 }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: c.primary500 }} />
            <span
              className="text-[11px] font-medium"
              style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
            >
              {prepaidDiscount.label}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export function Checkout({
  items,
  orderSummary,
  checkoutSteps,
  savedAddresses,
  shippingMethods,
  codConfig,
  prepaidDiscount,
  appliedCoupon,
  giftCardBalance,
  contactInfo,
  onSubmitContact,
  onSelectAddress,
  onAddAddress,
  onSelectShipping,
  onToggleCod,
  onPlaceOrder,
  onBack,
  onGoToStep,
}: CheckoutProps) {
  const activeStep = checkoutSteps.find((s) => s.status === 'active')
  const activeStepId = activeStep?.id || 'contact'

  // Local form state
  const [email, setEmail] = useState(contactInfo?.email || '')
  const [phone, setPhone] = useState(contactInfo?.phone || '')
  const [countryCode, setCountryCode] = useState(contactInfo?.countryCode || '+91')
  const [selectedAddressId, setSelectedAddressId] = useState(
    savedAddresses.find((a) => a.isDefault)?.id || savedAddresses[0]?.id || ''
  )
  const [selectedShippingId, setSelectedShippingId] = useState(shippingMethods[0]?.id || '')
  const [codEnabled, setCodEnabled] = useState(false)
  const [showNewAddress, setShowNewAddress] = useState(false)

  const isIndian = countryCode === '+91'

  const labelIcon = (label: string) => {
    if (label === 'Home') return Home
    if (label === 'Office') return Building
    return MapPin
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <button
          onClick={() => onBack?.()}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
          style={{ border: '1px solid #e8e0d8', color: c.earth400 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f0ea')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1
          className="text-2xl sm:text-3xl font-bold"
          style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
        >
          Checkout
        </h1>
      </div>

      {/* Step indicator */}
      <StepIndicator steps={checkoutSteps} onGoToStep={onGoToStep} />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ═══ Left: Step content ═══ */}
        <div className="flex-1 min-w-0">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
          >
            <div className="h-1" style={{ background: c.gradientAccent }} />
            <div className="p-5 sm:p-7">
              {/* ── Step 1: Contact ── */}
              {activeStepId === 'contact' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: c.primary50 }}
                    >
                      <Mail className="w-5 h-5" style={{ color: c.primary500 }} />
                    </div>
                    <div>
                      <h2
                        className="text-lg font-bold"
                        style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                      >
                        Contact Information
                      </h2>
                      <p className="text-xs" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                        We'll use this for order updates & cart recovery
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        className="text-xs font-semibold mb-1.5 block"
                        style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          border: '1.5px solid #e8e0d8',
                          fontFamily: "'Open Sans', sans-serif",
                          color: c.earth700,
                          background: c.bgPrimary,
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = c.primary400
                          e.currentTarget.style.boxShadow = `0 0 0 3px ${c.primary500}10`
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#e8e0d8'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        className="text-xs font-semibold mb-1.5 block"
                        style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        Phone Number {isIndian ? '*' : '(optional)'}
                      </label>
                      <div className="flex gap-2">
                        <div
                          className="w-20 flex items-center justify-center rounded-xl text-sm font-semibold flex-shrink-0"
                          style={{
                            border: '1.5px solid #e8e0d8',
                            background: '#f5f0ea',
                            color: c.earth700,
                            fontFamily: "'Open Sans', sans-serif",
                          }}
                        >
                          {countryCode}
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98765 43210"
                          className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{
                            border: '1.5px solid #e8e0d8',
                            fontFamily: "'Open Sans', sans-serif",
                            color: c.earth700,
                            background: c.bgPrimary,
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = c.primary400
                            e.currentTarget.style.boxShadow = `0 0 0 3px ${c.primary500}10`
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#e8e0d8'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        />
                      </div>
                      {!isIndian && (
                        <p
                          className="text-[11px] mt-1.5 flex items-center gap-1"
                          style={{ color: c.secondary500, fontFamily: "'Open Sans', sans-serif" }}
                        >
                          <ShieldCheck className="w-3 h-3" />
                          Without phone, delivery coordination is your responsibility
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onSubmitContact?.(email, phone, countryCode)}
                    className="w-full mt-6 py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: email.trim() ? c.primary500 : c.earth300,
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      if (email.trim()) e.currentTarget.style.background = c.primary400
                    }}
                    onMouseLeave={(e) => {
                      if (email.trim()) e.currentTarget.style.background = c.primary500
                    }}
                  >
                    Continue to Address <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── Step 2: Address ── */}
              {activeStepId === 'address' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: c.primary50 }}
                    >
                      <MapPin className="w-5 h-5" style={{ color: c.primary500 }} />
                    </div>
                    <h2
                      className="text-lg font-bold"
                      style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                    >
                      Shipping Address
                    </h2>
                  </div>

                  {savedAddresses.length > 0 && (
                    <div className="space-y-3 mb-5">
                      {savedAddresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id
                        const LabelIcon = labelIcon(addr.label)
                        return (
                          <button
                            key={addr.id}
                            onClick={() => {
                              setSelectedAddressId(addr.id)
                              onSelectAddress?.(addr.id)
                            }}
                            className="w-full text-left p-4 rounded-xl transition-all"
                            style={{
                              background: isSelected ? c.primary50 : c.bgPrimary,
                              border: `2px solid ${isSelected ? c.primary500 : '#f0ebe4'}`,
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ borderColor: isSelected ? c.primary500 : c.earth300 }}
                              >
                                {isSelected && (
                                  <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ background: c.primary500 }}
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                    className="text-sm font-bold"
                                    style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                                  >
                                    {addr.name}
                                  </span>
                                  <span
                                    className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                    style={{
                                      background: isSelected ? `${c.primary500}15` : '#f5f0ea',
                                      color: isSelected ? c.primary500 : c.earth400,
                                    }}
                                  >
                                    <LabelIcon className="w-3 h-3" /> {addr.label}
                                  </span>
                                  {addr.isDefault && (
                                    <span
                                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                      style={{ background: `${c.secondary500}15`, color: c.secondary500 }}
                                    >
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p
                                  className="text-xs leading-relaxed"
                                  style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                                >
                                  {addr.street}, {addr.city}, {addr.state} {addr.pincode}
                                </p>
                                <p
                                  className="text-xs mt-1 flex items-center gap-1"
                                  style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}
                                >
                                  <Phone className="w-3 h-3" /> {addr.phone}
                                </p>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}

                  <button
                    onClick={() => setShowNewAddress(!showNewAddress)}
                    className="flex items-center gap-2 text-sm font-semibold transition-colors mb-5"
                    style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    <Plus className="w-4 h-4" /> Add New Address
                  </button>

                  {showNewAddress && (
                    <div
                      className="rounded-xl p-5 mb-5 space-y-3"
                      style={{ background: c.bgPrimary, border: '1.5px solid #e8e0d8' }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {['Full Name', 'Phone Number', 'Street Address', 'City', 'State', 'Pincode'].map(
                          (label) => (
                            <input
                              key={label}
                              type="text"
                              placeholder={label}
                              className={`px-4 py-3 rounded-xl text-sm outline-none transition-all ${
                                label === 'Street Address' ? 'sm:col-span-2' : ''
                              }`}
                              style={{
                                border: '1.5px solid #e8e0d8',
                                fontFamily: "'Open Sans', sans-serif",
                                color: c.earth700,
                                background: c.bgCard,
                              }}
                              onFocus={(e) => {
                                e.currentTarget.style.borderColor = c.primary400
                                e.currentTarget.style.boxShadow = `0 0 0 3px ${c.primary500}10`
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#e8e0d8'
                                e.currentTarget.style.boxShadow = 'none'
                              }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => onSelectAddress?.(selectedAddressId)}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all"
                    style={{ background: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = c.primary400)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = c.primary500)}
                  >
                    Continue to Shipping <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── Step 3: Shipping ── */}
              {activeStepId === 'shipping' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: c.primary50 }}
                    >
                      <Truck className="w-5 h-5" style={{ color: c.primary500 }} />
                    </div>
                    <h2
                      className="text-lg font-bold"
                      style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                    >
                      Shipping Method
                    </h2>
                  </div>

                  <div className="space-y-3 mb-6">
                    {shippingMethods.map((method) => {
                      const isSelected = selectedShippingId === method.id
                      return (
                        <button
                          key={method.id}
                          onClick={() => {
                            setSelectedShippingId(method.id)
                            onSelectShipping?.(method.id)
                          }}
                          className="w-full text-left p-4 rounded-xl transition-all"
                          style={{
                            background: isSelected ? c.primary50 : c.bgPrimary,
                            border: `2px solid ${isSelected ? c.primary500 : '#f0ebe4'}`,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                              style={{ borderColor: isSelected ? c.primary500 : c.earth300 }}
                            >
                              {isSelected && (
                                <div
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ background: c.primary500 }}
                                />
                              )}
                            </div>
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: isSelected ? `${c.primary500}12` : '#f5f0ea' }}
                            >
                              {method.name.includes('Express') ? (
                                <Zap className="w-5 h-5" style={{ color: isSelected ? c.secondary500 : c.earth300 }} />
                              ) : (
                                <Truck className="w-5 h-5" style={{ color: isSelected ? c.primary500 : c.earth300 }} />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-sm font-bold"
                                  style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                                >
                                  {method.name}
                                </span>
                                {method.isFree && (
                                  <span
                                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                    style={{ background: '#f0fdf4', color: '#16a34a' }}
                                  >
                                    FREE
                                  </span>
                                )}
                              </div>
                              <p
                                className="text-xs mt-0.5"
                                style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                              >
                                {method.estimatedDays}
                              </p>
                            </div>
                            {!method.isFree && (
                              <span
                                className="text-sm font-bold flex-shrink-0"
                                style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                              >
                                {formatPrice(method.price, method.currency)}
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* COD option */}
                  {codConfig.available && isIndian && (
                    <div className="mb-6">
                      <div className="h-px mb-4" style={{ background: '#f0ebe4' }} />
                      <button
                        onClick={() => {
                          setCodEnabled(!codEnabled)
                          onToggleCod?.(!codEnabled)
                        }}
                        className="w-full text-left p-4 rounded-xl transition-all"
                        style={{
                          background: codEnabled ? `${c.secondary500}08` : c.bgPrimary,
                          border: `2px solid ${codEnabled ? c.secondary500 : '#f0ebe4'}`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0"
                            style={{ borderColor: codEnabled ? c.secondary500 : c.earth300 }}
                          >
                            {codEnabled && <Check className="w-3 h-3" style={{ color: c.secondary500 }} />}
                          </div>
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: codEnabled ? `${c.secondary500}12` : '#f5f0ea' }}
                          >
                            <IndianRupee className="w-5 h-5" style={{ color: codEnabled ? c.secondary500 : c.earth300 }} />
                          </div>
                          <div className="flex-1">
                            <span
                              className="text-sm font-bold"
                              style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                            >
                              {codConfig.label}
                            </span>
                            <p className="text-xs mt-0.5" style={{ color: c.earth400 }}>
                              {codConfig.feeLabel}
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => onSelectShipping?.(selectedShippingId)}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all"
                    style={{ background: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = c.primary400)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = c.primary500)}
                  >
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── Step 4: Payment & Review ── */}
              {activeStepId === 'payment' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: c.primary50 }}
                    >
                      <CreditCard className="w-5 h-5" style={{ color: c.primary500 }} />
                    </div>
                    <h2
                      className="text-lg font-bold"
                      style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                    >
                      Payment & Review
                    </h2>
                  </div>

                  {/* Order review */}
                  <div
                    className="rounded-xl p-4 mb-5"
                    style={{ background: c.bgPrimary, border: '1px solid #f0ebe4' }}
                  >
                    <h3
                      className="text-sm font-bold mb-3"
                      style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Review Your Order
                    </h3>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 py-2"
                        style={{ borderBottom: '1px solid #f0ebe4' }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                          style={{ border: '1px solid #f0ebe4' }}
                        >
                          <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate" style={{ color: c.earth700 }}>
                            {item.productName}
                          </p>
                          <p className="text-[10px]" style={{ color: c.earth300 }}>
                            × {item.quantity}
                          </p>
                        </div>
                        <span className="text-xs font-bold" style={{ color: c.earth700 }}>
                          {formatPrice(item.price * item.quantity, item.currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Payment methods */}
                  <div className="mb-6">
                    <h3
                      className="text-sm font-bold mb-3"
                      style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Payment Method
                    </h3>
                    {isIndian ? (
                      <div
                        className="p-4 rounded-xl flex items-center gap-3"
                        style={{ background: c.primary50, border: `1.5px solid ${c.primary400}30` }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: c.bgCard }}
                        >
                          <CreditCard className="w-5 h-5" style={{ color: c.primary500 }} />
                        </div>
                        <div>
                          <span
                            className="text-sm font-bold"
                            style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                          >
                            Razorpay
                          </span>
                          <p className="text-xs" style={{ color: c.earth400 }}>
                            UPI, Cards, Netbanking, Wallets
                          </p>
                        </div>
                        <ShieldCheck className="w-5 h-5 ml-auto" style={{ color: c.primary500 }} />
                      </div>
                    ) : (
                      <div
                        className="p-4 rounded-xl flex items-center gap-3"
                        style={{ background: c.primary50, border: `1.5px solid ${c.primary400}30` }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: c.bgCard }}
                        >
                          <CreditCard className="w-5 h-5" style={{ color: c.primary500 }} />
                        </div>
                        <div>
                          <span
                            className="text-sm font-bold"
                            style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                          >
                            Stripe
                          </span>
                          <p className="text-xs" style={{ color: c.earth400 }}>
                            Credit/Debit Cards
                          </p>
                        </div>
                        <ShieldCheck className="w-5 h-5 ml-auto" style={{ color: c.primary500 }} />
                      </div>
                    )}
                  </div>

                  {/* Grand total + Place Order */}
                  <div className="h-px mb-4" style={{ background: c.gradientAccent }} />
                  <div className="flex justify-between items-center mb-5">
                    <span
                      className="text-lg font-bold"
                      style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                    >
                      Total to Pay
                    </span>
                    <span
                      className="text-xl font-bold"
                      style={{ color: c.primary500, fontFamily: "'Lora', serif" }}
                    >
                      {formatPrice(orderSummary.grandTotal, orderSummary.currency)}
                    </span>
                  </div>

                  <button
                    onClick={() => onPlaceOrder?.()}
                    className="w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all duration-200"
                    style={{
                      background: c.gradientAccent,
                      fontFamily: "'Open Sans', sans-serif",
                      boxShadow: '0 4px 14px rgba(1, 63, 71, 0.25)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(1, 63, 71, 0.35)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(1, 63, 71, 0.25)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <ShieldCheck className="w-5 h-5" /> Place Order
                  </button>

                  <p
                    className="text-[11px] text-center mt-3"
                    style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══ Right: Order Summary ═══ */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <MiniCartSummary
              items={items}
              orderSummary={orderSummary}
              appliedCoupon={appliedCoupon}
              giftCardBalance={giftCardBalance}
              prepaidDiscount={prepaidDiscount}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
