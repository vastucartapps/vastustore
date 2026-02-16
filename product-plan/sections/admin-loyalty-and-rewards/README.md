# Admin Loyalty & Rewards

## Overview
Loyalty program configuration interface for managing points earning rules, redemption thresholds, expiry, tier definitions, and manual points adjustments. Features a program-level enable/disable toggle and program statistics.

## Components
| Component | Description |
|-----------|-------------|
| `AdminLoyalty.tsx` | Settings page with program toggle, stats, config, tiers, and manual adjustments |

## Data Shapes
| Type | Description |
|------|-------------|
| `PointsConfig` | Earning rates, redemption minimum, expiry days, point values |
| `LoyaltyTier` | Tier with name, min points, multiplier, benefits, color |
| `PointsAdjustment` | Manual adjustment record with customer, type, points, reason |
| `LoyaltyStats` | Program stats: issued, redeemed, expired, active members |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onToggleProgram` | Admin enables/disables loyalty program |
| `onSaveConfig` | Admin saves points configuration |
| `onEditTier` | Admin edits a loyalty tier |
| `onSubmitAdjustment` | Admin submits manual points credit/debit |
