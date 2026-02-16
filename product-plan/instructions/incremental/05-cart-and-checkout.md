# Milestone 05 — Cart & Checkout

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

The complete purchase flow from shopping cart through payment to order confirmation. Includes a slide-out cart drawer, full cart page, multi-step checkout wizard (Contact, Address, Shipping, Payment), guest checkout, coupon/gift card application, dual-currency display (INR/USD), COD with configurable fee (India only, logged-in users only), prepaid discount, Razorpay (India) + Stripe (International) payment integration, GST invoice generation, and abandoned cart recovery.

## Key Functionality

- Slide-out cart drawer from any page (quick access to cart)
- Full cart page with item list, quantity controls, order summary, coupon/gift card application
- Multi-step checkout: Contact > Address > Shipping > Payment
- Contact step captures email + phone upfront for abandoned cart recovery
- Guest checkout: full flow but no saved addresses, no COD
- COD available only for Indian logged-in users, with configurable fee and min/max order brackets
- Prepaid discount (percentage off for online payment)
- Coupon application: text input or select from available coupons list
- Gift card balance application
- Dual currency: INR for India, USD for international
- Razorpay for Indian payments (UPI, cards, netbanking, wallets)
- Stripe for international payments (cards)
- GST invoice generation on order confirmation
- Abandoned cart recovery: email/phone from Step 1 enables recovery emails
- Order confirmation with invoice download and upsell carousel

## Components Provided

From `sections/cart-and-checkout/components/`:

| Component | Purpose |
|---|---|
| **CartDrawer.tsx** | Slide-out drawer from right — item cards, subtotal, proceed to checkout CTA |
| **CartPage.tsx** | Full cart page — item list (left), order summary with coupons/gift cards (right), empty state |
| **Checkout.tsx** | Multi-step checkout wizard — step indicator, contact/address/shipping/payment forms |
| **OrderConfirmation.tsx** | Success page — order details, invoice download, related products carousel |

## Props Reference

### Key Types

- `CartItem`: `{ id, productId, productName, productSlug, variantId, variantLabel, imageUrl, price, mrp, currency, quantity, maxQuantity, inStock }`
- `Coupon`: `{ id, code, description, discountType, discountValue, maxDiscount, minOrderValue, currency, validUntil, isApplicable }`
- `AppliedCoupon`: `{ code, discountAmount, description }`
- `GiftCardBalance`: `{ code, balance, appliedAmount, currency }`
- `Address`: `{ id, name, phone, street, city, state, pincode, country, isDefault, label: 'Home' | 'Office' | 'Other' }`
- `ShippingMethod`: `{ id, name, description, price, currency, estimatedDays, isFree, freeAbove }`
- `CodConfig`: `{ available, fee, currency, minOrder, maxOrder, label, feeLabel }`
- `PrepaidDiscount`: `{ enabled, percentage, maxDiscount, label }`
- `OrderSummary`: `{ subtotal, mrpTotal, totalSavings, couponDiscount, giftCardApplied, prepaidDiscount, shippingFee, codFee, taxAmount, grandTotal, currency, itemCount }`
- `CheckoutStep`: `{ id: 'contact' | 'address' | 'shipping' | 'payment', label, status: 'completed' | 'active' | 'upcoming' }`
- `ContactInfo`: `{ email, phone, countryCode, isIndian }`
- `OrderConfirmation`: `{ orderId, orderDate, estimatedDelivery, paymentMethod, totalPaid, currency, email, phone, shippingAddress }`

### CartDrawer Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onClose` | `() => void` | Close the drawer |
| `onUpdateQuantity` | `(itemId, quantity) => void` | Medusa v2 cart API — update line item quantity |
| `onRemoveItem` | `(itemId) => void` | Medusa v2 cart API — remove line item |
| `onProceedToCheckout` | `() => void` | `router.push('/checkout')` |
| `onViewProduct` | `(slug) => void` | `router.push(/product/${slug})` |

### CartPage Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onUpdateQuantity` | `(itemId, quantity) => void` | Medusa v2 cart API — update line item |
| `onRemoveItem` | `(itemId) => void` | Medusa v2 cart API — remove line item |
| `onApplyCoupon` | `(code) => void` | Medusa v2 cart API — apply discount code, recalculate totals |
| `onRemoveCoupon` | `() => void` | Medusa v2 cart API — remove discount, recalculate |
| `onApplyGiftCard` | `(code) => void` | Validate gift card in Supabase, apply balance to order summary |
| `onProceedToCheckout` | `() => void` | `router.push('/checkout')` |
| `onViewProduct` | `(slug) => void` | `router.push(/product/${slug})` |
| `onContinueShopping` | `() => void` | `router.push('/')` |

### Checkout Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onSubmitContact` | `(email, phone, countryCode) => void` | Save contact info to cart metadata (Medusa v2) for abandoned cart recovery. Auto-detect if Indian based on country code (+91). |
| `onSelectAddress` | `(addressId) => void` | Set shipping address on Medusa cart from saved address |
| `onAddAddress` | `(address) => void` | Save new address to Supabase, then set on cart |
| `onSelectShipping` | `(methodId) => void` | Set shipping method on Medusa cart, recalculate totals |
| `onToggleCod` | `(enabled) => void` | Toggle COD — add/remove COD fee in order summary. Only available when: user is logged in AND shipping to India AND order total is within min/max brackets. |
| `onPlaceOrder` | `() => void` | If COD: create order directly. If Razorpay: initiate Razorpay checkout. If Stripe: initiate Stripe checkout session. On success: complete order in Medusa, redirect to confirmation. |
| `onBack` | `() => void` | Navigate to previous checkout step |
| `onGoToStep` | `(stepId) => void` | Navigate to a specific completed step (only allow going back to completed steps) |

### OrderConfirmation Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onDownloadInvoice` | `() => void` | Generate and download GST invoice PDF |
| `onContinueShopping` | `() => void` | `router.push('/')` |
| `onProductClick` | `(slug) => void` | `router.push(/product/${slug})` for upsell carousel |

## User Flows

### Cart Drawer
1. User clicks cart icon in header — drawer slides in from right
2. Shows item cards with image, name, variant, price, quantity stepper, remove button
3. Subtotal at bottom with "Proceed to Checkout" gradient accent CTA button
4. Close via X button or clicking backdrop

### Full Cart Page
1. User navigates to `/cart`
2. Left: item list with image thumbnails, product name, variant, unit price, quantity stepper, line total, remove button
3. Right: order summary sidebar — subtotal, coupon discount, gift card balance, prepaid discount, shipping, COD fee, tax, grand total
4. Coupon: text input with "Apply" button + expandable "Available Coupons" list (shows applicable coupons with code, description, copy-to-apply)
5. Gift card: separate input to apply gift card code
6. "Proceed to Checkout" button
7. Empty cart: illustration with "Your cart is empty" message and "Continue Shopping" CTA

### Multi-Step Checkout
**Step 1 — Contact:**
1. Email input (required)
2. Phone input with country code selector (mandatory for Indian customers, optional for international with warning about delivery responsibility)
3. If user is logged in, pre-fill from profile
4. On continue: save contact info to cart for abandoned cart recovery

**Step 2 — Address:**
1. Logged-in users: show saved address cards with radio selection, "Add New Address" option
2. Guests: show full address form (name, phone, street, city, state, pincode/zip, country)
3. "Billing address same as shipping" toggle (default on)
4. For India: validate pincode format (6 digits)

**Step 3 — Shipping:**
1. Shipping method radio cards: Standard (with price and estimate), Express (with price and estimate)
2. Free shipping threshold: if order qualifies, show "Free" badge
3. COD toggle: visible ONLY when all three conditions met — user is logged in, shipping to India, order total within COD brackets (minOrder to maxOrder)
4. COD fee displayed when toggled on

**Step 4 — Payment & Review:**
1. Full order review: all items, address, shipping method, price breakdown
2. Payment method selection:
   - **Indian customers**: Razorpay (UPI, cards, netbanking, wallets) — integrate Razorpay checkout.js
   - **International customers**: Stripe (cards) — integrate Stripe Elements or Checkout
3. "Place Order" button with grand total
4. On click: initiate payment flow, on success create order in Medusa v2, redirect to confirmation

### Order Confirmation
1. Success icon/animation
2. Order number, order date, estimated delivery
3. "Confirmation sent to [email] and [phone]" notice
4. "Download Invoice" button — generates GST-compliant invoice PDF
5. "You May Also Like" product carousel
6. "Continue Shopping" CTA
7. For guests: "Create an account to track your order" prompt (triggers guest-to-account conversion)

### Guest Checkout
- Same flow as above, but:
  - No saved addresses (always new address form)
  - No COD option
  - After confirmation, prompt to create account

## Payment Integration

### Razorpay (India / INR)
- Use Razorpay Checkout.js for payment modal
- Create Razorpay order on your backend before opening checkout
- Support: UPI, debit/credit cards, netbanking, wallets (Paytm, PhonePe, etc.)
- On success: verify payment signature on backend, complete Medusa order
- On failure: show error, allow retry

### Stripe (International / USD)
- Use Stripe Checkout or Stripe Elements
- Create Stripe PaymentIntent on backend
- Support: credit/debit cards
- On success: confirm payment on backend, complete Medusa order
- On failure: show error, allow retry

### COD (India Only)
- Available only when: user is logged in + shipping to India + order total >= minOrder and <= maxOrder
- COD fee added to order total (configurable amount from CodConfig)
- Order created directly without payment gateway — marked as "COD pending"

### Prepaid Discount
- When paying online (not COD), apply percentage discount up to maxDiscount
- Show "Prepaid Discount" line in order summary
- Badge: "Save X% by paying online"

## GST Invoice Generation

- Generate PDF invoice with: seller GSTIN, buyer details, itemized list with HSN codes, tax breakdown (CGST/SGST for intra-state, IGST for inter-state), total
- Download button on order confirmation and in customer dashboard order detail

## Abandoned Cart Recovery

- Contact info (email + phone) captured at Step 1 before payment
- Store this in Medusa cart metadata or Supabase
- Trigger recovery emails (via your email service) for carts abandoned after Step 1 but before order completion
- Recovery email contains a link back to the checkout with the cart restored

## Files to Reference

- `sections/cart-and-checkout/components/CartDrawer.tsx`
- `sections/cart-and-checkout/components/CartPage.tsx`
- `sections/cart-and-checkout/components/Checkout.tsx`
- `sections/cart-and-checkout/components/OrderConfirmation.tsx`
- `data-shapes/cart-and-checkout/types.ts`

## Done Checklist

- [ ] Cart drawer: slides from right, item cards with quantity/remove, subtotal, proceed CTA
- [ ] Cart page: item list with quantity stepper, order summary sidebar, empty cart state
- [ ] Coupon application: text input + available coupons list with copy-to-apply
- [ ] Gift card application: input + balance display
- [ ] Prepaid discount badge and line item in summary
- [ ] Checkout Step 1 (Contact): email + phone with country code, pre-fill for logged-in users
- [ ] Checkout Step 2 (Address): saved addresses (logged-in) or new form (guests), pincode validation for India
- [ ] Checkout Step 3 (Shipping): method selection, COD toggle (India + logged-in + within brackets only)
- [ ] Checkout Step 4 (Payment): order review, Razorpay for India, Stripe for international
- [ ] COD fee correctly added/removed when toggled
- [ ] Step indicator shows completed/active/upcoming states, allows going back to completed steps
- [ ] Razorpay integration: create order, open checkout, verify payment, complete order
- [ ] Stripe integration: create PaymentIntent, confirm payment, complete order
- [ ] Order confirmation: order number, delivery estimate, email/SMS notice
- [ ] Invoice download button generates GST-compliant PDF
- [ ] "You May Also Like" upsell carousel on confirmation
- [ ] Guest checkout: no saved addresses, no COD, account creation prompt after
- [ ] Abandoned cart: contact info saved at Step 1 for recovery emails
- [ ] Dual currency: INR for India, USD for international throughout
- [ ] Mobile responsive: full-width drawer, stacked steps, collapsible order summary
- [ ] Loading states on all API calls (quantity updates, coupon apply, place order)
- [ ] Error handling: payment failures, invalid coupons, out-of-stock during checkout
- [ ] Dark mode support
