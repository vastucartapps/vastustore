# VastuCart — System Architecture

> **This is the source of truth.** Every Claude session working on this project MUST read this file first.

## Overview

VastuCart is an ecommerce platform for Vastu/spiritual products. It's part of the VastuCart ecosystem (12+ subdomain sites) sharing a common authentication system via the AstroEngine API.

- **Live URL**: https://vastucart.com
- **Admin**: https://vastucart.com/admin
- **API (Medusa)**: https://api-store.vastucart.in
- **Auth API (shared)**: https://api.vastucart.in

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 15 (App Router) | SSR/SSG storefront + admin |
| Commerce Engine | Medusa v2 | Products, carts, orders, pricing |
| Auth | AstroEngine API (custom) | Shared auth across all VastuCart ecosystem apps |
| App Database | PostgreSQL (postgres-store) | Profiles, addresses, wishlist, loyalty, bookings, notifications |
| Cache/Events | Redis | Medusa sessions, cache, event bus |
| Payments | Razorpay + Stripe | India (INR) + International (USD) |
| Deployment | Coolify (Docker) | Self-hosted on VPS |

## Container Architecture (Coolify)

```
┌──────────────────────────────────────────────────────────────┐
│ Docker Network: vastucart-network                            │
│                                                              │
│  ┌─────────────────┐    ┌─────────────────┐                  │
│  │ nextjs-store    │───▶│ medusa-server   │                  │
│  │ Port: 3000      │    │ Port: 9000      │                  │
│  │ vastucart.com   │    │ api-store.      │                  │
│  │                 │    │ vastucart.in    │                  │
│  └───────┬─────────┘    └───────┬─────────┘                  │
│          │                      │                            │
│          │              ┌───────▼─────────┐                  │
│          │              │ postgres-store  │                  │
│          ├─────────────▶│ Port: 5433      │                  │
│          │              │ DBs: medusa,    │                  │
│          │              │   vastucart_app │                  │
│          │              └─────────────────┘                  │
│          │                                                   │
│          │              ┌─────────────────┐                  │
│          │              │ redis           │                  │
│          │              │ Port: 6379      │                  │
│          │              └─────────────────┘                  │
│          │                                                   │
│  ┌───────▼────────────────────────────────────────────┐      │
│  │ EXISTING — DO NOT MODIFY FROM THIS PROJECT         │      │
│  │                                                    │      │
│  │  ┌──────────────────┐   ┌──────────────────┐       │      │
│  │  │ astroengine-api  │──▶│ postgres-astro   │       │      │
│  │  │ Port: 8000       │   │ Port: 5432       │       │      │
│  │  │ api.vastucart.in │   │ DB: astroengine  │       │      │
│  │  └──────────────────┘   └──────────────────┘       │      │
│  └────────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────────┘
```

## Authentication Flow

**AstroEngine API is the single auth gateway for ALL VastuCart ecosystem apps.**

Users register/login once → can access VastuCart, astrology tools, panchang, kundali, and all other subdomain sites with the same credentials.

### Auth Endpoints (on api.vastucart.in)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/auth/register` | POST | Create account (email, password, name) |
| `/api/v1/auth/login` | POST | Get access_token + refresh_token |
| `/api/v1/auth/refresh` | POST | Refresh expired access_token |
| `/api/v1/auth/me` | GET | Get current user profile |
| `/api/v1/auth/password/reset` | POST | Request password reset email |
| `/api/v1/auth/password/reset/confirm` | POST | Reset with token |

### Token Lifecycle
1. Login/Register → get `access_token` (30 min) + `refresh_token` (7 days)
2. Store tokens in httpOnly cookies (set by Next.js API route)
3. Next.js middleware checks token on protected routes
4. Auto-refresh when access_token expires

### User Roles
- `free` — Default on registration. Can browse, add to cart, checkout
- `pro` — Paid tier (for astrology features, not ecommerce)
- `admin` — Full admin access to `/admin/*` routes
- `ecom_admin` — (TO BE ADDED) Ecommerce-specific admin role

### Auth in Next.js
```
Browser → /api/auth/login (Next.js API route)
  → POST api.vastucart.in/api/v1/auth/login
  ← { access_token, refresh_token }
  → Set httpOnly cookies
  ← { user } to client
```

Protected routes use `middleware.ts` to check cookies before rendering.

## Database Layout

### postgres-store (NEW — Port 5433)

**Database 1: `medusa`**
- Managed entirely by Medusa v2
- Products, variants, pricing, carts, orders, payments, shipping
- DO NOT modify these tables directly — use Medusa APIs

**Database 2: `vastucart_app`**
- Managed by Prisma (this project)
- Tables:

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `profiles` | Extended user data (links to auth user by ID) | user_id (FK to auth), phone, avatar_url, default_currency |
| `addresses` | Shipping/billing addresses | user_id, name, phone, street, city, state, pincode, country, is_default, label |
| `wishlist_items` | Saved products | user_id, product_id (Medusa), variant_id, notify_back_in_stock |
| `loyalty_balances` | Points balance per user | user_id, points, lifetime_earned, lifetime_redeemed |
| `loyalty_transactions` | Points history | user_id, type (earned/redeemed/adjusted), points, description, order_id |
| `bookings` | Consultation appointments | user_id, title, date, time, duration, status, meeting_link, consultant_name, price, currency |
| `time_slots` | Available consultation slots | day_of_week, start_time, end_time, duration, buffer, is_active |
| `blocked_dates` | Dates with no consultations | date, reason |
| `notifications` | In-app notifications | user_id, type, title, message, is_read, link, created_at |
| `announcements` | Storefront announcements | text, bg_color, text_color, link, is_active, start_date, end_date |
| `content_pages` | Static pages (About, Privacy, etc.) | slug, title, content_html, is_published |
| `footer_config` | Footer columns and links | column_title, links (JSON), sort_order |
| `store_config` | Global store settings | key, value (JSON) — for branding, SEO, shipping, tax, integrations |
| `banner_ads` | Ecosystem ad banners | name, headline, cta_text, cta_url, status, creatives (JSON), schedule |
| `ecosystem_sites` | Registered subdomain sites | subdomain, display_name, is_active, slots (JSON) |
| `social_posts` | Social media publish log | banner_id, platform, post_url, status, caption, meta (JSON) |

### postgres-astro (EXISTING — Port 5432)

- `users` table — email, password_hash, name, role, is_active, is_verified
- `charts` table — birth charts (astrology)
- `reports` table — generated reports
- `api_keys` table — service API keys

**Cross-database linking:** `vastucart_app.profiles.user_id` matches `astroengine.users.id`. No foreign key constraint (different Postgres instances), but the UUID is the same.

## Dual Currency

- **India (INR)**: Detected by IP geolocation or user preference
- **International (USD)**: Default for non-India
- Products in Medusa store both INR and USD prices
- Currency stored in user profile (`default_currency`)
- Razorpay handles INR payments, Stripe handles USD

## Payment Flow

### Razorpay (India / INR)
1. Next.js creates Razorpay order via `/api/webhooks/razorpay`
2. Frontend opens Razorpay Checkout modal
3. On success → verify signature server-side → complete Medusa order
4. Supports: UPI, cards, netbanking, wallets

### Stripe (International / USD)
1. Next.js creates Stripe PaymentIntent via `/api/webhooks/stripe`
2. Frontend uses Stripe Elements/Checkout
3. On success → confirm server-side → complete Medusa order
4. Supports: cards

### COD (India Only)
- Available when: user is logged in + shipping to India + order total within min/max brackets
- COD fee added to order total
- Order created directly without payment gateway

## Design System

### Colors
- **Primary (Deep Teal)**: `#013f47`
- **Secondary (Burnt Saffron)**: `#c85103`
- **Background (Cream)**: `#fffbf5`
- **Card**: `#ffffff`
- **Gradient**: `linear-gradient(90deg, #013f47, #2a7a72, #c85103)`
- **NEVER use**: indigo, blue, purple, violet, fuchsia, sky, cyan

### Typography
- **Headings**: Lora (serif)
- **Body**: Open Sans (sans-serif)
- **Mono**: IBM Plex Mono (monospace)

### Gradient Accent Border (Signature Pattern)
```css
border-top: 3px solid transparent;
border-image: linear-gradient(90deg, #013f47, #2a7a72, #c85103) 1;
```

## Three Shell Patterns

### 1. Storefront Shell (public pages)
- Announcement ribbon (optional, deep teal bg)
- Header: logo | search | account, wishlist, cart icons
- Category nav bar with mega menu
- Footer: multi-column, deep teal bg

### 2. Customer Dashboard Shell (/account/*)
- Storefront header (same as above)
- Left sidebar (240px): avatar, nav items with icons
- Content area: white background

### 3. Admin Dashboard Shell (/admin/*)
- Admin header: dark teal, "VastuCart Admin" branding
- Left sidebar (260px): grouped collapsible nav sections
- Content area: stone-50 background

## Environment Variables

See `.env.example` for the complete list with descriptions.

## UI Component Source

All UI designs are in `product-plan/` (copied from the Design OS project). Each section has:
- `components/` — React components (props-based, portable)
- `types.ts` — TypeScript interfaces
- `sample-data.json` — Test data
- `README.md` — Feature overview
- `tests.md` — UI behavior test specs

## Implementation Order

1. Shell (design tokens + 3 shell layouts)
2. Authentication & Onboarding
3. Storefront & Navigation
4. Product Experience
5. Cart & Checkout
6. Customer Dashboard
7-22. Admin sections (Overview → Ecosystem Ads)

See `product-plan/instructions/incremental/` for detailed milestone instructions.
