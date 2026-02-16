# Storefront & Navigation

## Overview
The public-facing storefront is the primary shopping experience. It includes a homepage with hero slider, category grid, product carousels, deals with countdown timers, testimonials, and newsletter signup. Category listing pages feature sidebar filters with faceted filtering, and an expandable search bar provides autocomplete.

## Components
| Component | Description |
|-----------|-------------|
| `Homepage.tsx` | Full homepage layout with hero, categories, carousels, deals, testimonials, trust badges, newsletter |
| `CategoryListing.tsx` | Category/search results page with sidebar filters, product grid, sort, pagination |
| `ProductCard.tsx` | Reusable product card with image, price, rating, wishlist heart, quick-view and add-to-cart on hover |

## Data Shapes
| Type | Description |
|------|-------------|
| `HeroSlide` | Hero banner with image, heading, CTA |
| `CategoryCard` | Category with image overlay and product count |
| `ProductCard` | Product with price, MRP, rating, variant count |
| `DealProduct` | Product with discount percentage and countdown |
| `Testimonial` | Customer quote with name, location, rating |
| `FilterGroup` | Sidebar filter (checkbox, range, rating, toggle) |
| `SearchSuggestion` | Autocomplete result (product, category, or query) |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onHeroCtaClick` | User clicks a hero slide CTA button |
| `onCategoryClick` | User clicks a category card |
| `onProductClick` | User clicks a product card |
| `onQuickView` | User clicks quick-view on a product |
| `onAddToCart` | User adds product to cart from card |
| `onToggleWishlist` | User toggles wishlist heart |
| `onNewsletterSubscribe` | User subscribes to newsletter |
| `onFilterChange` | User changes a filter value |
| `onSortChange` | User changes sort order |
| `onPageChange` | User navigates to a different page |
