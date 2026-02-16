# Milestone 17 — Admin: Payments & Tax

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

Admin settings for payment gateway configuration (Razorpay + Stripe) with masked API key fields and test/live mode toggle, payment method toggles (UPI, cards, netbanking, wallets, COD), and tabbed tax settings covering store-level GST configuration, international tax-exempt toggle, and per-product GST rate / HSN code overrides.

## Key Functionality

- Test/Live mode toggle at the top of the page — all gateway configs switch accordingly
- Razorpay configuration: Key ID and Key Secret (masked with reveal buttons), connection test button
- Stripe configuration: Publishable Key and Secret Key (masked with reveal buttons), connection test button
- Payment method toggles: UPI, Credit/Debit Cards, Netbanking, Wallets, COD — each with on/off switch
- GST tab: GSTIN input, default GST rate (%), default HSN code
- International tab: tax-exempt toggle (export under LUT), LUT number input
- Per-product tab: table of products with individual GST rate and HSN code overrides

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminPaymentsTax` | Root component with gateway config, payment methods, and tabbed tax settings |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `mode` | `'test' \| 'live'` | Current payment mode |
| `gateways` | `GatewayConfig` | Razorpay + Stripe key configurations |
| `paymentMethods` | `PaymentMethodToggle[]` | Available payment methods with toggle state |
| `gstConfig` | `GSTConfig` | Store-level GST settings |
| `internationalTax` | `InternationalTaxConfig` | International tax exemption settings |
| `productOverrides` | `ProductTaxOverride[]` | Per-product tax overrides |
| `activeTaxTab` | `'gst' \| 'international' \| 'per-product'` | Active tax settings tab |

### Key Types

```ts
type PaymentMode = 'test' | 'live'

interface GatewayConfig {
  razorpay: { keyId: string; keySecret: string; isConnected: boolean }
  stripe: { publishableKey: string; secretKey: string; isConnected: boolean }
}

interface PaymentMethodToggle {
  id: string; name: string; icon: string; enabled: boolean; description: string
}

interface GSTConfig { gstin: string; defaultRate: number; defaultHSN: string }

interface InternationalTaxConfig { taxExempt: boolean; lutNumber: string }

interface ProductTaxOverride {
  productId: string; productName: string; sku: string; gstRate: number; hsnCode: string
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onToggleMode` | `(mode) => void` | Switch between test/live keys in Supabase config |
| `onSaveGateways` | `(gateways) => void` | Encrypt and save API keys to Supabase (server-side encryption) |
| `onTestConnection` | `(gateway) => void` | Hit Razorpay/Stripe test endpoint to verify keys work |
| `onTogglePaymentMethod` | `(methodId) => void` | Enable/disable payment method in Medusa v2 |
| `onChangeTaxTab` | `(tab) => void` | Local tab state |
| `onSaveGST` | `(config) => void` | Save GSTIN, default rate, HSN to Supabase store config |
| `onSaveInternationalTax` | `(config) => void` | Save tax-exempt and LUT settings to Supabase |
| `onSaveProductOverride` | `(override) => void` | Save per-product GST rate and HSN code to Medusa v2 product metadata |

## User Flows

### Flow 1: Configure Razorpay for Live Mode

1. Admin toggles mode from "Test" to "Live"
2. Enters Razorpay Live Key ID and Key Secret (fields are masked by default)
3. Clicks "Reveal" to verify the entered key, then clicks "Test Connection"
4. System hits Razorpay API to verify — shows green checkmark on success or error message on failure
5. Clicks Save
6. **Outcome:** Live Razorpay keys encrypted and stored, checkout uses live Razorpay gateway

### Flow 2: Enable/Disable Payment Methods

1. Admin sees the payment methods list with toggle switches
2. Disables "Netbanking" (toggle off) and enables "UPI" (toggle on)
3. Changes reflect immediately
4. **Outcome:** Checkout only shows enabled payment methods to customers

### Flow 3: Set Store GST Configuration

1. Admin opens the GST tab under Tax Settings
2. Enters GSTIN: "27AABCT1234D1ZC"
3. Sets default GST rate to 18%
4. Sets default HSN code
5. Clicks Save
6. **Outcome:** All products without overrides use 18% GST rate; GSTIN displayed on invoices

### Flow 4: Override GST for Specific Products

1. Admin switches to the Per-Product tab
2. Sees table of products with their current GST rates and HSN codes
3. Edits a gemstone product to set GST rate to 3% and HSN code to "7103"
4. Clicks Save on that row
5. **Outcome:** That product uses 3% GST at checkout instead of the store default 18%

## Empty States

| State | Message |
|-------|---------|
| No gateway keys configured | "Enter your Razorpay or Stripe API keys to accept payments." |
| No product overrides | "All products use the store default GST rate. Add overrides for products with different tax rates." |
| Connection test not run | "Click 'Test Connection' to verify your API keys." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-payments-and-tax/spec.md` |
| Types | `product/sections/admin-payments-and-tax/types.ts` |
| Sample Data | `product/sections/admin-payments-and-tax/data.json` |
| Components | `src/sections/admin-payments-and-tax/components/` |

## Done When

- [ ] Test/Live mode toggle switches which set of API keys is displayed and used
- [ ] Razorpay Key ID and Key Secret save to Supabase with server-side encryption
- [ ] Stripe Publishable Key and Secret Key save with encryption
- [ ] "Test Connection" button verifies keys against Razorpay/Stripe APIs and shows result
- [ ] API key fields are masked by default with functional reveal buttons
- [ ] Payment method toggles enable/disable methods in the checkout flow
- [ ] GSTIN, default GST rate, and default HSN code save to store config
- [ ] International tax-exempt toggle and LUT number save correctly
- [ ] Per-product GST rate and HSN code overrides save to product metadata
- [ ] Per-product table shows all products with their current/overridden rates
- [ ] All saves show success/error feedback
- [ ] Loading states while fetching configuration
- [ ] Error handling for failed connection tests
- [ ] Empty states render appropriately
- [ ] Dark mode renders correctly
