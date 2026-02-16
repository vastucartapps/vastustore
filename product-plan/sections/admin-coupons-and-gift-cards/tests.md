# Test Specs: Admin Coupons & Gift Cards

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Coupons List
**Success Path:**
- Table renders: Code (mono), Type badge, Value, Min Order, Max Discount, Period, Usage, Status
- Status filter (active/expired/disabled) works
- Search filters coupons

### Flow 2: Create/Edit Coupon
**Success Path:**
- "Create Coupon" opens full-page form
- Form sections: Basic Info, Discount Rules, Validity, Usage Limits, Targeting
- Percentage discount: enter value and max discount cap
- Flat discount: enter fixed amount
- Date range picker for validity period
- Usage limits: total and per-customer
- Product/category targeting selection
- Currency-specific values (INR/USD) configurable
- Save triggers `onSaveCoupon`

**Failure Path:**
- Missing required fields show validation errors

### Flow 3: Gift Cards List
**Success Path:**
- Switch to Gift Cards tab
- Table shows: Code (mono), Initial Balance, Current Balance, Status, Created
- Click view opens gift card detail with transaction history

### Flow 4: Create Gift Card
**Success Path:**
- Code auto-generated
- Set initial balance and expiry
- `onCreateGiftCard` called with balance, currency, optional expiry

### Flow 5: Gift Card Management
- Toggle activate/deactivate triggers `onToggleGiftCard`
- Transaction history shows credits and debits with order references

## Empty State Tests
- No coupons: empty state with "Create Coupon" CTA
- No gift cards: empty state with "Create Gift Card" CTA
- Gift card with no transactions: empty history

## Edge Cases
- Expired coupon shown with expired badge
- Coupon usage at limit (e.g., 10/10 used)
- Gift card with zero balance (depleted status)
- Tables scroll horizontally on mobile
