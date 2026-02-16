# Milestone 19 — Admin: Integrations & SEO

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

Dashboard-style admin section for managing third-party integrations (Google Analytics, Meta Pixel, Google Merchant Centre, chat tools) and configuring site-wide SEO defaults. Two-tab layout: Integrations tab with a card grid showing live connection status and test-connection capability, and SEO Settings tab covering title templates, meta descriptions, robots.txt editing, XML sitemap control, Open Graph / Twitter Card defaults, and marketing/performance tag management.

## Key Functionality

- View all integrations in a responsive card grid with live status indicators (active / error / inactive)
- Toggle integrations on/off
- Configure integration-specific fields (tracking IDs, API keys, feed URLs)
- Test connection to verify an integration is working
- View last-synced timestamps for feed-based integrations (Google Merchant Centre)
- Edit site title template with generated title preview
- Edit meta description with character count (recommended 150-160 chars)
- Edit robots.txt in a monospace code editor
- Toggle XML sitemap auto-generation and view last-generated date
- Configure Open Graph defaults (image URL, title, description)
- Configure Twitter Card settings (handle, card type)
- Manage marketing/performance tags with add/remove/toggle

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminIntegrations` | Root component with Integrations and SEO Settings tabs |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `activeTab` | `'integrations' \| 'seo'` | Currently active tab |
| `integrations` | `Integration[]` | Third-party integrations list |
| `seoDefaults` | `SEODefaults` | Site-wide SEO configuration |
| `openGraph` | `OpenGraphDefaults` | OG and Twitter Card defaults |
| `marketingTags` | `MarketingTag[]` | Performance marketing tags |

### Key Types

```ts
type IntegrationStatus = 'active' | 'error' | 'inactive'

interface Integration {
  id: string; name: string; icon: string; description: string
  isConnected: boolean; status: IntegrationStatus
  configFields: Record<string, string>; lastSynced: string | null
}

interface SEODefaults {
  siteTitleTemplate: string; metaDescription: string
  robotsTxt: string; sitemapEnabled: boolean; sitemapLastGenerated: string
}

interface OpenGraphDefaults {
  defaultImage: string; defaultTitle: string
  defaultDescription: string; twitterHandle: string
}

interface MarketingTag {
  id: string; name: string; platform: string; pixelId: string; isActive: boolean
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeTab` | `(tab) => void` | Local state |
| `onToggleConnection` | `(integrationId) => void` | Enable/disable integration in Supabase config |
| `onTestConnection` | `(integrationId) => void` | Server-side verification of API key / endpoint |
| `onSaveIntegrationConfig` | `(integrationId, fields) => void` | Save tracking ID / API keys to Supabase |
| `onSaveSEO` | `(seo) => void` | Save SEO defaults to Supabase store config |
| `onSaveOpenGraph` | `(og) => void` | Save OG/Twitter defaults to Supabase |
| `onToggleTag` | `(tagId) => void` | Toggle marketing tag active state |
| `onAddTag` | `(tag) => void` | Add new marketing tag to Supabase |
| `onRemoveTag` | `(tagId) => void` | Delete marketing tag from Supabase |

## User Flows

### Flow 1: Set Up Google Analytics

1. Admin opens the Integrations tab
2. Finds the "Google Analytics" card (status: inactive, gray dot)
3. Enters the GA4 Measurement ID in the config field
4. Clicks "Test Connection" — system verifies the ID format and hits GA debug endpoint
5. On success, status dot turns green, "Last synced" timestamp updates
6. Toggles connection to ON
7. **Outcome:** GA4 tracking script injected on all storefront pages

### Flow 2: Configure Google Merchant Centre Feed

1. Admin finds the "Google Merchant Centre" integration card
2. Enters Merchant ID and feed URL
3. Clicks "Test Connection" — verifies feed accessibility and format
4. Views "Last Synced" timestamp showing the last product feed sync
5. **Outcome:** Product feed auto-syncs to Google Merchant Centre for Shopping ads

### Flow 3: Set SEO Defaults

1. Admin switches to the SEO Settings tab
2. Edits the site title template: "%s | VastuCart — Vastu Products & Consultations"
3. Sees a preview of how a page title would render
4. Writes meta description (character counter shows 155/160)
5. Edits robots.txt in the monospace textarea
6. Enables XML sitemap auto-generation
7. Clicks Save
8. **Outcome:** All storefront pages use the new title template, meta tags, and robots.txt

### Flow 4: Add a Marketing Tag

1. Admin scrolls to the Marketing Tags section
2. Clicks "Add Tag" — enters name "Meta Pixel", platform "Facebook", pixel ID
3. Toggles the tag to active
4. **Outcome:** Meta Pixel fires on all storefront pages for retargeting

## Empty States

| State | Message |
|-------|---------|
| No integrations configured | "No integrations connected yet. Set up tracking and marketing tools." |
| No marketing tags | "No marketing tags added. Add tracking pixels to measure ad performance." |
| Robots.txt empty | Textarea shows placeholder: "User-agent: *\nAllow: /" |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-integrations-and-seo/spec.md` |
| Types | `product/sections/admin-integrations-and-seo/types.ts` |
| Sample Data | `product/sections/admin-integrations-and-seo/data.json` |
| Components | `src/sections/admin-integrations-and-seo/components/` |

## Done When

- [ ] Integrations card grid loads real integration configs from Supabase
- [ ] Status dots reflect real connection state (active=green, error=red, inactive=gray)
- [ ] Toggle connection enables/disables integrations
- [ ] Config fields save tracking IDs and API keys to Supabase
- [ ] "Test Connection" verifies credentials server-side and returns result
- [ ] Last-synced timestamps display for feed-based integrations
- [ ] Google Analytics tracking ID injects GA4 script on the storefront
- [ ] Meta Pixel config injects the pixel on the storefront
- [ ] Google Merchant Centre feed URL is used by the product feed sync job
- [ ] SEO title template applies to all storefront page titles
- [ ] Meta description saves and renders in page meta tags
- [ ] Robots.txt editor saves content served at /robots.txt
- [ ] Sitemap toggle controls auto-generation of /sitemap.xml
- [ ] Open Graph defaults apply to pages without custom OG tags
- [ ] Twitter handle and card type save correctly
- [ ] Marketing tags add/remove/toggle works with persistence
- [ ] Character counter on meta description works in real-time
- [ ] Integration cards display 1 col mobile, 2 col md, 3 col lg
- [ ] Dark mode renders correctly
