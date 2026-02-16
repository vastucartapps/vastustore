/** Coupon status */
export type CouponStatus = 'active' | 'expired' | 'disabled'

/** Discount type */
export type DiscountType = 'percentage' | 'flat'

/** Gift card status */
export type GiftCardStatus = 'active' | 'inactive' | 'expired' | 'depleted'

/** Active tab */
export type CouponsGiftCardsTab = 'coupons' | 'gift-cards'

/** Currency-specific value */
export interface CurrencyValue {
  INR: number
  USD: number
}

/** A coupon row in the table */
export interface CouponRow {
  id: string
  code: string
  discountType: DiscountType
  discountValue: number
  minOrder: number | null
  maxDiscount: number | null
  currency: 'INR' | 'USD'
  startDate: string
  endDate: string
  usageLimit: number | null
  usageLimitPerCustomer: number
  usedCount: number
  status: CouponStatus
  targetType: 'all' | 'products' | 'categories'
  targetNames: string[]
}

/** Full coupon detail for editing */
export interface CouponDetail extends CouponRow {
  description: string
  currencyValues: CurrencyValue
  targetProductIds: string[]
  targetCategoryIds: string[]
  createdAt: string
  updatedAt: string
}

/** A gift card row */
export interface GiftCardRow {
  id: string
  code: string
  initialBalance: number
  currentBalance: number
  currency: 'INR' | 'USD'
  status: GiftCardStatus
  expiresAt: string | null
  createdAt: string
}

/** Gift card transaction */
export interface GiftCardTransaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  currency: 'INR' | 'USD'
  description: string
  orderId: string | null
  date: string
}

/** Gift card detail */
export interface GiftCardDetail extends GiftCardRow {
  transactions: GiftCardTransaction[]
  customerName: string | null
  customerEmail: string | null
}

/** Props for the Admin Coupons & Gift Cards section */
export interface AdminCouponsGiftCardsProps {
  coupons: CouponRow[]
  giftCards: GiftCardRow[]
  editingCoupon: CouponDetail | null
  giftCardDetail: GiftCardDetail | null
  activeTab: CouponsGiftCardsTab
  couponStatusFilter: CouponStatus | 'all'
  searchQuery: string

  onChangeTab?: (tab: CouponsGiftCardsTab) => void
  onChangeCouponStatus?: (status: CouponStatus | 'all') => void
  onSearch?: (query: string) => void
  onCreateCoupon?: () => void
  onEditCoupon?: (couponId: string) => void
  onDeleteCoupon?: (couponId: string) => void
  onToggleCoupon?: (couponId: string) => void
  onSaveCoupon?: (data: Partial<CouponDetail>) => void
  onCancelCouponEdit?: () => void
  onCreateGiftCard?: (balance: number, currency: 'INR' | 'USD', expiresAt?: string) => void
  onViewGiftCard?: (giftCardId: string) => void
  onToggleGiftCard?: (giftCardId: string) => void
  onBackFromGiftCard?: () => void
}
