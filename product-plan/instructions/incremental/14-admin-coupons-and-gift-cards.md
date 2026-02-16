# Milestone 14 — Admin: Coupons & Gift Cards

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

Admin interface for managing discount coupons and gift cards. Two tabbed views (Coupons / Gift Cards) with full CRUD for coupons including complex discount rules (percentage/flat, min order, max cap, date ranges, usage limits, product/category targeting, currency-specific INR/USD values). Gift cards support creation, balance tracking, transaction history, and activation/deactivation.

## Key Functionality

- Toggle between Coupons and Gift Cards tabs
- Browse coupons in a data table with search and status filter (active/expired/disabled)
- Create a new coupon via a multi-section form (Basic Info, Discount Rules, Validity, Usage Limits, Targeting)
- Edit, disable/enable, and delete coupons with confirmation
- Coupon rules: percentage or flat discount, min order amount, max discount cap, start/end dates, total + per-customer usage limits, product/category targeting, currency-specific values (INR/USD)
- Browse gift cards with balance information
- Create gift cards with auto-generated code, initial balance, currency, and optional expiry
- View gift card detail with transaction history (credits and debits)
- Activate/deactivate gift cards

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminCouponsGiftCards` | Root component with tab switching, coupon table, gift card table, coupon form, gift card detail |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `coupons` | `CouponRow[]` | Array of coupon rows for the table |
| `giftCards` | `GiftCardRow[]` | Array of gift card rows |
| `editingCoupon` | `CouponDetail \| null` | Coupon being edited (null = show table) |
| `giftCardDetail` | `GiftCardDetail \| null` | Gift card detail view (null = show table) |
| `activeTab` | `'coupons' \| 'gift-cards'` | Currently active tab |
| `couponStatusFilter` | `CouponStatus \| 'all'` | Filter for coupon table |
| `searchQuery` | `string` | Current search query |

### Key Types

```ts
type CouponStatus = 'active' | 'expired' | 'disabled'
type DiscountType = 'percentage' | 'flat'
type GiftCardStatus = 'active' | 'inactive' | 'expired' | 'depleted'

interface CouponRow {
  id: string; code: string; discountType: DiscountType; discountValue: number
  minOrder: number | null; maxDiscount: number | null; currency: 'INR' | 'USD'
  startDate: string; endDate: string; usageLimit: number | null
  usageLimitPerCustomer: number; usedCount: number; status: CouponStatus
  targetType: 'all' | 'products' | 'categories'; targetNames: string[]
}

interface CouponDetail extends CouponRow {
  description: string; currencyValues: { INR: number; USD: number }
  targetProductIds: string[]; targetCategoryIds: string[]
  createdAt: string; updatedAt: string
}

interface GiftCardRow {
  id: string; code: string; initialBalance: number; currentBalance: number
  currency: 'INR' | 'USD'; status: GiftCardStatus
  expiresAt: string | null; createdAt: string
}

interface GiftCardDetail extends GiftCardRow {
  transactions: GiftCardTransaction[]
  customerName: string | null; customerEmail: string | null
}

interface GiftCardTransaction {
  id: string; type: 'credit' | 'debit'; amount: number
  currency: 'INR' | 'USD'; description: string
  orderId: string | null; date: string
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeTab` | `(tab) => void` | Local state / URL param |
| `onChangeCouponStatus` | `(status) => void` | Filter coupons query |
| `onSearch` | `(query) => void` | Debounced search against Medusa v2 promotions API |
| `onCreateCoupon` | `() => void` | Navigate to coupon creation form (set editingCoupon to empty) |
| `onEditCoupon` | `(couponId) => void` | Fetch coupon detail from Medusa v2 and set editingCoupon |
| `onDeleteCoupon` | `(couponId) => void` | DELETE to Medusa v2 promotions API with confirmation |
| `onToggleCoupon` | `(couponId) => void` | Toggle coupon status via Medusa v2 |
| `onSaveCoupon` | `(data) => void` | POST/PUT to Medusa v2 promotions API |
| `onCancelCouponEdit` | `() => void` | Clear editingCoupon, return to table |
| `onCreateGiftCard` | `(balance, currency, expiresAt?) => void` | POST to Medusa v2 gift cards API |
| `onViewGiftCard` | `(giftCardId) => void` | Fetch gift card detail + transactions |
| `onToggleGiftCard` | `(giftCardId) => void` | Activate/deactivate via Medusa v2 |
| `onBackFromGiftCard` | `() => void` | Clear giftCardDetail, return to table |

## User Flows

### Flow 1: Create a Coupon

1. Admin clicks "Create Coupon" button on the Coupons tab
2. Full-page form appears with sections: Basic Info (code, description, currency), Discount Rules (type, value, min order, max cap), Validity (start/end dates), Usage Limits (total, per customer), Targeting (all/products/categories with picker)
3. Admin fills in all fields — form validates in real-time (code uniqueness check, value > 0, end date > start date)
4. Admin clicks Save
5. **Outcome:** POST to Medusa v2 promotions API creates the coupon, table refreshes with new entry, toast confirms success

### Flow 2: Edit and Disable a Coupon

1. Admin clicks Edit on a coupon row in the table
2. Form pre-populates with existing coupon data fetched from Medusa v2
3. Admin modifies the discount value and saves
4. Admin returns to table, clicks the disable toggle on another coupon
5. **Outcome:** Coupon status updates to "disabled" via API, row badge changes accordingly

### Flow 3: Create and Track a Gift Card

1. Admin switches to Gift Cards tab
2. Clicks "Create Gift Card" — form appears with auto-generated code, initial balance input, currency selector, optional expiry date
3. Admin enters balance of 5000 INR, clicks Create
4. **Outcome:** Gift card created via Medusa v2, appears in table with full initial balance

### Flow 4: View Gift Card Transaction History

1. Admin clicks on a gift card row to view detail
2. Detail view shows code, initial/current balance, status, customer info (if assigned), and transaction history list
3. Each transaction shows type (credit/debit), amount, description, linked order ID, and date
4. **Outcome:** Admin can see full audit trail of gift card usage

## Empty States

| State | Message |
|-------|---------|
| No coupons | "No coupons yet. Create your first discount coupon to attract customers." |
| No coupons matching filter | "No coupons match the current filter." |
| No gift cards | "No gift cards issued yet. Create one to get started." |
| No transactions on gift card | "This gift card hasn't been used yet." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-coupons-and-gift-cards/spec.md` |
| Types | `product/sections/admin-coupons-and-gift-cards/types.ts` |
| Sample Data | `product/sections/admin-coupons-and-gift-cards/data.json` |
| Components | `src/sections/admin-coupons-and-gift-cards/components/` |

## Done When

- [ ] Coupons tab loads real coupon data from Medusa v2 promotions API
- [ ] Search and status filter work against the API (not just client-side)
- [ ] Create Coupon form is fully functional — all fields save correctly, including currency-specific values, product/category targeting
- [ ] Edit Coupon loads existing data and persists changes via API
- [ ] Disable/enable toggle updates coupon status in real-time
- [ ] Delete coupon shows confirmation dialog and removes via API
- [ ] Gift Cards tab loads real gift card data from Medusa v2
- [ ] Create Gift Card form generates a code, sets balance and currency, saves via API
- [ ] Gift card detail view shows real transaction history
- [ ] Activate/deactivate toggle works on gift cards
- [ ] Loading spinners display while data is being fetched
- [ ] Error toasts appear on API failures with retry option
- [ ] Empty states render when no data exists
- [ ] Tables scroll horizontally on mobile
- [ ] Dark mode renders correctly across all views
