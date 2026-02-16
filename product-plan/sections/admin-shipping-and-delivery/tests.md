# Test Specs: Admin Shipping & Delivery

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Shipping Zones
**Success Path:**
- Zone table renders with name, rate, currency, enabled status
- Add zone button creates new row
- Edit zone updates rate and currency
- Delete zone removes it
- Save triggers `onSaveZones`

### Flow 2: Free Shipping
**Success Path:**
- Toggle enable/disable free shipping
- Set threshold amounts (INR and USD)
- Save triggers `onSaveFreeShipping`

### Flow 3: COD Settings
**Success Path:**
- Enable toggle shows India-only label
- COD fee input
- Min order and max order brackets
- Save triggers `onSaveCOD`

### Flow 4: Delivery Estimates
**Success Path:**
- Table of regions with pincode prefix and day ranges
- Add new region/pincode rule
- Edit existing estimate
- Save triggers `onSaveDeliveryEstimates`

### Flow 5: Shipping Policy
**Success Path:**
- Rich text editor (textarea) for policy content
- Save triggers `onSaveShippingPolicy`

## Empty State Tests
- No shipping zones: empty table with "Add Zone" CTA
- No delivery estimates: empty table with "Add Rule" CTA

## Edge Cases
- COD disabled hides fee and bracket fields
- Free shipping disabled hides threshold inputs
- Gradient top border on each section card
- Cards stack on mobile
- Validation: min order less than max order for COD
