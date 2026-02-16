# Test Specs: Admin Payments & Tax

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Payment Gateways
**Success Path:**
- Test/Live mode toggle at top switches context
- Razorpay: Key ID and Key Secret shown masked
- Stripe: Publishable Key and Secret Key shown masked
- Reveal button toggles visibility of each key
- Test Connection button triggers `onTestConnection`
- Save triggers `onSaveGateways`

### Flow 2: Payment Methods
**Success Path:**
- Visual list with icons: UPI, Credit/Debit Cards, Netbanking, Wallets, COD
- Each has on/off toggle switch
- Toggle triggers `onTogglePaymentMethod`

### Flow 3: GST Settings
**Success Path:**
- GST tab active by default
- GSTIN input field
- Default GST Rate (%) input
- Default HSN code input
- Save triggers `onSaveGST`

### Flow 4: International Tax
**Success Path:**
- Switch to International tab
- Tax-exempt toggle (export under LUT)
- LUT number input shown when exempt enabled
- Save triggers `onSaveInternationalTax`

### Flow 5: Per-Product Overrides
**Success Path:**
- Switch to Per-product tab
- Table of products with SKU, GST rate, HSN code
- Edit inline and save triggers `onSaveProductOverride`

## Empty State Tests
- No product overrides: empty table with message
- Gateways not connected: status shows disconnected

## Edge Cases
- Mode toggle warns about switching to live
- API keys never shown in plain text by default
- Connection test shows success/failure feedback
- Tax tabs switch correctly via `onChangeTaxTab`
