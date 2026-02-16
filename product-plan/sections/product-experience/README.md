# Product Experience

## Overview
The product detail page where customers evaluate and decide to buy. Features image gallery with thumbnails, variant selection (swatches and dropdowns), pricing with MRP, Rich Product Content (A+ blocks), specifications, FAQ accordion, customer Q&A, reviews with photo uploads, and related products carousel.

## Components
| Component | Description |
|-----------|-------------|
| `ProductDetail.tsx` | Full product detail page layout |
| `ImageGallery.tsx` | Main image with thumbnail strip and lightbox/zoom |
| `VariantSelector.tsx` | Color swatches and dropdown selectors for variants |
| `RichContent.tsx` | A+ content blocks (hero image, comparison table) |
| `ReviewsSection.tsx` | Rating breakdown, review cards with photos, sort controls |
| `QASection.tsx` | Customer questions and admin answers |
| `QuickViewModal.tsx` | Overlay modal with key product info for quick purchase |

## Data Shapes
| Type | Description |
|------|-------------|
| `Product` | Core product data (name, price, MRP, stock, shipping) |
| `ProductVariant` | Purchasable variant with SKU, price, stock |
| `RichContentBlock` | A+ hero image or comparison table block |
| `SpecificationGroup` | Grouped key-value specification pairs |
| `ProductReview` | Customer review with rating, text, photos |
| `ProductQuestion` | Customer Q&A with admin-answered badge |
| `RatingBreakdown` | Average rating and distribution |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onAddToCart` | User adds product to cart with variant and quantity |
| `onToggleWishlist` | User toggles wishlist |
| `onShare` | User shares via WhatsApp, Facebook, Pinterest, or copy link |
| `onVariantChange` | User selects a different variant |
| `onAskQuestion` | User submits a new question |
| `onScrollToReviews` | User clicks rating anchor near title |
| `onQuickView` | User opens quick-view modal from related products |
