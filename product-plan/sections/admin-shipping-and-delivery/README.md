# Admin Shipping & Delivery

## Overview
Admin settings page for configuring shipping rates by zone, free shipping thresholds, COD settings (India only), delivery estimates by region/pincode, and shipping policy content.

## Components
| Component | Description |
|-----------|-------------|
| `AdminShipping.tsx` | Settings page with section cards for zones, free shipping, COD, estimates, policy |

## Data Shapes
| Type | Description |
|------|-------------|
| `ShippingZone` | Zone with name, rate, currency, enabled status |
| `FreeShippingConfig` | Thresholds for INR and USD |
| `CODConfig` | COD fee, min/max order brackets |
| `DeliveryEstimate` | Region/pincode rule with min/max days |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onSaveZones` | Admin saves shipping zone changes |
| `onSaveFreeShipping` | Admin saves free shipping config |
| `onSaveCOD` | Admin saves COD settings |
| `onSaveDeliveryEstimates` | Admin saves delivery estimate rules |
| `onSaveShippingPolicy` | Admin saves shipping policy content |
