# VastuCart — Implementation Prompt

> **Copy everything below this line and paste into the new Claude terminal in this project folder.**

---

You are building VastuCart — a production-grade, enterprise-level ecommerce platform for Vastu and spiritual products. This is NOT a prototype. This is NOT a demo. This is a real business launching for real customers. Every button must work. Every API call must be real. Every state must be handled. No sample data, no hardcoded values, no placeholder functions, no console.log callbacks, no "coming soon" screens.

## Read These Files First (MANDATORY)

Before writing ANY code, you MUST read these files in this exact order:

1. **`ARCHITECTURE.md`** — System architecture, database layout, auth flow, container diagram, design system
2. **`CLAUDE.md`** — Agent instructions, design rules, implementation order
3. **`ecomapirequirement.md`** — API modifications needed (some may not be deployed yet — handle gracefully)
4. **`product-plan/product-overview.md`** — Product summary, all 21 sections, entities
5. **`product-plan/design-system/tokens.css`** — Color tokens, gradients, shadows
6. **`product-plan/design-system/fonts.md`** — Typography setup
7. **`product-plan/instructions/incremental/01-shell.md`** — Start here for Milestone 01

## What Already Exists

This project has been scaffolded with:
- Next.js 15 App Router with TypeScript
- VastuCart design tokens in `globals.css` (all brand colors, gradients, fonts)
- Root layout with Lora (headings), Open Sans (body), IBM Plex Mono (mono) via `next/font`
- Auth client library at `src/lib/auth.ts` wrapping AstroEngine API (`api.vastucart.in`)
- Middleware at `src/middleware.ts` for route protection (auth + admin guards)
- Auth API proxy at `src/app/api/auth/[...path]/route.ts` with httpOnly cookie management
- All route stubs (35+ pages) for storefront, auth, account dashboard, admin dashboard
- Prisma schema at `prisma/schema.prisma` for the `vastucart_app` database
- Docker compose for local dev (Postgres + Redis)
- `product-plan/` folder with ALL UI components, types, sample data, test specs, and instructions for 22 milestones
- Logo files in `public/`

## Architecture Summary

```
Next.js (this project) ──→ AstroEngine API (api.vastucart.in) for auth
                       ──→ Medusa v2 (api-store.vastucart.in) for commerce
                       ──→ PostgreSQL (vastucart_app db via Prisma) for app data
                       ──→ Razorpay (India/INR) + Stripe (International/USD) for payments
```

- **Auth is shared** across the entire VastuCart ecosystem (astrology, panchang, kundali, store). Users register once, login anywhere. AstroEngine API at `api.vastucart.in` is the single auth gateway.
- **Medusa v2** handles products, variants, pricing, carts, orders, shipping, payments.
- **vastucart_app database** (Prisma) handles profiles, addresses, wishlist, loyalty, bookings, notifications, content pages, store config, announcements.
- **User IDs** from AstroEngine auth (UUIDs) are used as foreign keys in `vastucart_app.profiles.user_id`.

## How to Handle API Dependencies

The AstroEngine API is being modified in parallel. Some endpoints may not exist yet. **Build the frontend to call the real endpoints, but handle failures gracefully:**

1. **Auth endpoints that EXIST NOW:** `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/me`, `/auth/password/reset`, `/auth/password/reset/confirm`
2. **Auth endpoints BEING ADDED:** `PATCH /auth/me` (profile update), `/auth/verify-email`, `/auth/sessions`, `/auth/convert-guest`
3. **For endpoints not yet deployed:** Call them anyway. If they return 404/500, show a user-friendly message like "This feature is being set up" or gracefully degrade. When the API is updated, the feature will automatically work without ANY frontend changes.
4. **NEVER mock API responses.** NEVER use hardcoded data as a fallback. Either show real data from the API or show a proper loading/error/empty state.

## Medusa v2 Integration

Install `@medusajs/js-sdk` and configure the Medusa client. All product data, cart operations, orders, and pricing come from Medusa. During development before Medusa is running:
- The store pages should attempt to fetch from Medusa
- If Medusa is unavailable, show proper empty states ("Store is being set up" or loading skeletons)
- Structure all data fetching so it works immediately when Medusa comes online

## Quality Standards — NON-NEGOTIABLE

### Every Touch Point Must Work
- Every button has a real handler (not `console.log` or `() => {}`)
- Every form submits to a real API endpoint
- Every link navigates to a real route
- Every toggle persists state to the database
- Every search actually searches
- Every filter actually filters
- Every pagination actually paginates

### State Management
- Loading states: Show skeletons or spinners during API calls
- Error states: Show user-friendly error messages with retry buttons
- Empty states: Show helpful empty state UI with CTAs (from the design components)
- Success states: Show toast notifications or success messages
- Optimistic updates where appropriate (wishlist, cart quantity)

### Data Flow
- Server Components for initial data fetch (SSR/SSG)
- Client Components only where interactivity is needed
- React Server Actions for mutations
- SWR or React Query for client-side data fetching with revalidation
- No prop drilling — use context or state management (Zustand) for shared state

### Auth Flow
- Tokens in httpOnly cookies (already set up in the auth API proxy)
- Auto-refresh when access_token expires (30 min)
- Redirect to login with `?redirect=` param for protected routes
- Role-based access: `ecom_admin` or `admin` role required for `/admin/*`
- After login: customers → storefront, admins → `/admin`

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Storefront header: hamburger menu on mobile, full nav on desktop
- Admin sidebar: hidden on mobile (hamburger), icons-only on tablet, full on desktop
- All tables scroll horizontally on mobile
- All forms stack vertically on mobile

### Dark Mode
- Support `dark:` variants throughout
- Use CSS custom properties from `globals.css`
- Respect system preference, allow manual toggle

### Performance
- Use Next.js Image component for all images
- Lazy load below-fold content
- Prefetch critical routes
- Static generation where possible (content pages, category pages)

## UI Components

The `product-plan/sections/` folder contains ready-made React components for every section. These are **reference implementations** — they show the exact UI design, prop interfaces, and interactions. When building each milestone:

1. Read the milestone instructions in `product-plan/instructions/incremental/[NN]-[section].md`
2. Read the components in `product-plan/sections/[section]/components/`
3. Read the types in `product-plan/sections/[section]/types.ts`
4. Read the test specs in `product-plan/sections/[section]/tests.md`
5. **Integrate the components** into the Next.js app, wiring them to real APIs
6. Replace all callback props with real implementations (API calls, navigation, state updates)
7. Replace sample data with real data from Medusa / Prisma / AstroEngine

The components are **props-based** — they accept data and fire callbacks. Your job is to:
- Fetch real data and pass it as props
- Implement every callback to do the real thing (not log to console)
- Add loading/error/empty states around the components

## Design System — STRICT Rules

- **Primary**: `#013f47` (deep teal) — headers, buttons, key UI elements
- **Secondary**: `#c85103` (burnt saffron) — CTAs, accents, highlights
- **Background**: `#fffbf5` (cream) — page backgrounds
- **Card**: `#ffffff` (white) — card backgrounds
- **Fonts**: Lora (headings), Open Sans (body), IBM Plex Mono (code/prices/order numbers)
- **Gradient accent border**: `linear-gradient(90deg, #013f47, #2a7a72, #c85103)` — top border on cards
- **FORBIDDEN colors**: indigo, blue, purple, violet, fuchsia, sky, cyan — NEVER use these
- **Tailwind v4**: No `tailwind.config.js`. Use CSS custom properties from `globals.css`.

## Dual Currency

- Detect India via IP geolocation or user's `default_currency` preference
- Show prices in INR for India, USD for international
- All prices stored in both currencies in Medusa
- Razorpay checkout for INR, Stripe checkout for USD
- COD available ONLY for: logged-in users + shipping to India + order within min/max brackets

## Implementation Order

Follow the milestones in `product-plan/instructions/incremental/` sequentially:

| # | Milestone | Key Focus |
|---|-----------|-----------|
| 01 | Shell | Design tokens + 3 shell layouts (storefront, customer dashboard, admin) |
| 02 | Auth | Login, register, forgot password, email verification, role-based redirect |
| 03 | Storefront | Homepage, category listing, search, product cards |
| 04 | Product | Product detail, gallery, variants, reviews, Q&A, A+ content |
| 05 | Cart & Checkout | Cart drawer/page, 4-step checkout, Razorpay/Stripe/COD |
| 06 | Customer Dashboard | Orders, addresses, wishlist, loyalty, bookings, notifications |
| 07-22 | Admin Sections | Overview → Products → Categories → ... → Ecosystem Ads |

**Start with Milestone 01.** Read `product-plan/instructions/incremental/01-shell.md` and build the three shell layouts.

## What "Done" Means for Each Milestone

- [ ] All components render with real data (or proper loading/empty states if API unavailable)
- [ ] All callbacks wired to real API calls
- [ ] All forms submit to real endpoints
- [ ] All navigation links work
- [ ] Loading, error, and empty states handled
- [ ] Responsive on mobile, tablet, desktop
- [ ] Dark mode support
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Matches the visual design from `product-plan/sections/[section]/` components

## Begin

Start by reading `ARCHITECTURE.md` and `CLAUDE.md`, then proceed with Milestone 01. Ask me clarifying questions if anything is unclear. Do NOT skip ahead. Do NOT use placeholder data. Build it real from day one.
