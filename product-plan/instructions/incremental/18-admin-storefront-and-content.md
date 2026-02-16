# Milestone 18 — Admin: Storefront & Content

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

Admin interface for managing public-facing storefront content and appearance. Five tabbed sections: Announcement ribbon editor with scheduling, Store branding settings (name, logo, favicon, contact info), Homepage section ordering with visibility toggles, Content page editor for static pages (About, Contact, Privacy, Terms, Shipping, Refund), and Footer column/link management with copyright and social toggles.

## Key Functionality

- Edit announcement ribbon: message, link text, link URL, background/text color pickers, active toggle, start/end date scheduling
- Update store branding: store name, tagline, contact email, phone, address, logo and favicon upload
- Reorder homepage sections with up/down arrows; toggle visibility per section
- View and edit content pages (About, Contact, Privacy, Terms, Shipping, Refund) with inline rich text editor
- Toggle page publish status
- Manage footer columns: add/remove columns, edit titles, add/remove links within columns
- Set copyright text and toggle social links visibility

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminStorefront` | Root component with 5-tab interface for all storefront content management |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `announcement` | `Announcement` | Announcement ribbon configuration |
| `branding` | `Branding` | Store branding settings |
| `homepageSections` | `HomepageSection[]` | Ordered list of homepage sections |
| `contentPages` | `ContentPage[]` | Static content pages |
| `footerConfig` | `FooterConfig` | Footer columns, copyright, social toggle |

### Key Types

```ts
interface Announcement {
  message: string; linkText: string; linkUrl: string
  bgColor: string; textColor: string; isActive: boolean
  schedule: { startDate: string; endDate: string }
}

interface Branding {
  storeName: string; tagline: string; contactEmail: string
  contactPhone: string; address: string; logoUrl: string; faviconUrl: string
}

interface HomepageSection {
  id: string; name: string; type: string; enabled: boolean; order: number
}

interface ContentPage {
  id: string; title: string; slug: string; lastUpdated: string
  isPublished: boolean; excerpt: string
}

interface FooterConfig {
  columns: { title: string; links: { label: string; url: string }[] }[]
  copyrightText: string; showSocialLinks: boolean
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onUpdateAnnouncement` | `(a) => void` | Save announcement config to Supabase store settings |
| `onUpdateBranding` | `(b) => void` | Save branding to Supabase; upload logo/favicon to storage |
| `onReorderSection` | `(id, direction) => void` | Update section order in Supabase |
| `onToggleSection` | `(id, enabled) => void` | Toggle homepage section visibility |
| `onEditPage` | `(id, content) => void` | Save page content to Supabase content table |
| `onTogglePagePublish` | `(id, published) => void` | Toggle page published status |
| `onUpdateFooter` | `(f) => void` | Save footer configuration to Supabase |

## User Flows

### Flow 1: Set Up an Announcement Banner

1. Admin opens the Announcement tab
2. Types message: "Free shipping on orders above INR 999!"
3. Sets link text to "Shop Now", link URL to "/collections/bestsellers"
4. Picks background color (brand teal) and text color (white)
5. Sets schedule: start today, end in 7 days
6. Toggles active to ON
7. Clicks Save
8. **Outcome:** Announcement ribbon appears on the live storefront with the scheduled dates

### Flow 2: Reorder Homepage Sections

1. Admin opens the Homepage Sections tab
2. Sees numbered list: Hero Banner, Featured Categories, New Arrivals, Bestsellers, Testimonials
3. Clicks the down arrow on "Featured Categories" to move it below "New Arrivals"
4. Disables "Testimonials" section (toggle off)
5. Clicks Save
6. **Outcome:** Homepage renders sections in the new order, Testimonials hidden

### Flow 3: Edit a Content Page

1. Admin opens the Content Pages tab
2. Sees table of pages with title, slug, last updated, published status
3. Clicks Edit on "Privacy Policy"
4. Inline textarea editor opens with current content
5. Admin updates the content and clicks Save
6. **Outcome:** Privacy policy page on storefront shows updated content

### Flow 4: Configure Footer

1. Admin opens the Footer tab
2. Edits column titles: "Quick Links", "Customer Service", "About Us"
3. Adds a new link under "Customer Service": "Track Order" -> "/track-order"
4. Updates copyright text to "2026 VastuCart. All rights reserved."
5. Enables social links toggle
6. Clicks Save
7. **Outcome:** Footer on all storefront pages reflects the new structure

## Empty States

| State | Message |
|-------|---------|
| No announcement configured | "No announcement ribbon set. Create one to display a banner across your storefront." |
| No homepage sections | "No homepage sections configured." |
| No content pages | "No content pages created yet." |
| No footer columns | "No footer columns configured. Add columns to organize your footer links." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-storefront-and-content/spec.md` |
| Types | `product/sections/admin-storefront-and-content/types.ts` |
| Sample Data | `product/sections/admin-storefront-and-content/data.json` |
| Components | `src/sections/admin-storefront-and-content/components/` |

## Done When

- [ ] Announcement ribbon saves all fields (message, link, colors, schedule, active toggle) to Supabase
- [ ] Announcement appears on the live storefront when active and within schedule dates
- [ ] Branding fields (name, tagline, contact info) save to Supabase
- [ ] Logo and favicon upload to Supabase storage and URLs save correctly
- [ ] Homepage section reordering persists and reflects on the live storefront
- [ ] Section visibility toggle hides/shows sections on the homepage
- [ ] Content pages table loads all pages with correct metadata
- [ ] Inline editor saves page content to Supabase
- [ ] Page publish toggle controls public visibility
- [ ] Footer columns with links save and render on the storefront footer
- [ ] Copyright text and social links toggle work correctly
- [ ] Color pickers for announcement produce valid hex values
- [ ] All saves show success feedback
- [ ] Loading states while fetching content
- [ ] Error handling on save failures
- [ ] Dark mode renders correctly
