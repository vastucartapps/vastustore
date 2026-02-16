# Milestone 21 — Admin: Loyalty & Rewards

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

Loyalty program configuration interface for VastuCart. Features a program-level enable/disable toggle, stats dashboard (total issued/redeemed/expired points, active members), points earning and redemption configuration, loyalty tier management (Bronze, Silver, Gold, Platinum), and a manual points adjustment tool with recent adjustment history.

## Key Functionality

- Toggle the entire loyalty program on/off with a status badge
- View program stats: total points issued, total redeemed, total expired, active members
- Configure points earning rates: points per rupee, points per dollar
- Set minimum redemption threshold, points expiry days, point monetary values (INR/USD)
- View loyalty tiers with name, color indicator, minimum points, multiplier, and benefits list
- Edit individual tier settings
- Perform manual points adjustments: search customer by email, choose credit/debit, enter points and reason
- View recent adjustments table (last 5 entries)

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminLoyalty` | Root component with program toggle, stats, config form, tiers, and manual adjustment |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `programEnabled` | `boolean` | Whether the loyalty program is active |
| `config` | `PointsConfig` | Points earning and redemption configuration |
| `tiers` | `LoyaltyTier[]` | Loyalty tier definitions |
| `recentAdjustments` | `PointsAdjustment[]` | Last 5 manual adjustment records |
| `stats` | `LoyaltyStats` | Program-level statistics |

### Key Types

```ts
type AdjustmentType = 'credit' | 'debit'

interface LoyaltyTier {
  id: string; name: string; minPoints: number; multiplier: number
  benefits: string[]; color: string
}

interface PointsConfig {
  pointsPerRupee: number; pointsPerDollar: number
  minRedemptionPoints: number; pointsExpiryDays: number
  pointsValueINR: number; pointsValueUSD: number
}

interface PointsAdjustment {
  id: string; customerName: string; customerEmail: string
  type: AdjustmentType; points: number; reason: string
  adjustedBy: string; date: string
}

interface LoyaltyStats {
  totalPointsIssued: number; totalPointsRedeemed: number
  totalPointsExpired: number; activeMembers: number
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onToggleProgram` | `(enabled) => void` | Enable/disable loyalty program in Supabase config |
| `onSaveConfig` | `(config) => void` | Save points configuration to Supabase |
| `onEditTier` | `(tierId) => void` | Open tier editing modal/form, save to Supabase |
| `onSubmitAdjustment` | `(data) => void` | Credit/debit points for a customer in Supabase + log the adjustment |

## User Flows

### Flow 1: Enable and Configure the Loyalty Program

1. Admin sees the program toggle at the top — currently disabled
2. Toggles the program ON — status badge changes to "Enabled"
3. Scrolls to Points Configuration card
4. Sets: 1 point per INR 10 spent, 1 point per USD 0.10 spent, minimum 100 points to redeem, points expire after 365 days, 1 point = INR 0.50 / USD 0.006
5. Clicks Save
6. **Outcome:** Loyalty program active, customers start earning points on purchases

### Flow 2: Configure Loyalty Tiers

1. Admin scrolls to the Tiers card
2. Sees four tiers: Bronze (0 pts, 1x), Silver (500 pts, 1.5x), Gold (2000 pts, 2x), Platinum (5000 pts, 3x)
3. Clicks Edit on Gold tier
4. Changes multiplier from 2x to 2.5x, adds benefit "Priority consultation booking"
5. Saves
6. **Outcome:** Gold tier customers now earn 2.5x points and see the new benefit

### Flow 3: Manual Points Adjustment

1. Admin scrolls to Manual Adjustment card
2. Enters customer email: "priya@example.com"
3. Selects "Credit" radio button
4. Enters 500 points, reason: "Compensation for delayed delivery"
5. Clicks Submit
6. **Outcome:** 500 points credited to customer's account, adjustment logged in the recent adjustments table with admin name, date, and reason

### Flow 4: Review Program Stats

1. Admin views the stats row at the top of the page
2. Sees 4 metric cards: 125,000 points issued, 45,000 redeemed, 8,000 expired, 342 active members
3. Uses this data to evaluate program effectiveness
4. **Outcome:** Admin has visibility into loyalty program health at a glance

## Empty States

| State | Message |
|-------|---------|
| Program disabled | Stats show zeroes with message "Enable the loyalty program to start tracking points." |
| No recent adjustments | "No manual adjustments made yet." |
| No tiers configured | "No loyalty tiers defined. Set up tiers to reward your best customers." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-loyalty-and-rewards/spec.md` |
| Types | `product/sections/admin-loyalty-and-rewards/types.ts` |
| Sample Data | `product/sections/admin-loyalty-and-rewards/data.json` |
| Components | `src/sections/admin-loyalty-and-rewards/components/` |

## Done When

- [ ] Program toggle enables/disables the entire loyalty system in Supabase
- [ ] Status badge reflects current program state (enabled/disabled)
- [ ] Stats cards show real aggregated data from Supabase (issued, redeemed, expired, active members)
- [ ] Points configuration form saves all 6 fields to Supabase
- [ ] Points earning logic (per rupee/dollar) is wired into the checkout/order completion flow
- [ ] Points redemption respects the minimum threshold and expiry settings
- [ ] Loyalty tiers display with correct colors, min points, multipliers, and benefits
- [ ] Tier editing persists changes to Supabase
- [ ] Manual adjustment form validates customer email exists before submitting
- [ ] Credit/debit adjustments update the customer's point balance in Supabase
- [ ] Adjustment is logged with admin name, type, points, reason, and timestamp
- [ ] Recent adjustments table shows the last 5 entries
- [ ] All saves show success feedback
- [ ] Loading states while fetching config and stats
- [ ] Error handling for invalid customer email in adjustment
- [ ] Cards stack on mobile, table scrolls horizontally
- [ ] Dark mode renders correctly
