// =============================================================================
// VastuCart — Combined UI Data Shapes
// All entity interfaces aggregated from per-section types.ts files.
// Props interfaces are excluded — see each section's types.ts for those.
// =============================================================================

// From: sections/authentication-and-onboarding
// -----------------------------------------------------------------------------

/** User account with authentication details */
export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
  isEmailVerified: boolean
  avatarUrl: string | null
  createdAt: string
  lastLoginAt: string
}

/** Active login session record */
export interface ActiveSession {
  id: string
  device: string
  ipAddress: string
  location: string
  lastActive: string
  isCurrent: boolean
}

/** Admin-configurable marketing content for auth page split-screen */
export interface MarketingSlide {
  id: string
  imageUrl: string
  quote: string
  attribution: string
  isActive: boolean
  order: number
}

/** Password validation rule for strength meter */
export interface PasswordRequirement {
  label: string
  key: 'minLength' | 'uppercase' | 'lowercase' | 'number' | 'special'
}

/** Guest checkout to account conversion prompt */
export interface GuestConversion {
  email: string
  orderNumber: string
  orderTotal: string
  message: string
}

/** Email verification banner */
export interface VerificationBanner {
  message: string
  actionLabel: string
  isDismissible: boolean
}

/** Password strength level */
export type PasswordStrength = 'weak' | 'medium' | 'strong'

/** Auth page view */
export type AuthView = 'login' | 'register' | 'forgot-password' | 'reset-password' | 'guest-conversion'

// From: sections/storefront-and-navigation
// -----------------------------------------------------------------------------

/** Announcement ribbon at the top of the storefront */
export interface StorefrontAnnouncement {
  message: string
  link: string | null
  isActive: boolean
}

/** Full-width homepage hero banner slide */
export interface HeroSlide {
  id: string
  imageUrl: string
  heading: string
  subtext: string
  ctaLabel: string
  ctaLink: string
  order: number
}

/** Category card for the homepage grid */
export interface CategoryCard {
  id: string
  name: string
  imageUrl: string
  slug: string
  productCount: number
}

/** Product card for grids and carousels */
export interface ProductCard {
  id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  mrp: number
  currency: 'INR' | 'USD'
  rating: number
  reviewCount: number
  variantCount: number
  isNew: boolean
  inStock: boolean
}

/** Product with deal/discount info and countdown */
export interface DealProduct extends ProductCard {
  discountPercent: number
  expiresAt: string
}

/** Admin-curated testimonial or highlighted review */
export interface Testimonial {
  id: string
  quote: string
  name: string
  location: string
  avatarUrl: string | null
  rating: number
  type: 'review' | 'testimonial'
  productName: string | null
}

/** Trust/reassurance badge */
export interface TrustBadge {
  id: string
  label: string
  sublabel: string
  icon: 'truck' | 'shield' | 'refresh' | 'badge-check'
}

/** Filter option within a filter group */
export interface FilterOption {
  label: string
  value: string
  count: number
}

/** Sidebar filter group */
export interface FilterGroup {
  id: string
  label: string
  type: 'checkbox' | 'range' | 'rating' | 'toggle'
  min: number
  max: number
  options: FilterOption[]
}

/** Sort dropdown option */
export interface SortOption {
  label: string
  value: string
}

/** Breadcrumb navigation item */
export interface Breadcrumb {
  label: string
  href: string | null
}

/** Search autocomplete suggestion */
export interface SearchSuggestion {
  type: 'product' | 'category' | 'query'
  label: string
  imageUrl: string | null
  price: number | null
  slug: string | null
}

/** Static content page */
export interface StaticPage {
  id: string
  title: string
  slug: string
  excerpt: string
}

/** Category hero banner info (admin-managed) */
export interface CategoryHero {
  name: string
  description: string
  imageUrl: string
  slug: string
  productCount: number
}

// From: sections/product-experience
// -----------------------------------------------------------------------------

/** Product image in the gallery */
export interface ProductImage {
  id: string
  url: string
  alt: string
  type: 'primary' | 'gallery' | 'variant'
  order: number
}

/** A purchasable product variant */
export interface ProductVariant {
  id: string
  attributes: Record<string, string>
  sku: string
  price: number
  mrp: number
  inStock: boolean
  stockCount: number
  colorSwatch: string | null
}

/** Variant attribute definition for the selector UI */
export interface VariantAttribute {
  name: string
  label: string
  type: 'dropdown' | 'swatch'
  values: string[] | SwatchValue[]
}

export interface SwatchValue {
  value: string
  color: string
}

/** A+ hero image block */
export interface RichContentHero {
  id: string
  type: 'hero'
  title: string
  imageUrl: string
  headline: string
  description: string
}

/** A+ comparison table block */
export interface RichContentComparison {
  id: string
  type: 'comparison'
  title: string
  products: ComparisonProduct[]
  metrics: ComparisonMetric[]
}

export interface ComparisonProduct {
  asin: string
  name: string
  imageUrl: string
  isCurrentProduct: boolean
}

export interface ComparisonMetric {
  label: string
  values: (boolean | string)[]
}

export type RichContentBlock = RichContentHero | RichContentComparison

/** Specification group with key-value pairs */
export interface SpecificationGroup {
  groupName: string
  specs: { key: string; value: string }[]
}

/** Admin-managed FAQ */
export interface ProductFAQ {
  id: string
  question: string
  answer: string
}

/** Customer-submitted Q&A */
export interface ProductQuestion {
  id: string
  question: string
  askedBy: string
  askedAt: string
  answer: string | null
  answeredBy: string | null
  answeredAt: string | null
  isAdminAnswer: boolean
}

/** Customer review */
export interface ProductReview {
  id: string
  rating: number
  title: string
  text: string
  reviewerName: string
  reviewerLocation: string
  isVerifiedPurchase: boolean
  photos: string[]
  createdAt: string
  variant: string
}

/** Rating breakdown summary */
export interface RatingBreakdown {
  average: number
  total: number
  distribution: Record<string, number>
}

/** Product card for related products carousel */
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
  variantCount: number
  isNew: boolean
  inStock: boolean
}

/** Core product data for the detail page */
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  currency: 'INR' | 'USD'
  price: number
  mrp: number
  discountPercent: number
  rating: number
  reviewCount: number
  inStock: boolean
  sku: string
  isNew: boolean
  expressShipping: boolean
  deliveryEstimate: string
  returnPolicy: string
}

// From: sections/cart-and-checkout
// -----------------------------------------------------------------------------

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

/** Empty cart state content */
export interface EmptyCartState {
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}

// From: sections/customer-dashboard
// -----------------------------------------------------------------------------

/** Customer profile info */
export interface UserProfile {
  id: string
  name: string
  email: string
  emailVerified: boolean
  phone: string
  avatarUrl: string
  memberSince: string
  currency: 'INR' | 'USD'
}

/** Quick stats for dashboard home */
export interface DashboardStats {
  totalOrders: number
  loyaltyPoints: number
  wishlistItems: number
  activeCoupons: number
}

/** An order item within an order */
export interface OrderItem {
  id: string
  productName: string
  variantLabel: string
  imageUrl: string
  quantity: number
  price: number
  currency: 'INR' | 'USD'
}

/** A step in the order tracking timeline */
export type TimelineStepStatus = 'completed' | 'active' | 'upcoming' | 'cancelled'

export interface OrderTimelineStep {
  step: string
  status: TimelineStepStatus
  date: string | null
}

/** Order status */
export type OrderStatus =
  | 'processing'
  | 'accepted'
  | 'shipped'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'

/** A placed order */
export interface Order {
  id: string
  orderNumber: string
  orderDate: string
  status: OrderStatus
  itemCount: number
  total: number
  currency: 'INR' | 'USD'
  paymentMethod: string
  shippingAddress: string
  trackingNumber: string | null
  trackingUrl: string | null
  estimatedDelivery: string | null
  items: OrderItem[]
  timeline: OrderTimelineStep[]
}

/** Wishlist product item */
export interface WishlistItem {
  id: string
  productId: string
  productName: string
  productSlug: string
  imageUrl: string
  price: number
  mrp: number
  currency: 'INR' | 'USD'
  inStock: boolean
  rating: number
  reviewCount: number
}

/** Loyalty points balance */
export interface LoyaltyBalance {
  points: number
  equivalentValue: number
  currency: 'INR' | 'USD'
  earnRate: string
  redeemRate: string
  minRedemption: number
  expiringPoints: number
  expiringDate: string
}

/** Loyalty transaction */
export type LoyaltyTransactionType = 'earned' | 'redeemed' | 'adjusted'

export interface LoyaltyTransaction {
  id: string
  date: string
  description: string
  type: LoyaltyTransactionType
  points: number
  balance: number
}

/** Booking status */
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

/** Consultation booking */
export interface Booking {
  id: string
  title: string
  date: string
  time: string
  status: BookingStatus
  meetingLink: string | null
  consultantName: string
  price: number
  currency: 'INR' | 'USD'
}

/** Gift card */
export interface GiftCard {
  id: string
  code: string
  balance: number
  originalAmount: number
  currency: 'INR' | 'USD'
  expiryDate: string
  isActive: boolean
}

/** Notification type */
export type NotificationType = 'order' | 'promotion' | 'stock' | 'loyalty'

/** In-app notification */
export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  date: string
  isRead: boolean
  link: string
}

/** Support info and FAQ links */
export interface SupportInfo {
  email: string
  phone: string
  whatsapp: string
  hours: string
  faqLinks: { label: string; href: string }[]
}

/** Sidebar navigation item */
export type DashboardSection =
  | 'home'
  | 'orders'
  | 'addresses'
  | 'wishlist'
  | 'coupons'
  | 'loyalty'
  | 'bookings'
  | 'gift-cards'
  | 'notifications'
  | 'support'

/** A new arrival product for the dashboard */
export interface NewArrival {
  id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  mrp: number
  currency: 'INR' | 'USD'
  badge: string
}

/** A promotional offer / banner */
export interface DashboardOffer {
  id: string
  title: string
  description: string
  code: string | null
  imageUrl: string
  badgeLabel: string
  badgeColor: 'primary' | 'secondary' | 'green'
  ctaLabel: string
  ctaHref: string
}

// From: sections/admin-overview-dashboard
// -----------------------------------------------------------------------------

/** Time period filter for dashboard data */
export type TimePeriod = 'today' | 'week' | 'month'

/** Display format for stat values */
export type StatFormat = 'number' | 'currency'

/** Icon identifier for stat cards and quick actions */
export type IconName =
  | 'shopping-bag'
  | 'indian-rupee'
  | 'clock'
  | 'alert-triangle'
  | 'users'
  | 'star'
  | 'plus-circle'
  | 'shopping-cart'
  | 'ticket'

/** A dashboard stat card */
export interface DashboardStat {
  id: string
  label: string
  value: number
  previousValue: number
  format: StatFormat
  currency?: 'INR' | 'USD'
  icon: IconName
  linkTo: string
}

/** A single bar in the revenue chart */
export interface RevenueBar {
  date: string
  label: string
  amount: number
}

/** A recent order row in the dashboard */
export interface RecentOrder {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  total: number
  currency: 'INR' | 'USD'
  status: OrderStatus
  itemCount: number
  date: string
}

/** Quick action button color */
export type QuickActionColor = 'primary' | 'secondary'

/** A quick-action shortcut */
export interface QuickAction {
  id: string
  label: string
  icon: IconName
  href: string
  color: QuickActionColor
}

/** Alert type */
export type AlertType = 'low_stock' | 'pending_review' | 'new_return'

/** Alert severity */
export type AlertSeverity = 'critical' | 'warning' | 'info'

/** A dashboard alert/warning item */
export interface Alert {
  id: string
  type: AlertType
  title: string
  message: string
  severity: AlertSeverity
  linkTo: string
  meta: Record<string, number>
}

// From: sections/admin-product-management
// -----------------------------------------------------------------------------

/** Product status */
export type ProductStatus = 'active' | 'inactive' | 'draft'

/** Stock level category */
export type StockLevel = 'in_stock' | 'low_stock' | 'out_of_stock'

/** Admin product variant */
export interface AdminProductVariant {
  id: string
  sku: string
  label: string
  price: number
  mrp: number
  currency: 'INR' | 'USD'
  stock: number
  stockLevel: StockLevel
}

/** Admin product image */
export interface AdminProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  sortOrder: number
}

/** Rich content block (A+ content) */
export type RichContentBlockType = 'text' | 'image' | 'image_text' | 'comparison' | 'banner'

export interface AdminRichContentBlock {
  id: string
  type: RichContentBlockType
  title: string
  content: string
  imageUrl?: string
}

/** Product specification */
export interface ProductSpec {
  id: string
  label: string
  value: string
  group: string
}

/** SEO data */
export interface ProductSEO {
  metaTitle: string
  metaDescription: string
  urlSlug: string
  canonicalUrl: string
}

/** Google Merchant Centre fields */
export interface MerchantCentreData {
  gtin: string
  mpn: string
  brand: string
  condition: 'new' | 'refurbished' | 'used'
  ageGroup: string
  gender: string
  googleCategory: string
}

/** A product in the admin list */
export interface AdminProduct {
  id: string
  name: string
  sku: string
  category: string
  categoryId: string
  status: ProductStatus
  price: number
  mrp: number
  currency: 'INR' | 'USD'
  stock: number
  stockLevel: StockLevel
  imageUrl: string
  rating: number
  reviewCount: number
  variantCount: number
  createdAt: string
  updatedAt: string
}

/** Full product detail for the wizard */
export interface AdminProductDetail extends AdminProduct {
  description: string
  shortDescription: string
  variants: AdminProductVariant[]
  images: AdminProductImage[]
  richContent: AdminRichContentBlock[]
  specs: ProductSpec[]
  faqs: ProductFAQ[]
  seo: ProductSEO
  merchantCentre: MerchantCentreData
  tags: string[]
  hsnCode: string
  gstRate: number
}

/** Available category for filter/selection */
export interface CategoryOption {
  id: string
  name: string
  parentName: string | null
}

/** Wizard step */
export type WizardStep =
  | 'basic'
  | 'variants'
  | 'images'
  | 'rich-content'
  | 'specs'
  | 'faqs'
  | 'seo'
  | 'merchant'

/** Bulk action type */
export type BulkAction = 'delete' | 'activate' | 'deactivate' | 'export'

/** View mode for product list */
export type ViewMode = 'grid' | 'table'

/** Filter state */
export interface ProductFilters {
  search: string
  status: ProductStatus | 'all'
  category: string
  stockLevel: StockLevel | 'all'
}

// From: sections/admin-category-management
// -----------------------------------------------------------------------------

/** Category status */
export type CategoryStatus = 'active' | 'inactive'

/** A category node in the tree */
export interface Category {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  parentId: string | null
  parentName: string | null
  status: CategoryStatus
  productCount: number
  displayOrder: number
  children: Category[]
  seo: {
    metaTitle: string
    metaDescription: string
  }
  createdAt: string
  updatedAt: string
}

/** Flat category option for parent dropdown */
export interface CategoryTreeOption {
  id: string
  name: string
  depth: number
}

// From: sections/admin-order-management
// -----------------------------------------------------------------------------

/** Payment method */
export type PaymentMethod = 'razorpay' | 'stripe' | 'cod' | 'upi' | 'netbanking' | 'wallet'

/** Payment status */
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded'

/** Date range preset */
export type DatePreset = 'today' | '7days' | '30days' | 'custom'

/** Sort field */
export type OrderSortField = 'date' | 'total' | 'status' | 'customer'

/** Sort direction */
export type SortDirection = 'asc' | 'desc'

/** An admin order item */
export interface AdminOrderItem {
  id: string
  productName: string
  variantLabel: string
  imageUrl: string
  quantity: number
  price: number
  lineTotal: number
  currency: 'INR' | 'USD'
}

/** A timeline event */
export interface TimelineEvent {
  id: string
  status: OrderStatus
  label: string
  timestamp: string | null
  note: string | null
  isCompleted: boolean
  isCurrent: boolean
}

/** An internal note */
export interface OrderNote {
  id: string
  author: string
  message: string
  createdAt: string
}

/** Customer info for order */
export interface OrderCustomer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
}

/** Shipping address */
export interface ShippingAddress {
  name: string
  phone: string
  street: string
  city: string
  state: string
  pincode: string
  country: string
}

/** Payment details */
export interface PaymentDetails {
  method: PaymentMethod
  status: PaymentStatus
  transactionId: string
  amount: number
  currency: 'INR' | 'USD'
  paidAt: string | null
}

/** An order in the admin list table */
export interface OrderRow {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  itemCount: number
  total: number
  currency: 'INR' | 'USD'
  status: OrderStatus
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  date: string
}

/** Full admin order detail */
export interface OrderDetail {
  id: string
  orderNumber: string
  status: OrderStatus
  customer: OrderCustomer
  shippingAddress: ShippingAddress
  payment: PaymentDetails
  items: AdminOrderItem[]
  timeline: TimelineEvent[]
  notes: OrderNote[]
  subtotal: number
  discount: number
  shippingFee: number
  tax: number
  total: number
  currency: 'INR' | 'USD'
  trackingNumber: string | null
  trackingUrl: string | null
  carrier: string | null
  createdAt: string
  updatedAt: string
}

/** Order filter state */
export interface OrderFilters {
  search: string
  status: OrderStatus | 'all'
  datePreset: DatePreset
  dateFrom: string
  dateTo: string
  sortField: OrderSortField
  sortDirection: SortDirection
}

/** Pagination state */
export interface Pagination {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
}

// From: sections/admin-returns-and-refunds
// -----------------------------------------------------------------------------

/** Return request status */
export type ReturnStatus = 'pending' | 'under_review' | 'approved' | 'refunded' | 'rejected'

/** Refund type */
export type RefundType = 'full' | 'partial'

/** Refund method */
export type RefundMethod = 'original_payment' | 'store_credit'

/** Return reason */
export type ReturnReason =
  | 'defective'
  | 'wrong_item'
  | 'not_as_described'
  | 'changed_mind'
  | 'size_issue'
  | 'damaged_in_transit'
  | 'other'

/** A return request card for the Kanban board */
export interface ReturnCard {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  productName: string
  productImageUrl: string
  variantLabel: string
  reason: ReturnReason
  status: ReturnStatus
  refundAmount: number
  currency: 'INR' | 'USD'
  requestedAt: string
  daysOpen: number
}

/** Customer-uploaded return photo */
export interface ReturnPhoto {
  id: string
  url: string
  caption: string
}

/** Timeline event for a return */
export interface ReturnTimelineEvent {
  id: string
  action: string
  author: string
  note: string | null
  timestamp: string
}

/** Full return detail */
export interface ReturnDetail {
  id: string
  orderNumber: string
  orderId: string
  status: ReturnStatus
  customer: {
    id: string
    name: string
    email: string
    phone: string
  }
  product: {
    id: string
    name: string
    variantLabel: string
    imageUrl: string
    quantity: number
    price: number
    currency: 'INR' | 'USD'
  }
  reason: ReturnReason
  customerNotes: string
  photos: ReturnPhoto[]
  adminNotes: string
  refundType: RefundType | null
  refundAmount: number
  refundMethod: RefundMethod | null
  isWithinReturnWindow: boolean
  returnWindowDays: number
  timeline: ReturnTimelineEvent[]
  requestedAt: string
  resolvedAt: string | null
}

// From: sections/admin-customer-management
// -----------------------------------------------------------------------------

/** Customer segment */
export type CustomerSegment = 'new' | 'repeat' | 'inactive' | 'high_value'

/** A customer row in the list table */
export interface CustomerRow {
  id: string
  name: string
  email: string
  phone: string
  avatarUrl: string
  totalOrders: number
  lifetimeValue: number
  currency: 'INR' | 'USD'
  segments: CustomerSegment[]
  joinedAt: string
}

/** Customer order summary */
export interface CustomerOrder {
  id: string
  orderNumber: string
  total: number
  currency: 'INR' | 'USD'
  status: string
  date: string
  itemCount: number
}

/** Customer address */
export interface CustomerAddress {
  id: string
  label: 'Home' | 'Office' | 'Other'
  street: string
  city: string
  state: string
  pincode: string
  country: string
  isDefault: boolean
}

/** Customer review */
export interface CustomerReview {
  id: string
  productName: string
  productImageUrl: string
  rating: number
  excerpt: string
  date: string
}

/** Admin note */
export interface AdminNote {
  id: string
  author: string
  message: string
  createdAt: string
}

/** Full customer detail */
export interface CustomerDetail {
  id: string
  name: string
  email: string
  emailVerified: boolean
  phone: string
  avatarUrl: string
  joinedAt: string
  lastOrderAt: string | null
  totalOrders: number
  lifetimeValue: number
  averageOrderValue: number
  currency: 'INR' | 'USD'
  loyaltyPoints: number
  segments: CustomerSegment[]
  recentOrders: CustomerOrder[]
  addresses: CustomerAddress[]
  reviews: CustomerReview[]
  notes: AdminNote[]
}

/** Customer filter state */
export interface CustomerFilters {
  search: string
  segment: CustomerSegment | 'all'
  sortField: 'name' | 'totalOrders' | 'lifetimeValue' | 'joinedAt'
  sortDirection: 'asc' | 'desc'
}

// From: sections/admin-reviews-and-qa-moderation
// -----------------------------------------------------------------------------

/** Review moderation status */
export type ReviewStatus = 'pending' | 'approved' | 'rejected'

/** Q&A status */
export type QAStatus = 'unanswered' | 'answered'

/** Active main tab */
export type ModerationTab = 'reviews' | 'qa'

/** A review for moderation */
export interface ReviewItem {
  id: string
  customerName: string
  customerEmail: string
  productId: string
  productName: string
  productImageUrl: string
  rating: number
  title: string
  text: string
  photos: string[]
  isVerifiedPurchase: boolean
  status: ReviewStatus
  adminResponse: string | null
  createdAt: string
}

/** A product Q&A item */
export interface QAItem {
  id: string
  customerName: string
  productId: string
  productName: string
  productImageUrl: string
  question: string
  answer: string | null
  answeredBy: string | null
  status: QAStatus
  createdAt: string
  answeredAt: string | null
}

/** Bulk action */
export type ReviewBulkAction = 'approve' | 'reject'

// From: sections/admin-coupons-and-gift-cards
// -----------------------------------------------------------------------------

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

// From: sections/admin-bookings-and-consultations
// -----------------------------------------------------------------------------

/** Consultation type */
export type ConsultationType = 'vastu_home' | 'vastu_office' | 'vastu_plot' | 'general'

/** View mode */
export type BookingsViewMode = 'calendar' | 'list'

/** Day of week */
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

/** Slot duration in minutes */
export type SlotDuration = 30 | 45 | 60

/** A booking row */
export interface BookingRow {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  consultationType: ConsultationType
  date: string
  startTime: string
  endTime: string
  duration: SlotDuration
  status: BookingStatus
  meetingLink: string | null
  notes: string
}

/** Calendar day with booking count */
export interface CalendarDay {
  date: string
  bookingCount: number
  isBlocked: boolean
  isToday: boolean
}

/** Time slot configuration */
export interface TimeSlotConfig {
  enabledDays: DayOfWeek[]
  startTime: string
  endTime: string
  slotDuration: SlotDuration
  bufferMinutes: number
  maxBookingsPerDay: number
}

/** Blocked date */
export interface BlockedDate {
  id: string
  date: string
  reason: string
}

// From: sections/admin-shipping-and-delivery
// -----------------------------------------------------------------------------

/** Shipping zone */
export interface ShippingZone {
  id: string
  name: string
  rate: number
  currency: 'INR' | 'USD'
  isEnabled: boolean
}

/** Free shipping config */
export interface FreeShippingConfig {
  enabled: boolean
  thresholdINR: number
  thresholdUSD: number
}

/** COD config (admin) */
export interface AdminCODConfig {
  enabled: boolean
  fee: number
  minOrder: number
  maxOrder: number
}

/** Delivery estimate rule */
export interface DeliveryEstimate {
  id: string
  region: string
  pincodePrefix: string
  minDays: number
  maxDays: number
}

// From: sections/admin-payments-and-tax
// -----------------------------------------------------------------------------

export type PaymentMode = 'test' | 'live'

export interface GatewayConfig {
  razorpay: { keyId: string; keySecret: string; isConnected: boolean }
  stripe: { publishableKey: string; secretKey: string; isConnected: boolean }
}

export interface PaymentMethodToggle {
  id: string
  name: string
  icon: string
  enabled: boolean
  description: string
}

export type TaxTab = 'gst' | 'international' | 'per-product'

export interface GSTConfig {
  gstin: string
  defaultRate: number
  defaultHSN: string
}

export interface InternationalTaxConfig {
  taxExempt: boolean
  lutNumber: string
}

export interface ProductTaxOverride {
  productId: string
  productName: string
  sku: string
  gstRate: number
  hsnCode: string
}

// From: sections/admin-storefront-and-content
// -----------------------------------------------------------------------------

/** Announcement ribbon schedule */
export interface AnnouncementSchedule {
  startDate: string
  endDate: string
}

/** Announcement ribbon configuration */
export interface AdminAnnouncement {
  message: string
  linkText: string
  linkUrl: string
  bgColor: string
  textColor: string
  isActive: boolean
  schedule: AnnouncementSchedule
}

/** Store branding settings */
export interface Branding {
  storeName: string
  tagline: string
  contactEmail: string
  contactPhone: string
  address: string
  logoUrl: string
  faviconUrl: string
}

/** Homepage section item */
export interface HomepageSection {
  id: string
  name: string
  type: string
  enabled: boolean
  order: number
}

/** Content page */
export interface ContentPage {
  id: string
  title: string
  slug: string
  lastUpdated: string
  isPublished: boolean
  excerpt: string
}

/** Footer link */
export interface FooterLink {
  label: string
  url: string
}

/** Footer column */
export interface FooterColumn {
  title: string
  links: FooterLink[]
}

/** Footer configuration */
export interface FooterConfig {
  columns: FooterColumn[]
  copyrightText: string
  showSocialLinks: boolean
}

// From: sections/admin-integrations-and-seo
// -----------------------------------------------------------------------------

/** Status of an integration connection */
export type IntegrationStatus = 'active' | 'error' | 'inactive'

/** Tab within the Integrations & SEO section */
export type IntegrationTab = 'integrations' | 'seo'

/** A third-party integration */
export interface Integration {
  id: string
  name: string
  icon: string
  description: string
  isConnected: boolean
  status: IntegrationStatus
  configFields: Record<string, string>
  lastSynced: string | null
}

/** Site-wide SEO defaults */
export interface SEODefaults {
  siteTitleTemplate: string
  metaDescription: string
  robotsTxt: string
  sitemapEnabled: boolean
  sitemapLastGenerated: string
}

/** Open Graph and social card defaults */
export interface OpenGraphDefaults {
  defaultImage: string
  defaultTitle: string
  defaultDescription: string
  twitterHandle: string
}

/** A marketing/performance tag */
export interface MarketingTag {
  id: string
  name: string
  platform: string
  pixelId: string
  isActive: boolean
}

// From: sections/admin-loyalty-and-rewards
// -----------------------------------------------------------------------------

/** Adjustment type */
export type AdjustmentType = 'credit' | 'debit'

/** Loyalty tier definition */
export interface LoyaltyTier {
  id: string
  name: string
  minPoints: number
  multiplier: number
  benefits: string[]
  color: string
}

/** Points configuration */
export interface PointsConfig {
  pointsPerRupee: number
  pointsPerDollar: number
  minRedemptionPoints: number
  pointsExpiryDays: number
  pointsValueINR: number
  pointsValueUSD: number
}

/** Recent points adjustment record */
export interface PointsAdjustment {
  id: string
  customerName: string
  customerEmail: string
  type: AdjustmentType
  points: number
  reason: string
  adjustedBy: string
  date: string
}

/** Program statistics */
export interface LoyaltyStats {
  totalPointsIssued: number
  totalPointsRedeemed: number
  totalPointsExpired: number
  activeMembers: number
}

// From: sections/admin-notifications-and-communication
// -----------------------------------------------------------------------------

export type ChannelTab = 'email' | 'sms' | 'whatsapp' | 'push' | 'inapp'

export type AnnouncementType = 'banner' | 'modal' | 'toast'
export type TargetAudience = 'all' | 'new' | 'returning' | 'vip'

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  description: string
  isActive: boolean
  lastEdited: string
  triggerEvent: string
}

export interface ChannelTemplate {
  id: string
  name: string
  template: string
  triggerEvent: string
  isActive: boolean
}

export interface SMSConfig {
  provider: string
  apiKey: string
  senderId: string
  isEnabled: boolean
  templates: ChannelTemplate[]
}

export interface WhatsAppConfig {
  provider: string
  phoneNumber: string
  isEnabled: boolean
  templates: ChannelTemplate[]
}

export interface PushConfig {
  isEnabled: boolean
  vapidPublicKey: string
  templates: ChannelTemplate[]
}

export interface InAppAnnouncement {
  id: string
  title: string
  message: string
  targetAudience: TargetAudience
  startDate: string
  endDate: string
  isActive: boolean
  type: AnnouncementType
}

export interface NotificationIntegrationConfig {
  listmonk: { url: string; isConnected: boolean }
  chatwoot: { url: string; isConnected: boolean; widgetToken: string }
}

// From: sections/admin-ecosystem-ads
// -----------------------------------------------------------------------------

export type AdTab = 'banners' | 'placements' | 'analytics' | 'social'
export type BannerStatus = 'draft' | 'scheduled' | 'live' | 'expired'
export type AspectRatio = '1:1' | '16:9' | '9:16' | '16:3' | '4:3' | '2:3'
export type SocialPlatform = 'pinterest' | 'instagram' | 'facebook' | 'twitter' | 'threads'

export interface BannerCreative {
  ratio: AspectRatio
  imageUrl: string
  width: number
  height: number
}

export interface Banner {
  id: string
  name: string
  headline: string
  ctaText: string
  ctaUrl: string
  status: BannerStatus
  isActive: boolean
  startDate: string
  endDate: string
  priority: number
  productIds: string[]
  productNames: string[]
  creatives: BannerCreative[]
  placements: string[]
  impressions: number
  clicks: number
  createdAt: string
}

export interface PlacementSlot {
  id: string
  name: string
  ratio: AspectRatio
  isActive: boolean
  currentBannerId: string | null
  currentBannerName: string | null
}

export interface EcosystemSite {
  id: string
  subdomain: string
  displayName: string
  isActive: boolean
  slots: PlacementSlot[]
}

export interface BannerAnalytics {
  bannerId: string
  bannerName: string
  site: string
  impressions: number
  clicks: number
  ctr: number
  period: string
}

export interface AnalyticsSummary {
  totalImpressions: number
  totalClicks: number
  avgCtr: number
  activeBanners: number
}

export interface SocialAccount {
  platform: SocialPlatform
  isConnected: boolean
  username: string
  displayName: string
  preferredRatio: AspectRatio
}

export interface SocialPostMeta {
  title: string
  headline: string
  description: string
  linkUrl: string
  ctaText: string
  hashtags: string
  altText: string
}

export interface SocialPost {
  id: string
  bannerId: string
  bannerName: string
  platform: SocialPlatform
  postUrl: string
  status: 'published' | 'pending' | 'failed'
  publishedAt: string
  caption: string
  meta: SocialPostMeta
}
