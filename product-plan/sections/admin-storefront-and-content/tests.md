# Test Specs: Admin Storefront & Content

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Announcement Ribbon
**Success Path:**
- Form fields: message, link text, link URL
- Color pickers for background and text colors
- Active toggle switch
- Date range scheduling (start/end)
- Save triggers `onUpdateAnnouncement`

### Flow 2: Branding
**Success Path:**
- Text inputs: store name, tagline, contact email, phone, address
- Logo and favicon upload placeholders
- Save triggers `onUpdateBranding`

### Flow 3: Homepage Sections
**Success Path:**
- Numbered list of sections with toggle switches
- Up/down arrows reorder sections
- Toggle triggers `onToggleSection`
- Reorder triggers `onReorderSection`

### Flow 4: Content Pages
**Success Path:**
- Table: title, slug, last updated, published status, edit action
- Click edit opens inline textarea editor
- Save triggers `onEditPage`
- Toggle publish triggers `onTogglePagePublish`

### Flow 5: Footer
**Success Path:**
- Editable column list with link management (add/remove links)
- Copyright text field
- Social links visibility toggle
- Save triggers `onUpdateFooter`

## Empty State Tests
- No content pages: empty table
- Footer with no columns: empty with "Add Column" CTA

## Edge Cases
- Announcement with no link (link fields optional)
- Homepage section at top cannot move up
- Homepage section at bottom cannot move down
- Content page with very long text in editor
- Tab switching preserves unsaved state per tab
