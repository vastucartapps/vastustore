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
