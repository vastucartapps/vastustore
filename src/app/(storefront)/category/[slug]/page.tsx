import { notFound } from "next/navigation"
import type {
  CategoryHero,
  Breadcrumb,
  SortOption,
  ProductCard,
  FilterGroup,
} from "@/components/storefront/types"
import { CategoryListing } from "@/components/storefront/CategoryListing"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    page?: string
    sort?: string
    price_min?: string
    price_max?: string
    rating?: string
    material?: string
    availability?: string
  }>
}

// Sort options (static UI config)
const SORT_OPTIONS: SortOption[] = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest First", value: "newest" },
  { label: "Avg. Rating", value: "rating" },
]

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const awaitedSearchParams = await searchParams

  const page = parseInt(awaitedSearchParams.page || "1", 10)
  const sort = awaitedSearchParams.sort || "relevance"

  // Build query string for API call
  const queryParams = new URLSearchParams({
    page: page.toString(),
    sort,
  })

  // Add filter params
  if (awaitedSearchParams.rating) queryParams.set('rating', awaitedSearchParams.rating)
  if (awaitedSearchParams.material) queryParams.set('material', awaitedSearchParams.material)
  if (awaitedSearchParams.availability) queryParams.set('availability', awaitedSearchParams.availability)
  if (awaitedSearchParams.price_min) queryParams.set('price_min', awaitedSearchParams.price_min)
  if (awaitedSearchParams.price_max) queryParams.set('price_max', awaitedSearchParams.price_max)

  // Fetch category data from API
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/api/category/${slug}?${queryParams.toString()}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    notFound()
  }

  const data = await response.json()
  const { categoryHero, products, totalCount, totalPages, filterGroups } = data

  // Build breadcrumbs
  const breadcrumbs: Breadcrumb[] = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/category/all" },
    { label: categoryHero.name, href: null },
  ]

  // Build active filters from search params
  const activeFilters: Record<string, string[]> = {}
  if (awaitedSearchParams.rating) {
    activeFilters["filter-rating"] = awaitedSearchParams.rating.split(",")
  }
  if (awaitedSearchParams.material) {
    activeFilters["filter-material"] = awaitedSearchParams.material.split(",")
  }
  if (awaitedSearchParams.availability) {
    activeFilters["filter-availability"] = [awaitedSearchParams.availability]
  }

  return (
    <CategoryListing
      categoryHero={categoryHero}
      breadcrumbs={breadcrumbs}
      products={products}
      totalCount={totalCount}
      currentPage={page}
      totalPages={totalPages}
      filterGroups={filterGroups}
      activeFilters={activeFilters}
      sortOptions={SORT_OPTIONS}
      currentSort={sort}
    />
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  // Fetch category name from API
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  try {
    const response = await fetch(`${baseUrl}/api/category/${slug}?page=1&sort=relevance`, {
      cache: 'no-store',
    })

    if (response.ok) {
      const data = await response.json()
      return {
        title: `${data.categoryHero.name} | VastuCart`,
        description: data.categoryHero.description || `Shop ${data.categoryHero.name} products at VastuCart`,
      }
    }
  } catch (error) {
    console.error('Error fetching category metadata:', error)
  }

  // Fallback if API fails
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${categoryName} | VastuCart`,
    description: `Shop ${categoryName} products at VastuCart`,
  }
}
