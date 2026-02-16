# Customer Dashboard

## Overview
The logged-in customer's personal hub with persistent left sidebar navigation. Manages account profile, orders with visual timeline tracking, addresses, wishlist, coupons, loyalty points, bookings, gift cards, notifications, and support. Includes a floating Chatwoot chat widget.

## Components
| Component | Description |
|-----------|-------------|
| `CustomerDashboard.tsx` | Root layout with sidebar and content area |
| `DashboardSidebar.tsx` | Left sidebar with avatar, nav items, and logout |
| `DashboardHome.tsx` | Profile summary, quick stats, recent orders, offers |
| `OrdersList.tsx` | Orders list with status filters and date range |
| `OrderDetail.tsx` | Order detail with items, timeline tracker, invoice |
| `AddressBook.tsx` | Saved addresses as cards with add/edit/delete |
| `WishlistGrid.tsx` | Product grid with add-to-cart and notify-me |
| `CouponsSection.tsx` | Active/expired coupon cards with copy-to-clipboard |
| `LoyaltySection.tsx` | Points balance, transaction history, expiry warning |
| `BookingsSection.tsx` | Consultation booking cards with meeting links |
| `GiftCardsSection.tsx` | Gift card balance and code lookup |
| `NotificationsSection.tsx` | Notification list with filters and read/unread |
| `SupportSection.tsx` | Recent tickets, FAQ links, contact info |

## Data Shapes
| Type | Description |
|------|-------------|
| `UserProfile` | Customer profile with name, email, phone, avatar |
| `Order` | Order with items, timeline, tracking |
| `WishlistItem` | Wishlisted product with stock status |
| `LoyaltyBalance` | Points balance with earn/redeem rates |
| `Booking` | Consultation with date, status, meeting link |
| `Notification` | In-app notification with type and read status |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onUpdateProfile` | User edits profile info |
| `onViewOrder` | User clicks an order |
| `onDownloadInvoice` | User downloads an invoice |
| `onAddAddress` | User adds a new address |
| `onAddToCart` | User adds wishlist item to cart |
| `onRedeemPoints` | User redeems loyalty points |
| `onBookConsultation` | User books a new consultation |
| `onNotificationClick` | User clicks a notification |
| `onNavigate` | User switches dashboard section |
