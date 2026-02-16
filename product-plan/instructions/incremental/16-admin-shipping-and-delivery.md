# Milestone 16 — Admin: Shipping & Delivery

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

Admin settings page for configuring shipping zones with flat rates, free shipping thresholds, COD availability (India only) with fee and min/max order brackets, delivery estimate rules by region or pincode prefix, and shipping policy content editing. Organized as a vertical stack of settings cards, each independently saveable.

## Key Functionality

- Configure flat rate shipping per zone (Domestic India, International) with enable/disable toggles
- Add, edit, and delete shipping zones
- Set free shipping threshold amounts (separate INR/USD) with enable/disable toggle
- Toggle COD availability (India only) with fee amount, minimum order, and maximum order brackets
- Configure delivery estimate ranges by region name or pincode prefix (e.g., "400xxx" = 2-4 days)
- Edit shipping policy content via rich text editor (textarea)
- Per-section Save buttons for independent persistence

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminShipping` | Root component with shipping zones, free shipping, COD, delivery estimates, and policy sections |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `zones` | `ShippingZone[]` | Shipping zone configurations |
| `freeShipping` | `FreeShippingConfig` | Free shipping toggle and thresholds |
| `cod` | `CODConfig` | COD settings |
| `deliveryEstimates` | `DeliveryEstimate[]` | Delivery estimate rules |
| `shippingPolicy` | `string` | Shipping policy HTML/text content |

### Key Types

```ts
interface ShippingZone {
  id: string; name: string; rate: number; currency: 'INR' | 'USD'; isEnabled: boolean
}

interface FreeShippingConfig {
  enabled: boolean; thresholdINR: number; thresholdUSD: number
}

interface CODConfig {
  enabled: boolean; fee: number; minOrder: number; maxOrder: number
}

interface DeliveryEstimate {
  id: string; region: string; pincodePrefix: string; minDays: number; maxDays: number
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onSaveZones` | `(zones) => void` | Save shipping zones to Medusa v2 shipping options / Supabase config |
| `onSaveFreeShipping` | `(config) => void` | Save free shipping thresholds to Supabase store config |
| `onSaveCOD` | `(config) => void` | Save COD settings to Supabase store config |
| `onSaveDeliveryEstimates` | `(estimates) => void` | Save delivery estimate rules to Supabase |
| `onSaveShippingPolicy` | `(content) => void` | Save shipping policy text to Supabase content table |

## User Flows

### Flow 1: Configure Shipping Zones

1. Admin sees the Shipping Zones card with existing zones (e.g., "Domestic India" at INR 99, "International" at USD 15)
2. Clicks "Add Zone" to create a new zone — enters name, rate, currency, toggles enabled
3. Edits an existing zone's rate from INR 99 to INR 79
4. Clicks Save on the Shipping Zones section
5. **Outcome:** Zones saved to Medusa v2 shipping options, reflected in checkout immediately

### Flow 2: Set Up COD with Brackets

1. Admin scrolls to COD Settings card
2. Toggles COD to enabled (label shows "India Only")
3. Sets COD fee to INR 40
4. Sets minimum order for COD to INR 500 and maximum to INR 25,000
5. Clicks Save
6. **Outcome:** COD appears as a payment option at checkout for Indian customers with orders between INR 500-25,000

### Flow 3: Add Delivery Estimates by Pincode

1. Admin opens the Delivery Estimates card
2. Clicks "Add Rule" — enters region "Mumbai Metro", pincode prefix "400", min days 1, max days 3
3. Adds another rule for "Rest of Maharashtra", pincode prefix "4", min days 3, max days 6
4. Clicks Save
5. **Outcome:** Customers entering pincodes starting with "400" see "1-3 business days" at checkout

### Flow 4: Edit Shipping Policy

1. Admin opens the Shipping Policy card
2. Edits the textarea to update free shipping messaging and return address
3. Clicks Save
4. **Outcome:** Updated policy content visible on the storefront shipping policy page

## Empty States

| State | Message |
|-------|---------|
| No shipping zones | "No shipping zones configured. Add your first zone to enable shipping." |
| No delivery estimates | "No delivery estimate rules configured. Add rules to show delivery times at checkout." |
| Empty shipping policy | "No shipping policy written yet. Add your shipping terms and conditions." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-shipping-and-delivery/spec.md` |
| Types | `product/sections/admin-shipping-and-delivery/types.ts` |
| Sample Data | `product/sections/admin-shipping-and-delivery/data.json` |
| Components | `src/sections/admin-shipping-and-delivery/components/` |

## Done When

- [ ] Shipping zones load from Medusa v2 / Supabase and display in the zones table
- [ ] Add/edit/delete zones persists to the backend
- [ ] Zone enable/disable toggle works
- [ ] Free shipping threshold saves for both INR and USD
- [ ] Free shipping enable/disable toggle works and affects checkout logic
- [ ] COD toggle enables/disables COD at checkout for Indian orders only
- [ ] COD fee, min order, and max order brackets save correctly
- [ ] Delivery estimate rules save and are used by the checkout pincode lookup
- [ ] Add/remove delivery estimate rules works
- [ ] Shipping policy editor saves content to the storefront content system
- [ ] Each section's Save button independently persists its data with success feedback
- [ ] Loading states while fetching configuration
- [ ] Error toasts on save failures
- [ ] Empty states render when sections have no data
- [ ] Cards stack on mobile
- [ ] Dark mode renders correctly
