/** A line item in the shopping cart */
export interface CartItem {
  id: string
  productId: string
  productName: string
  productSlug: string
  variantId: string
  variantLabel: string
  imageUrl: string
  price: number
  mrp: number
  currency: 'INR' | 'USD'
  quantity: number
  maxQuantity: number
  inStock: boolean
}

/** A discount coupon */
export interface Coupon {
  id: string
  code: string
  description: string
  discountType: 'percentage' | 'flat'
  discountValue: number
  maxDiscount: number | null
  minOrderValue: number
  currency: 'INR' | 'USD'
  validUntil: string
  isApplicable: boolean
}

/** Applied coupon summary */
export interface AppliedCoupon {
  code: string
  discountAmount: number
  description: string
}

/** Gift card balance info */
export interface GiftCardBalance {
  code: string
  balance: number
  appliedAmount: number
  currency: 'INR' | 'USD'
}

/** Saved address */
export interface Address {
  id: string
  name: string
  phone: string
  street: string
  city: string
  state: string
  pincode: string
  country: string
  isDefault: boolean
  label: 'Home' | 'Office' | 'Other'
}

/** Shipping method option */
export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  currency: 'INR' | 'USD'
  estimatedDays: string
  isFree: boolean
  freeAbove: number | null
}

/** COD configuration */
export interface CodConfig {
  available: boolean
  fee: number
  currency: 'INR' | 'USD'
  minOrder: number
  maxOrder: number
  label: string
  feeLabel: string
}

/** Prepaid discount config */
export interface PrepaidDiscount {
  enabled: boolean
  percentage: number
  maxDiscount: number
  label: string
}

/** Calculated order summary */
export interface OrderSummary {
  subtotal: number
  mrpTotal: number
  totalSavings: number
  couponDiscount: number
  giftCardApplied: number
  prepaidDiscount: number
  shippingFee: number
  codFee: number
  taxAmount: number
  grandTotal: number
  currency: 'INR' | 'USD'
  itemCount: number
}

/** Contact info captured at Step 1 */
export interface ContactInfo {
  email: string
  phone: string
  countryCode: string
  isIndian: boolean
}

/** Checkout step state */
export type CheckoutStepStatus = 'completed' | 'active' | 'upcoming'

export interface CheckoutStep {
  id: 'contact' | 'address' | 'shipping' | 'payment'
  label: string
  status: CheckoutStepStatus
}

/** Order confirmation after successful payment */
export interface OrderConfirmation {
  orderId: string
  orderDate: string
  estimatedDelivery: string
  paymentMethod: string
  totalPaid: number
  currency: 'INR' | 'USD'
  email: string
  phone: string
  shippingAddress: string
}

/** Related product for upsell carousel */
export interface RelatedProduct {
  id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  mrp: number
  currency: 'INR' | 'USD'
  rating: number
  reviewCount: number
  isNew: boolean
  inStock: boolean
}

/** Empty cart state content */
export interface EmptyCartState {
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}

/** Props for the Cart Drawer */
export interface CartDrawerProps {
  items: CartItem[]
  subtotal: number
  currency: 'INR' | 'USD'
  isOpen: boolean

  /** Called when user closes the drawer */
  onClose?: () => void
  /** Called when user updates item quantity */
  onUpdateQuantity?: (itemId: string, quantity: number) => void
  /** Called when user removes an item */
  onRemoveItem?: (itemId: string) => void
  /** Called when user clicks proceed to checkout */
  onProceedToCheckout?: () => void
  /** Called when user clicks an item to view it */
  onViewProduct?: (slug: string) => void
}

/** Props for the Full Cart Page */
export interface CartPageProps {
  items: CartItem[]
  orderSummary: OrderSummary
  availableCoupons: Coupon[]
  appliedCoupon: AppliedCoupon | null
  giftCardBalance: GiftCardBalance | null
  prepaidDiscount: PrepaidDiscount
  emptyCartState: EmptyCartState

  /** Called when user updates item quantity */
  onUpdateQuantity?: (itemId: string, quantity: number) => void
  /** Called when user removes an item */
  onRemoveItem?: (itemId: string) => void
  /** Called when user applies a coupon code */
  onApplyCoupon?: (code: string) => void
  /** Called when user removes applied coupon */
  onRemoveCoupon?: () => void
  /** Called when user applies a gift card code */
  onApplyGiftCard?: (code: string) => void
  /** Called when user clicks proceed to checkout */
  onProceedToCheckout?: () => void
  /** Called when user clicks an item to view it */
  onViewProduct?: (slug: string) => void
  /** Called when user clicks continue shopping */
  onContinueShopping?: () => void
}

/** Props for the Checkout flow */
export interface CheckoutProps {
  items: CartItem[]
  orderSummary: OrderSummary
  checkoutSteps: CheckoutStep[]
  savedAddresses: Address[]
  shippingMethods: ShippingMethod[]
  codConfig: CodConfig
  prepaidDiscount: PrepaidDiscount
  appliedCoupon: AppliedCoupon | null
  giftCardBalance: GiftCardBalance | null
  contactInfo: ContactInfo | null

  /** Called when user submits contact info (Step 1) */
  onSubmitContact?: (email: string, phone: string, countryCode: string) => void
  /** Called when user selects a saved address */
  onSelectAddress?: (addressId: string) => void
  /** Called when user adds a new address */
  onAddAddress?: (address: Omit<Address, 'id' | 'isDefault'>) => void
  /** Called when user selects a shipping method */
  onSelectShipping?: (methodId: string) => void
  /** Called when user toggles COD */
  onToggleCod?: (enabled: boolean) => void
  /** Called when user places the order */
  onPlaceOrder?: () => void
  /** Called when user navigates back a step */
  onBack?: () => void
  /** Called when user navigates to a specific step */
  onGoToStep?: (stepId: string) => void
}

/** Props for the Order Confirmation page */
export interface OrderConfirmationProps {
  confirmation: OrderConfirmation
  relatedProducts: RelatedProduct[]

  /** Called when user clicks download invoice */
  onDownloadInvoice?: () => void
  /** Called when user clicks continue shopping */
  onContinueShopping?: () => void
  /** Called when user clicks a related product */
  onProductClick?: (slug: string) => void
}
