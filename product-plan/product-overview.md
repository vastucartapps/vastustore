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
