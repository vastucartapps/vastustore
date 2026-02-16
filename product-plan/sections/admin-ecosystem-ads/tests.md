# Test Specs: Admin Ecosystem Ads

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Banner Management
**Success Path:**
- Status filter pills: draft, scheduled, live, expired
- Banner cards show headline, CTA, status, stats (impressions, clicks, CTR)
- Create banner: headline, CTA text/URL, schedule, priority, product picker
- Upload creatives per aspect ratio (1:1, 16:9, 9:16, 16:3, 4:3, 2:3)
- Active/inactive toggle per banner
- Edit and delete actions available

### Flow 2: Placement Management
**Success Path:**
- Site cards with expandable slot management
- Each slot shows name, aspect ratio, currently assigned banner
- Assign banner: only banners with matching aspect ratio selectable
- Remove placement clears slot
- Toggle site active/inactive

### Flow 3: Analytics Dashboard
**Success Path:**
- Stat cards: total impressions, clicks, avg CTR, active banners
- Performance table: impressions/clicks/CTR per banner per site
- Period-based filtering updates data

### Flow 4: Social Publishing
**Success Path:**
- Connected accounts grid shows 5 platforms with connect/disconnect
- Select banner + platform, write caption
- Platform auto-selects correct creative ratio
- Publish triggers `onPublishToSocial`
- Publish log shows posts with platform filter, status, post links

**Failure Path:**
- Publishing to disconnected platform shows error
- Banner without matching creative ratio cannot be published

## Empty State Tests
- No banners: empty with "Create Banner" CTA
- No sites registered: empty placements
- No social accounts connected: prompt to connect
- No publish history: empty log

## Edge Cases
- Banner with missing creatives for some ratios
- Expired banner cannot be assigned to slots
- Social post status: published/pending/failed states
- Slot with no banner assigned shows empty state
- 60-second CDN cache note for placement updates
