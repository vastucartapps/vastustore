// Storefront & Navigation Types

export interface HeroSlide {
  id: string
  imageUrl: string
  heading: string
  subtext: string
  ctaLabel: string
  ctaLink: string
  order: number
}

export interface CategoryCard {
  id: string
  name: string
  imageUrl: string
  slug: string
  productCount: number
}

export interface CategoryHero {
  name: string
  description: string
  imageUrl: string
  slug: string
  productCount: number
}

export interface Breadcrumb {
  label: string
  href: string | null
}

export interface SortOption {
  value: string
  label: string
}

export interface ProductCard {
  id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  mrp?: number
  currency: string
  rating: number
  reviewCount: number
  variantCount?: number
  isNew?: boolean
  inStock: boolean
}

export interface DealProduct extends ProductCard {
  discountPercent: number
  expiresAt: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  location: string
  avatarUrl: string | null
  rating: number
  type: 'review' | 'testimonial'
  productName?: string
}

export interface TrustBadge {
  id: string
  label: string
  sublabel: string
  icon: 'truck' | 'shield' | 'refresh' | 'badge-check'
}

export interface HomepageProps {
  heroSlides: HeroSlide[]
  categories: CategoryCard[]
  featuredProducts: ProductCard[]
  newArrivals: ProductCard[]
  bestsellers: ProductCard[]
  deals: DealProduct[]
  testimonials: Testimonial[]
  trustBadges: TrustBadge[]
  onHeroCtaClick?: (link: string) => void
  onCategoryClick?: (slug: string) => void
  onProductClick?: (slug: string) => void
  onQuickView?: (productId: string) => void
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
  onNewsletterSubscribe?: (email: string) => void
}

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterGroup {
  id: string
  label: string
  type: 'checkbox' | 'range' | 'rating' | 'toggle'
  min?: number
  max?: number
  options?: FilterOption[]
}

export interface CategoryListingProps {
  categoryHero: CategoryHero
  breadcrumbs: Breadcrumb[]
  pageTitle?: string
  products: ProductCard[]
  totalCount: number
  currentPage: number
  totalPages: number
  filterGroups: FilterGroup[]
  activeFilters: Record<string, any>
  sortOptions: Array<{ value: string; label: string }>
  currentSort: string
  onFilterChange?: (filterId: string, values: any) => void
  onPriceRangeChange?: (min: number, max: number) => void
  onClearFilters?: () => void
  onSortChange?: (sortValue: string) => void
  onPageChange?: (page: number) => void
  onProductClick?: (slug: string) => void
  onQuickView?: (productId: string) => void
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
}

export interface SearchSuggestion {
  type: 'product' | 'category' | 'query'
  label: string
  imageUrl?: string
  price?: number
  slug?: string
}

// Product Experience Types

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

/** Props for the Product Detail Page view */
export interface ProductDetailProps {
  product: Product
  images: ProductImage[]
  variants: ProductVariant[]
  variantAttributes: VariantAttribute[]
  richContent: RichContentBlock[]
  specificationGroups: SpecificationGroup[]
  faqs: ProductFAQ[]
  questions: ProductQuestion[]
  reviews: ProductReview[]
  ratingBreakdown: RatingBreakdown
  relatedProducts: RelatedProduct[]
  breadcrumbs: Breadcrumb[]

  /** Called when user clicks add to cart */
  onAddToCart?: (variantId: string, quantity: number) => void
  /** Called when user toggles wishlist */
  onToggleWishlist?: (productId: string) => void
  /** Called when user shares via a channel */
  onShare?: (channel: 'whatsapp' | 'facebook' | 'pinterest' | 'copy') => void
  /** Called when user selects a variant */
  onVariantChange?: (variantId: string) => void
  /** Called when user submits a question */
  onAskQuestion?: (question: string) => void
  /** Called when user clicks a related product */
  onProductClick?: (slug: string) => void
  /** Called when user clicks quick view on a related product */
  onQuickView?: (productId: string) => void
  /** Called when user clicks a breadcrumb */
  onBreadcrumbClick?: (href: string) => void
  /** Called when user clicks the review count anchor */
  onScrollToReviews?: () => void
}

/** Props for the Quick View modal */
export interface QuickViewProps {
  product: Product
  images: ProductImage[]
  variants: ProductVariant[]
  variantAttributes: VariantAttribute[]
  isOpen: boolean

  /** Called when user closes the modal */
  onClose?: () => void
  /** Called when user adds to cart from quick view */
  onAddToCart?: (variantId: string, quantity: number) => void
  /** Called when user clicks "View Full Details" */
  onViewFullDetails?: (slug: string) => void
  /** Called when user selects a variant */
  onVariantChange?: (variantId: string) => void
}
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

// Customer Dashboard Types

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

/** Available or expired coupon */
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
  isActive: boolean
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

/** Props for the Customer Dashboard */
export interface CustomerDashboardProps {
  userProfile: UserProfile
  dashboardStats: DashboardStats
  orders: Order[]
  addresses: Address[]
  wishlistItems: WishlistItem[]
  coupons: Coupon[]
  loyaltyBalance: LoyaltyBalance
  loyaltyTransactions: LoyaltyTransaction[]
  bookings: Booking[]
  giftCards: GiftCard[]
  notifications: Notification[]
  supportInfo: SupportInfo
  newArrivals: NewArrival[]
  offers: DashboardOffer[]

  /** Called when user updates their profile */
  onUpdateProfile?: (data: Partial<UserProfile>) => void
  /** Called when user changes their password */
  onChangePassword?: (currentPassword: string, newPassword: string) => void
  /** Called when user logs out all sessions */
  onLogoutAll?: () => void
  /** Called when user logs out */
  onLogout?: () => void

  /** Called when user clicks an order to view detail */
  onViewOrder?: (orderId: string) => void
  /** Called when user clicks to download invoice */
  onDownloadInvoice?: (orderId: string) => void
  /** Called when user clicks tracking link */
  onTrackOrder?: (orderId: string) => void

  /** Called when user adds a new address */
  onAddAddress?: (address: Omit<Address, 'id' | 'isDefault'>) => void
  /** Called when user edits an address */
  onEditAddress?: (addressId: string, data: Partial<Address>) => void
  /** Called when user deletes an address */
  onDeleteAddress?: (addressId: string) => void
  /** Called when user sets an address as default */
  onSetDefaultAddress?: (addressId: string) => void

  /** Called when user adds wishlist item to cart */
  onAddToCart?: (productId: string) => void
  /** Called when user removes item from wishlist */
  onRemoveFromWishlist?: (itemId: string) => void
  /** Called when user clicks notify me for out-of-stock */
  onNotifyMe?: (productId: string) => void
  /** Called when user clicks a wishlist product */
  onViewProduct?: (slug: string) => void

  /** Called when user copies a coupon code */
  onCopyCoupon?: (code: string) => void

  /** Called when user redeems loyalty points */
  onRedeemPoints?: (points: number) => void

  /** Called when user clicks a booking meeting link */
  onJoinMeeting?: (bookingId: string) => void
  /** Called when user books a new consultation */
  onBookConsultation?: () => void

  /** Called when user checks gift card balance */
  onCheckGiftCardBalance?: (code: string) => void

  /** Called when user clicks a notification */
  onNotificationClick?: (notificationId: string, link: string) => void
  /** Called when user marks all notifications as read */
  onMarkAllRead?: () => void
  /** Called when user marks a single notification as read */
  onMarkRead?: (notificationId: string) => void

  /** Called when user navigates to a dashboard section */
  onNavigate?: (section: DashboardSection) => void
}

// Admin Overview Dashboard Types

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

/** Props for the Admin Overview Dashboard */
export interface AdminOverviewDashboardProps {
  stats: DashboardStat[]
  revenueBars: RevenueBar[]
  recentOrders: RecentOrder[]
  quickActions: QuickAction[]
  alerts: Alert[]
  timePeriod: TimePeriod

  /** Called when admin changes the time period filter */
  onTimePeriodChange?: (period: TimePeriod) => void
  /** Called when admin clicks a stat card */
  onStatClick?: (linkTo: string) => void
  /** Called when admin clicks an order row */
  onViewOrder?: (orderId: string) => void
  /** Called when admin updates an order's status inline */
  onUpdateOrderStatus?: (orderId: string, status: OrderStatus) => void
  /** Called when admin clicks a quick-action button */
  onQuickAction?: (href: string) => void
  /** Called when admin clicks an alert item */
  onAlertClick?: (linkTo: string) => void
  /** Called when admin dismisses an alert */
  onDismissAlert?: (alertId: string) => void
}

/** A recent order row in the admin dashboard */
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

// Admin Product Management Types

/** Product status for admin */
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

/** Admin rich content block (simplified for admin wizard) */
export interface AdminRichContentBlock {
  id: string
  type: string
  title: string
  content?: string
  imageUrl?: string
  headline?: string
  description?: string
}

/** Product specification */
export interface ProductSpec {
  id: string
  label: string
  value: string
  group: string
}

/** Product FAQ for admin */
export interface AdminProductFAQ {
  id: string
  question: string
  answer: string
}

/** Product SEO data */
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

/** Admin product list item */
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

/** Full product detail for admin wizard */
export interface ProductDetail extends AdminProduct {
  description: string
  shortDescription: string
  variants: AdminProductVariant[]
  images: AdminProductImage[]
  richContent: AdminRichContentBlock[]
  specs: ProductSpec[]
  faqs: AdminProductFAQ[]
  seo: ProductSEO
  merchantCentre: MerchantCentreData
  tags: string[]
  hsnCode: string
  gstRate: number
}

/** Category option for filters */
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

/** Product filter state */
export interface ProductFilters {
  search: string
  status: ProductStatus | 'all'
  category: string
  stockLevel: StockLevel | 'all'
}

/** Props for Product List view */
export interface ProductListProps {
  products: AdminProduct[]
  categories: CategoryOption[]
  filters: ProductFilters
  viewMode: ViewMode
  totalCount: number

  onChangeViewMode?: (mode: ViewMode) => void
  onChangeFilters?: (filters: Partial<ProductFilters>) => void
  onSearch?: (query: string) => void
  onAddProduct?: () => void
  onEditProduct?: (productId: string) => void
  onDuplicateProduct?: (productId: string) => void
  onDeleteProduct?: (productId: string) => void
  onBulkAction?: (action: BulkAction, productIds: string[]) => void
  onImportCSV?: (file: File) => void
  onExportCSV?: () => void
}

/** Props for Product Wizard view */
export interface ProductWizardProps {
  product: ProductDetail | null
  categories: CategoryOption[]
  currentStep: WizardStep
  isEditing: boolean

  onStepChange?: (step: WizardStep) => void
  onSaveDraft?: (data: Partial<ProductDetail>) => void
  onPublish?: (data: Partial<ProductDetail>) => void
  onCancel?: () => void
  onBack?: () => void
}

/** Props for Admin Product Management */
export interface AdminProductManagementProps {
  products: AdminProduct[]
  categories: CategoryOption[]
  editingProduct: ProductDetail | null
  filters: ProductFilters
  viewMode: ViewMode
  totalCount: number

  onChangeViewMode?: (mode: ViewMode) => void
  onChangeFilters?: (filters: Partial<ProductFilters>) => void
  onSearch?: (query: string) => void
  onAddProduct?: () => void
  onEditProduct?: (productId: string) => void
  onDuplicateProduct?: (productId: string) => void
  onDeleteProduct?: (productId: string) => void
  onBulkAction?: (action: BulkAction, productIds: string[]) => void
  onImportCSV?: (file: File) => void
  onExportCSV?: () => void
  onSaveDraft?: (data: Partial<ProductDetail>) => void
  onPublish?: (data: Partial<ProductDetail>) => void
  onCancelEdit?: () => void
}
