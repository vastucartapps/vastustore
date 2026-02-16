# Milestone 01 — Application Shell

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

VastuCart has three distinct application shells that wrap all content. Every page in the application uses one of these shells. The shell is the first thing to build because all subsequent milestones depend on it.

## Design Tokens Setup

Before building shell components, set up the design system tokens from `design-system/`:

- **Colors**: Primary `#013f47` (deep teal), Secondary `#c85103` (burnt saffron), Background `#fffbf5` (cream)
- **Typography**: Lora (headings/serif), Open Sans (body/sans), IBM Plex Mono (mono)
- **Gradient accent border**: `linear-gradient(90deg, #013f47, #2a7a72, #c85103)` — applied as a top border on cards and key UI elements throughout all shells

Load Google Fonts for Lora, Open Sans, and IBM Plex Mono. Configure them in your Next.js `_app.tsx` or layout file. Create CSS custom properties or Tailwind theme extensions for the brand colors.

Reference files:
- `design-system/colors.json`
- `design-system/typography.json`
- `design-system/theme.json`

## Shell Components

Components provided in `shell/`:
- **AppShell.tsx** — Root layout wrapper that renders the correct shell based on context
- **MainNav.tsx** — Primary navigation component (storefront top nav, sidebar navs)
- **UserMenu.tsx** — Account dropdown / user avatar menu
- **index.ts** — Barrel export

## Three Shell Patterns

### 1. Storefront Shell (Public Pages)

Used for: Homepage, category listing, product detail, search results, static pages, cart, checkout.

**Structure:**
- **Announcement ribbon**: Full-width deep teal bar with white text, dismissible (X button). Content is admin-configurable. Sits at the very top.
- **Header**: VastuCart logo at `/VastuCartLogo.png` (left), expandable search bar (center), account/wishlist/cart icons (right). Account icon links to login or dashboard depending on auth state. Wishlist shows heart icon with count badge. Cart shows bag icon with item count badge.
- **Category navigation bar**: Horizontal bar below header with category links. Mega menu on hover for categories with subcategories.
- **Content area**: Full-width, cream background (`#fffbf5` / stone-50)
- **Footer**: Multi-column layout with deep teal background (`#013f47`), white text. Columns: About, Quick Links, Policies, Contact. Newsletter signup. Social media icons. Copyright.

**Routes:** `/`, `/category/[slug]`, `/product/[slug]`, `/search`, `/cart`, `/checkout`, `/about`, `/contact`, `/faq`, `/privacy-policy`, `/terms`, `/shipping-policy`, `/refund-policy`

### 2. Customer Dashboard Shell (Authenticated Customer Pages)

Used for: All `/account/*` routes.

**Structure:**
- **Same storefront header** as above (for continuity — user stays in the store context)
- **Left sidebar (240px)**: User avatar and name at top, navigation links with icons:
  - Dashboard Home, My Orders, Address Book, Wishlist, Coupons, Loyalty Points, Bookings, Gift Cards, Notifications, Support, Logout
- **Content area**: Right of sidebar, white background
- Active nav item: teal-600 left border indicator

**Routes:** `/account`, `/account/orders`, `/account/orders/[id]`, `/account/addresses`, `/account/wishlist`, `/account/coupons`, `/account/loyalty`, `/account/bookings`, `/account/gift-cards`, `/account/notifications`, `/account/support`

### 3. Admin Dashboard Shell (Admin Pages)

Used for: All `/admin/*` routes.

**Structure:**
- **Admin header**: Dark deep teal background, VastuCart admin branding (logo + "Admin"), user menu on right
- **Left sidebar (260px)**: White background, collapsible grouped sections:
  - **Main**: Overview (LayoutDashboard icon)
  - **Catalog**: Products, Categories, Reviews & Q&A
  - **Sales**: Orders, Returns & Refunds, Customers
  - **Bookings**: Consultations
  - **Marketing**: Coupons, Gift Cards, Loyalty & Rewards
  - **Settings**: Shipping, Payments & Tax, Storefront & Content, Integrations & SEO, Notifications
- **Content area**: stone-50 background, breadcrumbed
- Active nav item: teal-600 left border indicator
- Sidebar groups are collapsible (click group header to toggle)

**Routes:** `/admin`, `/admin/products`, `/admin/categories`, `/admin/reviews`, `/admin/orders`, `/admin/returns`, `/admin/customers`, `/admin/bookings`, `/admin/coupons`, `/admin/gift-cards`, `/admin/loyalty`, `/admin/shipping`, `/admin/payments`, `/admin/storefront`, `/admin/integrations`, `/admin/notifications`

## Navigation Wiring

Wire all navigation links to Next.js `<Link>` components or `router.push()`:
- Logo click navigates to `/`
- All sidebar items use `router.push()` for the corresponding route
- Cart icon opens the cart drawer (not a page navigation)
- Wishlist icon navigates to `/account/wishlist`
- Account icon: if logged in, show UserMenu dropdown with links to dashboard sections and logout; if not logged in, navigate to `/login`
- Admin routes are protected — check user role from Supabase auth; redirect non-admins to access denied page

## Responsive Behavior

### Desktop (lg: 1024px+)
- Full header with all elements visible
- Sidebars always visible at full width
- Multi-column footer
- Category bar shows all top-level categories

### Tablet (md: 768px)
- Search collapses to magnifying glass icon (click to expand)
- Category bar becomes horizontally scrollable
- Sidebars collapse to icon-only mode (expand on hover or click)
- Footer becomes 2 columns

### Mobile (sm: < 768px)
- Hamburger menu icon replaces navigation — opens slide-out drawer from left
- Full-screen search overlay when search icon tapped
- Sidebars hidden completely — accessible via hamburger or bottom sheet
- Single-column footer
- Category navigation moves into the hamburger drawer

## Gradient Accent Border Pattern

Apply the signature gradient top border on cards and key UI elements:

```css
border-top: 3px solid transparent;
border-image: linear-gradient(90deg, #013f47, #2a7a72, #c85103) 1;
```

Use this on: card components, section dividers, form cards on auth pages, dashboard stat cards, and any elevated UI element that needs brand emphasis.

## Integration Notes

- Fetch announcement ribbon content from your admin CMS / Medusa store settings
- Cart item count and wishlist count should come from your cart state (React context or Zustand store backed by Medusa v2 cart API)
- User auth state from Supabase — check `supabase.auth.getUser()` to determine which shell to show and what to display in the user menu
- Admin role check: query user metadata or a roles table in Supabase to determine admin access
- Category navigation data: fetch from Medusa v2 product categories API

## Files to Reference

- `shell/AppShell.tsx`, `shell/MainNav.tsx`, `shell/UserMenu.tsx`, `shell/index.ts`
- `design-system/colors.json`, `design-system/typography.json`, `design-system/theme.json`

## Done Checklist

- [ ] Design tokens (colors, fonts, gradient border) configured in Tailwind / CSS
- [ ] Google Fonts loaded (Lora, Open Sans, IBM Plex Mono)
- [ ] Storefront shell: announcement ribbon, header with logo/search/icons, category nav, footer
- [ ] Customer dashboard shell: storefront header + 240px sidebar with all nav items
- [ ] Admin dashboard shell: dark teal header + 260px grouped sidebar with all nav items
- [ ] All navigation links wired to Next.js routes
- [ ] VastuCart logo renders from `/VastuCartLogo.png`
- [ ] Cart icon shows live item count badge
- [ ] Wishlist icon shows live count badge
- [ ] User menu: login link (unauthenticated) or dropdown with dashboard/logout (authenticated)
- [ ] Admin route protection (role check, access denied page)
- [ ] Responsive: desktop, tablet (collapsed search, scrollable category bar, icon-only sidebars), mobile (hamburger drawer, full-screen search, hidden sidebars)
- [ ] Gradient accent border applied on cards and key UI elements
- [ ] Announcement ribbon is dismissible and content comes from backend
- [ ] Dark mode support with `dark:` variants on all shell elements
