# Milestone 06 — Customer Dashboard

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend (Medusa v2 APIs + Supabase)
- Implement loading, error, and empty states
- Every touch point must be functional — no dead buttons, no hardcoded data

The components are props-based — they accept data and fire callbacks. Wire them to Medusa v2 APIs, Supabase auth, and your state management.

---

## Overview

The customer dashboard is the logged-in user's personal hub for managing their account, orders, addresses, wishlist, coupons, loyalty points, bookings, gift cards, notifications, and support. It uses the customer dashboard shell (storefront header + 240px left sidebar) and includes a floating Chatwoot chat widget.

## Key Functionality

- Dashboard home with profile summary, quick-stat cards, recent orders, new arrivals, promotional offers
- My Orders with status filters, order detail with visual timeline tracker and invoice download
- Address book: CRUD operations with default address selection
- Wishlist as product grid with add-to-cart and "Notify Me" for out-of-stock
- Active coupons list with copy-to-clipboard
- Loyalty points balance, earn/redeem info, transaction history, expiry warnings
- Bookings/consultations list with meeting links (always visible in sidebar, conditional content)
- Gift card balance check and display
- Notification center: header dropdown (max 5) + full notifications page with filters
- Support section with Chatwoot widget, recent tickets, FAQ links, contact info

## Components Provided

From `sections/customer-dashboard/components/`:

| Component | Purpose |
|---|---|
| **CustomerDashboard.tsx** | Root dashboard component — manages section routing and sidebar state |
| **DashboardHome.tsx** | Home view — profile card, stat cards, recent orders, new arrivals, offers |
| **DashboardSidebar.tsx** | Left sidebar with avatar, nav items with icons, active state |
| **OrdersList.tsx** | Orders list with status filter tabs, date range, order row cards |
| **OrderDetail.tsx** | Single order detail — items, address, payment, timeline tracker, invoice |
| **AddressBook.tsx** | Address cards grid with add/edit/delete, default selection |
| **WishlistGrid.tsx** | Product grid for wishlist — cards with add-to-cart, remove, notify me |
| **CouponsSection.tsx** | Available and expired coupon cards with code copy, discount info |
| **LoyaltySection.tsx** | Points balance card, earn/redeem rates, transaction history table, expiry warning |
| **BookingsSection.tsx** | Booking cards with date, time, status, meeting link, book new CTA |
| **GiftCardsSection.tsx** | Gift card display with balance, expiry, balance check input |
| **NotificationsSection.tsx** | Notifications list with type filters, read/unread styling, click navigation |
| **SupportSection.tsx** | Recent tickets, FAQ links, contact info, Chatwoot integration |

## Props Reference

### Key Types

- `UserProfile`: `{ id, name, email, emailVerified, phone, avatarUrl, memberSince, currency }`
- `DashboardStats`: `{ totalOrders, loyaltyPoints, wishlistItems, activeCoupons }`
- `Order`: `{ id, orderNumber, orderDate, status, itemCount, total, currency, paymentMethod, shippingAddress, trackingNumber, trackingUrl, estimatedDelivery, items: OrderItem[], timeline: OrderTimelineStep[] }`
- `OrderStatus`: `'processing' | 'accepted' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned'`
- `OrderTimelineStep`: `{ step, status: 'completed' | 'active' | 'upcoming' | 'cancelled', date }`
- `Address`: `{ id, name, phone, street, city, state, pincode, country, isDefault, label: 'Home' | 'Office' | 'Other' }`
- `WishlistItem`: `{ id, productId, productName, productSlug, imageUrl, price, mrp, currency, inStock, rating, reviewCount }`
- `Coupon`: `{ id, code, description, discountType, discountValue, maxDiscount, minOrderValue, currency, validUntil, isActive }`
- `LoyaltyBalance`: `{ points, equivalentValue, currency, earnRate, redeemRate, minRedemption, expiringPoints, expiringDate }`
- `LoyaltyTransaction`: `{ id, date, description, type: 'earned' | 'redeemed' | 'adjusted', points, balance }`
- `Booking`: `{ id, title, date, time, status: 'pending' | 'confirmed' | 'completed' | 'cancelled', meetingLink, consultantName, price, currency }`
- `GiftCard`: `{ id, code, balance, originalAmount, currency, expiryDate, isActive }`
- `Notification`: `{ id, type: 'order' | 'promotion' | 'stock' | 'loyalty', title, message, date, isRead, link }`
- `SupportInfo`: `{ email, phone, whatsapp, hours, faqLinks: { label, href }[] }`
- `DashboardSection`: `'home' | 'orders' | 'addresses' | 'wishlist' | 'coupons' | 'loyalty' | 'bookings' | 'gift-cards' | 'notifications' | 'support'`

### Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onUpdateProfile` | `(data: Partial<UserProfile>) => void` | Update in Supabase profiles table + Medusa customer |
| `onChangePassword` | `(currentPassword, newPassword) => void` | Supabase `updateUser({ password })` after verifying current |
| `onLogoutAll` | `() => void` | Revoke all Supabase sessions |
| `onLogout` | `() => void` | Supabase `signOut()`, redirect to `/` |
| `onViewOrder` | `(orderId) => void` | Navigate to order detail view (`/account/orders/[id]`) |
| `onDownloadInvoice` | `(orderId) => void` | Generate and download GST invoice PDF for this order |
| `onTrackOrder` | `(orderId) => void` | Open tracking URL in new tab (from `trackingUrl` field) |
| `onAddAddress` | `(address) => void` | Save to Supabase addresses table |
| `onEditAddress` | `(addressId, data) => void` | Update in Supabase |
| `onDeleteAddress` | `(addressId) => void` | Delete from Supabase (confirm dialog first) |
| `onSetDefaultAddress` | `(addressId) => void` | Update default flag in Supabase |
| `onAddToCart` | `(productId) => void` | Medusa v2 cart API — add default variant, open cart drawer |
| `onRemoveFromWishlist` | `(itemId) => void` | Delete from Supabase wishlist table |
| `onNotifyMe` | `(productId) => void` | Register back-in-stock notification in Supabase |
| `onViewProduct` | `(slug) => void` | `router.push(/product/${slug})` |
| `onCopyCoupon` | `(code) => void` | Copy to clipboard, show toast "Copied!" |
| `onRedeemPoints` | `(points) => void` | Convert points to discount code or credit via backend |
| `onJoinMeeting` | `(bookingId) => void` | Open meeting link in new tab |
| `onBookConsultation` | `() => void` | Navigate to booking page or open booking modal |
| `onCheckGiftCardBalance` | `(code) => void` | Check balance via API, display result |
| `onNotificationClick` | `(notificationId, link) => void` | Mark as read, navigate to `link` |
| `onMarkAllRead` | `() => void` | Bulk update all notifications as read in Supabase |
| `onMarkRead` | `(notificationId) => void` | Update single notification as read |
| `onNavigate` | `(section: DashboardSection) => void` | `router.push(/account/${section})` |

## User Flows

### Dashboard Home
1. User navigates to `/account`
2. Profile summary card: avatar (with edit overlay), name, email (verified badge), phone, member since
3. Quick-stat cards: Total Orders, Loyalty Points, Wishlist Items, Active Coupons
4. Recent orders snippet (last 3-5 orders as compact cards)
5. New arrivals carousel and promotional offers section

### My Orders
1. User navigates to `/account/orders`
2. Status filter tabs: All, Processing, Shipped, Delivered, Cancelled, Returned
3. Date range filter
4. Order rows: order number, date, item count, total, status badge
5. Click order row to view detail

### Order Detail
1. Items list with images, name, variant, quantity, price
2. Shipping address, payment method
3. Visual timeline tracker: Placed > Accepted > Shipped > In Transit > Out for Delivery > Delivered
   - Completed steps: green nodes with dates
   - Active step: teal pulse animation
   - Upcoming: grey
   - Cancelled: red with reason
4. Tracking number as clickable link (opens carrier tracking page)
5. "Download Invoice" button

### Address Book
1. Address cards grid: each card shows label icon (Home/Office/Other), full address, default badge
2. Hover reveals edit/delete actions
3. "Add New Address" card opens form (name, phone, street, city, state, pincode/zip, country, label selector)
4. Set default toggle
5. Delete: confirmation dialog

### Wishlist
1. Product grid: 2-3-4 column responsive layout
2. Cards: image, name, price (MRP strike-through if discounted), rating, "Add to Cart" button, "Remove" button
3. Out-of-stock items: dimmed card with "Notify Me" overlay badge
4. Empty state: "Your wishlist is empty" with illustration and "Start Shopping" CTA

### Coupons
1. Available coupons: cards with dashed border, code in monospace font, copy button, discount info, validity date, minimum order requirement
2. `isApplicable` determines visual state (applicable = full color, not applicable = faded with reason)
3. Expired coupons: shown faded at bottom

### Loyalty Points
1. Balance card: prominent points display with rupee equivalent value, earn rate info ("Earn 1 point per Rs 100 spent")
2. Transaction history table: date, description, type badge (earned/redeemed/adjusted), points (+/-), running balance
3. Expiry warning: highlighted banner if points expiring within 30 days

### Bookings
1. Always visible in sidebar nav (even if user has no bookings)
2. Booking cards: title, date, time, status badge (pending/confirmed/completed/cancelled), consultant name, price
3. Confirmed bookings show "Join Meeting" button (opens meeting link)
4. Empty state: "No bookings yet" with "Book a Consultation" CTA
5. "Book a Consultation" navigates to booking flow

### Gift Cards
1. Active gift card cards: code (partially masked), remaining balance, original amount, expiry date
2. Balance check: input field to enter any gift card code, check balance, display result
3. Empty state: "No gift cards" with message

### Notification Center
1. **Header dropdown**: bell icon with unread count badge, click opens dropdown showing last 5 notifications with icon per type, timestamp, unread dot, "Mark All Read" link, "View All" footer link
2. **Full page** (`/account/notifications`): list with left border accent (teal) for unread, type icon, title, message, timestamp, click to navigate to relevant page (order detail, product page, etc.)
3. Filter tabs: All, Orders, Promotions, Stock Alerts, Loyalty

### Support
1. Floating Chatwoot widget: chat bubble in bottom-right corner, does not overlap main content
2. Support section in sidebar shows: recent tickets/conversations, FAQ quick links, store contact info (email, phone, WhatsApp, hours)
3. Chatwoot integration: embed the widget script, pass user info (name, email) for authenticated chat

## Data Fetching

- **Profile**: Supabase `profiles` table + Medusa customer
- **Orders**: Medusa v2 `GET /store/customers/me/orders`
- **Addresses**: Supabase `addresses` table
- **Wishlist**: Supabase `wishlist_items` table joined with Medusa product data
- **Coupons**: Medusa v2 discount API or custom Supabase table
- **Loyalty**: Supabase `loyalty_balances` and `loyalty_transactions` tables
- **Bookings**: Supabase `bookings` table
- **Gift cards**: Medusa v2 gift card API
- **Notifications**: Supabase `notifications` table with real-time subscription for new notifications

## Empty States

- **No orders**: "You haven't placed any orders yet" with "Start Shopping" CTA
- **No addresses**: "No saved addresses" with "Add Address" CTA
- **Empty wishlist**: Illustration with "Your wishlist is empty" and "Start Shopping" CTA
- **No coupons**: "No coupons available" message
- **No bookings**: "No bookings yet" with "Book a Consultation" CTA
- **No gift cards**: "No gift cards" message
- **No notifications**: "You're all caught up!" message

## Files to Reference

- `sections/customer-dashboard/components/CustomerDashboard.tsx`
- `sections/customer-dashboard/components/DashboardHome.tsx`
- `sections/customer-dashboard/components/DashboardSidebar.tsx`
- `sections/customer-dashboard/components/OrdersList.tsx`
- `sections/customer-dashboard/components/OrderDetail.tsx`
- `sections/customer-dashboard/components/AddressBook.tsx`
- `sections/customer-dashboard/components/WishlistGrid.tsx`
- `sections/customer-dashboard/components/CouponsSection.tsx`
- `sections/customer-dashboard/components/LoyaltySection.tsx`
- `sections/customer-dashboard/components/BookingsSection.tsx`
- `sections/customer-dashboard/components/GiftCardsSection.tsx`
- `sections/customer-dashboard/components/NotificationsSection.tsx`
- `sections/customer-dashboard/components/SupportSection.tsx`
- `data-shapes/customer-dashboard/types.ts`

## Done Checklist

- [ ] Dashboard home: profile card, stat cards, recent orders, new arrivals, offers
- [ ] Profile edit: name, email, phone, avatar upload, change password
- [ ] Orders list: status filter tabs, date range, order row cards
- [ ] Order detail: items, address, payment, visual timeline tracker with colored nodes and dates
- [ ] Tracking number clickable link opening carrier page
- [ ] Invoice download on order detail
- [ ] Address book: card grid, add/edit/delete, set default, label icons
- [ ] Wishlist: product grid, add to cart, remove, "Notify Me" for out-of-stock
- [ ] Coupons: available and expired cards, code copy to clipboard, discount info
- [ ] Loyalty: balance card with rupee equivalent, transaction history, expiry warning
- [ ] Bookings: card list, status badges, "Join Meeting" for confirmed, "Book a Consultation" CTA
- [ ] Gift cards: balance display, balance check input
- [ ] Notifications dropdown: bell icon with badge, last 5 items, mark all read, view all
- [ ] Notifications page: full list with type filters, read/unread styling, click navigation
- [ ] Support section: Chatwoot widget integration, recent tickets, FAQ links, contact info
- [ ] Sidebar navigation: all items with icons, active state indicator
- [ ] All callbacks wired to real Medusa v2 / Supabase APIs
- [ ] Dual currency display (INR/USD) based on user profile
- [ ] Loading skeletons for all data-fetching views
- [ ] Empty states for all sections
- [ ] Mobile responsive: sidebar collapses to hamburger/bottom bar, content full-width
- [ ] Real-time notification updates via Supabase subscription
- [ ] Dark mode support
