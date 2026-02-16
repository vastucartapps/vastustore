/** Announcement ribbon at the top of the storefront */
export interface Announcement {
  message: string
  link: string | null
  isActive: boolean
}

/** Full-width homepage hero banner slide */
export interface HeroSlide {
  id: string
  imageUrl: string
  heading: string
  subtext: string
  ctaLabel: string
  ctaLink: string
  order: number
}

/** Category card for the homepage grid */
export interface CategoryCard {
  id: string
  name: string
  imageUrl: string
  slug: string
  productCount: number
}

/** Product card for grids and carousels */
export interface ProductCard {
  id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  mrp: number
  currency: 'INR' | 'USD'
  rating: number
  reviewCount: number
  variantCount: number
  isNew: boolean
  inStock: boolean
}

/** Product with deal/discount info and countdown */
export interface DealProduct extends ProductCard {
  discountPercent: number
  expiresAt: string
}

/** Admin-curated testimonial or highlighted review */
export interface Testimonial {
  id: string
  quote: string
  name: string
  location: string
  avatarUrl: string | null
  rating: number
  type: 'review' | 'testimonial'
  productName: string | null
}

/** Trust/reassurance badge */
export interface TrustBadge {
  id: string
  label: string
  sublabel: string
  icon: 'truck' | 'shield' | 'refresh' | 'badge-check'
}

/** Filter option within a filter group */
export interface FilterOption {
  label: string
  value: string
  count: number
}

/** Sidebar filter group */
export interface FilterGroup {
  id: string
  label: string
  type: 'checkbox' | 'range' | 'rating' | 'toggle'
  min: number
  max: number
  options: FilterOption[]
}

/** Sort dropdown option */
export interface SortOption {
  label: string
  value: string
}

/** Breadcrumb navigation item */
export interface Breadcrumb {
  label: string
  href: string | null
}

/** Search autocomplete suggestion */
export interface SearchSuggestion {
  type: 'product' | 'category' | 'query'
  label: string
  imageUrl: string | null
  price: number | null
  slug: string | null
}

/** Static content page */
export interface StaticPage {
  id: string
  title: string
  slug: string
  excerpt: string
}

/** Props for the Homepage view */
export interface HomepageProps {
  announcement: Announcement
  heroSlides: HeroSlide[]
  categories: CategoryCard[]
  featuredProducts: ProductCard[]
  newArrivals: ProductCard[]
  bestsellers: ProductCard[]
  deals: DealProduct[]
  testimonials: Testimonial[]
  trustBadges: TrustBadge[]

  /** Called when user clicks a hero slide CTA */
  onHeroCtaClick?: (link: string) => void
  /** Called when user clicks a category card */
  onCategoryClick?: (slug: string) => void
  /** Called when user clicks a product card */
  onProductClick?: (slug: string) => void
  /** Called when user clicks quick view on a product card */
  onQuickView?: (productId: string) => void
  /** Called when user adds a product to cart from the card */
  onAddToCart?: (productId: string) => void
  /** Called when user toggles wishlist on a product card */
  onToggleWishlist?: (productId: string) => void
  /** Called when user subscribes to newsletter */
  onNewsletterSubscribe?: (email: string) => void
}

/** Category hero banner info (admin-managed) */
export interface CategoryHero {
  name: string
  description: string
  imageUrl: string
  slug: string
  productCount: number
}

/** Props for the Category Listing / Search Results view */
export interface CategoryListingProps {
  categoryHero: CategoryHero
  breadcrumbs: Breadcrumb[]
  pageTitle: string
  products: ProductCard[]
  totalCount: number
  currentPage: number
  totalPages: number
  filterGroups: FilterGroup[]
  activeFilters: Record<string, string[]>
  sortOptions: SortOption[]
  currentSort: string

  /** Called when user clicks a product card */
  onProductClick?: (slug: string) => void
  /** Called when user clicks quick view */
  onQuickView?: (productId: string) => void
  /** Called when user adds to cart */
  onAddToCart?: (productId: string) => void
  /** Called when user toggles wishlist */
  onToggleWishlist?: (productId: string) => void
  /** Called when user changes a filter */
  onFilterChange?: (filterId: string, values: string[]) => void
  /** Called when user changes price range */
  onPriceRangeChange?: (min: number, max: number) => void
  /** Called when user clears all filters */
  onClearFilters?: () => void
  /** Called when user changes sort */
  onSortChange?: (sortValue: string) => void
  /** Called when user changes page */
  onPageChange?: (page: number) => void
}

/** Props for the search bar autocomplete */
export interface SearchBarProps {
  suggestions: SearchSuggestion[]
  isOpen: boolean

  /** Called when user types in search */
  onSearch?: (query: string) => void
  /** Called when user clicks a suggestion */
  onSuggestionClick?: (suggestion: SearchSuggestion) => void
  /** Called when user submits search */
  onSubmit?: (query: string) => void
  /** Called when search bar opens/closes */
  onToggle?: (isOpen: boolean) => void
}
