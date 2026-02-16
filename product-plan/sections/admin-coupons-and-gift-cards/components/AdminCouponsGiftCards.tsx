import React, { useState } from 'react'
import {
  Search, Plus, Edit2, Trash2, Power, ChevronLeft, Calendar,
  TrendingUp, Users, Tag, ShoppingCart, CreditCard, ArrowRight, Sparkles
} from 'lucide-react'
import type {
  AdminCouponsGiftCardsProps,
  CouponRow,
  CouponDetail,
  CouponStatus,
  DiscountType,
  GiftCardRow,
  GiftCardDetail,
  GiftCardTransaction
} from '../types'

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

const formatCurrency = (amount: number, currency: 'INR' | 'USD'): string => {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  }
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

const generateCouponCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

const generateGiftCardCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'GC-'
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) code += '-'
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// ===== Status Badge =====
interface StatusBadgeProps {
  status: CouponStatus | 'active' | 'inactive' | 'expired' | 'depleted'
}

function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    active: { bg: c.successLight, text: c.success, label: 'Active' },
    expired: { bg: c.earth300 + '20', text: c.earth500, label: 'Expired' },
    disabled: { bg: c.errorLight, text: c.error, label: 'Disabled' },
    inactive: { bg: c.earth300 + '20', text: c.earth500, label: 'Inactive' },
    depleted: { bg: c.errorLight, text: c.error, label: 'Depleted' },
  }
  const badge = colors[status as keyof typeof colors]

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 500,
        fontFamily: fonts.body,
        backgroundColor: badge.bg,
        color: badge.text,
      }}
    >
      {badge.label}
    </span>
  )
}

// ===== Coupon Row Component =====
interface CouponRowCompProps {
  coupon: CouponRow
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

function CouponRowComp({ coupon, onEdit, onDelete, onToggle }: CouponRowCompProps) {
  const discountBadge = coupon.discountType === 'percentage'
    ? `${coupon.discountValue}% OFF`
    : formatCurrency(coupon.discountValue, coupon.currency)

  const usageText = coupon.usageLimit
    ? `${coupon.usedCount}/${coupon.usageLimit}`
    : `${coupon.usedCount}/∞`

  const usagePercent = coupon.usageLimit
    ? Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)
    : Math.min((coupon.usedCount / 500) * 100, 100)

  return (
    <tr style={{ borderBottom: `1px solid ${c.subtle}` }}>
      <td style={{ padding: '16px 12px' }}>
        <div style={{ fontFamily: fonts.mono, fontSize: '15px', fontWeight: 600, color: c.earth700 }}>
          {coupon.code}
        </div>
      </td>
      <td style={{ padding: '16px 12px' }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: fonts.body,
          background: c.gradient,
          color: c.card,
        }}>
          {discountBadge}
        </span>
      </td>
      <td style={{ padding: '16px 12px', fontSize: '14px', color: c.earth600, fontFamily: fonts.body }}>
        {coupon.minOrder ? formatCurrency(coupon.minOrder, coupon.currency) : '—'}
      </td>
      <td style={{ padding: '16px 12px', fontSize: '14px', color: c.earth600, fontFamily: fonts.body }}>
        {coupon.maxDiscount ? formatCurrency(coupon.maxDiscount, coupon.currency) : '—'}
      </td>
      <td style={{ padding: '16px 12px', fontSize: '14px', color: c.earth600, fontFamily: fonts.body }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>{formatDate(coupon.startDate)}</span>
          <ArrowRight size={14} color={c.earth400} />
          <span>{formatDate(coupon.endDate)}</span>
        </div>
      </td>
      <td style={{ padding: '16px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '100px' }}>
          <div style={{ fontSize: '13px', fontFamily: fonts.mono, color: c.earth600 }}>
            {usageText}
          </div>
          <div style={{
            width: '100%',
            height: '4px',
            borderRadius: '2px',
            background: c.subtle,
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${usagePercent}%`,
              height: '100%',
              background: c.gradient,
              transition: 'width 0.2s'
            }} />
          </div>
        </div>
      </td>
      <td style={{ padding: '16px 12px' }}>
        <StatusBadge status={coupon.status} />
      </td>
      <td style={{ padding: '16px 12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onEdit(coupon.id)}
            style={{
              padding: '6px',
              border: 'none',
              borderRadius: '6px',
              background: c.primary50,
              color: c.primary500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onToggle(coupon.id)}
            style={{
              padding: '6px',
              border: 'none',
              borderRadius: '6px',
              background: coupon.status === 'active' ? c.warningLight : c.successLight,
              color: coupon.status === 'active' ? c.warning : c.success,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={coupon.status === 'active' ? 'Disable' : 'Enable'}
          >
            <Power size={16} />
          </button>
          <button
            onClick={() => onDelete(coupon.id)}
            style={{
              padding: '6px',
              border: 'none',
              borderRadius: '6px',
              background: c.errorLight,
              color: c.error,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}

// ===== Coupon Form Component =====
interface CouponFormProps {
  coupon: CouponDetail | null
  categories?: { id: string; name: string }[]
  onSave: (data: Partial<CouponDetail>) => void
  onCancel: () => void
}

function CouponForm({ coupon, categories = [], onSave, onCancel }: CouponFormProps) {
  const [code, setCode] = useState(coupon?.code || '')
  const [description, setDescription] = useState(coupon?.description || '')
  const [discountType, setDiscountType] = useState<DiscountType>(coupon?.discountType || 'percentage')
  const [discountValue, setDiscountValue] = useState(coupon?.discountValue || 0)
  const [minOrder, setMinOrder] = useState<number | null>(coupon?.minOrder || null)
  const [maxDiscount, setMaxDiscount] = useState<number | null>(coupon?.maxDiscount || null)
  const [currency, setCurrency] = useState<'INR' | 'USD'>(coupon?.currency || 'INR')
  const [startDate, setStartDate] = useState(coupon?.startDate || new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(coupon?.endDate || '')
  const [usageLimit, setUsageLimit] = useState<number | null>(coupon?.usageLimit || null)
  const [usageLimitPerCustomer, setUsageLimitPerCustomer] = useState(coupon?.usageLimitPerCustomer || 1)
  const [targetType, setTargetType] = useState<'all' | 'products' | 'categories'>(coupon?.targetType || 'all')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(coupon?.targetCategoryIds || [])

  const handleSubmit = () => {
    const data: Partial<CouponDetail> = {
      code: code.toUpperCase(),
      description,
      discountType,
      discountValue,
      minOrder,
      maxDiscount,
      currency,
      startDate,
      endDate,
      usageLimit,
      usageLimitPerCustomer,
      targetType,
      targetCategoryIds: targetType === 'categories' ? selectedCategories : [],
    }
    onSave(data)
  }

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px',
      background: c.bg,
      fontFamily: fonts.body,
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={onCancel}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            background: c.card,
            color: c.earth600,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          fontFamily: fonts.heading,
          color: c.earth700,
          margin: 0,
        }}>
          {coupon ? 'Edit Coupon' : 'Create Coupon'}
        </h1>
      </div>

      {/* Basic Info */}
      <div style={{
        background: c.card,
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '16px',
        boxShadow: c.shadow,
        borderTop: `3px solid transparent`,
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          fontFamily: fonts.heading,
          color: c.earth700,
          marginTop: 0,
          marginBottom: '16px',
        }}>
          Basic Information
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: c.earth600,
              marginBottom: '6px',
            }}>
              Coupon Code
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. SAVE20"
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: `1px solid ${c.subtle}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: fonts.mono,
                  fontWeight: 600,
                  color: c.earth700,
                }}
              />
              <button
                onClick={() => setCode(generateCouponCode())}
                style={{
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  background: c.primary50,
                  color: c.primary500,
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={16} />
                Auto-generate
              </button>
            </div>
          </div>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: c.earth600,
              marginBottom: '6px',
            }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this coupon"
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.subtle}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: fonts.body,
                color: c.earth700,
                resize: 'vertical',
              }}
            />
          </div>
        </div>
      </div>

      {/* Discount Rules */}
      <div style={{
        background: c.card,
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '16px',
        boxShadow: c.shadow,
        borderTop: `3px solid transparent`,
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          fontFamily: fonts.heading,
          color: c.earth700,
          marginTop: 0,
          marginBottom: '16px',
        }}>
          Discount Rules
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: c.earth600,
              marginBottom: '8px',
            }}>
              Discount Type
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  checked={discountType === 'percentage'}
                  onChange={() => setDiscountType('percentage')}
                  style={{ accentColor: c.primary500 }}
                />
                <span style={{ fontSize: '14px', color: c.earth700 }}>Percentage</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  checked={discountType === 'flat'}
                  onChange={() => setDiscountType('flat')}
                  style={{ accentColor: c.primary500 }}
                />
                <span style={{ fontSize: '14px', color: c.earth700 }}>Flat Amount</span>
              </label>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: c.earth600,
                marginBottom: '6px',
              }}>
                {discountType === 'percentage' ? 'Percentage Value' : 'Discount Amount'}
              </label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                placeholder={discountType === 'percentage' ? '20' : '500'}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${c.subtle}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: fonts.body,
                  color: c.earth700,
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: c.earth600,
                marginBottom: '6px',
              }}>
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD')}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${c.subtle}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: fonts.body,
                  color: c.earth700,
                  background: c.card,
                }}
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: c.earth600,
                marginBottom: '6px',
              }}>
                Minimum Order Value
              </label>
              <input
                type="number"
                value={minOrder || ''}
                onChange={(e) => setMinOrder(parseFloat(e.target.value) || null)}
                placeholder="0 = no minimum"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${c.subtle}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: fonts.body,
                  color: c.earth700,
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: c.earth600,
                marginBottom: '6px',
              }}>
                Maximum Discount
              </label>
              <input
                type="number"
                value={maxDiscount || ''}
                onChange={(e) => setMaxDiscount(parseFloat(e.target.value) || null)}
                placeholder="0 = no max"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${c.subtle}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: fonts.body,
                  color: c.earth700,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Validity */}
      <div style={{
        background: c.card,
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '16px',
        boxShadow: c.shadow,
        borderTop: `3px solid transparent`,
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          fontFamily: fonts.heading,
          color: c.earth700,
          marginTop: 0,
          marginBottom: '16px',
        }}>
          Validity Period
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: c.earth600,
              marginBottom: '6px',
            }}>
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.subtle}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: fonts.body,
                color: c.earth700,
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: c.earth600,
              marginBottom: '6px',
            }}>
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.subtle}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: fonts.body,
                color: c.earth700,
              }}
            />
          </div>
        </div>
      </div>

      {/* Usage Limits */}
      <div style={{
        background: c.card,
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '16px',
        boxShadow: c.shadow,
        borderTop: `3px solid transparent`,
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          fontFamily: fonts.heading,
          color: c.earth700,
          marginTop: 0,
          marginBottom: '16px',
        }}>
          Usage Limits
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: c.earth600,
              marginBottom: '6px',
            }}>
              Total Usage Limit
            </label>
            <input
              type="number"
              value={usageLimit || ''}
              onChange={(e) => setUsageLimit(parseInt(e.target.value) || null)}
              placeholder="0 = unlimited"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.subtle}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: fonts.body,
                color: c.earth700,
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: c.earth600,
              marginBottom: '6px',
            }}>
              Per Customer Limit
            </label>
            <input
              type="number"
              value={usageLimitPerCustomer}
              onChange={(e) => setUsageLimitPerCustomer(parseInt(e.target.value) || 1)}
              placeholder="1"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.subtle}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: fonts.body,
                color: c.earth700,
              }}
            />
          </div>
        </div>
      </div>

      {/* Targeting */}
      <div style={{
        background: c.card,
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: c.shadow,
        borderTop: `3px solid transparent`,
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          fontFamily: fonts.heading,
          color: c.earth700,
          marginTop: 0,
          marginBottom: '16px',
        }}>
          Target Products
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              checked={targetType === 'all'}
              onChange={() => setTargetType('all')}
              style={{ accentColor: c.primary500 }}
            />
            <span style={{ fontSize: '14px', color: c.earth700 }}>All Products</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              checked={targetType === 'categories'}
              onChange={() => setTargetType('categories')}
              style={{ accentColor: c.primary500 }}
            />
            <span style={{ fontSize: '14px', color: c.earth700 }}>Specific Categories</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              checked={targetType === 'products'}
              onChange={() => setTargetType('products')}
              style={{ accentColor: c.primary500 }}
            />
            <span style={{ fontSize: '14px', color: c.earth700 }}>Specific Products</span>
          </label>
        </div>
        {targetType === 'categories' && (
          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: c.bg,
            borderRadius: '6px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '8px',
          }}>
            {categories.length > 0 ? categories.map(cat => (
              <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  style={{ accentColor: c.primary500 }}
                />
                <span style={{ fontSize: '14px', color: c.earth700 }}>{cat.name}</span>
              </label>
            )) : (
              <p style={{ fontSize: '14px', color: c.earth400, margin: 0 }}>No categories available</p>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            background: 'transparent',
            color: c.earth600,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            background: c.gradient,
            color: c.card,
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {coupon ? 'Save Changes' : 'Create Coupon'}
        </button>
      </div>
    </div>
  )
}

// ===== Gift Card Row Component =====
interface GiftCardRowCompProps {
  giftCard: GiftCardRow
  onView: (id: string) => void
  onToggle: (id: string) => void
}

function GiftCardRowComp({ giftCard, onView, onToggle }: GiftCardRowCompProps) {
  const balancePercent = (giftCard.currentBalance / giftCard.initialBalance) * 100

  return (
    <tr style={{ borderBottom: `1px solid ${c.subtle}` }}>
      <td style={{ padding: '16px 12px' }}>
        <div style={{ fontFamily: fonts.mono, fontSize: '14px', fontWeight: 600, color: c.earth700 }}>
          {giftCard.code}
        </div>
      </td>
      <td style={{ padding: '16px 12px', fontSize: '14px', color: c.earth600, fontFamily: fonts.body }}>
        {formatCurrency(giftCard.initialBalance, giftCard.currency)}
      </td>
      <td style={{ padding: '16px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '140px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: fonts.body, color: c.earth700 }}>
            {formatCurrency(giftCard.currentBalance, giftCard.currency)}
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            borderRadius: '3px',
            background: c.subtle,
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${balancePercent}%`,
              height: '100%',
              background: c.gradient,
              transition: 'width 0.2s'
            }} />
          </div>
        </div>
      </td>
      <td style={{ padding: '16px 12px' }}>
        <StatusBadge status={giftCard.status} />
      </td>
      <td style={{ padding: '16px 12px', fontSize: '14px', color: c.earth600, fontFamily: fonts.body }}>
        {giftCard.expiresAt ? formatDate(giftCard.expiresAt) : 'Never'}
      </td>
      <td style={{ padding: '16px 12px', fontSize: '14px', color: c.earth600, fontFamily: fonts.body }}>
        {formatDate(giftCard.createdAt)}
      </td>
      <td style={{ padding: '16px 12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onView(giftCard.id)}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              background: c.primary50,
              color: c.primary500,
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            View
          </button>
          <button
            onClick={() => onToggle(giftCard.id)}
            style={{
              padding: '6px',
              border: 'none',
              borderRadius: '6px',
              background: giftCard.status === 'active' ? c.warningLight : c.successLight,
              color: giftCard.status === 'active' ? c.warning : c.success,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={giftCard.status === 'active' ? 'Deactivate' : 'Activate'}
          >
            <Power size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}

// ===== Gift Card Detail Component =====
interface GiftCardDetailProps {
  giftCard: GiftCardDetail
  onBack: () => void
}

function GiftCardDetailComp({ giftCard, onBack }: GiftCardDetailProps) {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px',
      background: c.bg,
      fontFamily: fonts.body,
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            background: c.card,
            color: c.earth600,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          fontFamily: fonts.heading,
          color: c.earth700,
          margin: 0,
        }}>
          Gift Card: {giftCard.code}
        </h1>
      </div>

      {/* Summary Card */}
      <div style={{
        background: c.card,
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: c.shadow,
        borderTop: `3px solid transparent`,
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '13px', color: c.earth400, marginBottom: '4px' }}>Code</div>
            <div style={{ fontSize: '16px', fontWeight: 600, fontFamily: fonts.mono, color: c.earth700 }}>
              {giftCard.code}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: c.earth400, marginBottom: '4px' }}>Status</div>
            <StatusBadge status={giftCard.status} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: c.earth400, marginBottom: '4px' }}>Initial Balance</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: c.earth700 }}>
              {formatCurrency(giftCard.initialBalance, giftCard.currency)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: c.earth400, marginBottom: '4px' }}>Current Balance</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: c.primary500 }}>
              {formatCurrency(giftCard.currentBalance, giftCard.currency)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: c.earth400, marginBottom: '4px' }}>Customer</div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: c.earth700 }}>
              {giftCard.customerName || 'Not assigned'}
            </div>
            {giftCard.customerEmail && (
              <div style={{ fontSize: '13px', color: c.earth500 }}>{giftCard.customerEmail}</div>
            )}
          </div>
          <div>
            <div style={{ fontSize: '13px', color: c.earth400, marginBottom: '4px' }}>Expires</div>
            <div style={{ fontSize: '15px', color: c.earth700 }}>
              {giftCard.expiresAt ? formatDate(giftCard.expiresAt) : 'Never'}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div style={{
        background: c.card,
        borderRadius: '8px',
        padding: '24px',
        boxShadow: c.shadow,
        borderTop: `3px solid transparent`,
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          fontFamily: fonts.heading,
          color: c.earth700,
          marginTop: 0,
          marginBottom: '16px',
        }}>
          Transaction History
        </h2>
        {giftCard.transactions.length === 0 ? (
          <p style={{ fontSize: '14px', color: c.earth400, margin: 0 }}>No transactions yet</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${c.subtle}` }}>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: c.earth500,
                  fontFamily: fonts.body,
                }}>
                  Date
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: c.earth500,
                  fontFamily: fonts.body,
                }}>
                  Type
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: c.earth500,
                  fontFamily: fonts.body,
                }}>
                  Amount
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: c.earth500,
                  fontFamily: fonts.body,
                }}>
                  Description
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: c.earth500,
                  fontFamily: fonts.body,
                }}>
                  Order
                </th>
              </tr>
            </thead>
            <tbody>
              {giftCard.transactions.map(tx => (
                <tr key={tx.id} style={{ borderBottom: `1px solid ${c.subtle}` }}>
                  <td style={{ padding: '12px', fontSize: '14px', color: c.earth600 }}>
                    {formatDateTime(tx.date)}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: tx.type === 'credit' ? c.successLight : c.errorLight,
                      color: tx.type === 'credit' ? c.success : c.error,
                    }}>
                      {tx.type === 'credit' ? 'Credit' : 'Debit'}
                    </span>
                  </td>
                  <td style={{
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: fonts.body,
                    color: tx.type === 'credit' ? c.success : c.error,
                  }}>
                    {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount, tx.currency)}
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px', color: c.earth600 }}>
                    {tx.description}
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    {tx.orderId ? (
                      <a
                        href={`#/orders/${tx.orderId}`}
                        style={{ color: c.primary500, textDecoration: 'none', fontWeight: 500 }}
                      >
                        #{tx.orderId.slice(0, 8)}
                      </a>
                    ) : (
                      <span style={{ color: c.earth400 }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

// ===== Create Gift Card Modal =====
interface CreateGiftCardModalProps {
  onClose: () => void
  onCreate: (balance: number, currency: 'INR' | 'USD', expiresAt?: string) => void
}

function CreateGiftCardModal({ onClose, onCreate }: CreateGiftCardModalProps) {
  const [code, setCode] = useState(generateGiftCardCode())
  const [balance, setBalance] = useState(1000)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')
  const [expiresAt, setExpiresAt] = useState('')

  const handleCreate = () => {
    onCreate(balance, currency, expiresAt || undefined)
    onClose()
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: c.card,
        borderRadius: '8px',
        padding: '24px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: c.shadow,
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          fontFamily: fonts.heading,
          color: c.earth700,
          marginTop: 0,
          marginBottom: '16px',
        }}>
          Create Gift Card
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: c.earth600,
              marginBottom: '6px',
            }}>
              Gift Card Code
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: `1px solid ${c.subtle}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: fonts.mono,
                  fontWeight: 600,
                  color: c.earth700,
                }}
              />
              <button
                onClick={() => setCode(generateGiftCardCode())}
                style={{
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  background: c.primary50,
                  color: c.primary500,
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={16} />
                Regenerate
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: c.earth600,
                marginBottom: '6px',
              }}>
                Initial Balance
              </label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${c.subtle}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: fonts.body,
                  color: c.earth700,
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: c.earth600,
                marginBottom: '6px',
              }}>
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD')}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${c.subtle}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: fonts.body,
                  color: c.earth700,
                  background: c.card,
                }}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: c.earth600,
              marginBottom: '6px',
            }}>
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.subtle}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: fonts.body,
                color: c.earth700,
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              background: 'transparent',
              color: c.earth600,
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              background: c.gradient,
              color: c.card,
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Create Gift Card
          </button>
        </div>
      </div>
    </div>
  )
}

// ===== Main Component =====
export function AdminCouponsGiftCards(props: AdminCouponsGiftCardsProps) {
  const {
    coupons,
    giftCards,
    editingCoupon,
    giftCardDetail,
    activeTab,
    couponStatusFilter,
    searchQuery,
    onChangeTab = () => {},
    onChangeCouponStatus = () => {},
    onSearch = () => {},
    onCreateCoupon = () => {},
    onEditCoupon = () => {},
    onDeleteCoupon = () => {},
    onToggleCoupon = () => {},
    onSaveCoupon = () => {},
    onCancelCouponEdit = () => {},
    onCreateGiftCard = () => {},
    onViewGiftCard = () => {},
    onToggleGiftCard = () => {},
    onBackFromGiftCard = () => {},
  } = props

  const [showCreateGiftCardModal, setShowCreateGiftCardModal] = useState(false)

  // Show coupon form if editing
  if (editingCoupon !== null) {
    return (
      <CouponForm
        coupon={editingCoupon}
        categories={[
          { id: '1', name: 'Yantras' },
          { id: '2', name: 'Crystals' },
          { id: '3', name: 'Rudraksha' },
          { id: '4', name: 'Idols' },
        ]}
        onSave={onSaveCoupon}
        onCancel={onCancelCouponEdit}
      />
    )
  }

  // Show gift card detail if viewing
  if (giftCardDetail !== null) {
    return <GiftCardDetailComp giftCard={giftCardDetail} onBack={onBackFromGiftCard} />
  }

  // Filter coupons
  const filteredCoupons = coupons.filter(coupon => {
    const matchesStatus = couponStatusFilter === 'all' || coupon.status === couponStatusFilter
    const matchesSearch = searchQuery === '' ||
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Filter gift cards
  const filteredGiftCards = giftCards.filter(gc =>
    searchQuery === '' || gc.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{
      fontFamily: fonts.body,
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 700,
          fontFamily: fonts.heading,
          color: c.earth700,
          margin: 0,
          marginBottom: '8px',
        }}>
          Coupons & Gift Cards
        </h1>
        <p style={{ fontSize: '16px', color: c.earth500, margin: 0 }}>
          Manage promotional coupons and gift card balances
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '24px',
        borderBottom: `2px solid ${c.subtle}`,
        marginBottom: '24px',
      }}>
        <button
          onClick={() => onChangeTab('coupons')}
          style={{
            padding: '12px 0',
            border: 'none',
            background: 'transparent',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: fonts.body,
            color: activeTab === 'coupons' ? c.primary500 : c.earth500,
            borderBottom: activeTab === 'coupons' ? `3px solid ${c.primary500}` : '3px solid transparent',
            marginBottom: '-2px',
            cursor: 'pointer',
          }}
        >
          Coupons
        </button>
        <button
          onClick={() => onChangeTab('gift-cards')}
          style={{
            padding: '12px 0',
            border: 'none',
            background: 'transparent',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: fonts.body,
            color: activeTab === 'gift-cards' ? c.primary500 : c.earth500,
            borderBottom: activeTab === 'gift-cards' ? `3px solid ${c.primary500}` : '3px solid transparent',
            marginBottom: '-2px',
            cursor: 'pointer',
          }}
        >
          Gift Cards
        </button>
      </div>

      {/* Coupons Tab */}
      {activeTab === 'coupons' && (
        <>
          {/* Controls */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '16px',
            }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                <Search
                  size={18}
                  color={c.earth400}
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search coupons by code..."
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: `1px solid ${c.subtle}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: fonts.body,
                    color: c.earth700,
                  }}
                />
              </div>
              <button
                onClick={onCreateCoupon}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  background: c.gradient,
                  color: c.card,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus size={18} />
                Create Coupon
              </button>
            </div>

            {/* Status Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(['all', 'active', 'expired', 'disabled'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => onChangeCouponStatus(status)}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    background: couponStatusFilter === status ? c.primary500 : c.card,
                    color: couponStatusFilter === status ? c.card : c.earth600,
                  }}
                >
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Coupons Table */}
          <div style={{
            background: c.card,
            borderRadius: '8px',
            padding: '0',
            boxShadow: c.shadow,
            borderTop: `3px solid transparent`,
            borderImage: c.gradient,
            borderImageSlice: 1,
            overflow: 'hidden',
          }}>
            {filteredCoupons.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <Tag size={48} color={c.earth300} style={{ margin: '0 auto 16px' }} />
                <p style={{ fontSize: '16px', color: c.earth400, margin: 0 }}>
                  {searchQuery ? 'No coupons match your search' : 'No coupons yet'}
                </p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${c.subtle}` }}>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Code
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Discount
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Min Order
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Max Discount
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Valid Period
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Usage
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Status
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.map(coupon => (
                    <CouponRowComp
                      key={coupon.id}
                      coupon={coupon}
                      onEdit={onEditCoupon}
                      onDelete={onDeleteCoupon}
                      onToggle={onToggleCoupon}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {/* Gift Cards Tab */}
      {activeTab === 'gift-cards' && (
        <>
          {/* Controls */}
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '24px',
          }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <Search
                size={18}
                color={c.earth400}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search gift cards by code..."
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  border: `1px solid ${c.subtle}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: fonts.body,
                  color: c.earth700,
                }}
              />
            </div>
            <button
              onClick={() => setShowCreateGiftCardModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                background: c.gradient,
                color: c.card,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Plus size={18} />
              Create Gift Card
            </button>
          </div>

          {/* Gift Cards Table */}
          <div style={{
            background: c.card,
            borderRadius: '8px',
            padding: '0',
            boxShadow: c.shadow,
            borderTop: `3px solid transparent`,
            borderImage: c.gradient,
            borderImageSlice: 1,
            overflow: 'hidden',
          }}>
            {filteredGiftCards.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <CreditCard size={48} color={c.earth300} style={{ margin: '0 auto 16px' }} />
                <p style={{ fontSize: '16px', color: c.earth400, margin: 0 }}>
                  {searchQuery ? 'No gift cards match your search' : 'No gift cards yet'}
                </p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${c.subtle}` }}>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Code
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Initial Balance
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Current Balance
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Status
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Expires
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Created
                    </th>
                    <th style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: c.earth500,
                      fontFamily: fonts.body,
                    }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGiftCards.map(gc => (
                    <GiftCardRowComp
                      key={gc.id}
                      giftCard={gc}
                      onView={onViewGiftCard}
                      onToggle={onToggleGiftCard}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {/* Create Gift Card Modal */}
      {showCreateGiftCardModal && (
        <CreateGiftCardModal
          onClose={() => setShowCreateGiftCardModal(false)}
          onCreate={onCreateGiftCard}
        />
      )}
    </div>
  )
}
