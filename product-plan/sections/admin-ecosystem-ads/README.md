# Admin Ecosystem Ads

## Overview
Centralized banner and creative management for 12 ecosystem subdomain sites plus social media publishing (Pinterest, Instagram, Facebook, Twitter/X, Threads). Two distribution channels: real-time API-served banners for ecosystem sites, and push-and-forget social publishing.

## Components
| Component | Description |
|-----------|-------------|
| `AdminEcosystemAds.tsx` | Four-tab interface: Banners, Placements, Analytics, Social Publishing |

## Data Shapes
| Type | Description |
|------|-------------|
| `Banner` | Banner with headline, CTA, schedule, priority, creatives, stats |
| `BannerCreative` | Image per aspect ratio (1:1, 16:9, 9:16, 16:3, 4:3, 2:3) |
| `EcosystemSite` | Subdomain site with named placement slots |
| `PlacementSlot` | Named slot with fixed aspect ratio and assigned banner |
| `BannerAnalytics` | Per-banner per-site impressions, clicks, CTR |
| `AnalyticsSummary` | Totals: impressions, clicks, avg CTR, active banners |
| `SocialAccount` | Connected platform with preferred ratio |
| `SocialPost` | Published post with platform, URL, status, caption |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onCreateBanner` | Admin creates a new banner |
| `onEditBanner` | Admin edits banner details |
| `onDeleteBanner` | Admin deletes a banner |
| `onToggleBanner` | Admin activates/deactivates a banner |
| `onAssignPlacement` | Admin assigns a banner to a slot |
| `onRemovePlacement` | Admin removes a banner from a slot |
| `onConnectSocial` | Admin connects a social platform |
| `onDisconnectSocial` | Admin disconnects a social platform |
| `onPublishToSocial` | Admin publishes banner to a platform |
