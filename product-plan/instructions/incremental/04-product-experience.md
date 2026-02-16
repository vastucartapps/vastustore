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
