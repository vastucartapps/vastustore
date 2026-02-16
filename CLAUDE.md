# VastuCart Store — Agent Instructions

## CRITICAL: Read First
Before doing ANYTHING, read `ARCHITECTURE.md` in this project root. It contains the full system architecture, database layout, auth flow, and deployment details.

## Project Context
This is the VastuCart ecommerce storefront and admin dashboard. It's a Next.js 15 App Router project that integrates with:
- **Medusa v2** for commerce (products, carts, orders)
- **AstroEngine API** (`api.vastucart.in`) for authentication (shared across all VastuCart ecosystem apps)
- **PostgreSQL** (`vastucart_app` database via Prisma) for app-specific data
- **Razorpay** (India/INR) and **Stripe** (International/USD) for payments

## UI Designs
All UI designs are in `product-plan/`. Each section has components, types, sample data, and test specs.
- `product-plan/instructions/incremental/` — Per-milestone implementation guides
- `product-plan/sections/[section-id]/` — Components, types, sample data, tests
- `product-plan/design-system/` — Color tokens, fonts

## Design Rules
- **Primary**: `#013f47` (deep teal)
- **Secondary**: `#c85103` (burnt saffron)
- **Background**: `#fffbf5` (cream)
- **Fonts**: Lora (headings), Open Sans (body), IBM Plex Mono (mono)
- **NEVER use**: indigo, blue, purple, violet, fuchsia, sky, cyan
- **Gradient border**: `linear-gradient(90deg, #013f47, #2a7a72, #c85103)`
- **Tailwind v4**: No tailwind.config.js. Use CSS custom properties.

## Auth Pattern
- All auth goes through `api.vastucart.in/api/v1/auth/*`
- Tokens stored in httpOnly cookies via Next.js API routes
- `src/lib/auth.ts` wraps all auth API calls
- `src/middleware.ts` protects routes
- User roles: `free`, `pro`, `admin` (astro) + `ecom_role`: `customer`, `ecom_admin`

## Database
- Medusa manages its own DB — never write to it directly
- `vastucart_app` DB managed by Prisma — `prisma/schema.prisma`
- User IDs from AstroEngine auth (UUID) are used as foreign keys in `vastucart_app`

## Three Shell Layouts
1. **Storefront** (`(storefront)/layout.tsx`): header + category nav + footer
2. **Customer Dashboard** (`account/layout.tsx`): header + left sidebar
3. **Admin** (`admin/layout.tsx`): admin header + grouped sidebar

## Implementation Order
Follow `product-plan/instructions/incremental/` milestones in order:
01-shell → 02-auth → 03-storefront → ... → 22-ecosystem-ads
