# Test Specs: Cart & Checkout

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Cart Drawer
**Success Path:**
- Drawer slides in from right with backdrop
- Items show image, name, variant, price, quantity stepper
- Quantity update triggers `onUpdateQuantity`
- Remove triggers `onRemoveItem`
- "Proceed to Checkout" triggers `onProceedToCheckout`

### Flow 2: Full Cart Page
**Success Path:**
- Two-column layout: items left, summary right
- Apply coupon code triggers `onApplyCoupon`, discount shows in summary
- Expandable "Available Coupons" list shows applicable coupons
- Gift card applied shows balance deducted
- Prepaid discount badge visible when applicable

**Failure Path:**
- Invalid coupon code shows error message
- Expired coupon shows error

### Flow 3: Checkout Wizard
**Success Path:**
- Step indicator shows Contact > Address > Shipping > Payment
- Step 1: email and phone captured, phone mandatory for Indian customers
- Step 2: saved addresses shown for logged-in users, add new address form
- Step 3: shipping method selection, COD visible only for Indian logged-in users
- Step 4: order review, payment method selection, place order
- Back button navigates to previous step

**Failure Path:**
- Missing required fields show validation errors per step
- Phone required for Indian users but optional for international

### Flow 4: Order Confirmation
**Success Path:**
- Order number and delivery estimate displayed
- Invoice download button triggers `onDownloadInvoice`
- Related products carousel renders
- Continue shopping CTA works

## Empty State Tests
- Empty cart shows illustration with "Start Shopping" CTA
- No saved addresses in checkout shows only the new address form
- No available coupons hides the expandable list

## Edge Cases
- COD fee correctly added/removed when toggled
- Dual currency display (INR vs USD) based on context
- Cart drawer full-width on mobile
- Checkout steps stack vertically on mobile
- Maximum quantity enforcement on stepper
- Out-of-stock items in cart show warning
