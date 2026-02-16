# Admin Payments & Tax

## Overview
Admin settings for payment gateway configuration (Razorpay and Stripe) with masked API keys and test/live mode toggle, payment method toggles, and tabbed tax settings covering GST, international tax exemption, and per-product overrides.

## Components
| Component | Description |
|-----------|-------------|
| `AdminPaymentsTax.tsx` | Settings page with gateway config, payment methods, and tax tabs |

## Data Shapes
| Type | Description |
|------|-------------|
| `GatewayConfig` | Razorpay and Stripe API key pairs with connection status |
| `PaymentMethodToggle` | Payment method with name, icon, enabled toggle |
| `GSTConfig` | GSTIN, default rate, default HSN code |
| `InternationalTaxConfig` | Tax-exempt toggle and LUT number |
| `ProductTaxOverride` | Per-product GST rate and HSN override |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onToggleMode` | Admin switches test/live mode |
| `onSaveGateways` | Admin saves gateway API keys |
| `onTestConnection` | Admin tests Razorpay or Stripe connection |
| `onTogglePaymentMethod` | Admin enables/disables a payment method |
| `onSaveGST` | Admin saves GST configuration |
| `onSaveInternationalTax` | Admin saves international tax settings |
| `onSaveProductOverride` | Admin saves per-product tax override |
