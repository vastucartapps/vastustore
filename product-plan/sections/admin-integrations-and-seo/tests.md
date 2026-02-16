# Test Specs: Admin Integrations & SEO

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Integrations Grid
**Success Path:**
- Card grid renders (1 col mobile, 2 col md, 3 col lg)
- Each card shows icon, name, description, status dot (green/red/gray)
- Connected toggle switches integration on/off
- Config fields editable per integration
- "Test Connection" button triggers `onTestConnection`
- Save config triggers `onSaveIntegrationConfig`
- Last synced timestamp shown for feed integrations

### Flow 2: SEO Title & Meta
**Success Path:**
- Site title template input with preview of generated title
- Meta description textarea with character counter (150-160 recommended)
- Save triggers `onSaveSEO`

### Flow 3: Robots & Sitemap
**Success Path:**
- Monospace textarea for robots.txt editing
- XML sitemap auto-generation toggle
- Last generated date displayed
- Save triggers `onSaveSEO`

### Flow 4: Open Graph & Social
**Success Path:**
- Default OG image URL, title, description inputs
- Twitter handle and card type settings
- Save triggers `onSaveOpenGraph`

### Flow 5: Marketing Tags
**Success Path:**
- List of tags with platform badges and active toggles
- Add new tag with platform, pixel ID
- Toggle triggers `onToggleTag`
- Remove triggers `onRemoveTag`

## Empty State Tests
- No integrations: empty grid message
- No marketing tags: empty list with "Add Tag" CTA

## Edge Cases
- Integration with error status shows red dot
- Meta description over 160 chars shows warning
- Robots.txt preserves whitespace and formatting
- Inline save shows success feedback toast
- Tab switching between Integrations and SEO
