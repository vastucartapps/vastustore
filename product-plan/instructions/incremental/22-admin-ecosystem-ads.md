# Milestone 22 — Admin: Ecosystem Ads

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

Centralized banner and creative management for all 12 ecosystem subdomain sites plus social media publishing. Four-tab layout: Banners (create/edit/delete/schedule with 6 creative aspect ratios), Placements (ecosystem site slot management), Analytics (impressions, clicks, CTR per banner per site), and Social Publishing (push-and-forget posting to Pinterest, Instagram, Facebook, Twitter/X, Threads with rich post metadata and a publish log).

## Key Functionality

- **Banners tab:** Create/edit/delete banners with headline, CTA text, CTA URL, schedule (start/end date), priority, product linking, and creatives per aspect ratio (1:1, 16:9, 9:16, 16:3, 4:3, 2:3). Status indicators: draft, scheduled, live, expired. Active/inactive toggle. Stats: impressions, clicks, CTR per banner.
- **Placements tab:** Register ecosystem sites (subdomain + display name). Define named slots per site (e.g., "hero-banner", "sidebar-widget") with fixed aspect ratios. Assign/remove banners from slots (only matching ratios). Site active toggle.
- **Analytics tab:** Stat cards (total impressions, clicks, avg CTR, active banners). Performance table: impressions/clicks/CTR per banner per subdomain. Period-based filtering.
- **Social Publishing tab:** Connect/disconnect 5 platforms. Each publish creates a NEW post (never updates). Select banner + platform, write caption with rich metadata (title, headline, description, link, CTA, hashtags, alt text), publish. Platform auto-selects the right creative ratio (Pinterest=2:3, Instagram=1:1, Facebook=16:9, Twitter=16:9, Threads=1:1). Publish log with platform filter, post links, status (published/pending/failed).

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminEcosystemAds` | Root component with 4-tab layout for banners, placements, analytics, and social publishing |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `activeTab` | `AdTab` | Currently active tab |
| `banners` | `Banner[]` | All banners with creatives and stats |
| `sites` | `EcosystemSite[]` | Ecosystem sites with their placement slots |
| `analytics` | `BannerAnalytics[]` | Per-banner per-site performance data |
| `analyticsSummary` | `AnalyticsSummary` | Aggregate analytics stats |
| `socialAccounts` | `SocialAccount[]` | Connected social platform accounts |
| `socialPosts` | `SocialPost[]` | Publish log entries |

### Key Types

```ts
type AdTab = 'banners' | 'placements' | 'analytics' | 'social'
type BannerStatus = 'draft' | 'scheduled' | 'live' | 'expired'
type AspectRatio = '1:1' | '16:9' | '9:16' | '16:3' | '4:3' | '2:3'
type SocialPlatform = 'pinterest' | 'instagram' | 'facebook' | 'twitter' | 'threads'

interface Banner {
  id: string; name: string; headline: string; ctaText: string; ctaUrl: string
  status: BannerStatus; isActive: boolean; startDate: string; endDate: string
  priority: number; productIds: string[]; productNames: string[]
  creatives: BannerCreative[]; placements: string[]
  impressions: number; clicks: number; createdAt: string
}

interface BannerCreative { ratio: AspectRatio; imageUrl: string; width: number; height: number }

interface EcosystemSite {
  id: string; subdomain: string; displayName: string
  isActive: boolean; slots: PlacementSlot[]
}

interface PlacementSlot {
  id: string; name: string; ratio: AspectRatio; isActive: boolean
  currentBannerId: string | null; currentBannerName: string | null
}

interface BannerAnalytics {
  bannerId: string; bannerName: string; site: string
  impressions: number; clicks: number; ctr: number; period: string
}

interface AnalyticsSummary {
  totalImpressions: number; totalClicks: number; avgCtr: number; activeBanners: number
}

interface SocialAccount {
  platform: SocialPlatform; isConnected: boolean
  username: string; displayName: string; preferredRatio: AspectRatio
}

interface SocialPostMeta {
  title: string; headline: string; description: string
  linkUrl: string; ctaText: string; hashtags: string; altText: string
}

interface SocialPost {
  id: string; bannerId: string; bannerName: string
  platform: SocialPlatform; postUrl: string
  status: 'published' | 'pending' | 'failed'
  publishedAt: string; caption: string; meta: SocialPostMeta
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeTab` | `(tab) => void` | Local state / URL param |
| `onCreateBanner` | `(banner) => void` | POST banner to Supabase, upload creatives to storage |
| `onEditBanner` | `(id, updates) => void` | PATCH banner in Supabase |
| `onDeleteBanner` | `(id) => void` | DELETE banner from Supabase with confirmation |
| `onToggleBanner` | `(id) => void` | Toggle banner active state |
| `onAssignPlacement` | `(slotId, bannerId) => void` | Assign banner to slot (ratio must match), save to Supabase |
| `onRemovePlacement` | `(slotId) => void` | Remove banner from slot |
| `onToggleSite` | `(siteId) => void` | Enable/disable ecosystem site |
| `onConnectSocial` | `(platform) => void` | OAuth connect to social platform |
| `onDisconnectSocial` | `(platform) => void` | Disconnect social platform |
| `onPublishToSocial` | `(bannerId, platform, caption) => void` | Create NEW post on platform via API, log to Supabase |

## User Flows

### Flow 1: Create and Schedule a Banner

1. Admin opens the Banners tab and clicks "Create Banner"
2. Fills in: name, headline, CTA text, CTA URL, priority
3. Links to specific products from the catalog via product picker
4. Uploads creatives for 6 aspect ratios (or whichever are needed)
5. Sets start date to next Monday, end date to end of month
6. Saves as draft, then toggles to active
7. **Outcome:** Banner created in Supabase with status "scheduled", goes live on start date. Ecosystem sites serve the banner via API on next page load (60s CDN cache).

### Flow 2: Assign Banners to Ecosystem Site Slots

1. Admin opens the Placements tab
2. Sees card for "vastu-tips.vastucart.com" with 3 slots: hero-banner (16:9), sidebar-widget (4:3), post-footer (16:3)
3. Clicks on "hero-banner" slot and selects a banner that has a 16:9 creative
4. Assigns it — slot now shows the banner name
5. **Outcome:** The ecosystem site's hero banner slot serves the assigned creative on next page load

### Flow 3: Review Analytics

1. Admin opens the Analytics tab
2. Views stat cards: 45,200 total impressions, 1,230 clicks, 2.72% avg CTR, 8 active banners
3. Scrolls to performance table showing per-banner per-site breakdown
4. Filters to last 7 days
5. **Outcome:** Admin identifies which banners and sites drive the most engagement

### Flow 4: Publish to Social Media

1. Admin opens the Social Publishing tab
2. Sees connected accounts grid — Pinterest and Instagram are connected, Facebook is not
3. Clicks Connect on Facebook, completes OAuth flow
4. Selects a banner, chooses Instagram as platform
5. System auto-selects the 1:1 creative for Instagram
6. Admin writes caption and fills in rich metadata: title, headline, description, link URL, CTA text, hashtags, alt text
7. Clicks Publish — creates a NEW post (never updates existing)
8. Post appears in the publish log as "pending", then updates to "published" with a link to the live post
9. **Outcome:** New Instagram post created with the banner creative and metadata. Old posts remain untouched for organic traffic.

## Empty States

| State | Message |
|-------|---------|
| No banners | "No banners created yet. Create your first banner to start advertising across your ecosystem." |
| No placements configured | "No ecosystem sites registered. Add your subdomain sites to manage banner placements." |
| No analytics data | "No impression data yet. Analytics will appear once banners are served on ecosystem sites." |
| No social accounts connected | "Connect your social media accounts to start publishing." |
| No publish log entries | "No posts published yet. Publish your first banner to social media." |
| No matching creative for slot | "This banner doesn't have a creative matching this slot's aspect ratio." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-ecosystem-ads/spec.md` |
| Types | `product/sections/admin-ecosystem-ads/types.ts` |
| Sample Data | `product/sections/admin-ecosystem-ads/data.json` |
| Components | `src/sections/admin-ecosystem-ads/components/` |

## Done When

- [ ] Banner CRUD (create, read, update, delete) works against Supabase
- [ ] Banner form supports all fields: name, headline, CTA, schedule, priority, product linking
- [ ] Creative upload works for all 6 aspect ratios (1:1, 16:9, 9:16, 16:3, 4:3, 2:3) to Supabase storage
- [ ] Banner status (draft/scheduled/live/expired) auto-updates based on dates
- [ ] Active/inactive toggle works
- [ ] Ecosystem sites load from Supabase with their slots
- [ ] Slot assignment only allows banners with matching aspect ratio creatives
- [ ] Assigned banners are served via API to ecosystem sites (with 60s CDN cache)
- [ ] Removing a placement clears the slot
- [ ] Site enable/disable toggle works
- [ ] Analytics stat cards show real aggregated data
- [ ] Performance table shows per-banner per-site impressions/clicks/CTR
- [ ] Period-based filtering works on analytics
- [ ] Social platform OAuth connect/disconnect works for all 5 platforms
- [ ] Publishing creates a NEW post on the selected platform (never updates existing)
- [ ] Platform auto-selects the correct creative ratio (Pinterest=2:3, Instagram=1:1, Facebook=16:9, Twitter=16:9, Threads=1:1)
- [ ] Rich post metadata form captures title, headline, description, link, CTA, hashtags, alt text
- [ ] Publish log displays all posts with platform filter, status, and post URL links
- [ ] Status updates from pending to published/failed in the log
- [ ] Delete banner shows confirmation dialog
- [ ] Loading states on all data fetches
- [ ] Error handling on API failures (social publish failures show in log as "failed")
- [ ] Empty states render for each tab
- [ ] Dark mode renders correctly
