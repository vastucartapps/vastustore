# Test Specs: Admin Loyalty & Rewards

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Program Toggle
**Success Path:**
- Toggle at top enables/disables program
- Status badge shows enabled/disabled
- `onToggleProgram` called with new state

### Flow 2: Program Stats
**Success Path:**
- 4 metric cards render: Total Issued, Redeemed, Expired, Active Members
- Values update based on program data

### Flow 3: Points Configuration
**Success Path:**
- Form fields: pointsPerRupee, pointsPerDollar, minRedemptionPoints, pointsExpiryDays, pointsValueINR, pointsValueUSD
- Save button triggers `onSaveConfig`

**Failure Path:**
- Invalid values show validation errors

### Flow 4: Loyalty Tiers
**Success Path:**
- Table/list of tiers: name, color indicator, min points, multiplier, benefits
- Edit button triggers `onEditTier` with tier ID

### Flow 5: Manual Adjustment
**Success Path:**
- Search customer by email
- Select credit or debit
- Enter points amount and reason
- Submit triggers `onSubmitAdjustment`
- Recent adjustments table shows last 5 entries

**Failure Path:**
- Invalid email shows error
- Zero or negative points shows validation error

## Empty State Tests
- No recent adjustments: empty table
- Program disabled: settings still visible but inactive state

## Edge Cases
- Tier benefits list with multiple items renders correctly
- Dark mode support throughout
- Cards stack on mobile
- Table scrolls horizontally on mobile
- Points values formatted with locale separators
