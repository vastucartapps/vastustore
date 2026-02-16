# Test Specs: Storefront & Navigation

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Homepage Browse
**Success Path:**
- Hero slider auto-rotates with dot indicators
- Category grid renders cards with image overlays and hover zoom
- Three product carousels render (Featured, New Arrivals, Bestsellers) with arrow navigation
- Deals section shows countdown timers
- Trust badges row renders all badges
- Newsletter email input submits and shows success confirmation

### Flow 2: Category Browse
**Success Path:**
- Breadcrumbs show category hierarchy
- Sidebar filters render with correct groups (price, rating, availability)
- Changing a filter triggers `onFilterChange`
- Sort dropdown changes trigger `onSortChange`
- Pagination controls navigate between pages
- Product grid shows correct column count per breakpoint

**Failure Path:**
- No products matching filters shows empty results message

### Flow 3: Search Autocomplete
**Success Path:**
- Clicking search icon opens expandable search bar
- Typing triggers `onSearch` and shows suggestions dropdown
- Suggestions show product thumbnails, category matches, and query suggestions
- Clicking a suggestion triggers `onSuggestionClick`
- Pressing enter triggers `onSubmit`

### Flow 4: Product Card Interaction
- Hover reveals quick-view button and add-to-cart
- Wishlist heart toggles on click
- Discounted products show MRP with strike-through
- Out-of-stock products are visually distinct

## Empty State Tests
- No hero slides: hero section hidden or shows fallback
- No deals: deals section hidden
- No products in category: empty results with message
- No search suggestions: dropdown shows "No results"

## Edge Cases
- Deal countdown reaches zero (expired state)
- Products with 0 reviews show no rating
- Category with no subcategories
- Mobile: carousels become swipeable, filters collapse to drawer
- Announcement ribbon with and without link
