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
