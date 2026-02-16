# Admin Integrations & SEO

## Overview
Dashboard for managing third-party integrations (analytics, marketing pixels, chat, product feeds) with live connection status, and configuring site-wide SEO defaults including title templates, meta descriptions, robots.txt, sitemap control, Open Graph, and marketing tags.

## Components
| Component | Description |
|-----------|-------------|
| `AdminIntegrations.tsx` | Two-tab layout: Integrations card grid and SEO Settings sections |

## Data Shapes
| Type | Description |
|------|-------------|
| `Integration` | Third-party service with config fields, status, last synced |
| `SEODefaults` | Title template, meta description, robots.txt, sitemap |
| `OpenGraphDefaults` | OG image, title, description, Twitter handle |
| `MarketingTag` | Pixel/tag with platform, ID, active toggle |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onToggleConnection` | Admin connects/disconnects an integration |
| `onTestConnection` | Admin tests an integration connection |
| `onSaveIntegrationConfig` | Admin saves integration-specific fields |
| `onSaveSEO` | Admin saves SEO defaults |
| `onSaveOpenGraph` | Admin saves Open Graph settings |
| `onToggleTag` | Admin enables/disables a marketing tag |
| `onAddTag` | Admin adds a new marketing tag |
| `onRemoveTag` | Admin removes a marketing tag |
