# Admin Coupons & Gift Cards

## Overview
Admin interface for managing discount coupons and gift cards. Coupons support complex rules including percentage/flat discount, min order, max discount, date range, usage limits, and product/category targeting. Gift cards include creation, balance tracking, activation, and transaction history.

## Components
| Component | Description |
|-----------|-------------|
| `AdminCouponsGiftCards.tsx` | Root component with Coupons/Gift Cards tabs |

## Data Shapes
| Type | Description |
|------|-------------|
| `CouponRow` | Coupon list item with code, type, value, usage, status |
| `CouponDetail` | Full coupon with all rules and targeting |
| `GiftCardRow` | Gift card with code, balances, status |
| `GiftCardDetail` | Gift card with transaction history |
| `GiftCardTransaction` | Credit/debit transaction record |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onCreateCoupon` | Admin clicks "Create Coupon" |
| `onEditCoupon` | Admin edits an existing coupon |
| `onDeleteCoupon` | Admin deletes a coupon |
| `onToggleCoupon` | Admin enables/disables a coupon |
| `onSaveCoupon` | Admin saves coupon form |
| `onCreateGiftCard` | Admin creates a new gift card |
| `onViewGiftCard` | Admin views gift card detail |
| `onToggleGiftCard` | Admin activates/deactivates a gift card |
