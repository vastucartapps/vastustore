import { CategoryListing } from "@/components/storefront/CategoryListing"
import type {
  CategoryHero,
  Breadcrumb,
  SortOption,
  ProductCard,
  FilterGroup,
} from "@/components/storefront/types"
import { medusa } from "@/lib/medusa"

export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: {
    q?: string
    page?: string
    sort?: string
    price_min?: string
    price_max?: string
    rating?: string
    material?: string
    availability?: string
  }
}

// Temporary: Will fetch from Medusa when available
const SAMPLE_PRODUCTS: ProductCard[] = [
  {
    id: "1",
    name: "Seven Chakra Crystal Tree",
    slug: "seven-chakra-crystal-tree",
    imageUrl: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400",
    price: 1299,
    mrp: 1899,
    currency: "INR",
    rating: 4.7,
    reviewCount: 124,
    variantCount: 3,
    isNew: false,
    inStock: true,
  },
  {
    id: "2",
    name: "Brass Ganesha Idol — 8 inch",
    slug: "brass-ganesha-idol-8-inch",
    imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
    price: 2450,
    mrp: 2450,
    currency: "INR",
    rating: 4.9,
    reviewCount: 87,
    variantCount: 2,
    isNew: false,
    inStock: true,
  },
  {
    id: "3",
    name: "Vastu Pyramid Set — Rose Quartz",
    slug: "vastu-pyramid-set-rose-quartz",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    price: 899,
    mrp: 1299,
    currency: "INR",
    rating: 4.5,
    reviewCount: 56,
    variantCount: 1,
    isNew: false,
    inStock: true,
  },
  {
    id: "4",
    name: "Copper Kalash with Coconut",
    slug: "copper-kalash-with-coconut",
    imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
    price: 1750,
    mrp: 2200,
    currency: "INR",
    rating: 4.8,
    reviewCount: 45,
    variantCount: 1,
    isNew: false,
    inStock: true,
  },
]

const SAMPLE_FILTER_GROUPS: FilterGroup[] = [
  {
    id: "filter-price",
    label: "Price Range",
    type: "range",
    min: 99,
    max: 10000,
    options: [],
  },
  {
    id: "filter-rating",
    label: "Customer Rating",
    type: "rating",
    options: [
      { label: "4★ & above", value: "4", count: 12 },
      { label: "3★ & above", value: "3", count: 18 },
      { label: "2★ & above", value: "2", count: 20 },
    ],
  },
  {
    id: "filter-availability",
    label: "Availability",
    type: "toggle",
    options: [{ label: "In Stock Only", value: "in-stock", count: 18 }],
  },
]

const SORT_OPTIONS: SortOption[] = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest First", value: "newest" },
  { label: "Avg. Rating", value: "rating" },
]

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q || ""
  const page = parseInt(searchParams.page || "1", 10)
  const sort = searchParams.sort || "relevance"

  // TODO: Wire to Medusa search API when available
  // Example:
  // const searchRes = await medusa.store.products.search({
  //   q: query,
  //   limit: 12,
  //   offset: (page - 1) * 12,
  //   order: sort === 'price-asc' ? 'price' : sort === 'price-desc' ? '-price' : undefined,
  // })
  //
  // const products = searchRes.products || []
  // const totalCount = searchRes.count || 0

  // For now, use sample data filtered by query
  const filteredProducts = query
    ? SAMPLE_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const categoryHero: CategoryHero = {
    name: query ? `Search results for "${query}"` : "Search",
    description: query
      ? `Found ${filteredProducts.length} products matching your search`
      : "Enter a search term to find products",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    slug: "search",
    productCount: filteredProducts.length,
  }

  const breadcrumbs: Breadcrumb[] = [
    { label: "Home", href: "/" },
    { label: "Search", href: null },
  ]

  // Simple pagination simulation
  const productsPerPage = 12
  const totalCount = filteredProducts.length
  const totalPages = Math.ceil(totalCount / productsPerPage)
  const startIdx = (page - 1) * productsPerPage
  const endIdx = startIdx + productsPerPage
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx)

  // Build active filters from search params
  const activeFilters: Record<string, string[]> = {}
  if (searchParams.rating) {
    activeFilters["filter-rating"] = searchParams.rating.split(",")
  }
  if (searchParams.availability) {
    activeFilters["filter-availability"] = [searchParams.availability]
  }

  return (
    <CategoryListing
      categoryHero={categoryHero}
      breadcrumbs={breadcrumbs}
      products={paginatedProducts}
      totalCount={totalCount}
      currentPage={page}
      totalPages={totalPages}
      filterGroups={SAMPLE_FILTER_GROUPS}
      activeFilters={activeFilters}
      sortOptions={SORT_OPTIONS}
      currentSort={sort}
    />
  )
}

export async function generateMetadata({ searchParams }: PageProps) {
  const query = searchParams.q || ""

  return {
    title: query ? `Search: ${query} | VastuCart` : "Search | VastuCart",
    description: query
      ? `Search results for ${query} on VastuCart`
      : "Search for Vastu and spiritual products",
  }
}
