# Test Specs: Product Experience

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Image Gallery
**Success Path:**
- Thumbnail strip renders below main image
- Clicking a thumbnail updates the main image
- Clicking main image opens lightbox/zoom

### Flow 2: Variant Selection
**Success Path:**
- Color swatches render as rounded chips with border highlight
- Selecting a variant updates price, images, and stock status
- Dropdown selectors work for non-color attributes (size, weight)

**Failure Path:**
- Out-of-stock variant shows unavailable state

### Flow 3: Add to Cart
**Success Path:**
- Quantity selector increments/decrements correctly
- "Add to Cart" triggers `onAddToCart` with variantId and quantity
- Wishlist toggle triggers `onToggleWishlist`

### Flow 4: Rich Content (A+)
- Hero image block renders title, image, headline, description
- Comparison table renders product images with checkmark/text metrics

### Flow 5: Reviews
**Success Path:**
- Rating bar chart shows distribution breakdown
- Review cards display stars, text, verified badge, photos
- Sort by newest/oldest/highest/lowest works

### Flow 6: Q&A
**Success Path:**
- Existing questions and answers display correctly
- "Ask a question" triggers `onAskQuestion`
- Admin-answered badge shown on official responses

### Flow 7: Quick View Modal
- Modal opens with product image, title, price, variants
- Add to cart works from within modal
- "View Full Details" navigates to full page

## Empty State Tests
- No reviews: shows "No reviews yet" with invite to review
- No Q&A: shows empty state with "Ask a question" CTA
- No related products: carousel hidden
- No A+ content: section hidden

## Edge Cases
- Product with single variant (no selector shown)
- Product with 10 images (gallery scrolling)
- Discount percentage displays correctly
- Express shipping badge visible when applicable
- Breadcrumbs render full category hierarchy
- Mobile: gallery full-width, thumbnails scroll horizontally
