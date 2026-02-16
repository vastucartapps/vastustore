# VastuCart Deployment Checklist

## Environment Variables Required

### Medusa v2
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - Medusa backend URL
- `MEDUSA_API_KEY` - Medusa API key (if required)

### AstroEngine Auth
- `NEXT_PUBLIC_ASTROENGINE_API_URL` - AstroEngine API URL (api.vastucart.in)
- `ASTROENGINE_API_KEY` - Server-side API key for AstroEngine

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)

### Payment Gateways
- `RAZORPAY_KEY_ID` - Razorpay key ID (India/INR)
- `RAZORPAY_KEY_SECRET` - Razorpay secret key
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Client-side Razorpay key
- `STRIPE_SECRET_KEY` - Stripe secret key (International/USD)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Client-side Stripe key

### Application
- `NEXT_PUBLIC_APP_URL` - Full application URL (for callbacks, webhooks)

---

## Milestone 06: Customer Dashboard - Remaining Work

### Database Setup (Supabase)

**Tables to Create:**

1. **`loyalty_balances`**
   ```sql
   CREATE TABLE loyalty_balances (
     user_id UUID PRIMARY KEY REFERENCES auth.users(id),
     points INTEGER DEFAULT 0,
     equivalent_value NUMERIC(10,2) DEFAULT 0,
     currency VARCHAR(3) DEFAULT 'INR',
     earn_rate VARCHAR(50) DEFAULT '₹100 = 1 point',
     redeem_rate VARCHAR(50) DEFAULT '100 points = ₹100',
     min_redemption INTEGER DEFAULT 100,
     expiring_points INTEGER DEFAULT 0,
     expiring_date TIMESTAMPTZ,
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

2. **`loyalty_transactions`**
   ```sql
   CREATE TABLE loyalty_transactions (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id),
     date TIMESTAMPTZ DEFAULT NOW(),
     description TEXT NOT NULL,
     type VARCHAR(20) CHECK (type IN ('earned', 'redeemed', 'adjusted')),
     points INTEGER NOT NULL,
     balance INTEGER NOT NULL,
     order_id VARCHAR(100),
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

3. **`coupons`** (expand existing or create)
   ```sql
   CREATE TABLE coupons (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     code VARCHAR(50) UNIQUE NOT NULL,
     description TEXT NOT NULL,
     discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'flat')),
     discount_value NUMERIC(10,2) NOT NULL,
     max_discount NUMERIC(10,2),
     min_order_value NUMERIC(10,2) DEFAULT 0,
     currency VARCHAR(3) DEFAULT 'INR',
     valid_until TIMESTAMPTZ NOT NULL,
     is_active BOOLEAN DEFAULT true,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

4. **`dashboard_offers`**
   ```sql
   CREATE TABLE dashboard_offers (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title VARCHAR(200) NOT NULL,
     description TEXT NOT NULL,
     code VARCHAR(50),
     image_url TEXT NOT NULL,
     badge_label VARCHAR(50) NOT NULL,
     badge_color VARCHAR(20) CHECK (badge_color IN ('primary', 'secondary', 'green')),
     cta_label VARCHAR(100) NOT NULL,
     cta_href TEXT NOT NULL,
     priority INTEGER DEFAULT 0,
     is_active BOOLEAN DEFAULT true,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

5. **`bookings`**
   ```sql
   CREATE TABLE bookings (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id),
     title VARCHAR(200) NOT NULL,
     date DATE NOT NULL,
     time VARCHAR(20) NOT NULL,
     status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
     meeting_link TEXT,
     consultant_name VARCHAR(100) NOT NULL,
     price NUMERIC(10,2) NOT NULL,
     currency VARCHAR(3) DEFAULT 'INR',
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

6. **`notifications`**
   ```sql
   CREATE TABLE notifications (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id),
     type VARCHAR(20) CHECK (type IN ('order', 'promotion', 'stock', 'loyalty')),
     title VARCHAR(200) NOT NULL,
     message TEXT NOT NULL,
     date TIMESTAMPTZ DEFAULT NOW(),
     is_read BOOLEAN DEFAULT false,
     link TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

### API Routes to Wire

**Task #40 (Dashboard Home):**
- [ ] `/api/loyalty/balance` - Connect to Supabase `loyalty_balances` table
- [ ] `/api/coupons/active` - Connect to Supabase `coupons` table (filter by `valid_until >= NOW()` and `is_active = true`)
- [ ] `/api/dashboard/offers` - Connect to Supabase `dashboard_offers` table (filter by `is_active = true`, sort by `priority DESC`)
- [ ] Wire total orders count to Medusa `store.order.list()` API
- [ ] Wire recent orders to Medusa `store.order.list({ limit: 3 })` API
- [ ] Wire new arrivals to Medusa `store.product.list({ limit: 8, order: '-created_at' })` API

**Remaining Dashboard Sections (Tasks #41-#49):**
- [ ] Task #41: My Orders (list + detail)
- [ ] Task #42: Address Book (CRUD with Medusa)
- [ ] Task #43: Wishlist (Supabase table + product grid)
- [ ] Task #44: Coupons section (apply/copy functionality)
- [ ] Task #45: Loyalty Points (redeem functionality + transaction history)
- [ ] Task #46: Bookings (create/cancel consultations)
- [ ] Task #47: Gift Cards (check balance UI)
- [ ] Task #48: Notifications (mark read/unread, filter by type)
- [ ] Task #49: Support (Chatwoot integration)

### Supabase RLS Policies

All tables above need Row Level Security policies:
- `SELECT`: Allow users to see only their own data (`user_id = auth.uid()`)
- `INSERT/UPDATE/DELETE`: Allow users to modify only their own data
- Admin bypass for service role

---

## Milestone 05: Cart & Checkout - Remaining Work

### Payment Gateway Testing
- [ ] Test Razorpay integration in test mode
- [ ] Test Stripe integration in test mode
- [ ] Test COD flow end-to-end
- [ ] Test gift card application with real Supabase function

### Order Confirmation
- [ ] Wire `/order-confirmation/[orderId]` to real Medusa order data
- [ ] Generate GST invoice with real order items, tax breakdown
- [ ] Test invoice PDF download

---

## Milestone 04: Product Detail - Remaining Work

### Reviews & Q&A
- [ ] Wire reviews to Supabase `reviews` table
- [ ] Wire Q&A to Supabase `questions` table
- [ ] Wire FAQs to Supabase `faqs` table
- [ ] Test review submission flow
- [ ] Test question submission flow

---

## Milestone 03: Storefront Pages - Remaining Work

### Homepage
- [ ] Wire hero carousel to Supabase `hero_slides` table
- [ ] Wire category cards to Medusa categories
- [ ] Wire featured products to Medusa with featured flag

### Category Listing
- [ ] Wire sorting to Medusa product list API
- [ ] Wire filtering (price, availability) to Medusa
- [ ] Test pagination

### Product Detail
- [ ] Wire variant selector to Medusa variants API
- [ ] Wire add-to-cart to Medusa cart API
- [ ] Test inventory checks

---

## Pre-Deployment Checklist

### Security
- [ ] Enable Supabase RLS on all tables
- [ ] Rotate all API keys to production values
- [ ] Set up CORS for Medusa backend
- [ ] Configure CSP headers for payment gateways
- [ ] Set httpOnly cookies for auth tokens

### Performance
- [ ] Enable Next.js Image Optimization
- [ ] Set up CDN for static assets
- [ ] Configure caching headers
- [ ] Optimize bundle size (check unused dependencies)

### Monitoring
- [ ] Set up error tracking (Sentry or similar)
- [ ] Configure logging for payment webhooks
- [ ] Set up uptime monitoring
- [ ] Configure analytics (Google Analytics or similar)

### Testing
- [ ] Test all payment flows (Razorpay, Stripe, COD)
- [ ] Test gift card application
- [ ] Test coupon application
- [ ] Test order creation end-to-end
- [ ] Test email notifications (if implemented)

### Documentation
- [ ] API documentation for custom endpoints
- [ ] Admin setup guide (Medusa, Supabase)
- [ ] Deployment guide (Vercel or similar)
- [ ] Environment variables reference

---

## Post-Deployment

### Medusa Setup
- [ ] Run Medusa migrations
- [ ] Seed initial data (regions, currencies, shipping options)
- [ ] Create admin user
- [ ] Configure payment providers in Medusa admin

### Supabase Setup
- [ ] Run all SQL migrations from `prisma/supabase-schema.sql`
- [ ] Create initial data (COD config, prepaid discount config)
- [ ] Set up storage buckets (if needed for images)

### Domain & SSL
- [ ] Point domain to deployment
- [ ] Configure SSL certificate
- [ ] Set up www redirect
- [ ] Test HTTPS

### Payment Gateway Activation
- [ ] Switch Razorpay to live mode
- [ ] Switch Stripe to live mode
- [ ] Configure webhook URLs for both gateways
- [ ] Test live transactions

---

## Known TODOs in Code

### `/src/app/account/page.tsx`
- Line 66: `TODO: Fetch from Medusa - for now using mock count`
- Line 70: `TODO: Fetch wishlist count from Supabase - for now use cart count`
- Line 79: Wire real Medusa orders API
- Line 82: Wire real Medusa products API with sorting

### `/src/app/(storefront)/checkout/page.tsx`
- Line 267: `TODO: Save to Medusa cart for abandoned cart recovery`
- Line 276: `TODO: Save to Medusa cart and user's saved addresses`
- Line 317: `TODO: Get actual Medusa cart ID`

### `/src/app/(storefront)/order-confirmation/[orderId]/page.tsx`
- Line 29: `TODO: Fetch real order from Medusa`
- Line 55: `TODO: Fetch related products from Medusa`
- Line 77: `TODO: Get from order`
- Line 82: `TODO: Get items from order`

### `/src/lib/invoice-generator.ts`
- Company GSTIN needs real value (line 42)
- Company PAN needs real value (line 43)

---

## Phase 2 Features (Post-Launch)

- [ ] Email notifications (order confirmation, shipping updates)
- [ ] SMS notifications (OTP, order updates)
- [ ] WhatsApp integration for support
- [ ] Abandoned cart recovery
- [ ] Product recommendations engine
- [ ] Advanced search with filters
- [ ] Multi-language support
- [ ] Dark mode (already in shell, needs testing)
- [ ] Progressive Web App (PWA) features
- [ ] Admin dashboard enhancements
- [ ] Analytics dashboard for sales tracking

