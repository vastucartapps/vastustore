# Cart & Checkout

## Overview
Complete purchase flow from shopping cart through payment to order confirmation. Includes slide-out cart drawer, full cart page with coupon/gift card application, multi-step checkout wizard (Contact, Address, Shipping, Payment), guest checkout support, COD for Indian logged-in users, prepaid discount, and dual-currency display (INR/USD).

## Components
| Component | Description |
|-----------|-------------|
| `CartDrawer.tsx` | Slide-out cart from right side with item list, subtotal, and checkout CTA |
| `CartPage.tsx` | Full cart page with items, order summary, coupon/gift card inputs |
| `Checkout.tsx` | Multi-step checkout wizard (Contact, Address, Shipping, Payment) |
| `OrderConfirmation.tsx` | Success page with order details, invoice download, upsell carousel |

## Data Shapes
| Type | Description |
|------|-------------|
| `CartItem` | Line item with product, variant, price, quantity |
| `Coupon` | Discount coupon with rules and applicability |
| `Address` | Saved shipping/billing address |
| `ShippingMethod` | Shipping option with price and estimate |
| `CodConfig` | COD availability, fee, and order brackets |
| `OrderSummary` | Calculated totals with all discounts |
| `CheckoutStep` | Step state (completed/active/upcoming) |
| `OrderConfirmation` | Confirmed order details |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onUpdateQuantity` | User changes item quantity |
| `onRemoveItem` | User removes a cart item |
| `onApplyCoupon` | User applies a coupon code |
| `onApplyGiftCard` | User applies a gift card |
| `onSubmitContact` | User submits email/phone at Step 1 |
| `onSelectAddress` | User picks a saved address |
| `onSelectShipping` | User chooses shipping method |
| `onToggleCod` | User toggles COD option |
| `onPlaceOrder` | User places the final order |
| `onDownloadInvoice` | User downloads order invoice |
