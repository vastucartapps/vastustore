# UI Data Shapes

These types define the shape of data that the UI components expect to receive as props. They represent the **frontend contract** — what the components need to render correctly.

How you model, store, and fetch this data on the backend is an implementation decision. You may combine, split, or extend these types to fit your architecture.

## Core Entities

- **User** — Customer or admin account with auth, profile, loyalty points (used in: authentication, customer-dashboard)
- **Product** — Sellable item with variants, images, RPC, specs, dual-currency pricing (used in: storefront, product-experience, admin-product-management)
- **ProductVariant** — Specific variation with SKU, stock, pricing (used in: product-experience, cart-and-checkout)
- **Category** — Hierarchical product grouping (used in: storefront, admin-category-management)
- **Cart / CartItem** — Shopping session with line items (used in: cart-and-checkout)
- **Order / OrderItem** — Completed purchase with status tracking (used in: customer-dashboard, admin-order-management)
- **Review** — Customer product review with moderation (used in: product-experience, admin-reviews-and-qa-moderation)
- **Coupon** — Discount code with rules (used in: cart-and-checkout, admin-coupons-and-gift-cards)
- **GiftCard** — Prepaid store credit (used in: customer-dashboard, admin-coupons-and-gift-cards)
- **Booking / TimeSlot** — Consultation appointments (used in: customer-dashboard, admin-bookings-and-consultations)
- **ReturnRequest** — Return/refund requests (used in: admin-returns-and-refunds)
- **Notification** — In-app user notifications (used in: customer-dashboard, admin-notifications)
- **ContentPage** — Editable static pages (used in: admin-storefront-and-content)
- **Announcement** — Storefront header ribbon (used in: admin-storefront-and-content)
- **Invoice** — GST-compliant order invoice (used in: admin-order-management)
- **Banner / EcosystemSite / SocialPost** — Ecosystem ad management (used in: admin-ecosystem-ads)

## Per-Section Types

Each section includes its own `types.ts` with the full interface definitions:

- `sections/authentication-and-onboarding/types.ts`
- `sections/storefront-and-navigation/types.ts`
- `sections/product-experience/types.ts`
- `sections/cart-and-checkout/types.ts`
- `sections/customer-dashboard/types.ts`
- `sections/admin-overview-dashboard/types.ts`
- `sections/admin-product-management/types.ts`
- `sections/admin-category-management/types.ts`
- `sections/admin-order-management/types.ts`
- `sections/admin-returns-and-refunds/types.ts`
- `sections/admin-customer-management/types.ts`
- `sections/admin-reviews-and-qa-moderation/types.ts`
- `sections/admin-coupons-and-gift-cards/types.ts`
- `sections/admin-bookings-and-consultations/types.ts`
- `sections/admin-shipping-and-delivery/types.ts`
- `sections/admin-payments-and-tax/types.ts`
- `sections/admin-storefront-and-content/types.ts`
- `sections/admin-integrations-and-seo/types.ts`
- `sections/admin-notifications-and-communication/types.ts`
- `sections/admin-loyalty-and-rewards/types.ts`
- `sections/admin-ecosystem-ads/types.ts`

## Combined Reference

See `overview.ts` for all entity types aggregated in one file.
