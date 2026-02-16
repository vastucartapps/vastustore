# VastuCart — Complete Implementation Instructions

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

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Testing

Each section includes a `tests.md` file with UI behavior test specs. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---


# VastuCart Store — Product Overview

## Product Summary

**VastuCart Store** is a premium e-commerce platform for spiritual and Vastu Shastra products, serving Indian and international customers with dual-currency pricing (INR/USD based on IP detection). It offers physical products, digital downloads, and bookable consultations with an Amazon-level product experience, Google Shopping optimization, and a rich admin dashboard for complete store management.

## Problems & Solutions

1. **Spiritual product buyers lack a trustworthy, dedicated online store** — VastuCart establishes brand authority through a curated catalog with Rich Product Content (A+ content), detailed specifications, verified reviews, product Q&A, and FAQs.

2. **Indian and international customers need different payment and pricing experiences** — IP-based currency detection serves INR pricing with Razorpay (including COD) to Indian visitors and USD pricing with Stripe to international visitors.

3. **Spiritual products require rich, educational product information to convert** — Amazon-level product pages with 10-image galleries, Rich Product Content blocks, specifications, attributes, Q&A, FAQs, and review aggregation.

4. **Ranking on Google Shopping and organic search is critical for traffic** — Full SEO suite with JSON-LD structured data, Google Merchant Centre integration, XML sitemaps, Open Graph tags, and admin-level SEO controls.

5. **Store owners need complete control without technical knowledge** — Comprehensive admin dashboard with product wizard, order management, coupon/gift card systems, shipping/payment/tax configuration, and content editing.

## Key Features

- Dual-currency storefront (INR/USD) with IP-based detection
- Physical products, digital downloads, and bookable consultations
- Multiple product variants with independent stock and pricing
- 10-image product gallery with zoom
- Rich Product Content (A+ / Enhanced Brand Content) editor
- Product Q&A, admin-managed FAQs with FAQ schema for rich snippets
- Review system with ratings, photos, and admin moderation
- Delivery date check with pincode serviceability
- Advanced search with autocomplete and faceted filters
- Quick view modal on category/listing pages
- Wishlist with back-in-stock email notifications
- Multi-step checkout with guest checkout support
- COD for India only with configurable fee and order brackets
- Prepaid order discounts and abandoned cart recovery
- Razorpay (India) + Stripe (International) payment gateways
- GST-compliant invoice generation with HSN codes
- Loyalty points system and gift cards
- Consultation booking with time slots and calendar
- Google Merchant Centre, Analytics, Meta Pixel integrations
- In-app notifications, email (Listmonk), SMS, WhatsApp, push
- Support via Chatwoot integration
- Content page management from admin
- PWA support and full SEO suite

---

## Sections (Implementation Roadmap)

### 1. Authentication & Onboarding
User registration (email/password + Google social login via open-source auth), login page, forgot password and reset password flow, email verification, guest-to-account conversion after checkout, admin login with separate auth guard, session management, and account security settings (change password, active sessions, logout all devices).

### 2. Storefront & Navigation
The public-facing storefront including homepage (hero banner/slider, announcement ribbon, category grid, featured/new/bestseller product carousels, deals section, testimonials, newsletter signup, trust badges), header with search and cart, footer, category listing pages with image overlay and filters, advanced search with autocomplete and faceted filtering, and static pages (About, Contact, Policies).

### 3. Product Experience
The product detail page with 10-image gallery, Rich Product Content (A+ blocks), product specifications table, product attributes, description tabs, Q&A section, admin-managed FAQs, customer reviews with ratings and photos, delivery date check with pincode, related products, social sharing, and quick-view modal for category pages. Also includes breadcrumb navigation and recently viewed products.

### 4. Cart & Checkout
Shopping cart with variant display and quantity controls, multi-step checkout flow (address, shipping method, payment, order confirmation), guest checkout (collect full delivery data, no COD), COD with configurable fee and order brackets (India only), prepaid discount application, coupon and gift card redemption, dual-currency display (INR/USD), Razorpay and Stripe payment integration, GST-compliant invoice generation, and abandoned cart recovery emails.

### 5. Customer Dashboard
Profile management, my orders with order detail and tracking, address book, wishlist with back-in-stock notifications, active coupons display, loyalty points balance and history, my bookings/consultations (visible only when bookings exist), notification center (bell icon), gift card balance, and support access via Chatwoot.

### 6. Admin — Overview Dashboard
Admin home dashboard with at-a-glance info cards (total orders, revenue today/week/month, pending orders, low-stock alerts, new customers, recent reviews) each linking to their relevant page, quick-action shortcuts, recent orders list, and sales chart/graph.

### 7. Admin — Product Management
Product add/edit wizard with tabbed interface (basic info, variants and pricing, Rich Product Content editor, SEO meta and URL slugs, image gallery upload, specifications and attributes, FAQs, Google Merchant Centre fields), product list with filters and bulk actions, bulk product import/export via CSV, and basic inventory tracking per variant with out-of-stock badges.

### 8. Admin — Category Management
Category list with tree view for hierarchy, category add/edit form with image upload, title, description, URL slug, SEO meta, parent category selection, display order, and active/inactive toggle. Category delete with product reassignment prompt.

### 9. Admin — Order Management
Orders table with status filters, date range, search by order ID or customer, individual order detail page (items, address, payment info, invoice download, customer notes), order status workflow (accepted, shipped, dispatched, in transit, out for delivery, delivered) with status update and tracking number entry, follow-up email trigger on delivery, and order notes/internal comments.

### 10. Admin — Returns & Refunds
Return requests list with status filters, return detail page with reason, photos, admin approval/rejection with notes, refund processing (full or partial, back to original payment method or store credit), exchange initiation, and return policy enforcement.

### 11. Admin — Customer Management
Customer list with search, filters (new, repeat, inactive, total spend), individual customer detail page (profile info, order history, lifetime value, loyalty points, addresses, reviews, support tickets), and customer notes.

### 12. Admin — Reviews & QA Moderation
Reviews moderation panel with pending/approved/rejected tabs, bulk approve/reject, review detail with product link, star rating, photos, and verified purchase badge. Product Q&A moderation with answer capability from admin.

### 13. Admin — Coupons & Gift Cards
Coupon management (create, edit, disable, delete) with rules: percentage or flat discount, minimum order, max discount cap, date range, usage limits, product/category targeting, currency-specific values. Gift card management with creation, balance tracking, and activation/deactivation.

### 14. Admin — Bookings & Consultations
Consultation time slot configuration, calendar availability management, upcoming bookings list, booking detail page with customer info and meeting link, booking status updates (pending, confirmed, completed, cancelled), and auto-generated Zoom/Google Meet links.

### 15. Admin — Shipping & Delivery
Flat rate configuration per zone, free shipping threshold, COD toggle (India only) with fee amount and min/max order brackets, delivery estimate ranges by pincode/region, and shipping policy content editor.

### 16. Admin — Payments & Tax
Razorpay and Stripe API key configuration with test/live mode toggle, payment method toggles (UPI, cards, netbanking, wallets, COD), store-level default GST rate and GSTIN, per-product GST rate and HSN code overrides, and international tax-exempt toggle (export under LUT).

### 17. Admin — Storefront & Content
Announcement ribbon editor (message, link, color, schedule), content page editor for About, Contact, Privacy Policy, Terms, Shipping Policy, Refund Policy with rich text editor, store branding (logo, favicon, store name, contact details), homepage section ordering and visibility toggles, and footer content management.

### 18. Admin — Notifications & Communication
Email template management (order confirmation, shipping update, delivery, abandoned cart, welcome, password reset) with customizable content, SMS and WhatsApp notification configuration, push notification settings, in-app announcement broadcasting to customers, and Listmonk/Chatwoot integration settings.

### 19. Admin — Loyalty & Rewards
Loyalty program configuration (points per rupee/dollar spent, minimum redemption threshold, points expiry), loyalty tier setup for future use, points adjustment tool for manual credits/debits, and program enable/disable toggle.

### 20. Admin — Integrations & SEO
Google Analytics tracking ID setup, Meta Pixel configuration, Google Merchant Centre integration with product feed sync and live connection status, performance marketing tags, SEO defaults (site title template, meta description, robots.txt, XML sitemap auto-generation), and Open Graph / Twitter card defaults.

### 21. Admin — Ecosystem Ads
Centralized banner and creative management for all 12 ecosystem subdomain sites plus social publishing to Pinterest, Instagram, Facebook, Twitter/X, and Threads. Create banners by selecting products from catalog, uploading creatives in 6 aspect ratios, setting rich metadata. Placement management per subdomain with named slots served via API with CDN caching. Social publishing with per-platform caption customization, publish log, and analytics dashboard with impressions and clicks per site.

---

## Data Shape — Entity Overview

The following entities define the data contracts that UI components expect:

| Entity | Description |
|--------|-------------|
| User | Customer or admin account with profile, role, loyalty points, preferences |
| Product | Sellable item (physical, digital, or consultation) with dual-currency pricing |
| ProductVariant | Specific variation (size, weight, material) with own SKU, stock, pricing |
| ProductImage | Gallery image with ordering, alt text, and designation |
| RichProductContent | A+ content blocks (text, images, charts, highlights) |
| Category | Product grouping with hierarchy, image overlay, and SEO metadata |
| ProductSpecification | Key-value spec entries grouped by category |
| ProductFAQ | Admin-managed FAQ with schema markup support |
| ProductQuestion | User-submitted Q&A on product pages |
| Review | Customer review with rating, photos, verified badge, moderation |
| Cart | Shopping session with currency context and abandonment tracking |
| CartItem | Line item referencing a variant with quantity and price |
| Order | Completed purchase with status workflow and tracking |
| OrderItem | Line item capturing variant, quantity, price, and tax |
| Address | Saved shipping/billing address |
| Invoice | GST-compliant invoice with HSN codes and tax breakup |
| Coupon | Discount code with configurable rules and targeting |
| GiftCard | Prepaid store credit with dual-currency balance |
| LoyaltyTransaction | Points earned/redeemed record with source tracking |
| Wishlist | Saved-for-later list with back-in-stock notifications |
| Booking | Consultation appointment with meeting link and status |
| TimeSlot | Admin-configured availability window for consultations |
| ReturnRequest | Return/refund request with reason, status, and admin notes |
| Notification | In-app notification (system or admin-sent) with read status |
| ContentPage | Editable static page managed from admin |
| Announcement | Storefront header ribbon with scheduling |
| ShippingSetting | Store-wide shipping config (rates, COD, thresholds) |
| TaxSetting | GST configuration with per-product overrides |
| Integration | Third-party service connections (Analytics, Pixel, GMC) |

---

## Design System Summary

### Colors
- **Primary:** Deep Teal (#013f47) — used for headers, buttons, key UI elements
- **Secondary:** Burnt Saffron (#c85103) — used for accents, CTAs, highlights
- **Background:** Cream (#fffbf5) — warm, spiritual aesthetic
- **Earth tones** for supporting text and borders
- **Semantic:** Green (success), Amber (warning), Red (error)
- **Never use:** indigo, blue, purple, violet, fuchsia, sky, cyan

### Typography
- **Heading:** Lora (serif) — elegant, spiritual feel
- **Body:** Open Sans (sans-serif) — clean readability
- **Mono:** IBM Plex Mono — code and data display

### Gradients
- Accent border on cards: `linear-gradient(90deg, #013f47, #2a7a72, #c85103)`
- Primary buttons: `linear-gradient(135deg, #013f47, #054348)`
- Secondary buttons: `linear-gradient(135deg, #c85103, #d06028)`
- Header: `linear-gradient(135deg, #013f47, #054348)`
- Footer: `linear-gradient(180deg, #013f47, #012d33)`

---

## Implementation Sequence

| Milestone | ID | Section |
|-----------|----|---------|
| 01 | shell | Application Shell |
| 02 | authentication-and-onboarding | Authentication & Onboarding |
| 03 | storefront-and-navigation | Storefront & Navigation |
| 04 | product-experience | Product Experience |
| 05 | cart-and-checkout | Cart & Checkout |
| 06 | customer-dashboard | Customer Dashboard |
| 07 | admin-overview-dashboard | Admin — Overview Dashboard |
| 08 | admin-product-management | Admin — Product Management |
| 09 | admin-category-management | Admin — Category Management |
| 10 | admin-order-management | Admin — Order Management |
| 11 | admin-returns-and-refunds | Admin — Returns & Refunds |
| 12 | admin-customer-management | Admin — Customer Management |
| 13 | admin-reviews-and-qa-moderation | Admin — Reviews & QA Moderation |
| 14 | admin-coupons-and-gift-cards | Admin — Coupons & Gift Cards |
| 15 | admin-bookings-and-consultations | Admin — Bookings & Consultations |
| 16 | admin-shipping-and-delivery | Admin — Shipping & Delivery |
| 17 | admin-payments-and-tax | Admin — Payments & Tax |
| 18 | admin-storefront-and-content | Admin — Storefront & Content |
| 19 | admin-notifications-and-communication | Admin — Notifications & Communication |
| 20 | admin-loyalty-and-rewards | Admin — Loyalty & Rewards |
| 21 | admin-integrations-and-seo | Admin — Integrations & SEO |
| 22 | admin-ecosystem-ads | Admin — Ecosystem Ads |

---

*Generated by Design OS*

---


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

---


# Milestone 02 — Authentication & Onboarding

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

Authentication handles user registration, login, password recovery, email verification, guest-to-account conversion, and session management. All auth pages use a split-screen layout on desktop (form left, marketing content right). A single login form serves both customers and admins with role-based redirection.

## Key Functionality

- Email/password registration with real-time password strength meter
- Login with "Remember me" and role-based redirection (customer to storefront, admin to `/admin`)
- Forgot password flow with email reset link
- Email verification with dismissible reminder banner on storefront
- Guest-to-account conversion after guest checkout (email pre-filled, just needs password)
- Active session management (view devices, revoke individual or all sessions)
- Admin auth guard — protected `/admin/*` routes with access denied page for non-admins

## Components Provided

From `sections/authentication-and-onboarding/components/`:

| Component | Purpose |
|---|---|
| **AuthScreen.tsx** | Main auth view container — renders login, register, forgot-password, reset-password, or guest-conversion based on `view` prop |
| **MarketingPanel.tsx** | Right-side split-screen panel with slideshow of marketing images, quotes, and VastuCart logo overlay |
| **PasswordStrengthMeter.tsx** | Color-coded strength bar (red/amber/green) with requirements checklist |

## Props Reference

### Key Types

- `AuthView`: `'login' | 'register' | 'forgot-password' | 'reset-password' | 'guest-conversion'`
- `PasswordStrength`: `'weak' | 'medium' | 'strong'`
- `AuthUser`: `{ id, name, email, role: 'customer' | 'admin', isEmailVerified, avatarUrl, createdAt, lastLoginAt }`
- `ActiveSession`: `{ id, device, ipAddress, location, lastActive, isCurrent }`
- `MarketingSlide`: `{ id, imageUrl, quote, attribution, isActive, order }`
- `GuestConversion`: `{ email, orderNumber, orderTotal, message }`
- `VerificationBanner`: `{ message, actionLabel, isDismissible }`

### Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onLogin` | `(email, password, rememberMe) => void` | Supabase `signInWithPassword()`. On success, check role: admin goes to `/admin`, customer goes to `/` or return URL. |
| `onRegister` | `(name, email, password) => void` | Supabase `signUp()` + create Medusa v2 customer record. Show success, log user in immediately. |
| `onForgotPassword` | `(email) => void` | Supabase `resetPasswordForEmail()`. Show confirmation message regardless of whether email exists. |
| `onResetPassword` | `(newPassword) => void` | Supabase `updateUser({ password })` using the recovery token from the email link. |
| `onGuestConvert` | `(password) => void` | Create Supabase account with the guest's email, set password, link the guest order to the new account in Medusa. |
| `onResendVerification` | `() => void` | Supabase `resend()` for email verification. |
| `onDismissVerification` | `() => void` | Store dismissal in localStorage or cookie so banner doesn't reappear for this session. |
| `onRevokeSession` | `(sessionId) => void` | Call Supabase admin API or custom endpoint to revoke a specific session. |
| `onRevokeAllSessions` | `() => void` | Revoke all sessions except current via Supabase. |
| `onNavigate` | `(view: AuthView) => void` | `router.push()` to `/login`, `/register`, `/forgot-password`, etc. |

## User Flows

### Registration
1. User navigates to `/register`
2. Enters name, email, password
3. Password strength meter updates in real-time (checks: 8+ chars, uppercase, lowercase, number, special char)
4. On submit: create Supabase user + Medusa customer, log in immediately
5. Gentle banner appears on storefront: "Please verify your email" with resend link
6. User clicks email verification link — account marked verified, banner disappears

### Login
1. User navigates to `/login`
2. Enters email, password, optionally checks "Remember me"
3. On submit: Supabase `signInWithPassword()`
4. If `role === 'admin'`, redirect to `/admin`
5. If `role === 'customer'`, redirect to `/` or the URL they were trying to access
6. Invalid credentials: inline error "Invalid email or password"
7. "Remember me" extends session duration

### Forgot Password
1. User clicks "Forgot Password?" on login page
2. Enters email, submits
3. Show success message: "If an account exists, you'll receive a reset link"
4. User clicks link in email, lands on `/reset-password?token=...`
5. Enters new password + confirm, strength meter validates
6. On submit: password updated, redirect to login with success message

### Guest-to-Account Conversion
1. After guest checkout, order confirmation page shows conversion prompt
2. Email is pre-filled from the guest order
3. User only needs to set a password
4. On submit: create account, link guest order to new account
5. Redirect to customer dashboard

### Admin Login
1. Same `/login` page — no separate admin login URL
2. After authentication, backend checks role
3. Admin role: redirect to `/admin`
4. Non-admin trying to access `/admin/*`: show "Access Denied" page with link back to storefront

## Supabase Auth Integration

- Use `@supabase/supabase-js` client for all auth operations
- Store user role in Supabase user metadata or a separate `profiles` table
- Use Supabase Row Level Security (RLS) policies for admin vs customer data access
- Session persistence: Supabase handles this automatically; "Remember me" can extend via session config
- Email verification: use Supabase's built-in email verification flow
- Password reset: use Supabase's built-in recovery flow with custom redirect URL

## Empty States

- **No marketing slides configured**: Show a solid deep teal panel with VastuCart logo and tagline
- **Session list empty**: Show "No other active sessions" message

## Files to Reference

- `sections/authentication-and-onboarding/components/AuthScreen.tsx`
- `sections/authentication-and-onboarding/components/MarketingPanel.tsx`
- `sections/authentication-and-onboarding/components/PasswordStrengthMeter.tsx`
- `data-shapes/authentication-and-onboarding/types.ts`
- `design-system/theme.json`

## Done Checklist

- [ ] Login page with email, password, "Remember me", inline validation
- [ ] Registration page with name, email, password, real-time strength meter
- [ ] Split-screen layout: form left, marketing panel right (desktop); form only (mobile)
- [ ] Forgot password page sends reset email via Supabase
- [ ] Reset password page with token validation and strength meter
- [ ] Role-based redirect: customers to storefront, admins to `/admin`
- [ ] Email verification banner on storefront for unverified users (dismissible, with resend)
- [ ] Guest-to-account conversion on order confirmation page
- [ ] Active session management (list sessions, revoke individual, revoke all)
- [ ] Admin route protection with access denied page
- [ ] Loading states on all submit buttons
- [ ] Inline form validation errors
- [ ] Marketing panel shows admin-configurable slides (falls back to logo + teal)
- [ ] Gradient accent border on the auth form card
- [ ] Dark mode support

---


# Milestone 03 — Storefront & Navigation

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

The public-facing storefront is VastuCart's primary shopping experience. It includes a feature-rich homepage (hero slider, category grid, product carousels, deals with countdown, testimonials, trust badges, newsletter), category listing pages with faceted filtering, advanced search with autocomplete, and static content pages.

## Key Functionality

- Homepage with hero slider, category grid, three product carousels (Featured, New Arrivals, Bestsellers), deals with countdown timers, testimonials, trust badges, newsletter signup
- Category listing with sidebar filters (price range, ratings, availability, attributes), sorting, pagination
- Expandable search bar with autocomplete (product thumbnails, category suggestions, query suggestions)
- Product cards with hover interactions (quick view, add to cart, wishlist toggle)
- Static pages (About, Contact, FAQ, Policies) with rich text content from admin CMS
- Breadcrumb navigation on category and search pages

## Components Provided

From `sections/storefront-and-navigation/components/`:

| Component | Purpose |
|---|---|
| **Homepage.tsx** | Full homepage layout — hero slider, category grid, product carousels, deals, testimonials, trust badges, newsletter |
| **CategoryListing.tsx** | Category/search results page — sidebar filters, product grid, sort, pagination, breadcrumbs |
| **ProductCard.tsx** | Reusable product card — image, name, price (with MRP strike-through), rating, variant badge, hover actions |

## Props Reference

### Key Types

- `HeroSlide`: `{ id, imageUrl, heading, subtext, ctaLabel, ctaLink, order }`
- `CategoryCard`: `{ id, name, imageUrl, slug, productCount }`
- `ProductCard`: `{ id, name, slug, imageUrl, price, mrp, currency, rating, reviewCount, variantCount, isNew, inStock }`
- `DealProduct`: extends ProductCard with `{ discountPercent, expiresAt }` — expiresAt drives the countdown timer
- `Testimonial`: `{ id, quote, name, location, avatarUrl, rating, type: 'review' | 'testimonial', productName }`
- `TrustBadge`: `{ id, label, sublabel, icon }` — icons: truck, shield, refresh, badge-check
- `FilterGroup`: `{ id, label, type: 'checkbox' | 'range' | 'rating' | 'toggle', min, max, options }`
- `SearchSuggestion`: `{ type: 'product' | 'category' | 'query', label, imageUrl, price, slug }`
- `Announcement`: `{ message, link, isActive }`

### Homepage Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onHeroCtaClick` | `(link) => void` | `router.push(link)` |
| `onCategoryClick` | `(slug) => void` | `router.push(/category/${slug})` |
| `onProductClick` | `(slug) => void` | `router.push(/product/${slug})` |
| `onQuickView` | `(productId) => void` | Open QuickViewModal (from product-experience section) |
| `onAddToCart` | `(productId) => void` | Medusa v2 cart API — add line item, then open cart drawer |
| `onToggleWishlist` | `(productId) => void` | Add/remove from wishlist in Supabase |
| `onNewsletterSubscribe` | `(email) => void` | Submit to your email marketing service or Supabase table |

### Category Listing Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onFilterChange` | `(filterId, values) => void` | Update URL query params, re-fetch products from Medusa |
| `onPriceRangeChange` | `(min, max) => void` | Update URL query params, re-fetch with price filter |
| `onClearFilters` | `() => void` | Reset all filter query params |
| `onSortChange` | `(sortValue) => void` | Update sort query param, re-fetch |
| `onPageChange` | `(page) => void` | Update page query param, re-fetch |
| `onProductClick` | `(slug) => void` | `router.push(/product/${slug})` |
| `onQuickView` | `(productId) => void` | Open QuickViewModal |
| `onAddToCart` | `(productId) => void` | Medusa v2 cart API |
| `onToggleWishlist` | `(productId) => void` | Supabase wishlist table |

### Search Bar Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onSearch` | `(query) => void` | Debounced (300ms) fetch from Medusa product search API for autocomplete |
| `onSuggestionClick` | `(suggestion) => void` | Navigate based on type: product to `/product/[slug]`, category to `/category/[slug]`, query to `/search?q=...` |
| `onSubmit` | `(query) => void` | `router.push(/search?q=${query})` |
| `onToggle` | `(isOpen) => void` | Control search bar expand/collapse state |

## User Flows

### Browse Homepage
1. User lands on `/`
2. Announcement ribbon at top (from admin config, dismissible)
3. Hero slider auto-rotates with dot indicators; each slide has heading, subtext, CTA button
4. Category grid: image overlay cards with category name, hover zoom effect; click navigates to category listing
5. Three product carousel sections: Featured, New Arrivals, Bestsellers — horizontal scroll with arrow buttons
6. Deals section: product cards with discount badges and countdown timers (live countdown to `expiresAt`)
7. Testimonials: customer quotes with avatar, name, location, star rating
8. Trust badges row: Free Shipping, Secure Payment, Easy Returns, etc.
9. Newsletter signup in pre-footer area: email input + subscribe button, inline success message

### Filter Categories
1. User navigates to `/category/[slug]`
2. Category hero banner at top with name, description, product count
3. Breadcrumbs: Home > Category Name
4. Left sidebar: collapsible filter groups (price range slider, star rating checkboxes, availability toggle, product attributes)
5. Right side: product grid with sort dropdown (Relevance, Price Low-High, Price High-Low, Newest, Rating)
6. Applying a filter updates URL params and re-fetches products
7. Active filters shown as removable chips above the grid
8. Pagination controls at bottom
9. Mobile: sidebar filters collapse into slide-out drawer triggered by "Filters" button

### Search Products
1. User clicks search icon in header
2. Expandable search bar opens full-width with focus on input
3. As user types (debounced 300ms), autocomplete dropdown shows:
   - Product matches with thumbnail and price
   - Category suggestions
   - Search query suggestions
4. Click a suggestion or press Enter to navigate
5. Search results page uses same layout as category listing (sidebar filters + product grid)

## Data Fetching

- **Hero slides**: Admin-managed in Supabase or Medusa store settings
- **Categories**: Medusa v2 `GET /store/product-categories`
- **Products (carousels)**: Medusa v2 `GET /store/products` with appropriate filters (featured tag, created_at sort, bestseller tag)
- **Deals**: Products with active discount pricing where `expiresAt` is in the future
- **Testimonials**: Admin-curated in Supabase table
- **Category listing products**: Medusa v2 `GET /store/products` with category, price, and attribute filters from URL params
- **Search**: Medusa v2 `GET /store/products?q=...` for autocomplete and results

## Empty States

- **No products in category**: "No products found" with illustration and link to browse all categories
- **No search results**: "No results for '[query]'" with suggestions to try different keywords
- **No deals active**: Hide the deals section entirely on homepage
- **Empty wishlist**: Shown when toggling — use a toast notification for add/remove confirmation

## Files to Reference

- `sections/storefront-and-navigation/components/Homepage.tsx`
- `sections/storefront-and-navigation/components/CategoryListing.tsx`
- `sections/storefront-and-navigation/components/ProductCard.tsx`
- `data-shapes/storefront-and-navigation/types.ts`

## Done Checklist

- [ ] Homepage hero slider with auto-rotation, dot indicators, CTA buttons
- [ ] Category grid with image overlay cards, hover zoom, click navigation
- [ ] Three product carousels (Featured, New Arrivals, Bestsellers) with horizontal scroll and arrows
- [ ] Deals section with discount badges and live countdown timers
- [ ] Testimonials section with avatar, name, location, star rating
- [ ] Trust badges row
- [ ] Newsletter signup with inline success/error feedback
- [ ] Category listing page with sidebar filters (price range, rating, availability, attributes)
- [ ] Sort dropdown working with URL params
- [ ] Pagination working with URL params
- [ ] Breadcrumb navigation on category and search pages
- [ ] Expandable search bar with debounced autocomplete dropdown
- [ ] Search results page with same filter layout as category
- [ ] Product cards: image, name, price with MRP strike-through, rating, variant badge
- [ ] Product card hover: quick view button, add to cart, wishlist heart
- [ ] All callbacks wired to real Medusa v2 API calls and Supabase
- [ ] Mobile: swipeable carousels, filter drawer, responsive grid (4 > 2 > 1 cols)
- [ ] Dual currency display (INR/USD) based on user context
- [ ] Loading skeletons for all data-fetching views
- [ ] Empty states for no products, no results
- [ ] Dark mode support

---


# Milestone 04 — Product Experience

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

The product detail page (PDP) is where customers evaluate products and decide to buy. It includes an image gallery with thumbnails, variant selection (color swatches + dropdowns), pricing with MRP strike-through, delivery info, Rich Product Content (A+ blocks), specifications, admin FAQs, customer Q&A, reviews with photos, related products, and a quick-view modal for use on listing pages.

## Key Functionality

- Image gallery with thumbnail strip, click to switch, lightbox/zoom on main image click
- Variant selection: color/finish as visual swatches, other attributes as dropdowns — selecting a variant updates price, images, and stock status
- Price display with current price, MRP strike-through, discount percentage badge, currency (INR/USD)
- Static delivery info with express shipping availability badge
- Add to cart (with quantity selector) and add to wishlist
- Social sharing: WhatsApp, Facebook, Pinterest, copy link
- Rich Product Content (A+ blocks): hero image block and ASIN comparison table
- Specifications in grouped key-value table with alternating row backgrounds
- Admin-managed FAQ accordion
- Customer Q&A: browse questions/answers, submit new questions, admin-answered badge
- Customer reviews: average rating display, rating bar chart breakdown, individual review cards with stars, verified badge, photos, sort options
- Related products carousel
- Quick-view modal from listing pages (image, title, price, variants, add to cart)
- Breadcrumb navigation for category hierarchy

## Components Provided

From `sections/product-experience/components/`:

| Component | Purpose |
|---|---|
| **ProductDetail.tsx** | Full PDP layout — gallery, info, A+ content, specs, FAQ, Q&A, reviews, related products |
| **ImageGallery.tsx** | Main image + horizontal thumbnail strip with lightbox |
| **VariantSelector.tsx** | Color swatches and dropdown selectors for variant attributes |
| **RichContent.tsx** | A+ content blocks — hero image block and comparison table |
| **ReviewsSection.tsx** | Rating breakdown bar chart + individual review cards with photos |
| **QASection.tsx** | Customer Q&A list with ask-a-question form |
| **QuickViewModal.tsx** | Overlay modal with product image, title, price, variants, add to cart |

## Props Reference

### Key Types

- `Product`: `{ id, name, slug, description, shortDescription, currency, price, mrp, discountPercent, rating, reviewCount, inStock, sku, isNew, expressShipping, deliveryEstimate, returnPolicy }`
- `ProductImage`: `{ id, url, alt, type: 'primary' | 'gallery' | 'variant', order }`
- `ProductVariant`: `{ id, attributes: Record<string, string>, sku, price, mrp, inStock, stockCount, colorSwatch }`
- `VariantAttribute`: `{ name, label, type: 'dropdown' | 'swatch', values }` — swatch values include `{ value, color }`
- `RichContentHero`: `{ id, type: 'hero', title, imageUrl, headline, description }`
- `RichContentComparison`: `{ id, type: 'comparison', title, products: ComparisonProduct[], metrics: ComparisonMetric[] }`
- `SpecificationGroup`: `{ groupName, specs: { key, value }[] }`
- `ProductFAQ`: `{ id, question, answer }`
- `ProductQuestion`: `{ id, question, askedBy, askedAt, answer, answeredBy, answeredAt, isAdminAnswer }`
- `ProductReview`: `{ id, rating, title, text, reviewerName, reviewerLocation, isVerifiedPurchase, photos, createdAt, variant }`
- `RatingBreakdown`: `{ average, total, distribution: Record<string, number> }` — distribution keys are "1" through "5"

### ProductDetail Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onAddToCart` | `(variantId, quantity) => void` | Medusa v2 cart API — add line item with variant ID and quantity, open cart drawer |
| `onToggleWishlist` | `(productId) => void` | Add/remove from Supabase wishlist table |
| `onShare` | `(channel) => void` | Generate share URL; WhatsApp: `wa.me/?text=...`, Facebook: share dialog, Pinterest: pin dialog, copy: clipboard API |
| `onVariantChange` | `(variantId) => void` | Update local state — swap displayed price, images, stock status to match selected variant |
| `onAskQuestion` | `(question) => void` | Submit to Supabase Q&A table, show confirmation toast |
| `onProductClick` | `(slug) => void` | `router.push(/product/${slug})` for related products |
| `onQuickView` | `(productId) => void` | Open QuickViewModal for a related product |
| `onBreadcrumbClick` | `(href) => void` | `router.push(href)` |
| `onScrollToReviews` | `() => void` | Smooth scroll to the reviews section anchor on the page |

### QuickView Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onClose` | `() => void` | Close the modal |
| `onAddToCart` | `(variantId, quantity) => void` | Same as PDP add to cart |
| `onViewFullDetails` | `(slug) => void` | `router.push(/product/${slug})` and close modal |
| `onVariantChange` | `(variantId) => void` | Update variant selection within modal |

## User Flows

### View Product
1. User navigates to `/product/[slug]`
2. Breadcrumbs show: Home > Category > Subcategory > Product Name
3. Image gallery: large main image with horizontal thumbnail strip below. Click thumbnail to switch. Click main image for lightbox/zoom.
4. Product info: title, average star rating (clickable — scrolls to reviews section), price with MRP strike-through, discount badge, stock status
5. Variant selection: color swatches as rounded chips with border highlight; other attributes as dropdowns. Selecting a variant updates price, images, stock.
6. Delivery section: static text with express shipping badge if applicable
7. Actions: quantity selector (stepper), "Add to Cart" button, wishlist heart, share icons (WhatsApp, Facebook, Pinterest, copy link)
8. Scroll down: A+ content blocks, specifications table, FAQ accordion, Q&A section, reviews section, related products carousel

### Submit a Question
1. User clicks "Ask a Question" in Q&A section
2. Text input appears with submit button
3. On submit: question saved to database, confirmation toast shown
4. Admin answers appear with an "Official Answer" badge

### Browse Reviews
1. Average rating with star display shown near product title (anchor link to full reviews)
2. Full reviews section at bottom: rating bar chart showing distribution (5 star through 1 star with bar widths)
3. Individual review cards: star rating, title, text, reviewer name + location, verified purchase badge, optional photo thumbnails
4. Sort reviews by: Newest, Oldest, Highest Rating, Lowest Rating

### Quick View
1. User hovers a product card on listing page, clicks "Quick View"
2. Modal overlay opens with: product image, title, price, variant selectors, quantity stepper, "Add to Cart" button, "View Full Details" link
3. User can select variant and add to cart without leaving the listing page

## Data Fetching

- **Product data**: Medusa v2 `GET /store/products/[id]` with expand for variants, images, options
- **Reviews**: Supabase table or Medusa product reviews (custom module)
- **Q&A**: Supabase table with product_id foreign key
- **FAQs**: Supabase table, admin-managed per product
- **Related products**: Medusa v2 `GET /store/products` filtered by same category, excluding current product
- **A+ content and specifications**: Custom Supabase tables or Medusa product metadata

## Empty States

- **No reviews**: "Be the first to review this product" with CTA (if logged in)
- **No Q&A**: "No questions yet. Ask the first question!"
- **No FAQs**: Hide FAQ section entirely
- **Out of stock**: Disable "Add to Cart", show "Notify Me" button instead
- **No related products**: Hide related products section

## Files to Reference

- `sections/product-experience/components/ProductDetail.tsx`
- `sections/product-experience/components/ImageGallery.tsx`
- `sections/product-experience/components/VariantSelector.tsx`
- `sections/product-experience/components/RichContent.tsx`
- `sections/product-experience/components/ReviewsSection.tsx`
- `sections/product-experience/components/QASection.tsx`
- `sections/product-experience/components/QuickViewModal.tsx`
- `data-shapes/product-experience/types.ts`

## Done Checklist

- [ ] Image gallery with thumbnail strip, click to switch, lightbox/zoom
- [ ] Variant selection: color swatches as chips, other attributes as dropdowns
- [ ] Variant change updates price, images, stock status in real time
- [ ] Price display: current price, MRP strike-through, discount badge, currency symbol
- [ ] Delivery info section with express shipping badge
- [ ] Quantity selector (stepper with min 1, max based on stock)
- [ ] Add to cart calls Medusa v2 API with variant ID and quantity
- [ ] Wishlist toggle functional (Supabase)
- [ ] Social share buttons: WhatsApp, Facebook, Pinterest, copy link — all functional
- [ ] A+ content: hero image block and comparison table rendering
- [ ] Specifications: grouped key-value table with alternating row backgrounds
- [ ] FAQ accordion with smooth expand/collapse animation
- [ ] Q&A section: list existing Q&A, submit new question, admin-answered badge
- [ ] Reviews: rating bar chart breakdown, individual cards with stars/verified/photos, sort
- [ ] Star rating near title is clickable anchor that scrolls to reviews section
- [ ] Related products carousel with horizontal scroll
- [ ] Quick-view modal: image, title, price, variants, quantity, add to cart, view full details
- [ ] Breadcrumb navigation
- [ ] Mobile: gallery full-width, scrollable thumbnails, stacked variant selectors
- [ ] Loading skeletons for product data
- [ ] Empty states for no reviews, no Q&A, out of stock
- [ ] Dark mode support

---


# Milestone 05 — Cart & Checkout

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

The complete purchase flow from shopping cart through payment to order confirmation. Includes a slide-out cart drawer, full cart page, multi-step checkout wizard (Contact, Address, Shipping, Payment), guest checkout, coupon/gift card application, dual-currency display (INR/USD), COD with configurable fee (India only, logged-in users only), prepaid discount, Razorpay (India) + Stripe (International) payment integration, GST invoice generation, and abandoned cart recovery.

## Key Functionality

- Slide-out cart drawer from any page (quick access to cart)
- Full cart page with item list, quantity controls, order summary, coupon/gift card application
- Multi-step checkout: Contact > Address > Shipping > Payment
- Contact step captures email + phone upfront for abandoned cart recovery
- Guest checkout: full flow but no saved addresses, no COD
- COD available only for Indian logged-in users, with configurable fee and min/max order brackets
- Prepaid discount (percentage off for online payment)
- Coupon application: text input or select from available coupons list
- Gift card balance application
- Dual currency: INR for India, USD for international
- Razorpay for Indian payments (UPI, cards, netbanking, wallets)
- Stripe for international payments (cards)
- GST invoice generation on order confirmation
- Abandoned cart recovery: email/phone from Step 1 enables recovery emails
- Order confirmation with invoice download and upsell carousel

## Components Provided

From `sections/cart-and-checkout/components/`:

| Component | Purpose |
|---|---|
| **CartDrawer.tsx** | Slide-out drawer from right — item cards, subtotal, proceed to checkout CTA |
| **CartPage.tsx** | Full cart page — item list (left), order summary with coupons/gift cards (right), empty state |
| **Checkout.tsx** | Multi-step checkout wizard — step indicator, contact/address/shipping/payment forms |
| **OrderConfirmation.tsx** | Success page — order details, invoice download, related products carousel |

## Props Reference

### Key Types

- `CartItem`: `{ id, productId, productName, productSlug, variantId, variantLabel, imageUrl, price, mrp, currency, quantity, maxQuantity, inStock }`
- `Coupon`: `{ id, code, description, discountType, discountValue, maxDiscount, minOrderValue, currency, validUntil, isApplicable }`
- `AppliedCoupon`: `{ code, discountAmount, description }`
- `GiftCardBalance`: `{ code, balance, appliedAmount, currency }`
- `Address`: `{ id, name, phone, street, city, state, pincode, country, isDefault, label: 'Home' | 'Office' | 'Other' }`
- `ShippingMethod`: `{ id, name, description, price, currency, estimatedDays, isFree, freeAbove }`
- `CodConfig`: `{ available, fee, currency, minOrder, maxOrder, label, feeLabel }`
- `PrepaidDiscount`: `{ enabled, percentage, maxDiscount, label }`
- `OrderSummary`: `{ subtotal, mrpTotal, totalSavings, couponDiscount, giftCardApplied, prepaidDiscount, shippingFee, codFee, taxAmount, grandTotal, currency, itemCount }`
- `CheckoutStep`: `{ id: 'contact' | 'address' | 'shipping' | 'payment', label, status: 'completed' | 'active' | 'upcoming' }`
- `ContactInfo`: `{ email, phone, countryCode, isIndian }`
- `OrderConfirmation`: `{ orderId, orderDate, estimatedDelivery, paymentMethod, totalPaid, currency, email, phone, shippingAddress }`

### CartDrawer Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onClose` | `() => void` | Close the drawer |
| `onUpdateQuantity` | `(itemId, quantity) => void` | Medusa v2 cart API — update line item quantity |
| `onRemoveItem` | `(itemId) => void` | Medusa v2 cart API — remove line item |
| `onProceedToCheckout` | `() => void` | `router.push('/checkout')` |
| `onViewProduct` | `(slug) => void` | `router.push(/product/${slug})` |

### CartPage Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onUpdateQuantity` | `(itemId, quantity) => void` | Medusa v2 cart API — update line item |
| `onRemoveItem` | `(itemId) => void` | Medusa v2 cart API — remove line item |
| `onApplyCoupon` | `(code) => void` | Medusa v2 cart API — apply discount code, recalculate totals |
| `onRemoveCoupon` | `() => void` | Medusa v2 cart API — remove discount, recalculate |
| `onApplyGiftCard` | `(code) => void` | Validate gift card in Supabase, apply balance to order summary |
| `onProceedToCheckout` | `() => void` | `router.push('/checkout')` |
| `onViewProduct` | `(slug) => void` | `router.push(/product/${slug})` |
| `onContinueShopping` | `() => void` | `router.push('/')` |

### Checkout Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onSubmitContact` | `(email, phone, countryCode) => void` | Save contact info to cart metadata (Medusa v2) for abandoned cart recovery. Auto-detect if Indian based on country code (+91). |
| `onSelectAddress` | `(addressId) => void` | Set shipping address on Medusa cart from saved address |
| `onAddAddress` | `(address) => void` | Save new address to Supabase, then set on cart |
| `onSelectShipping` | `(methodId) => void` | Set shipping method on Medusa cart, recalculate totals |
| `onToggleCod` | `(enabled) => void` | Toggle COD — add/remove COD fee in order summary. Only available when: user is logged in AND shipping to India AND order total is within min/max brackets. |
| `onPlaceOrder` | `() => void` | If COD: create order directly. If Razorpay: initiate Razorpay checkout. If Stripe: initiate Stripe checkout session. On success: complete order in Medusa, redirect to confirmation. |
| `onBack` | `() => void` | Navigate to previous checkout step |
| `onGoToStep` | `(stepId) => void` | Navigate to a specific completed step (only allow going back to completed steps) |

### OrderConfirmation Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onDownloadInvoice` | `() => void` | Generate and download GST invoice PDF |
| `onContinueShopping` | `() => void` | `router.push('/')` |
| `onProductClick` | `(slug) => void` | `router.push(/product/${slug})` for upsell carousel |

## User Flows

### Cart Drawer
1. User clicks cart icon in header — drawer slides in from right
2. Shows item cards with image, name, variant, price, quantity stepper, remove button
3. Subtotal at bottom with "Proceed to Checkout" gradient accent CTA button
4. Close via X button or clicking backdrop

### Full Cart Page
1. User navigates to `/cart`
2. Left: item list with image thumbnails, product name, variant, unit price, quantity stepper, line total, remove button
3. Right: order summary sidebar — subtotal, coupon discount, gift card balance, prepaid discount, shipping, COD fee, tax, grand total
4. Coupon: text input with "Apply" button + expandable "Available Coupons" list (shows applicable coupons with code, description, copy-to-apply)
5. Gift card: separate input to apply gift card code
6. "Proceed to Checkout" button
7. Empty cart: illustration with "Your cart is empty" message and "Continue Shopping" CTA

### Multi-Step Checkout
**Step 1 — Contact:**
1. Email input (required)
2. Phone input with country code selector (mandatory for Indian customers, optional for international with warning about delivery responsibility)
3. If user is logged in, pre-fill from profile
4. On continue: save contact info to cart for abandoned cart recovery

**Step 2 — Address:**
1. Logged-in users: show saved address cards with radio selection, "Add New Address" option
2. Guests: show full address form (name, phone, street, city, state, pincode/zip, country)
3. "Billing address same as shipping" toggle (default on)
4. For India: validate pincode format (6 digits)

**Step 3 — Shipping:**
1. Shipping method radio cards: Standard (with price and estimate), Express (with price and estimate)
2. Free shipping threshold: if order qualifies, show "Free" badge
3. COD toggle: visible ONLY when all three conditions met — user is logged in, shipping to India, order total within COD brackets (minOrder to maxOrder)
4. COD fee displayed when toggled on

**Step 4 — Payment & Review:**
1. Full order review: all items, address, shipping method, price breakdown
2. Payment method selection:
   - **Indian customers**: Razorpay (UPI, cards, netbanking, wallets) — integrate Razorpay checkout.js
   - **International customers**: Stripe (cards) — integrate Stripe Elements or Checkout
3. "Place Order" button with grand total
4. On click: initiate payment flow, on success create order in Medusa v2, redirect to confirmation

### Order Confirmation
1. Success icon/animation
2. Order number, order date, estimated delivery
3. "Confirmation sent to [email] and [phone]" notice
4. "Download Invoice" button — generates GST-compliant invoice PDF
5. "You May Also Like" product carousel
6. "Continue Shopping" CTA
7. For guests: "Create an account to track your order" prompt (triggers guest-to-account conversion)

### Guest Checkout
- Same flow as above, but:
  - No saved addresses (always new address form)
  - No COD option
  - After confirmation, prompt to create account

## Payment Integration

### Razorpay (India / INR)
- Use Razorpay Checkout.js for payment modal
- Create Razorpay order on your backend before opening checkout
- Support: UPI, debit/credit cards, netbanking, wallets (Paytm, PhonePe, etc.)
- On success: verify payment signature on backend, complete Medusa order
- On failure: show error, allow retry

### Stripe (International / USD)
- Use Stripe Checkout or Stripe Elements
- Create Stripe PaymentIntent on backend
- Support: credit/debit cards
- On success: confirm payment on backend, complete Medusa order
- On failure: show error, allow retry

### COD (India Only)
- Available only when: user is logged in + shipping to India + order total >= minOrder and <= maxOrder
- COD fee added to order total (configurable amount from CodConfig)
- Order created directly without payment gateway — marked as "COD pending"

### Prepaid Discount
- When paying online (not COD), apply percentage discount up to maxDiscount
- Show "Prepaid Discount" line in order summary
- Badge: "Save X% by paying online"

## GST Invoice Generation

- Generate PDF invoice with: seller GSTIN, buyer details, itemized list with HSN codes, tax breakdown (CGST/SGST for intra-state, IGST for inter-state), total
- Download button on order confirmation and in customer dashboard order detail

## Abandoned Cart Recovery

- Contact info (email + phone) captured at Step 1 before payment
- Store this in Medusa cart metadata or Supabase
- Trigger recovery emails (via your email service) for carts abandoned after Step 1 but before order completion
- Recovery email contains a link back to the checkout with the cart restored

## Files to Reference

- `sections/cart-and-checkout/components/CartDrawer.tsx`
- `sections/cart-and-checkout/components/CartPage.tsx`
- `sections/cart-and-checkout/components/Checkout.tsx`
- `sections/cart-and-checkout/components/OrderConfirmation.tsx`
- `data-shapes/cart-and-checkout/types.ts`

## Done Checklist

- [ ] Cart drawer: slides from right, item cards with quantity/remove, subtotal, proceed CTA
- [ ] Cart page: item list with quantity stepper, order summary sidebar, empty cart state
- [ ] Coupon application: text input + available coupons list with copy-to-apply
- [ ] Gift card application: input + balance display
- [ ] Prepaid discount badge and line item in summary
- [ ] Checkout Step 1 (Contact): email + phone with country code, pre-fill for logged-in users
- [ ] Checkout Step 2 (Address): saved addresses (logged-in) or new form (guests), pincode validation for India
- [ ] Checkout Step 3 (Shipping): method selection, COD toggle (India + logged-in + within brackets only)
- [ ] Checkout Step 4 (Payment): order review, Razorpay for India, Stripe for international
- [ ] COD fee correctly added/removed when toggled
- [ ] Step indicator shows completed/active/upcoming states, allows going back to completed steps
- [ ] Razorpay integration: create order, open checkout, verify payment, complete order
- [ ] Stripe integration: create PaymentIntent, confirm payment, complete order
- [ ] Order confirmation: order number, delivery estimate, email/SMS notice
- [ ] Invoice download button generates GST-compliant PDF
- [ ] "You May Also Like" upsell carousel on confirmation
- [ ] Guest checkout: no saved addresses, no COD, account creation prompt after
- [ ] Abandoned cart: contact info saved at Step 1 for recovery emails
- [ ] Dual currency: INR for India, USD for international throughout
- [ ] Mobile responsive: full-width drawer, stacked steps, collapsible order summary
- [ ] Loading states on all API calls (quantity updates, coupon apply, place order)
- [ ] Error handling: payment failures, invalid coupons, out-of-stock during checkout
- [ ] Dark mode support

---


# Milestone 06 — Customer Dashboard

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

The customer dashboard is the logged-in user's personal hub for managing their account, orders, addresses, wishlist, coupons, loyalty points, bookings, gift cards, notifications, and support. It uses the customer dashboard shell (storefront header + 240px left sidebar) and includes a floating Chatwoot chat widget.

## Key Functionality

- Dashboard home with profile summary, quick-stat cards, recent orders, new arrivals, promotional offers
- My Orders with status filters, order detail with visual timeline tracker and invoice download
- Address book: CRUD operations with default address selection
- Wishlist as product grid with add-to-cart and "Notify Me" for out-of-stock
- Active coupons list with copy-to-clipboard
- Loyalty points balance, earn/redeem info, transaction history, expiry warnings
- Bookings/consultations list with meeting links (always visible in sidebar, conditional content)
- Gift card balance check and display
- Notification center: header dropdown (max 5) + full notifications page with filters
- Support section with Chatwoot widget, recent tickets, FAQ links, contact info

## Components Provided

From `sections/customer-dashboard/components/`:

| Component | Purpose |
|---|---|
| **CustomerDashboard.tsx** | Root dashboard component — manages section routing and sidebar state |
| **DashboardHome.tsx** | Home view — profile card, stat cards, recent orders, new arrivals, offers |
| **DashboardSidebar.tsx** | Left sidebar with avatar, nav items with icons, active state |
| **OrdersList.tsx** | Orders list with status filter tabs, date range, order row cards |
| **OrderDetail.tsx** | Single order detail — items, address, payment, timeline tracker, invoice |
| **AddressBook.tsx** | Address cards grid with add/edit/delete, default selection |
| **WishlistGrid.tsx** | Product grid for wishlist — cards with add-to-cart, remove, notify me |
| **CouponsSection.tsx** | Available and expired coupon cards with code copy, discount info |
| **LoyaltySection.tsx** | Points balance card, earn/redeem rates, transaction history table, expiry warning |
| **BookingsSection.tsx** | Booking cards with date, time, status, meeting link, book new CTA |
| **GiftCardsSection.tsx** | Gift card display with balance, expiry, balance check input |
| **NotificationsSection.tsx** | Notifications list with type filters, read/unread styling, click navigation |
| **SupportSection.tsx** | Recent tickets, FAQ links, contact info, Chatwoot integration |

## Props Reference

### Key Types

- `UserProfile`: `{ id, name, email, emailVerified, phone, avatarUrl, memberSince, currency }`
- `DashboardStats`: `{ totalOrders, loyaltyPoints, wishlistItems, activeCoupons }`
- `Order`: `{ id, orderNumber, orderDate, status, itemCount, total, currency, paymentMethod, shippingAddress, trackingNumber, trackingUrl, estimatedDelivery, items: OrderItem[], timeline: OrderTimelineStep[] }`
- `OrderStatus`: `'processing' | 'accepted' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned'`
- `OrderTimelineStep`: `{ step, status: 'completed' | 'active' | 'upcoming' | 'cancelled', date }`
- `Address`: `{ id, name, phone, street, city, state, pincode, country, isDefault, label: 'Home' | 'Office' | 'Other' }`
- `WishlistItem`: `{ id, productId, productName, productSlug, imageUrl, price, mrp, currency, inStock, rating, reviewCount }`
- `Coupon`: `{ id, code, description, discountType, discountValue, maxDiscount, minOrderValue, currency, validUntil, isActive }`
- `LoyaltyBalance`: `{ points, equivalentValue, currency, earnRate, redeemRate, minRedemption, expiringPoints, expiringDate }`
- `LoyaltyTransaction`: `{ id, date, description, type: 'earned' | 'redeemed' | 'adjusted', points, balance }`
- `Booking`: `{ id, title, date, time, status: 'pending' | 'confirmed' | 'completed' | 'cancelled', meetingLink, consultantName, price, currency }`
- `GiftCard`: `{ id, code, balance, originalAmount, currency, expiryDate, isActive }`
- `Notification`: `{ id, type: 'order' | 'promotion' | 'stock' | 'loyalty', title, message, date, isRead, link }`
- `SupportInfo`: `{ email, phone, whatsapp, hours, faqLinks: { label, href }[] }`
- `DashboardSection`: `'home' | 'orders' | 'addresses' | 'wishlist' | 'coupons' | 'loyalty' | 'bookings' | 'gift-cards' | 'notifications' | 'support'`

### Callback Props

| Prop | Signature | Wire To |
|---|---|---|
| `onUpdateProfile` | `(data: Partial<UserProfile>) => void` | Update in Supabase profiles table + Medusa customer |
| `onChangePassword` | `(currentPassword, newPassword) => void` | Supabase `updateUser({ password })` after verifying current |
| `onLogoutAll` | `() => void` | Revoke all Supabase sessions |
| `onLogout` | `() => void` | Supabase `signOut()`, redirect to `/` |
| `onViewOrder` | `(orderId) => void` | Navigate to order detail view (`/account/orders/[id]`) |
| `onDownloadInvoice` | `(orderId) => void` | Generate and download GST invoice PDF for this order |
| `onTrackOrder` | `(orderId) => void` | Open tracking URL in new tab (from `trackingUrl` field) |
| `onAddAddress` | `(address) => void` | Save to Supabase addresses table |
| `onEditAddress` | `(addressId, data) => void` | Update in Supabase |
| `onDeleteAddress` | `(addressId) => void` | Delete from Supabase (confirm dialog first) |
| `onSetDefaultAddress` | `(addressId) => void` | Update default flag in Supabase |
| `onAddToCart` | `(productId) => void` | Medusa v2 cart API — add default variant, open cart drawer |
| `onRemoveFromWishlist` | `(itemId) => void` | Delete from Supabase wishlist table |
| `onNotifyMe` | `(productId) => void` | Register back-in-stock notification in Supabase |
| `onViewProduct` | `(slug) => void` | `router.push(/product/${slug})` |
| `onCopyCoupon` | `(code) => void` | Copy to clipboard, show toast "Copied!" |
| `onRedeemPoints` | `(points) => void` | Convert points to discount code or credit via backend |
| `onJoinMeeting` | `(bookingId) => void` | Open meeting link in new tab |
| `onBookConsultation` | `() => void` | Navigate to booking page or open booking modal |
| `onCheckGiftCardBalance` | `(code) => void` | Check balance via API, display result |
| `onNotificationClick` | `(notificationId, link) => void` | Mark as read, navigate to `link` |
| `onMarkAllRead` | `() => void` | Bulk update all notifications as read in Supabase |
| `onMarkRead` | `(notificationId) => void` | Update single notification as read |
| `onNavigate` | `(section: DashboardSection) => void` | `router.push(/account/${section})` |

## User Flows

### Dashboard Home
1. User navigates to `/account`
2. Profile summary card: avatar (with edit overlay), name, email (verified badge), phone, member since
3. Quick-stat cards: Total Orders, Loyalty Points, Wishlist Items, Active Coupons
4. Recent orders snippet (last 3-5 orders as compact cards)
5. New arrivals carousel and promotional offers section

### My Orders
1. User navigates to `/account/orders`
2. Status filter tabs: All, Processing, Shipped, Delivered, Cancelled, Returned
3. Date range filter
4. Order rows: order number, date, item count, total, status badge
5. Click order row to view detail

### Order Detail
1. Items list with images, name, variant, quantity, price
2. Shipping address, payment method
3. Visual timeline tracker: Placed > Accepted > Shipped > In Transit > Out for Delivery > Delivered
   - Completed steps: green nodes with dates
   - Active step: teal pulse animation
   - Upcoming: grey
   - Cancelled: red with reason
4. Tracking number as clickable link (opens carrier tracking page)
5. "Download Invoice" button

### Address Book
1. Address cards grid: each card shows label icon (Home/Office/Other), full address, default badge
2. Hover reveals edit/delete actions
3. "Add New Address" card opens form (name, phone, street, city, state, pincode/zip, country, label selector)
4. Set default toggle
5. Delete: confirmation dialog

### Wishlist
1. Product grid: 2-3-4 column responsive layout
2. Cards: image, name, price (MRP strike-through if discounted), rating, "Add to Cart" button, "Remove" button
3. Out-of-stock items: dimmed card with "Notify Me" overlay badge
4. Empty state: "Your wishlist is empty" with illustration and "Start Shopping" CTA

### Coupons
1. Available coupons: cards with dashed border, code in monospace font, copy button, discount info, validity date, minimum order requirement
2. `isApplicable` determines visual state (applicable = full color, not applicable = faded with reason)
3. Expired coupons: shown faded at bottom

### Loyalty Points
1. Balance card: prominent points display with rupee equivalent value, earn rate info ("Earn 1 point per Rs 100 spent")
2. Transaction history table: date, description, type badge (earned/redeemed/adjusted), points (+/-), running balance
3. Expiry warning: highlighted banner if points expiring within 30 days

### Bookings
1. Always visible in sidebar nav (even if user has no bookings)
2. Booking cards: title, date, time, status badge (pending/confirmed/completed/cancelled), consultant name, price
3. Confirmed bookings show "Join Meeting" button (opens meeting link)
4. Empty state: "No bookings yet" with "Book a Consultation" CTA
5. "Book a Consultation" navigates to booking flow

### Gift Cards
1. Active gift card cards: code (partially masked), remaining balance, original amount, expiry date
2. Balance check: input field to enter any gift card code, check balance, display result
3. Empty state: "No gift cards" with message

### Notification Center
1. **Header dropdown**: bell icon with unread count badge, click opens dropdown showing last 5 notifications with icon per type, timestamp, unread dot, "Mark All Read" link, "View All" footer link
2. **Full page** (`/account/notifications`): list with left border accent (teal) for unread, type icon, title, message, timestamp, click to navigate to relevant page (order detail, product page, etc.)
3. Filter tabs: All, Orders, Promotions, Stock Alerts, Loyalty

### Support
1. Floating Chatwoot widget: chat bubble in bottom-right corner, does not overlap main content
2. Support section in sidebar shows: recent tickets/conversations, FAQ quick links, store contact info (email, phone, WhatsApp, hours)
3. Chatwoot integration: embed the widget script, pass user info (name, email) for authenticated chat

## Data Fetching

- **Profile**: Supabase `profiles` table + Medusa customer
- **Orders**: Medusa v2 `GET /store/customers/me/orders`
- **Addresses**: Supabase `addresses` table
- **Wishlist**: Supabase `wishlist_items` table joined with Medusa product data
- **Coupons**: Medusa v2 discount API or custom Supabase table
- **Loyalty**: Supabase `loyalty_balances` and `loyalty_transactions` tables
- **Bookings**: Supabase `bookings` table
- **Gift cards**: Medusa v2 gift card API
- **Notifications**: Supabase `notifications` table with real-time subscription for new notifications

## Empty States

- **No orders**: "You haven't placed any orders yet" with "Start Shopping" CTA
- **No addresses**: "No saved addresses" with "Add Address" CTA
- **Empty wishlist**: Illustration with "Your wishlist is empty" and "Start Shopping" CTA
- **No coupons**: "No coupons available" message
- **No bookings**: "No bookings yet" with "Book a Consultation" CTA
- **No gift cards**: "No gift cards" message
- **No notifications**: "You're all caught up!" message

## Files to Reference

- `sections/customer-dashboard/components/CustomerDashboard.tsx`
- `sections/customer-dashboard/components/DashboardHome.tsx`
- `sections/customer-dashboard/components/DashboardSidebar.tsx`
- `sections/customer-dashboard/components/OrdersList.tsx`
- `sections/customer-dashboard/components/OrderDetail.tsx`
- `sections/customer-dashboard/components/AddressBook.tsx`
- `sections/customer-dashboard/components/WishlistGrid.tsx`
- `sections/customer-dashboard/components/CouponsSection.tsx`
- `sections/customer-dashboard/components/LoyaltySection.tsx`
- `sections/customer-dashboard/components/BookingsSection.tsx`
- `sections/customer-dashboard/components/GiftCardsSection.tsx`
- `sections/customer-dashboard/components/NotificationsSection.tsx`
- `sections/customer-dashboard/components/SupportSection.tsx`
- `data-shapes/customer-dashboard/types.ts`

## Done Checklist

- [ ] Dashboard home: profile card, stat cards, recent orders, new arrivals, offers
- [ ] Profile edit: name, email, phone, avatar upload, change password
- [ ] Orders list: status filter tabs, date range, order row cards
- [ ] Order detail: items, address, payment, visual timeline tracker with colored nodes and dates
- [ ] Tracking number clickable link opening carrier page
- [ ] Invoice download on order detail
- [ ] Address book: card grid, add/edit/delete, set default, label icons
- [ ] Wishlist: product grid, add to cart, remove, "Notify Me" for out-of-stock
- [ ] Coupons: available and expired cards, code copy to clipboard, discount info
- [ ] Loyalty: balance card with rupee equivalent, transaction history, expiry warning
- [ ] Bookings: card list, status badges, "Join Meeting" for confirmed, "Book a Consultation" CTA
- [ ] Gift cards: balance display, balance check input
- [ ] Notifications dropdown: bell icon with badge, last 5 items, mark all read, view all
- [ ] Notifications page: full list with type filters, read/unread styling, click navigation
- [ ] Support section: Chatwoot widget integration, recent tickets, FAQ links, contact info
- [ ] Sidebar navigation: all items with icons, active state indicator
- [ ] All callbacks wired to real Medusa v2 / Supabase APIs
- [ ] Dual currency display (INR/USD) based on user profile
- [ ] Loading skeletons for all data-fetching views
- [ ] Empty states for all sections
- [ ] Mobile responsive: sidebar collapses to hamburger/bottom bar, content full-width
- [ ] Real-time notification updates via Supabase subscription
- [ ] Dark mode support

---


# Milestone 7 — Admin Overview Dashboard

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

The admin home dashboard provides a real-time snapshot of store performance. It includes six stat cards (total orders, revenue, pending orders, low-stock count, new customers, recent reviews), a CSS-only daily revenue bar chart, a recent orders table with inline status updates, quick-action shortcuts, and an alerts sidebar for items needing attention. All data responds to a time period toggle (Today / This Week / This Month).

## Key Functionality

- Six stat cards with value, comparison delta vs previous period, and clickable navigation to relevant admin sections
- Time period toggle (today / week / month) that refreshes all dashboard data
- CSS-only bar chart showing daily revenue for the selected period
- Recent orders table with inline status dropdown for quick updates
- Quick-action shortcuts: Add Product, New Order, New Coupon
- Alerts sidebar: low-stock products, pending reviews, new return requests
- Every stat card, alert, and quick action navigates to the correct admin section

## Components Provided

- `AdminOverviewDashboard` — Main dashboard layout with stat cards, chart, orders table, sidebar
- Stat card grid (6 cards, responsive 2x3 or 3x2)
- Revenue bar chart (CSS-only, no chart library)
- Recent orders table with inline status dropdown
- Quick actions panel
- Alerts/warnings sidebar

## Props Reference

### Types

| Type | Values |
|------|--------|
| `TimePeriod` | `'today' \| 'week' \| 'month'` |
| `StatFormat` | `'number' \| 'currency'` |
| `OrderStatus` | `'processing' \| 'accepted' \| 'shipped' \| 'in_transit' \| 'out_for_delivery' \| 'delivered' \| 'cancelled' \| 'returned'` |
| `AlertType` | `'low_stock' \| 'pending_review' \| 'new_return'` |
| `AlertSeverity` | `'critical' \| 'warning' \| 'info'` |

### Key Interfaces

- `DashboardStat` — `{ id, label, value, previousValue, format, currency?, icon, linkTo }`
- `RevenueBar` — `{ date, label, amount }`
- `RecentOrder` — `{ id, orderNumber, customerName, customerEmail, total, currency, status, itemCount, date }`
- `QuickAction` — `{ id, label, icon, href, color }`
- `Alert` — `{ id, type, title, message, severity, linkTo, meta }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onTimePeriodChange` | `(period: TimePeriod) => void` | Refetch all dashboard data from Medusa v2 analytics for the selected period |
| `onStatClick` | `(linkTo: string) => void` | `router.push(linkTo)` — navigate to the relevant admin section |
| `onViewOrder` | `(orderId: string) => void` | Navigate to order detail page |
| `onUpdateOrderStatus` | `(orderId: string, status: OrderStatus) => void` | `POST /admin/orders/{id}` to update status via Medusa v2 |
| `onQuickAction` | `(href: string) => void` | `router.push(href)` — navigate to the target admin page |
| `onAlertClick` | `(linkTo: string) => void` | `router.push(linkTo)` — navigate to the relevant management page |
| `onDismissAlert` | `(alertId: string) => void` | Dismiss alert from local state or persist dismissal |

## User Flows

### Flow 1: View Dashboard on Load
1. Admin navigates to `/admin` (dashboard home)
2. Fetch stats, revenue data, recent orders, and alerts from Medusa v2 APIs for the default time period (today)
3. Render stat cards with values and deltas, bar chart, orders table, and alerts sidebar
4. **Outcome:** Admin sees a real-time snapshot of store performance

### Flow 2: Change Time Period
1. Admin clicks "This Week" or "This Month" pill button
2. `onTimePeriodChange` fires with the new period
3. All dashboard data refetches for the selected period — stats, chart bars, recent orders
4. **Outcome:** All dashboard widgets update to reflect the selected time range

### Flow 3: Update Order Status Inline
1. Admin sees a recent order with status "processing"
2. Admin clicks the inline status dropdown on that order row
3. Admin selects "accepted" from the dropdown
4. `onUpdateOrderStatus` fires with the order ID and new status
5. API call to Medusa v2 updates the order; row reflects the new status
6. **Outcome:** Order status is updated without leaving the dashboard

### Flow 4: Act on Alert
1. Admin sees a "Low Stock" alert in the sidebar showing 3 products below threshold
2. Admin clicks the alert
3. `onAlertClick` navigates to the product management page filtered by low stock
4. **Outcome:** Admin can immediately address low-stock items

## Empty States

- **No orders yet:** Show "No orders to display" in the recent orders table area
- **No alerts:** Show "All clear — no alerts" in the alerts sidebar
- **No revenue data:** Show empty chart area with "No revenue data for this period"
- **Loading:** Show skeleton placeholders for stat cards, chart, and orders table

## Files to Reference

- `product/sections/admin-overview-dashboard/spec.md` — Full specification
- `product/sections/admin-overview-dashboard/types.ts` — TypeScript interfaces
- `product/sections/admin-overview-dashboard/data.json` — Sample data
- `src/sections/admin-overview-dashboard/` — Screen design components

## Done When

- [ ] Dashboard loads with real data from Medusa v2 APIs (not sample data)
- [ ] All six stat cards display correct values and deltas for the selected time period
- [ ] Time period toggle (Today / This Week / This Month) refreshes all dashboard data
- [ ] Revenue bar chart renders daily bars for the selected period using real order data
- [ ] Recent orders table shows real orders with correct status badges
- [ ] Inline status dropdown on order rows updates order status via Medusa v2 API
- [ ] Every stat card click navigates to the correct admin section
- [ ] Quick-action buttons navigate to Add Product, New Order, New Coupon pages
- [ ] Alerts sidebar shows real low-stock, pending review, and new return counts
- [ ] Alert clicks navigate to the relevant management page
- [ ] Loading skeletons display while data is being fetched
- [ ] Empty states display when no data is available
- [ ] Dashboard is responsive — sidebar collapses below main content on mobile
- [ ] Light and dark mode both render correctly

---


# Milestone 8 — Admin Product Management

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

Full product catalog management with a list view (card grid + table toggle), search/filters, bulk actions, and an 8-step product add/edit wizard with live storefront preview. Supports dual-currency pricing (INR + USD manually set), per-variant inventory, rich A+ content editing, specifications, FAQs, SEO fields, and Google Merchant Centre fields. Includes CSV import/export for bulk operations.

## Key Functionality

- Product list with card grid (default) and table view toggle
- Search by name, SKU, or category with autocomplete
- Filters: status (active/inactive/draft), category, stock level
- Bulk actions: delete, activate, deactivate, export CSV (checkbox selection)
- 8-step product wizard: Basic Info, Variants & Pricing, Images, Rich Content (A+), Specifications & Attributes, FAQs, SEO & URL, Google Merchant Centre
- Live preview panel showing storefront product appearance as fields are filled
- Save as draft at any step; publish when all required steps are complete
- Duplicate product from the list
- CSV import via drag-and-drop upload
- Dual-currency pricing: INR and USD prices set manually per variant
- Per-variant inventory tracking with stock level badges

## Components Provided

- `AdminProductManagement` — Top-level section component
- `ProductList` — Card grid / table view with filters and bulk actions
- `ProductWizard` — 8-step form with live preview panel

## Props Reference

### Types

| Type | Values |
|------|--------|
| `ProductStatus` | `'active' \| 'inactive' \| 'draft'` |
| `StockLevel` | `'in_stock' \| 'low_stock' \| 'out_of_stock'` |
| `WizardStep` | `'basic' \| 'variants' \| 'images' \| 'rich-content' \| 'specs' \| 'faqs' \| 'seo' \| 'merchant'` |
| `BulkAction` | `'delete' \| 'activate' \| 'deactivate' \| 'export'` |
| `ViewMode` | `'grid' \| 'table'` |

### Key Interfaces

- `Product` — `{ id, name, sku, category, categoryId, status, price, mrp, currency, stock, stockLevel, imageUrl, rating, reviewCount, variantCount, createdAt, updatedAt }`
- `ProductDetail` extends `Product` — adds `description, shortDescription, variants[], images[], richContent[], specs[], faqs[], seo, merchantCentre, tags[], hsnCode, gstRate`
- `ProductVariant` — `{ id, sku, label, price, mrp, currency, stock, stockLevel }`
- `ProductImage` — `{ id, url, alt, isPrimary, sortOrder }`
- `RichContentBlock` — `{ id, type, title, content, imageUrl? }`
- `ProductSpec` — `{ id, label, value, group }`
- `ProductFAQ` — `{ id, question, answer }`
- `ProductSEO` — `{ metaTitle, metaDescription, urlSlug, canonicalUrl }`
- `MerchantCentreData` — `{ gtin, mpn, brand, condition, ageGroup, gender, googleCategory }`
- `ProductFilters` — `{ search, status, category, stockLevel }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeViewMode` | `(mode: ViewMode) => void` | Toggle local state between grid and table |
| `onChangeFilters` | `(filters: Partial<ProductFilters>) => void` | Refetch products from Medusa v2 with updated filters |
| `onSearch` | `(query: string) => void` | Search products via `GET /admin/products?q=` |
| `onAddProduct` | `() => void` | Open wizard in create mode |
| `onEditProduct` | `(productId: string) => void` | Fetch product detail via `GET /admin/products/{id}` and open wizard |
| `onDuplicateProduct` | `(productId: string) => void` | Fetch product, pre-fill wizard with data (clear ID/SKU) |
| `onDeleteProduct` | `(productId: string) => void` | Confirm then `DELETE /admin/products/{id}` |
| `onBulkAction` | `(action: BulkAction, productIds: string[]) => void` | Batch API calls for selected products |
| `onImportCSV` | `(file: File) => void` | Parse CSV, validate, batch create via Medusa v2 |
| `onExportCSV` | `() => void` | Fetch all products, generate CSV download |
| `onSaveDraft` | `(data: Partial<ProductDetail>) => void` | `POST/PUT /admin/products` with `status: 'draft'` |
| `onPublish` | `(data: Partial<ProductDetail>) => void` | `POST/PUT /admin/products` with `status: 'active'` |
| `onCancelEdit` | `() => void` | Return to product list, discard unsaved changes |

## User Flows

### Flow 1: Add a New Product
1. Admin clicks "Add Product" on the product list page
2. Wizard opens at Step 1 (Basic Info) with empty fields
3. Admin fills in name, description, category, HSN code, GST rate, tags
4. Admin clicks Next to proceed through each step — Variants & Pricing (set INR + USD prices per variant), Images (upload/reorder), Rich Content (add A+ blocks), Specs, FAQs, SEO, Google Merchant
5. Live preview panel updates as fields are filled
6. Admin clicks "Publish" on the final step
7. `onPublish` fires; product is created via Medusa v2 API with all data
8. **Outcome:** Product appears in the catalog as active with all variants, images, and metadata

### Flow 2: Bulk Deactivate Products
1. Admin checks the checkboxes on several product cards/rows
2. Bulk action toolbar appears at the top
3. Admin clicks "Deactivate" from the bulk actions
4. Confirmation dialog appears showing the count of selected products
5. `onBulkAction('deactivate', productIds)` fires
6. Each product's status is updated to inactive via Medusa v2
7. **Outcome:** Selected products are deactivated and show inactive status badges

### Flow 3: Import Products via CSV
1. Admin clicks "Import CSV" button
2. Drag-and-drop upload area appears
3. Admin drops a CSV file
4. `onImportCSV` fires; file is parsed and validated
5. Preview of import results shown (valid rows, errors)
6. Admin confirms import
7. Products are created in Medusa v2 via batch API
8. **Outcome:** New products appear in the catalog

### Flow 4: Edit Product Pricing
1. Admin clicks a product in the list to open the wizard in edit mode
2. Admin navigates to Step 2 (Variants & Pricing)
3. Admin updates INR and USD prices for specific variants
4. Admin clicks "Save Draft" or "Publish"
5. **Outcome:** Variant prices are updated in Medusa v2

## Empty States

- **No products:** Show "No products yet" with an "Add Product" call-to-action button
- **No search results:** Show "No products match your search" with option to clear filters
- **Wizard loading:** Show skeleton for the current step form
- **No variants:** Show "Add at least one variant" prompt in the Variants step
- **No images:** Show upload dropzone placeholder in the Images step

## Files to Reference

- `product/sections/admin-product-management/spec.md` — Full specification
- `product/sections/admin-product-management/types.ts` — TypeScript interfaces
- `product/sections/admin-product-management/data.json` — Sample data
- `src/sections/admin-product-management/` — Screen design components

## Done When

- [ ] Product list loads real products from Medusa v2 `GET /admin/products`
- [ ] Card grid and table view toggle works
- [ ] Search filters products by name, SKU, or category via Medusa v2 API
- [ ] Status, category, and stock level filters work against the API
- [ ] Bulk actions (delete, activate, deactivate, export) work on selected products
- [ ] 8-step wizard creates a new product with all fields saved to Medusa v2
- [ ] Editing a product loads all existing data into the wizard
- [ ] Variants have dual-currency pricing (INR + USD) that saves correctly
- [ ] Per-variant inventory tracking displays correct stock levels
- [ ] Image upload stores images and associates them with the product
- [ ] Rich content (A+ blocks) saves and renders correctly
- [ ] SEO fields and Google Merchant Centre fields persist
- [ ] CSV import parses, validates, and creates products in Medusa v2
- [ ] CSV export downloads all products as a CSV file
- [ ] Duplicate product pre-fills wizard with copied data
- [ ] Live preview panel updates as fields are edited
- [ ] Save Draft saves with status "draft"; Publish saves with status "active"
- [ ] Loading, error, and empty states all render correctly
- [ ] Responsive: wizard goes single-column on mobile with preview behind toggle
- [ ] Light and dark mode both render correctly

---


# Milestone 9 — Admin Category Management

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

Admin interface for managing the product category hierarchy. Two-panel layout: expandable/collapsible tree on the left, category details on the right. Category add/edit is a full-page form with image upload, SEO fields, parent selection, display order, and active/inactive toggle. Deleting a category prompts for product reassignment.

## Key Functionality

- Expandable/collapsible category tree showing parent-child hierarchy
- Click a category in the tree to see its details in the right panel
- Full-page add/edit form: title, description, image upload, URL slug (auto-generated from title), SEO meta title/description, parent category dropdown, display order, active/inactive toggle
- Delete category with confirmation dialog and product reassignment option
- Drag-and-drop reorder categories within the same level
- Toggle category active/inactive directly from the tree view

## Components Provided

- `AdminCategoryManagement` — Top-level section with tree + detail panels
- `CategoryTree` — Left panel with expandable/collapsible hierarchy
- `CategoryDetail` — Right panel showing selected category info
- `CategoryForm` — Full-page add/edit form

## Props Reference

### Types

| Type | Values |
|------|--------|
| `CategoryStatus` | `'active' \| 'inactive'` |

### Key Interfaces

- `Category` — `{ id, name, slug, description, imageUrl, parentId, parentName, status, productCount, displayOrder, children[], seo: { metaTitle, metaDescription }, createdAt, updatedAt }`
- `CategoryOption` — `{ id, name, depth }` (flat list for parent dropdown)

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onSelectCategory` | `(categoryId: string) => void` | Fetch category detail, display in right panel |
| `onAddCategory` | `() => void` | Navigate to category form in create mode |
| `onEditCategory` | `(categoryId: string) => void` | Navigate to category form in edit mode |
| `onDeleteCategory` | `(categoryId: string, reassignTo?: string) => void` | Show confirmation with product count; `DELETE /admin/product-categories/{id}` via Medusa v2; reassign products if specified |
| `onToggleStatus` | `(categoryId: string) => void` | `PUT /admin/product-categories/{id}` toggle active/inactive |
| `onReorder` | `(categoryId: string, newOrder: number) => void` | `PUT /admin/product-categories/{id}` update display order |
| `onSaveCategory` | `(data: Partial<Category>) => void` | `POST` (create) or `PUT` (update) `/admin/product-categories` via Medusa v2 |
| `onCancelEdit` | `() => void` | Return to tree + detail view |
| `onImageUpload` | `(file: File) => void` | Upload image to storage (Supabase Storage or S3), return URL for category |

## User Flows

### Flow 1: Add a New Category
1. Admin clicks "Add Category" button
2. Full-page form opens with empty fields
3. Admin enters title — URL slug auto-generates from title
4. Admin uploads a category image, fills description, selects parent category (or none for root), sets display order, fills SEO meta fields, toggles active
5. Admin clicks "Save"
6. `onSaveCategory` fires; category is created via Medusa v2 API
7. **Outcome:** New category appears in the tree at the correct position

### Flow 2: Delete a Category with Products
1. Admin selects a category in the tree that has 12 products
2. Admin clicks "Delete" in the detail panel
3. Confirmation modal shows: "This category has 12 products. Reassign them to another category or delete?"
4. Admin selects a reassignment category from the dropdown
5. `onDeleteCategory(id, reassignToId)` fires
6. Products are reassigned, then the category is deleted via Medusa v2
7. **Outcome:** Category is removed from tree; products appear under the new category

### Flow 3: Reorder Categories
1. Admin drags a category card within the tree to a new position in the same level
2. `onReorder` fires with the category ID and new display order
3. Display order is updated via Medusa v2 API
4. **Outcome:** Tree reflects the new order

## Empty States

- **No categories:** Show "No categories yet" with an "Add Category" call-to-action
- **No category selected:** Right detail panel shows "Select a category from the tree"
- **Category with no products:** Detail panel shows product count as 0
- **Loading:** Skeleton placeholders for tree and detail panel

## Files to Reference

- `product/sections/admin-category-management/spec.md` — Full specification
- `product/sections/admin-category-management/types.ts` — TypeScript interfaces
- `product/sections/admin-category-management/data.json` — Sample data
- `src/sections/admin-category-management/` — Screen design components

## Done When

- [ ] Category tree loads real categories from Medusa v2 `GET /admin/product-categories`
- [ ] Tree nodes expand/collapse to show parent-child hierarchy
- [ ] Clicking a category shows its details in the right panel with real data
- [ ] Add category form creates a new category via Medusa v2 API
- [ ] Edit category form loads existing data and updates via API
- [ ] URL slug auto-generates from title (editable)
- [ ] Image upload stores the image and associates it with the category
- [ ] SEO meta fields (title, description) save correctly
- [ ] Parent category dropdown shows all available categories at correct depth
- [ ] Display order input controls position in the tree
- [ ] Active/inactive toggle updates category status via API
- [ ] Delete with product reassignment works — products move to the selected category
- [ ] Drag-and-drop reorder updates display order via API
- [ ] Responsive: panels stack vertically on mobile (tree on top)
- [ ] Loading, error, and empty states all render correctly
- [ ] Light and dark mode both render correctly

---


# Milestone 10 — Admin Order Management

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

Full order management interface with a sortable, filterable data table and a full-page order detail view. The orders table supports status filters, date range picker, search, sorting, and pagination. Order detail shows items, customer info, shipping address, payment details, a visual status timeline, internal notes, invoice download, and follow-up email trigger. Status workflow: processing -> accepted -> shipped -> in transit -> out for delivery -> delivered.

## Key Functionality

- Orders data table with sortable columns (date, total, status, customer)
- Status filter pills (All, Processing, Accepted, Shipped, In Transit, Out for Delivery, Delivered, Cancelled, Returned)
- Date range picker with presets (today, 7 days, 30 days) and custom range
- Search by order ID, customer name, or email
- Pagination with configurable rows per page
- Full-page order detail with items list, customer info, shipping address, payment details
- Visual status timeline with completed (green), current (teal pulse), and upcoming (grey) steps
- Status update dropdown with tracking number and carrier input when marking as shipped
- Internal notes section — add and view notes with timestamps
- Invoice PDF download
- Send follow-up email to customer from order detail

## Components Provided

- `AdminOrderManagement` — Top-level section component
- `OrdersTable` — Data table with filters, search, pagination
- `OrderDetailPage` — Full-page order detail with timeline, notes, actions

## Props Reference

### Types

| Type | Values |
|------|--------|
| `OrderStatus` | `'processing' \| 'accepted' \| 'shipped' \| 'in_transit' \| 'out_for_delivery' \| 'delivered' \| 'cancelled' \| 'returned'` |
| `PaymentMethod` | `'razorpay' \| 'stripe' \| 'cod' \| 'upi' \| 'netbanking' \| 'wallet'` |
| `PaymentStatus` | `'paid' \| 'pending' \| 'failed' \| 'refunded'` |
| `DatePreset` | `'today' \| '7days' \| '30days' \| 'custom'` |
| `OrderSortField` | `'date' \| 'total' \| 'status' \| 'customer'` |

### Key Interfaces

- `OrderRow` — `{ id, orderNumber, customerName, customerEmail, itemCount, total, currency, status, paymentMethod, paymentStatus, date }`
- `OrderDetail` — `{ id, orderNumber, status, customer, shippingAddress, payment, items[], timeline[], notes[], subtotal, discount, shippingFee, tax, total, currency, trackingNumber, trackingUrl, carrier, createdAt, updatedAt }`
- `OrderItem` — `{ id, productName, variantLabel, imageUrl, quantity, price, lineTotal, currency }`
- `TimelineEvent` — `{ id, status, label, timestamp, note, isCompleted, isCurrent }`
- `OrderNote` — `{ id, author, message, createdAt }`
- `OrderCustomer` — `{ id, name, email, phone, totalOrders }`
- `ShippingAddress` — `{ name, phone, street, city, state, pincode, country }`
- `PaymentDetails` — `{ method, status, transactionId, amount, currency, paidAt }`
- `OrderFilters` — `{ search, status, datePreset, dateFrom, dateTo, sortField, sortDirection }`
- `Pagination` — `{ page, perPage, totalItems, totalPages }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeFilters` | `(filters: Partial<OrderFilters>) => void` | Refetch orders from Medusa v2 with updated filters |
| `onChangePage` | `(page: number) => void` | Fetch the specified page of orders |
| `onChangePerPage` | `(perPage: number) => void` | Update rows per page and refetch |
| `onViewOrder` | `(orderId: string) => void` | Fetch order detail via `GET /admin/orders/{id}` and navigate to detail page |
| `onUpdateStatus` | `(orderId: string, status: OrderStatus, trackingNumber?: string, carrier?: string) => void` | `POST /admin/orders/{id}/fulfillments` or update order status via Medusa v2; save tracking info |
| `onAddNote` | `(orderId: string, message: string) => void` | Store note in Supabase (order_notes table) with admin author and timestamp |
| `onDownloadInvoice` | `(orderId: string) => void` | Generate and download invoice PDF for the order |
| `onEmailCustomer` | `(orderId: string) => void` | Trigger follow-up email to customer (e.g., delivery confirmation, feedback request) |
| `onBackToList` | `() => void` | Navigate back to orders table |

## User Flows

### Flow 1: Find and Review an Order
1. Admin navigates to `/admin/orders`
2. Orders table loads with real data from Medusa v2
3. Admin types a customer name in the search bar
4. Table filters to matching orders
5. Admin clicks an order row
6. Order detail page opens showing items, customer info, address, payment, timeline
7. **Outcome:** Admin has full visibility into the order

### Flow 2: Update Order Status with Tracking
1. Admin opens order detail for an order in "accepted" status
2. Admin selects "shipped" from the status dropdown
3. Tracking number and carrier input fields appear
4. Admin enters tracking number and selects carrier
5. Admin clicks "Update Status"
6. `onUpdateStatus` fires with order ID, "shipped", tracking number, and carrier
7. Medusa v2 API creates a fulfillment; timeline updates with new status and timestamp
8. **Outcome:** Order shows as shipped with tracking information; customer can view tracking

### Flow 3: Add Internal Notes
1. Admin views an order detail page
2. Admin types a note in the notes input field ("Customer requested gift wrapping")
3. Admin submits the note
4. `onAddNote` fires; note is stored in Supabase with the admin's name and timestamp
5. Note appears in the notes list below the input
6. **Outcome:** Internal note is persisted and visible to all admins

### Flow 4: Filter by Date Range
1. Admin clicks "Last 30 days" preset button in the date range picker
2. `onChangeFilters` fires with `datePreset: '30days'`
3. Orders table reloads showing only orders from the last 30 days
4. Admin then switches to "Custom" and enters specific dates
5. **Outcome:** Table shows orders within the custom date range

## Empty States

- **No orders:** Show "No orders yet" message
- **No search results:** Show "No orders match your filters" with option to clear filters
- **No notes on order:** Show "No notes yet" with the add note input still visible
- **Loading:** Skeleton placeholders for table rows and detail sections

## Files to Reference

- `product/sections/admin-order-management/spec.md` — Full specification
- `product/sections/admin-order-management/types.ts` — TypeScript interfaces
- `product/sections/admin-order-management/data.json` — Sample data
- `src/sections/admin-order-management/` — Screen design components

## Done When

- [ ] Orders table loads real orders from Medusa v2 `GET /admin/orders`
- [ ] Status filter pills filter orders by status
- [ ] Date range picker (presets + custom) filters orders by date
- [ ] Search filters by order number, customer name, or email
- [ ] Sorting works on all sortable columns (date, total, status, customer)
- [ ] Pagination works with configurable rows per page
- [ ] Clicking an order navigates to the full detail page with real data
- [ ] Order detail shows items, customer info, shipping address, and payment details
- [ ] Visual status timeline renders with correct completed/current/upcoming states
- [ ] Status update dropdown changes order status via Medusa v2 API
- [ ] Tracking number and carrier input appear when marking as shipped and persist
- [ ] Internal notes are stored in Supabase and display with author + timestamp
- [ ] Invoice download generates and downloads a PDF
- [ ] Email customer button triggers a follow-up email
- [ ] Back button returns to the orders table preserving filter state
- [ ] Loading, error, and empty states render correctly
- [ ] Responsive: detail cards stack on mobile; table scrolls horizontally
- [ ] Light and dark mode both render correctly

---


# Milestone 11 — Admin Returns & Refunds

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

Admin interface for managing return requests and processing refunds. Features a Kanban board with drag-and-drop columns (Pending, Under Review, Approved, Refunded) and a full return detail page. The detail page shows return reason, customer-uploaded photos, order reference, product details, admin approve/reject with notes, refund processing (full/partial, original payment or store credit), and exchange initiation.

## Key Functionality

- Kanban board with 4 columns: Pending, Under Review, Approved, Refunded
- Drag-and-drop cards between columns to update return status
- Return cards show: order number, customer name, product thumbnail, return reason, date, refund amount
- Search returns by order number or customer
- Full return detail page with product info, customer photos, reason, and admin notes
- Approve or reject a return with admin notes
- Process refund: full or partial, select refund method (original payment method or store credit)
- Initiate exchange instead of refund
- Return policy compliance check (within return window, condition met)
- Status change timeline

## Components Provided

- `AdminReturnsRefunds` — Top-level section with Kanban board and detail page
- `ReturnsKanban` — Kanban board with 4 draggable columns
- `ReturnDetailPage` — Full return detail with approve/reject, refund, and exchange actions

## Props Reference

### Types

| Type | Values |
|------|--------|
| `ReturnStatus` | `'pending' \| 'under_review' \| 'approved' \| 'refunded' \| 'rejected'` |
| `RefundType` | `'full' \| 'partial'` |
| `RefundMethod` | `'original_payment' \| 'store_credit'` |
| `ReturnReason` | `'defective' \| 'wrong_item' \| 'not_as_described' \| 'changed_mind' \| 'size_issue' \| 'damaged_in_transit' \| 'other'` |

### Key Interfaces

- `ReturnCard` — `{ id, orderNumber, customerName, customerEmail, productName, productImageUrl, variantLabel, reason, status, refundAmount, currency, requestedAt, daysOpen }`
- `ReturnDetail` — `{ id, orderNumber, orderId, status, customer: { id, name, email, phone }, product: { id, name, variantLabel, imageUrl, quantity, price, currency }, reason, customerNotes, photos[], adminNotes, refundType, refundAmount, refundMethod, isWithinReturnWindow, returnWindowDays, timeline[], requestedAt, resolvedAt }`
- `ReturnPhoto` — `{ id, url, caption }`
- `ReturnTimelineEvent` — `{ id, action, author, note, timestamp }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onViewReturn` | `(returnId: string) => void` | Navigate to return detail page |
| `onMoveReturn` | `(returnId: string, newStatus: ReturnStatus) => void` | Update return status via Medusa v2 return/refund APIs |
| `onSearch` | `(query: string) => void` | Filter returns by order number or customer |
| `onApprove` | `(returnId: string, notes: string) => void` | Approve return via Medusa v2 `POST /admin/returns/{id}/receive`; save admin notes |
| `onReject` | `(returnId: string, notes: string) => void` | Reject return and save rejection reason |
| `onProcessRefund` | `(returnId: string, type: RefundType, amount: number, method: RefundMethod) => void` | Process refund via Medusa v2 refund API or create store credit |
| `onInitiateExchange` | `(returnId: string) => void` | Create exchange order via Medusa v2 exchange/swap API |
| `onBackToBoard` | `() => void` | Navigate back to Kanban board |

## User Flows

### Flow 1: Review and Approve a Return
1. Admin sees a return card in the "Pending" column on the Kanban board
2. Admin clicks the card to open the return detail page
3. Admin views the return reason, customer photos, and product details
4. Admin checks "Within return window: Yes" indicator
5. Admin types approval notes and clicks "Approve"
6. `onApprove` fires; return status updates to "approved" via Medusa v2
7. Card moves to the "Approved" column on the board
8. **Outcome:** Return is approved and ready for refund processing

### Flow 2: Process a Partial Refund
1. Admin opens an approved return detail page
2. Admin selects "Partial" refund type
3. Admin enters the refund amount (less than the original price)
4. Admin selects "Original Payment Method" as the refund method
5. Admin clicks "Process Refund"
6. `onProcessRefund` fires with return ID, "partial", amount, and "original_payment"
7. Refund is processed via Medusa v2; card moves to "Refunded" column
8. **Outcome:** Customer receives a partial refund to their original payment method

### Flow 3: Initiate an Exchange
1. Admin opens a return detail page for a size issue
2. Instead of refunding, admin clicks "Initiate Exchange"
3. `onInitiateExchange` fires
4. Exchange flow opens to select replacement product/variant
5. **Outcome:** Exchange order is created via Medusa v2 swap API

### Flow 4: Drag-and-Drop Status Update
1. Admin drags a return card from "Pending" to "Under Review"
2. `onMoveReturn` fires with the return ID and new status
3. Return status updates via API
4. **Outcome:** Card is now in the "Under Review" column

## Empty States

- **No returns:** Show "No return requests" message on the Kanban board
- **Empty column:** Show "No items" placeholder in the empty Kanban column
- **No photos:** Return detail shows "No photos uploaded by customer"
- **Loading:** Skeleton cards in each Kanban column; skeleton sections on detail page

## Files to Reference

- `product/sections/admin-returns-and-refunds/spec.md` — Full specification
- `product/sections/admin-returns-and-refunds/types.ts` — TypeScript interfaces
- `product/sections/admin-returns-and-refunds/data.json` — Sample data
- `src/sections/admin-returns-and-refunds/` — Screen design components

## Done When

- [ ] Kanban board loads real return requests from Medusa v2
- [ ] Four columns render with correct return cards grouped by status
- [ ] Drag-and-drop between columns updates return status via API
- [ ] Search filters returns by order number or customer name
- [ ] Clicking a card opens the full return detail page with real data
- [ ] Customer-uploaded photos display in a grid
- [ ] Return reason and customer notes are visible
- [ ] Return policy compliance (within return window) is checked and displayed
- [ ] Approve button updates status and saves admin notes via Medusa v2
- [ ] Reject button updates status and saves rejection reason
- [ ] Refund processing works for both full and partial refunds
- [ ] Refund method selection (original payment or store credit) works correctly
- [ ] Exchange initiation creates a swap/exchange order via Medusa v2
- [ ] Status change timeline displays all events with timestamps
- [ ] Loading, error, and empty states render correctly
- [ ] Responsive: Kanban columns stack vertically on mobile
- [ ] Light and dark mode both render correctly

---


# Milestone 12 — Admin Customer Management

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

Admin interface for viewing and managing customers. Includes a searchable, filterable customer data table and a full customer detail page showing profile info, order history, lifetime value, loyalty points, saved addresses (with gradient accent border), reviews, and internal admin notes.

## Key Functionality

- Customer data table with avatar, name, email, phone, orders count, lifetime value, segment badges, join date
- Search by name, email, or phone
- Segment filter pills: All, New (last 30 days), Repeat (2+ orders), Inactive (no order in 90 days), High Value (top 10% by spend)
- Sort by name, total orders, lifetime value, or join date
- Full customer detail page with profile header card
- Stats row: Total Orders, Lifetime Value, Avg Order Value, Loyalty Points
- Recent orders table (last 5 orders)
- Saved addresses as compact cards with gradient accent border (`linear-gradient(90deg, #013f47, #2a7a72, #c85103)`)
- Customer reviews list with star ratings
- Internal admin notes section

## Components Provided

- `AdminCustomerManagement` — Top-level section with list and detail views
- `CustomerList` — Data table with search, filters, segment pills
- `CustomerDetailPage` — Full customer profile with orders, addresses, reviews, notes

## Props Reference

### Types

| Type | Values |
|------|--------|
| `CustomerSegment` | `'new' \| 'repeat' \| 'inactive' \| 'high_value'` |

### Key Interfaces

- `CustomerRow` — `{ id, name, email, phone, avatarUrl, totalOrders, lifetimeValue, currency, segments[], joinedAt }`
- `CustomerDetail` — `{ id, name, email, emailVerified, phone, avatarUrl, joinedAt, lastOrderAt, totalOrders, lifetimeValue, averageOrderValue, currency, loyaltyPoints, segments[], recentOrders[], addresses[], reviews[], notes[] }`
- `CustomerOrder` — `{ id, orderNumber, total, currency, status, date, itemCount }`
- `CustomerAddress` — `{ id, label, street, city, state, pincode, country, isDefault }`
- `CustomerReview` — `{ id, productName, productImageUrl, rating, excerpt, date }`
- `AdminNote` — `{ id, author, message, createdAt }`
- `CustomerFilters` — `{ search, segment, sortField, sortDirection }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeFilters` | `(filters: Partial<CustomerFilters>) => void` | Refetch customers from Medusa v2 with updated filters/search |
| `onViewCustomer` | `(customerId: string) => void` | Fetch customer detail via `GET /admin/customers/{id}` and navigate to detail page |
| `onViewOrder` | `(orderId: string) => void` | Navigate to order detail page (from Milestone 10) |
| `onAddNote` | `(customerId: string, message: string) => void` | Store note in Supabase (customer_notes table) with admin author and timestamp |
| `onBackToList` | `() => void` | Navigate back to customer list |

## User Flows

### Flow 1: Find a Customer
1. Admin navigates to `/admin/customers`
2. Customer table loads with real data from Medusa v2
3. Admin types a customer email in the search bar
4. Table filters to matching customers
5. Admin clicks the customer row
6. Customer detail page opens with profile, orders, addresses, reviews, notes
7. **Outcome:** Admin has full visibility into the customer's history

### Flow 2: Filter by Segment
1. Admin clicks the "High Value" segment pill
2. `onChangeFilters` fires with `segment: 'high_value'`
3. Table reloads showing only customers in the top 10% by lifetime spend
4. **Outcome:** Admin sees only high-value customers

### Flow 3: View Customer's Recent Order
1. Admin is on a customer detail page
2. Admin sees the recent orders table showing the last 5 orders
3. Admin clicks an order row
4. `onViewOrder` fires; navigates to the order detail page (Milestone 10)
5. **Outcome:** Admin can review the specific order

### Flow 4: Add Admin Note
1. Admin opens a customer detail page
2. Admin types a note ("VIP customer - offer 10% on next order")
3. Admin submits the note
4. `onAddNote` fires; note is stored in Supabase with admin name and timestamp
5. Note appears in the notes list
6. **Outcome:** Internal note is persisted for all admins to see

## Empty States

- **No customers:** Show "No customers yet" message
- **No search results:** Show "No customers match your search" with option to clear filters
- **No orders for customer:** Show "No orders yet" in the recent orders section
- **No addresses:** Show "No saved addresses" in the addresses section
- **No reviews:** Show "No reviews yet" in the reviews section
- **No notes:** Show "No notes yet" with the add note input still visible
- **Loading:** Skeleton placeholders for table rows and detail sections

## Files to Reference

- `product/sections/admin-customer-management/spec.md` — Full specification
- `product/sections/admin-customer-management/types.ts` — TypeScript interfaces
- `product/sections/admin-customer-management/data.json` — Sample data
- `src/sections/admin-customer-management/` — Screen design components

## Done When

- [ ] Customer table loads real customers from Medusa v2 `GET /admin/customers`
- [ ] Search filters customers by name, email, or phone
- [ ] Segment filter pills work (New, Repeat, Inactive, High Value)
- [ ] Sorting works on name, total orders, lifetime value, join date
- [ ] Clicking a customer navigates to detail page with real data
- [ ] Profile header shows avatar, name, email, phone, verified badge, member since
- [ ] Stats row shows correct Total Orders, Lifetime Value, Avg Order Value, Loyalty Points
- [ ] Recent orders table shows the customer's last 5 orders with status badges
- [ ] Clicking an order navigates to the order detail page
- [ ] Addresses display as compact cards with the VastuCart gradient accent border
- [ ] Reviews list shows star ratings, product names, and excerpts
- [ ] Admin notes are stored in Supabase and display with author + timestamp
- [ ] Back button returns to the customer list
- [ ] Loading, error, and empty states render correctly
- [ ] Responsive: detail sections stack on mobile
- [ ] Light and dark mode both render correctly

---


# Milestone 13 — Admin Reviews & Q&A Moderation

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

Admin interface for moderating customer reviews and product Q&A. Two main tabs (Reviews and Q&A) are switchable at the top. Reviews have status sub-tabs (Pending / Approved / Rejected) with bulk approve/reject, review detail with photos, and optional admin response. Q&A has sub-tabs (Unanswered / Answered) with admin answer, edit, and delete capabilities. Both tabs support search by product name or customer.

## Key Functionality

- Two main tabs: Reviews and Q&A (switchable)
- Reviews tab: status sub-tabs (Pending / Approved / Rejected) with count badges
- Review cards: star rating, title, text, customer name, date, product thumbnail + name, verified purchase badge, customer photos grid, approve/reject buttons
- Bulk select reviews with checkboxes; bulk approve or reject
- Approve/reject individual review with optional admin response text
- Q&A tab: status sub-tabs (Unanswered / Answered) with count badges
- Question cards: question text, customer name, date, product thumbnail + name, admin answer (if answered), answer/edit textarea
- Admin can answer a question, edit an existing answer, or delete an answer
- Search across reviews or Q&A by product name or customer

## Components Provided

- `AdminReviewsQA` — Top-level section with tabs for Reviews and Q&A

## Props Reference

### Types

| Type | Values |
|------|--------|
| `ReviewStatus` | `'pending' \| 'approved' \| 'rejected'` |
| `QAStatus` | `'unanswered' \| 'answered'` |
| `ModerationTab` | `'reviews' \| 'qa'` |
| `ReviewBulkAction` | `'approve' \| 'reject'` |

### Key Interfaces

- `ReviewItem` — `{ id, customerName, customerEmail, productId, productName, productImageUrl, rating, title, text, photos[], isVerifiedPurchase, status, adminResponse, createdAt }`
- `QAItem` — `{ id, customerName, productId, productName, productImageUrl, question, answer, answeredBy, status, createdAt, answeredAt }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeTab` | `(tab: ModerationTab) => void` | Switch between Reviews and Q&A tabs |
| `onChangeReviewStatus` | `(status: ReviewStatus \| 'all') => void` | Filter reviews by status sub-tab |
| `onChangeQAStatus` | `(status: QAStatus \| 'all') => void` | Filter Q&A by status sub-tab |
| `onSearch` | `(query: string) => void` | Search reviews or Q&A by product name or customer |
| `onApproveReview` | `(reviewId: string, response?: string) => void` | Approve review in Supabase; optionally save admin response |
| `onRejectReview` | `(reviewId: string, reason?: string) => void` | Reject review in Supabase; optionally save rejection reason |
| `onBulkAction` | `(action: ReviewBulkAction, reviewIds: string[]) => void` | Batch approve or reject selected reviews |
| `onAnswerQuestion` | `(qaId: string, answer: string) => void` | Save admin answer to question in Supabase |
| `onEditAnswer` | `(qaId: string, answer: string) => void` | Update existing admin answer |
| `onDeleteAnswer` | `(qaId: string) => void` | Delete admin answer; question returns to "unanswered" |

## User Flows

### Flow 1: Moderate Pending Reviews
1. Admin navigates to Reviews & Q&A Moderation page
2. "Reviews" tab is active by default; "Pending" sub-tab shows count of pending reviews
3. Admin sees review cards with star ratings, text, photos, and product links
4. Admin reads a review, clicks "Approve" (optionally types a thank-you response)
5. `onApproveReview` fires; review status updates to "approved" in Supabase
6. Card moves out of the Pending list; Pending count decreases
7. **Outcome:** Approved review becomes visible on the storefront product page

### Flow 2: Bulk Reject Reviews
1. Admin is on the Reviews tab, Pending sub-tab
2. Admin checks the checkboxes on 5 spam reviews
3. Bulk action bar appears; admin clicks "Reject"
4. `onBulkAction('reject', reviewIds)` fires
5. All 5 reviews are rejected in Supabase
6. Cards disappear from Pending; Rejected count increases
7. **Outcome:** Spam reviews are rejected in one action

### Flow 3: Answer a Customer Question
1. Admin switches to the "Q&A" tab
2. "Unanswered" sub-tab shows questions awaiting admin response
3. Admin clicks on a question card, types an answer in the textarea
4. Admin clicks "Submit Answer"
5. `onAnswerQuestion` fires; answer is saved in Supabase with admin name and timestamp
6. Question moves to "Answered" sub-tab
7. **Outcome:** Customer question has an admin answer visible on the product page

### Flow 4: Edit an Existing Answer
1. Admin switches to Q&A tab, "Answered" sub-tab
2. Admin finds a question with an outdated answer
3. Admin clicks "Edit" on the answer, updates the text
4. `onEditAnswer` fires; answer is updated in Supabase
5. **Outcome:** Updated answer is visible on the storefront

## Empty States

- **No reviews:** Show "No reviews to moderate" in the reviews tab
- **No pending reviews:** Show "All caught up — no pending reviews" in the Pending sub-tab
- **No Q&A items:** Show "No questions yet" in the Q&A tab
- **No unanswered questions:** Show "All questions answered" in the Unanswered sub-tab
- **No search results:** Show "No results match your search"
- **Loading:** Skeleton cards for reviews and Q&A items

## Files to Reference

- `product/sections/admin-reviews-and-qa-moderation/spec.md` — Full specification
- `product/sections/admin-reviews-and-qa-moderation/types.ts` — TypeScript interfaces
- `product/sections/admin-reviews-and-qa-moderation/data.json` — Sample data
- `src/sections/admin-reviews-and-qa-moderation/` — Screen design components

## Done When

- [ ] Reviews and Q&A tabs are switchable
- [ ] Reviews tab loads real reviews from Supabase
- [ ] Status sub-tabs (Pending / Approved / Rejected) filter reviews with correct counts
- [ ] Review cards display star rating, title, text, customer photos, product link, verified badge
- [ ] Approve and reject buttons work on individual reviews via Supabase
- [ ] Optional admin response saves with approval
- [ ] Bulk select with checkboxes works; bulk approve/reject processes all selected
- [ ] Q&A tab loads real questions from Supabase
- [ ] Status sub-tabs (Unanswered / Answered) filter questions with correct counts
- [ ] Admin can answer an unanswered question via textarea and submit
- [ ] Admin can edit an existing answer
- [ ] Admin can delete an answer (question returns to unanswered)
- [ ] Search filters reviews/Q&A by product name or customer
- [ ] Product thumbnail and name on each card link to the product
- [ ] Loading, error, and empty states render correctly
- [ ] Responsive: cards stack on mobile
- [ ] Light and dark mode both render correctly

---


# Milestone 14 — Admin: Coupons & Gift Cards

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

Admin interface for managing discount coupons and gift cards. Two tabbed views (Coupons / Gift Cards) with full CRUD for coupons including complex discount rules (percentage/flat, min order, max cap, date ranges, usage limits, product/category targeting, currency-specific INR/USD values). Gift cards support creation, balance tracking, transaction history, and activation/deactivation.

## Key Functionality

- Toggle between Coupons and Gift Cards tabs
- Browse coupons in a data table with search and status filter (active/expired/disabled)
- Create a new coupon via a multi-section form (Basic Info, Discount Rules, Validity, Usage Limits, Targeting)
- Edit, disable/enable, and delete coupons with confirmation
- Coupon rules: percentage or flat discount, min order amount, max discount cap, start/end dates, total + per-customer usage limits, product/category targeting, currency-specific values (INR/USD)
- Browse gift cards with balance information
- Create gift cards with auto-generated code, initial balance, currency, and optional expiry
- View gift card detail with transaction history (credits and debits)
- Activate/deactivate gift cards

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminCouponsGiftCards` | Root component with tab switching, coupon table, gift card table, coupon form, gift card detail |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `coupons` | `CouponRow[]` | Array of coupon rows for the table |
| `giftCards` | `GiftCardRow[]` | Array of gift card rows |
| `editingCoupon` | `CouponDetail \| null` | Coupon being edited (null = show table) |
| `giftCardDetail` | `GiftCardDetail \| null` | Gift card detail view (null = show table) |
| `activeTab` | `'coupons' \| 'gift-cards'` | Currently active tab |
| `couponStatusFilter` | `CouponStatus \| 'all'` | Filter for coupon table |
| `searchQuery` | `string` | Current search query |

### Key Types

```ts
type CouponStatus = 'active' | 'expired' | 'disabled'
type DiscountType = 'percentage' | 'flat'
type GiftCardStatus = 'active' | 'inactive' | 'expired' | 'depleted'

interface CouponRow {
  id: string; code: string; discountType: DiscountType; discountValue: number
  minOrder: number | null; maxDiscount: number | null; currency: 'INR' | 'USD'
  startDate: string; endDate: string; usageLimit: number | null
  usageLimitPerCustomer: number; usedCount: number; status: CouponStatus
  targetType: 'all' | 'products' | 'categories'; targetNames: string[]
}

interface CouponDetail extends CouponRow {
  description: string; currencyValues: { INR: number; USD: number }
  targetProductIds: string[]; targetCategoryIds: string[]
  createdAt: string; updatedAt: string
}

interface GiftCardRow {
  id: string; code: string; initialBalance: number; currentBalance: number
  currency: 'INR' | 'USD'; status: GiftCardStatus
  expiresAt: string | null; createdAt: string
}

interface GiftCardDetail extends GiftCardRow {
  transactions: GiftCardTransaction[]
  customerName: string | null; customerEmail: string | null
}

interface GiftCardTransaction {
  id: string; type: 'credit' | 'debit'; amount: number
  currency: 'INR' | 'USD'; description: string
  orderId: string | null; date: string
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeTab` | `(tab) => void` | Local state / URL param |
| `onChangeCouponStatus` | `(status) => void` | Filter coupons query |
| `onSearch` | `(query) => void` | Debounced search against Medusa v2 promotions API |
| `onCreateCoupon` | `() => void` | Navigate to coupon creation form (set editingCoupon to empty) |
| `onEditCoupon` | `(couponId) => void` | Fetch coupon detail from Medusa v2 and set editingCoupon |
| `onDeleteCoupon` | `(couponId) => void` | DELETE to Medusa v2 promotions API with confirmation |
| `onToggleCoupon` | `(couponId) => void` | Toggle coupon status via Medusa v2 |
| `onSaveCoupon` | `(data) => void` | POST/PUT to Medusa v2 promotions API |
| `onCancelCouponEdit` | `() => void` | Clear editingCoupon, return to table |
| `onCreateGiftCard` | `(balance, currency, expiresAt?) => void` | POST to Medusa v2 gift cards API |
| `onViewGiftCard` | `(giftCardId) => void` | Fetch gift card detail + transactions |
| `onToggleGiftCard` | `(giftCardId) => void` | Activate/deactivate via Medusa v2 |
| `onBackFromGiftCard` | `() => void` | Clear giftCardDetail, return to table |

## User Flows

### Flow 1: Create a Coupon

1. Admin clicks "Create Coupon" button on the Coupons tab
2. Full-page form appears with sections: Basic Info (code, description, currency), Discount Rules (type, value, min order, max cap), Validity (start/end dates), Usage Limits (total, per customer), Targeting (all/products/categories with picker)
3. Admin fills in all fields — form validates in real-time (code uniqueness check, value > 0, end date > start date)
4. Admin clicks Save
5. **Outcome:** POST to Medusa v2 promotions API creates the coupon, table refreshes with new entry, toast confirms success

### Flow 2: Edit and Disable a Coupon

1. Admin clicks Edit on a coupon row in the table
2. Form pre-populates with existing coupon data fetched from Medusa v2
3. Admin modifies the discount value and saves
4. Admin returns to table, clicks the disable toggle on another coupon
5. **Outcome:** Coupon status updates to "disabled" via API, row badge changes accordingly

### Flow 3: Create and Track a Gift Card

1. Admin switches to Gift Cards tab
2. Clicks "Create Gift Card" — form appears with auto-generated code, initial balance input, currency selector, optional expiry date
3. Admin enters balance of 5000 INR, clicks Create
4. **Outcome:** Gift card created via Medusa v2, appears in table with full initial balance

### Flow 4: View Gift Card Transaction History

1. Admin clicks on a gift card row to view detail
2. Detail view shows code, initial/current balance, status, customer info (if assigned), and transaction history list
3. Each transaction shows type (credit/debit), amount, description, linked order ID, and date
4. **Outcome:** Admin can see full audit trail of gift card usage

## Empty States

| State | Message |
|-------|---------|
| No coupons | "No coupons yet. Create your first discount coupon to attract customers." |
| No coupons matching filter | "No coupons match the current filter." |
| No gift cards | "No gift cards issued yet. Create one to get started." |
| No transactions on gift card | "This gift card hasn't been used yet." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-coupons-and-gift-cards/spec.md` |
| Types | `product/sections/admin-coupons-and-gift-cards/types.ts` |
| Sample Data | `product/sections/admin-coupons-and-gift-cards/data.json` |
| Components | `src/sections/admin-coupons-and-gift-cards/components/` |

## Done When

- [ ] Coupons tab loads real coupon data from Medusa v2 promotions API
- [ ] Search and status filter work against the API (not just client-side)
- [ ] Create Coupon form is fully functional — all fields save correctly, including currency-specific values, product/category targeting
- [ ] Edit Coupon loads existing data and persists changes via API
- [ ] Disable/enable toggle updates coupon status in real-time
- [ ] Delete coupon shows confirmation dialog and removes via API
- [ ] Gift Cards tab loads real gift card data from Medusa v2
- [ ] Create Gift Card form generates a code, sets balance and currency, saves via API
- [ ] Gift card detail view shows real transaction history
- [ ] Activate/deactivate toggle works on gift cards
- [ ] Loading spinners display while data is being fetched
- [ ] Error toasts appear on API failures with retry option
- [ ] Empty states render when no data exists
- [ ] Tables scroll horizontally on mobile
- [ ] Dark mode renders correctly across all views

---


# Milestone 15 — Admin: Bookings & Consultations

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

Admin interface for managing Vastu consultation bookings. Features a calendar/list view toggle for upcoming bookings, time slot configuration (day-of-week toggles, time pickers, duration, buffer, max per day), date blocking, booking detail with customer info and meeting links, status workflow (pending -> confirmed -> completed / cancelled), and auto-generated Zoom/Google Meet links.

## Key Functionality

- Toggle between Calendar View and List View for bookings
- Calendar shows monthly view with booking count dots on dates; click a date to see that day's bookings
- List view shows a table with date/time, customer, type, duration, status, meeting link, actions
- View booking detail: customer name/email/phone, consultation type, scheduled date/time, duration, meeting link (copyable), admin notes, status dropdown
- Update booking status through the workflow: pending -> confirmed -> completed, or cancel at any point
- Auto-generate or manually paste Zoom/Google Meet links for confirmed bookings
- Send confirmation or reminder emails to customers
- Configure available time slots: day-of-week toggles, start/end time, slot duration (30/45/60 min), buffer between slots, max bookings per day
- Block specific dates with a reason

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminBookings` | Root component with calendar/list views, booking detail, slot config, date blocking |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `bookings` | `BookingRow[]` | Array of booking records |
| `calendarDays` | `CalendarDay[]` | Calendar grid data with booking counts and blocked status |
| `slotConfig` | `TimeSlotConfig` | Current time slot configuration |
| `blockedDates` | `BlockedDate[]` | List of blocked dates |
| `selectedDate` | `string \| null` | Currently selected date on calendar |
| `viewMode` | `'calendar' \| 'list'` | Current view mode |

### Key Types

```ts
type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
type ConsultationType = 'vastu_home' | 'vastu_office' | 'vastu_plot' | 'general'
type SlotDuration = 30 | 45 | 60
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

interface BookingRow {
  id: string; customerName: string; customerEmail: string; customerPhone: string
  consultationType: ConsultationType; date: string; startTime: string; endTime: string
  duration: SlotDuration; status: BookingStatus; meetingLink: string | null; notes: string
}

interface CalendarDay {
  date: string; bookingCount: number; isBlocked: boolean; isToday: boolean
}

interface TimeSlotConfig {
  enabledDays: DayOfWeek[]; startTime: string; endTime: string
  slotDuration: SlotDuration; bufferMinutes: number; maxBookingsPerDay: number
}

interface BlockedDate { id: string; date: string; reason: string }
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeViewMode` | `(mode) => void` | Local state toggle |
| `onSelectDate` | `(date) => void` | Filter bookings for selected date, update calendar |
| `onViewBooking` | `(bookingId) => void` | Fetch booking detail from Supabase |
| `onUpdateStatus` | `(bookingId, status) => void` | Update booking status in Supabase, trigger email if confirming |
| `onSetMeetingLink` | `(bookingId, link) => void` | Save meeting link; if empty, auto-generate via Zoom/Google Meet API |
| `onAddNotes` | `(bookingId, notes) => void` | Save admin notes to Supabase |
| `onSendEmail` | `(bookingId, type) => void` | Trigger confirmation/reminder email via notification service |
| `onUpdateSlotConfig` | `(config) => void` | Save slot configuration to Supabase |
| `onBlockDate` | `(date, reason) => void` | Add blocked date to Supabase |
| `onUnblockDate` | `(blockedDateId) => void` | Remove blocked date from Supabase |

## User Flows

### Flow 1: Review and Confirm a Booking

1. Admin opens Bookings page in Calendar View
2. Sees dots on dates with pending bookings; clicks a date with 2 bookings
3. Day's bookings appear below the calendar
4. Clicks on a pending booking to see detail: customer info, consultation type (Vastu Home), scheduled time
5. Clicks "Generate Meeting Link" — system creates a Zoom/Google Meet link and saves it
6. Updates status from "pending" to "confirmed"
7. Clicks "Send Confirmation Email"
8. **Outcome:** Booking confirmed, meeting link generated, customer notified via email

### Flow 2: Configure Available Time Slots

1. Admin opens the Time Slot Configuration panel
2. Toggles on Monday through Friday, disables Saturday and Sunday
3. Sets start time to 10:00, end time to 18:00
4. Selects 45-minute slot duration with 15-minute buffer
5. Sets max 6 bookings per day
6. Clicks Save
7. **Outcome:** Configuration saved to Supabase, customer-facing booking calendar reflects new availability

### Flow 3: Block a Holiday Date

1. Admin opens the Block Dates section
2. Selects a date (e.g., Diwali) from the date picker
3. Enters reason: "Diwali Holiday"
4. Clicks Block
5. **Outcome:** Date marked as blocked in calendar view (visually distinct), no bookings accepted for that date

### Flow 4: Complete a Consultation

1. Admin switches to List View to see all bookings
2. Filters to see confirmed bookings
3. After consultation is done, clicks on the booking and changes status to "completed"
4. Adds notes: "Recommended NE corner corrections for kitchen placement"
5. **Outcome:** Booking archived as completed with consultation notes for future reference

## Empty States

| State | Message |
|-------|---------|
| No bookings | "No consultations booked yet. Bookings will appear here once customers schedule consultations." |
| No bookings on selected date | "No bookings scheduled for this date." |
| No blocked dates | "No dates are currently blocked." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-bookings-and-consultations/spec.md` |
| Types | `product/sections/admin-bookings-and-consultations/types.ts` |
| Sample Data | `product/sections/admin-bookings-and-consultations/data.json` |
| Components | `src/sections/admin-bookings-and-consultations/components/` |

## Done When

- [ ] Calendar view renders months with booking count dots on dates from Supabase
- [ ] Clicking a date filters and shows that day's bookings
- [ ] List view shows all bookings in a sortable/filterable table
- [ ] Booking detail displays customer info, consultation type, time, meeting link, notes
- [ ] Status updates (pending -> confirmed -> completed / cancelled) persist to Supabase
- [ ] Meeting link generation integrates with Zoom or Google Meet API (or manual paste works)
- [ ] Copy-to-clipboard works on meeting links
- [ ] Send email triggers real confirmation/reminder emails
- [ ] Time slot configuration saves and is used by the customer-facing booking flow
- [ ] Block/unblock dates persists to Supabase and prevents customer bookings
- [ ] Status badges use correct colors: pending=warning, confirmed=primary, completed=success, cancelled=error
- [ ] Loading states shown while fetching bookings
- [ ] Error handling for failed API calls
- [ ] Empty states render appropriately
- [ ] Calendar simplifies on mobile; cards stack responsively
- [ ] Dark mode renders correctly

---


# Milestone 16 — Admin: Shipping & Delivery

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

Admin settings page for configuring shipping zones with flat rates, free shipping thresholds, COD availability (India only) with fee and min/max order brackets, delivery estimate rules by region or pincode prefix, and shipping policy content editing. Organized as a vertical stack of settings cards, each independently saveable.

## Key Functionality

- Configure flat rate shipping per zone (Domestic India, International) with enable/disable toggles
- Add, edit, and delete shipping zones
- Set free shipping threshold amounts (separate INR/USD) with enable/disable toggle
- Toggle COD availability (India only) with fee amount, minimum order, and maximum order brackets
- Configure delivery estimate ranges by region name or pincode prefix (e.g., "400xxx" = 2-4 days)
- Edit shipping policy content via rich text editor (textarea)
- Per-section Save buttons for independent persistence

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminShipping` | Root component with shipping zones, free shipping, COD, delivery estimates, and policy sections |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `zones` | `ShippingZone[]` | Shipping zone configurations |
| `freeShipping` | `FreeShippingConfig` | Free shipping toggle and thresholds |
| `cod` | `CODConfig` | COD settings |
| `deliveryEstimates` | `DeliveryEstimate[]` | Delivery estimate rules |
| `shippingPolicy` | `string` | Shipping policy HTML/text content |

### Key Types

```ts
interface ShippingZone {
  id: string; name: string; rate: number; currency: 'INR' | 'USD'; isEnabled: boolean
}

interface FreeShippingConfig {
  enabled: boolean; thresholdINR: number; thresholdUSD: number
}

interface CODConfig {
  enabled: boolean; fee: number; minOrder: number; maxOrder: number
}

interface DeliveryEstimate {
  id: string; region: string; pincodePrefix: string; minDays: number; maxDays: number
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onSaveZones` | `(zones) => void` | Save shipping zones to Medusa v2 shipping options / Supabase config |
| `onSaveFreeShipping` | `(config) => void` | Save free shipping thresholds to Supabase store config |
| `onSaveCOD` | `(config) => void` | Save COD settings to Supabase store config |
| `onSaveDeliveryEstimates` | `(estimates) => void` | Save delivery estimate rules to Supabase |
| `onSaveShippingPolicy` | `(content) => void` | Save shipping policy text to Supabase content table |

## User Flows

### Flow 1: Configure Shipping Zones

1. Admin sees the Shipping Zones card with existing zones (e.g., "Domestic India" at INR 99, "International" at USD 15)
2. Clicks "Add Zone" to create a new zone — enters name, rate, currency, toggles enabled
3. Edits an existing zone's rate from INR 99 to INR 79
4. Clicks Save on the Shipping Zones section
5. **Outcome:** Zones saved to Medusa v2 shipping options, reflected in checkout immediately

### Flow 2: Set Up COD with Brackets

1. Admin scrolls to COD Settings card
2. Toggles COD to enabled (label shows "India Only")
3. Sets COD fee to INR 40
4. Sets minimum order for COD to INR 500 and maximum to INR 25,000
5. Clicks Save
6. **Outcome:** COD appears as a payment option at checkout for Indian customers with orders between INR 500-25,000

### Flow 3: Add Delivery Estimates by Pincode

1. Admin opens the Delivery Estimates card
2. Clicks "Add Rule" — enters region "Mumbai Metro", pincode prefix "400", min days 1, max days 3
3. Adds another rule for "Rest of Maharashtra", pincode prefix "4", min days 3, max days 6
4. Clicks Save
5. **Outcome:** Customers entering pincodes starting with "400" see "1-3 business days" at checkout

### Flow 4: Edit Shipping Policy

1. Admin opens the Shipping Policy card
2. Edits the textarea to update free shipping messaging and return address
3. Clicks Save
4. **Outcome:** Updated policy content visible on the storefront shipping policy page

## Empty States

| State | Message |
|-------|---------|
| No shipping zones | "No shipping zones configured. Add your first zone to enable shipping." |
| No delivery estimates | "No delivery estimate rules configured. Add rules to show delivery times at checkout." |
| Empty shipping policy | "No shipping policy written yet. Add your shipping terms and conditions." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-shipping-and-delivery/spec.md` |
| Types | `product/sections/admin-shipping-and-delivery/types.ts` |
| Sample Data | `product/sections/admin-shipping-and-delivery/data.json` |
| Components | `src/sections/admin-shipping-and-delivery/components/` |

## Done When

- [ ] Shipping zones load from Medusa v2 / Supabase and display in the zones table
- [ ] Add/edit/delete zones persists to the backend
- [ ] Zone enable/disable toggle works
- [ ] Free shipping threshold saves for both INR and USD
- [ ] Free shipping enable/disable toggle works and affects checkout logic
- [ ] COD toggle enables/disables COD at checkout for Indian orders only
- [ ] COD fee, min order, and max order brackets save correctly
- [ ] Delivery estimate rules save and are used by the checkout pincode lookup
- [ ] Add/remove delivery estimate rules works
- [ ] Shipping policy editor saves content to the storefront content system
- [ ] Each section's Save button independently persists its data with success feedback
- [ ] Loading states while fetching configuration
- [ ] Error toasts on save failures
- [ ] Empty states render when sections have no data
- [ ] Cards stack on mobile
- [ ] Dark mode renders correctly

---


# Milestone 17 — Admin: Payments & Tax

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

Admin settings for payment gateway configuration (Razorpay + Stripe) with masked API key fields and test/live mode toggle, payment method toggles (UPI, cards, netbanking, wallets, COD), and tabbed tax settings covering store-level GST configuration, international tax-exempt toggle, and per-product GST rate / HSN code overrides.

## Key Functionality

- Test/Live mode toggle at the top of the page — all gateway configs switch accordingly
- Razorpay configuration: Key ID and Key Secret (masked with reveal buttons), connection test button
- Stripe configuration: Publishable Key and Secret Key (masked with reveal buttons), connection test button
- Payment method toggles: UPI, Credit/Debit Cards, Netbanking, Wallets, COD — each with on/off switch
- GST tab: GSTIN input, default GST rate (%), default HSN code
- International tab: tax-exempt toggle (export under LUT), LUT number input
- Per-product tab: table of products with individual GST rate and HSN code overrides

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminPaymentsTax` | Root component with gateway config, payment methods, and tabbed tax settings |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `mode` | `'test' \| 'live'` | Current payment mode |
| `gateways` | `GatewayConfig` | Razorpay + Stripe key configurations |
| `paymentMethods` | `PaymentMethodToggle[]` | Available payment methods with toggle state |
| `gstConfig` | `GSTConfig` | Store-level GST settings |
| `internationalTax` | `InternationalTaxConfig` | International tax exemption settings |
| `productOverrides` | `ProductTaxOverride[]` | Per-product tax overrides |
| `activeTaxTab` | `'gst' \| 'international' \| 'per-product'` | Active tax settings tab |

### Key Types

```ts
type PaymentMode = 'test' | 'live'

interface GatewayConfig {
  razorpay: { keyId: string; keySecret: string; isConnected: boolean }
  stripe: { publishableKey: string; secretKey: string; isConnected: boolean }
}

interface PaymentMethodToggle {
  id: string; name: string; icon: string; enabled: boolean; description: string
}

interface GSTConfig { gstin: string; defaultRate: number; defaultHSN: string }

interface InternationalTaxConfig { taxExempt: boolean; lutNumber: string }

interface ProductTaxOverride {
  productId: string; productName: string; sku: string; gstRate: number; hsnCode: string
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onToggleMode` | `(mode) => void` | Switch between test/live keys in Supabase config |
| `onSaveGateways` | `(gateways) => void` | Encrypt and save API keys to Supabase (server-side encryption) |
| `onTestConnection` | `(gateway) => void` | Hit Razorpay/Stripe test endpoint to verify keys work |
| `onTogglePaymentMethod` | `(methodId) => void` | Enable/disable payment method in Medusa v2 |
| `onChangeTaxTab` | `(tab) => void` | Local tab state |
| `onSaveGST` | `(config) => void` | Save GSTIN, default rate, HSN to Supabase store config |
| `onSaveInternationalTax` | `(config) => void` | Save tax-exempt and LUT settings to Supabase |
| `onSaveProductOverride` | `(override) => void` | Save per-product GST rate and HSN code to Medusa v2 product metadata |

## User Flows

### Flow 1: Configure Razorpay for Live Mode

1. Admin toggles mode from "Test" to "Live"
2. Enters Razorpay Live Key ID and Key Secret (fields are masked by default)
3. Clicks "Reveal" to verify the entered key, then clicks "Test Connection"
4. System hits Razorpay API to verify — shows green checkmark on success or error message on failure
5. Clicks Save
6. **Outcome:** Live Razorpay keys encrypted and stored, checkout uses live Razorpay gateway

### Flow 2: Enable/Disable Payment Methods

1. Admin sees the payment methods list with toggle switches
2. Disables "Netbanking" (toggle off) and enables "UPI" (toggle on)
3. Changes reflect immediately
4. **Outcome:** Checkout only shows enabled payment methods to customers

### Flow 3: Set Store GST Configuration

1. Admin opens the GST tab under Tax Settings
2. Enters GSTIN: "27AABCT1234D1ZC"
3. Sets default GST rate to 18%
4. Sets default HSN code
5. Clicks Save
6. **Outcome:** All products without overrides use 18% GST rate; GSTIN displayed on invoices

### Flow 4: Override GST for Specific Products

1. Admin switches to the Per-Product tab
2. Sees table of products with their current GST rates and HSN codes
3. Edits a gemstone product to set GST rate to 3% and HSN code to "7103"
4. Clicks Save on that row
5. **Outcome:** That product uses 3% GST at checkout instead of the store default 18%

## Empty States

| State | Message |
|-------|---------|
| No gateway keys configured | "Enter your Razorpay or Stripe API keys to accept payments." |
| No product overrides | "All products use the store default GST rate. Add overrides for products with different tax rates." |
| Connection test not run | "Click 'Test Connection' to verify your API keys." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-payments-and-tax/spec.md` |
| Types | `product/sections/admin-payments-and-tax/types.ts` |
| Sample Data | `product/sections/admin-payments-and-tax/data.json` |
| Components | `src/sections/admin-payments-and-tax/components/` |

## Done When

- [ ] Test/Live mode toggle switches which set of API keys is displayed and used
- [ ] Razorpay Key ID and Key Secret save to Supabase with server-side encryption
- [ ] Stripe Publishable Key and Secret Key save with encryption
- [ ] "Test Connection" button verifies keys against Razorpay/Stripe APIs and shows result
- [ ] API key fields are masked by default with functional reveal buttons
- [ ] Payment method toggles enable/disable methods in the checkout flow
- [ ] GSTIN, default GST rate, and default HSN code save to store config
- [ ] International tax-exempt toggle and LUT number save correctly
- [ ] Per-product GST rate and HSN code overrides save to product metadata
- [ ] Per-product table shows all products with their current/overridden rates
- [ ] All saves show success/error feedback
- [ ] Loading states while fetching configuration
- [ ] Error handling for failed connection tests
- [ ] Empty states render appropriately
- [ ] Dark mode renders correctly

---


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

---


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

---


# Milestone 20 — Admin: Notifications & Communication

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

Multi-channel notification management for VastuCart. Tabbed interface organized by channel (Email, SMS, WhatsApp, Push, In-App) with template editing, provider configuration, and in-app announcement broadcasting. Includes integration settings for Listmonk (email marketing) and Chatwoot (live chat) always visible at the bottom.

## Key Functionality

- **Email tab:** Card grid of email templates (Order Confirmation, Shipping Update, Delivery Confirmation, Abandoned Cart, Welcome, Password Reset) with subject line, trigger event, active toggle, and inline editor for subject + body
- **SMS tab:** Twilio provider config (API key masked, Sender ID, enable toggle) plus template list with message preview, character count, variable placeholders, and active toggles
- **WhatsApp tab:** WhatsApp Business provider config (phone number, enable toggle) plus Meta-approved template list with active toggles
- **Push tab:** VAPID public key config, enable toggle, template list with title and body preview
- **In-App tab:** Announcement list with title, message, audience targeting (all/new/returning/VIP), date range, type (banner/modal/toast), active toggle; "Create Announcement" form
- **Integrations section (always visible):** Listmonk URL + connection status, Chatwoot URL + widget token + connection status

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminNotifications` | Root component with 5 channel tabs and bottom integrations section |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `activeChannel` | `ChannelTab` | Currently active channel tab |
| `emailTemplates` | `EmailTemplate[]` | Email template configurations |
| `smsConfig` | `SMSConfig` | SMS provider config and templates |
| `whatsappConfig` | `WhatsAppConfig` | WhatsApp provider config and templates |
| `pushConfig` | `PushConfig` | Push notification config and templates |
| `inAppAnnouncements` | `InAppAnnouncement[]` | In-app announcements list |
| `integrations` | `IntegrationConfig` | Listmonk + Chatwoot settings |

### Key Types

```ts
type ChannelTab = 'email' | 'sms' | 'whatsapp' | 'push' | 'inapp'
type AnnouncementType = 'banner' | 'modal' | 'toast'
type TargetAudience = 'all' | 'new' | 'returning' | 'vip'

interface EmailTemplate {
  id: string; name: string; subject: string; description: string
  isActive: boolean; lastEdited: string; triggerEvent: string
}

interface ChannelTemplate {
  id: string; name: string; template: string; triggerEvent: string; isActive: boolean
}

interface SMSConfig {
  provider: string; apiKey: string; senderId: string
  isEnabled: boolean; templates: ChannelTemplate[]
}

interface WhatsAppConfig {
  provider: string; phoneNumber: string; isEnabled: boolean; templates: ChannelTemplate[]
}

interface PushConfig {
  isEnabled: boolean; vapidPublicKey: string; templates: ChannelTemplate[]
}

interface InAppAnnouncement {
  id: string; title: string; message: string; targetAudience: TargetAudience
  startDate: string; endDate: string; isActive: boolean; type: AnnouncementType
}

interface IntegrationConfig {
  listmonk: { url: string; isConnected: boolean }
  chatwoot: { url: string; isConnected: boolean; widgetToken: string }
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeChannel` | `(channel) => void` | Local state / URL param |
| `onToggleEmailTemplate` | `(templateId) => void` | Toggle email template active state in Supabase |
| `onEditEmailTemplate` | `(templateId, subject, body) => void` | Save email template to Supabase / Listmonk |
| `onToggleSMS` | `(enabled) => void` | Enable/disable SMS channel |
| `onSaveSMSConfig` | `(config) => void` | Save Twilio API key and sender ID to Supabase |
| `onToggleSMSTemplate` | `(templateId) => void` | Toggle SMS template active state |
| `onEditSMSTemplate` | `(templateId, template) => void` | Save SMS template text |
| `onToggleWhatsApp` | `(enabled) => void` | Enable/disable WhatsApp channel |
| `onSaveWhatsAppConfig` | `(config) => void` | Save WhatsApp Business config |
| `onToggleWhatsAppTemplate` | `(templateId) => void` | Toggle WhatsApp template active state |
| `onEditWhatsAppTemplate` | `(templateId, template) => void` | Save WhatsApp template |
| `onTogglePush` | `(enabled) => void` | Enable/disable push notifications |
| `onSavePushConfig` | `(config) => void` | Save VAPID key config |
| `onTogglePushTemplate` | `(templateId) => void` | Toggle push template active state |
| `onEditPushTemplate` | `(templateId, template) => void` | Save push template |
| `onToggleAnnouncement` | `(announcementId) => void` | Toggle in-app announcement active state |
| `onCreateAnnouncement` | `(announcement) => void` | Create new in-app announcement in Supabase |
| `onSaveIntegrations` | `(integrations) => void` | Save Listmonk/Chatwoot URLs and tokens |

## User Flows

### Flow 1: Edit an Email Template

1. Admin opens the Email tab
2. Sees card grid of 6 email templates — each shows name, trigger event, subject, active toggle
3. Clicks "Edit Template" on "Order Confirmation"
4. Inline editor expands with subject input and body textarea
5. Admin updates the subject line and body with variable placeholders (e.g., `{{customer_name}}`, `{{order_id}}`)
6. Clicks Save
7. **Outcome:** Updated template saved to Supabase, used for all future order confirmation emails

### Flow 2: Configure SMS Provider and Templates

1. Admin opens the SMS tab
2. Enters Twilio API Key (masked), Sender ID
3. Toggles SMS to enabled
4. Scrolls to template list, clicks edit on "Order Shipped" template
5. Edits message: "Hi {{name}}, your order #{{order_id}} has been shipped! Track: {{tracking_url}}"
6. Character counter shows 95/160
7. Clicks Save
8. **Outcome:** SMS sends via Twilio when orders ship, using the updated template

### Flow 3: Create an In-App Announcement

1. Admin opens the In-App tab
2. Clicks "Create Announcement"
3. Fills in: title "Diwali Sale", message "Up to 40% off on all Vastu products!", audience "all", type "banner", start/end dates
4. Toggles active to ON
5. Clicks Create
6. **Outcome:** Banner announcement shows to all users on the storefront within the scheduled dates

### Flow 4: Connect Chatwoot for Live Chat

1. Admin scrolls to the Integrations section (always visible at bottom)
2. Enters Chatwoot URL and widget token
3. Clicks Save — system tests the connection
4. Status shows "Connected" with green indicator
5. **Outcome:** Chatwoot live chat widget appears on the storefront

## Empty States

| State | Message |
|-------|---------|
| No email templates | "No email templates configured. Set up templates for automated customer emails." |
| SMS not configured | "SMS provider not configured. Enter your Twilio credentials to enable SMS notifications." |
| WhatsApp not configured | "WhatsApp Business not connected. Configure your WhatsApp number to send messages." |
| No in-app announcements | "No announcements created. Create one to broadcast messages to your customers." |
| Integrations not connected | Connection status shows "Not Connected" with setup instructions |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-notifications-and-communication/spec.md` |
| Types | `product/sections/admin-notifications-and-communication/types.ts` |
| Sample Data | `product/sections/admin-notifications-and-communication/data.json` |
| Components | `src/sections/admin-notifications-and-communication/components/` |

## Done When

- [ ] Email templates load from Supabase and display in card grid
- [ ] Email template inline editor saves subject + body with variable placeholders
- [ ] Email template active toggles persist
- [ ] SMS provider config (Twilio) saves API key (encrypted) and sender ID
- [ ] SMS templates save with character count validation
- [ ] SMS enable/disable toggle controls whether SMS sends
- [ ] WhatsApp Business config saves phone number and provider settings
- [ ] WhatsApp templates (Meta-approved) display and toggle correctly
- [ ] Push notification VAPID key saves and templates display
- [ ] In-app announcement creation form is fully functional with all fields
- [ ] Announcement audience targeting, date scheduling, and type selection work
- [ ] Announcement active toggle controls visibility on storefront
- [ ] Listmonk URL saves and connection status reflects real state
- [ ] Chatwoot URL + widget token saves and live chat widget appears on storefront
- [ ] API keys are masked with reveal buttons where applicable
- [ ] Variable placeholders in templates are documented and validated
- [ ] All saves show success/error feedback
- [ ] Loading states while fetching configs
- [ ] Dark mode renders correctly

---


# Milestone 21 — Admin: Loyalty & Rewards

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

Loyalty program configuration interface for VastuCart. Features a program-level enable/disable toggle, stats dashboard (total issued/redeemed/expired points, active members), points earning and redemption configuration, loyalty tier management (Bronze, Silver, Gold, Platinum), and a manual points adjustment tool with recent adjustment history.

## Key Functionality

- Toggle the entire loyalty program on/off with a status badge
- View program stats: total points issued, total redeemed, total expired, active members
- Configure points earning rates: points per rupee, points per dollar
- Set minimum redemption threshold, points expiry days, point monetary values (INR/USD)
- View loyalty tiers with name, color indicator, minimum points, multiplier, and benefits list
- Edit individual tier settings
- Perform manual points adjustments: search customer by email, choose credit/debit, enter points and reason
- View recent adjustments table (last 5 entries)

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminLoyalty` | Root component with program toggle, stats, config form, tiers, and manual adjustment |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `programEnabled` | `boolean` | Whether the loyalty program is active |
| `config` | `PointsConfig` | Points earning and redemption configuration |
| `tiers` | `LoyaltyTier[]` | Loyalty tier definitions |
| `recentAdjustments` | `PointsAdjustment[]` | Last 5 manual adjustment records |
| `stats` | `LoyaltyStats` | Program-level statistics |

### Key Types

```ts
type AdjustmentType = 'credit' | 'debit'

interface LoyaltyTier {
  id: string; name: string; minPoints: number; multiplier: number
  benefits: string[]; color: string
}

interface PointsConfig {
  pointsPerRupee: number; pointsPerDollar: number
  minRedemptionPoints: number; pointsExpiryDays: number
  pointsValueINR: number; pointsValueUSD: number
}

interface PointsAdjustment {
  id: string; customerName: string; customerEmail: string
  type: AdjustmentType; points: number; reason: string
  adjustedBy: string; date: string
}

interface LoyaltyStats {
  totalPointsIssued: number; totalPointsRedeemed: number
  totalPointsExpired: number; activeMembers: number
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onToggleProgram` | `(enabled) => void` | Enable/disable loyalty program in Supabase config |
| `onSaveConfig` | `(config) => void` | Save points configuration to Supabase |
| `onEditTier` | `(tierId) => void` | Open tier editing modal/form, save to Supabase |
| `onSubmitAdjustment` | `(data) => void` | Credit/debit points for a customer in Supabase + log the adjustment |

## User Flows

### Flow 1: Enable and Configure the Loyalty Program

1. Admin sees the program toggle at the top — currently disabled
2. Toggles the program ON — status badge changes to "Enabled"
3. Scrolls to Points Configuration card
4. Sets: 1 point per INR 10 spent, 1 point per USD 0.10 spent, minimum 100 points to redeem, points expire after 365 days, 1 point = INR 0.50 / USD 0.006
5. Clicks Save
6. **Outcome:** Loyalty program active, customers start earning points on purchases

### Flow 2: Configure Loyalty Tiers

1. Admin scrolls to the Tiers card
2. Sees four tiers: Bronze (0 pts, 1x), Silver (500 pts, 1.5x), Gold (2000 pts, 2x), Platinum (5000 pts, 3x)
3. Clicks Edit on Gold tier
4. Changes multiplier from 2x to 2.5x, adds benefit "Priority consultation booking"
5. Saves
6. **Outcome:** Gold tier customers now earn 2.5x points and see the new benefit

### Flow 3: Manual Points Adjustment

1. Admin scrolls to Manual Adjustment card
2. Enters customer email: "priya@example.com"
3. Selects "Credit" radio button
4. Enters 500 points, reason: "Compensation for delayed delivery"
5. Clicks Submit
6. **Outcome:** 500 points credited to customer's account, adjustment logged in the recent adjustments table with admin name, date, and reason

### Flow 4: Review Program Stats

1. Admin views the stats row at the top of the page
2. Sees 4 metric cards: 125,000 points issued, 45,000 redeemed, 8,000 expired, 342 active members
3. Uses this data to evaluate program effectiveness
4. **Outcome:** Admin has visibility into loyalty program health at a glance

## Empty States

| State | Message |
|-------|---------|
| Program disabled | Stats show zeroes with message "Enable the loyalty program to start tracking points." |
| No recent adjustments | "No manual adjustments made yet." |
| No tiers configured | "No loyalty tiers defined. Set up tiers to reward your best customers." |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-loyalty-and-rewards/spec.md` |
| Types | `product/sections/admin-loyalty-and-rewards/types.ts` |
| Sample Data | `product/sections/admin-loyalty-and-rewards/data.json` |
| Components | `src/sections/admin-loyalty-and-rewards/components/` |

## Done When

- [ ] Program toggle enables/disables the entire loyalty system in Supabase
- [ ] Status badge reflects current program state (enabled/disabled)
- [ ] Stats cards show real aggregated data from Supabase (issued, redeemed, expired, active members)
- [ ] Points configuration form saves all 6 fields to Supabase
- [ ] Points earning logic (per rupee/dollar) is wired into the checkout/order completion flow
- [ ] Points redemption respects the minimum threshold and expiry settings
- [ ] Loyalty tiers display with correct colors, min points, multipliers, and benefits
- [ ] Tier editing persists changes to Supabase
- [ ] Manual adjustment form validates customer email exists before submitting
- [ ] Credit/debit adjustments update the customer's point balance in Supabase
- [ ] Adjustment is logged with admin name, type, points, reason, and timestamp
- [ ] Recent adjustments table shows the last 5 entries
- [ ] All saves show success feedback
- [ ] Loading states while fetching config and stats
- [ ] Error handling for invalid customer email in adjustment
- [ ] Cards stack on mobile, table scrolls horizontally
- [ ] Dark mode renders correctly

---


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

---

