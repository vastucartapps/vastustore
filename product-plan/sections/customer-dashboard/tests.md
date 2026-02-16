# Test Specs: Customer Dashboard

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Dashboard Home
**Success Path:**
- Profile card shows name, avatar, email, member since
- Quick stats cards show orders, loyalty points, wishlist, coupons
- Recent orders snippet renders with status badges

### Flow 2: Order Tracking
**Success Path:**
- Orders list filters by status (processing, shipped, delivered, etc.)
- Click order opens detail with items and visual timeline
- Timeline shows colored nodes (green=completed, teal=active, grey=upcoming)
- Tracking number renders as clickable link
- Invoice download triggers `onDownloadInvoice`

### Flow 3: Address Book
**Success Path:**
- Address cards show label icon (Home/Office/Other) and default badge
- Add new address form validates required fields
- Edit/delete actions appear on hover
- Set default triggers `onSetDefaultAddress`

### Flow 4: Wishlist
**Success Path:**
- Product grid renders with cards matching storefront style
- Add to cart triggers `onAddToCart`
- Out-of-stock items show "Notify Me" overlay
- Remove triggers `onRemoveFromWishlist`

### Flow 5: Loyalty Points
- Balance card shows points with rupee equivalent
- Transaction history table displays earned/redeemed entries
- Expiry warning shown for points expiring within 30 days

### Flow 6: Notifications
- Bell dropdown shows max 5 recent notifications
- Mark all as read triggers `onMarkAllRead`
- Notification page filters by type (order, promotion, stock, loyalty)
- Unread items have left border accent

## Empty State Tests
- No orders: empty state with "Start Shopping" CTA
- Empty wishlist: illustration with shop CTA
- No bookings: "Book a Consultation" CTA (section always visible)
- No notifications: empty message
- No gift cards: empty state with balance check input

## Edge Cases
- Sidebar collapses to hamburger on mobile
- Dual currency (INR/USD) throughout
- Coupon copy-to-clipboard works correctly
- Expired coupons shown faded but visible
