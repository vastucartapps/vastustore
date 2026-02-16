import { NextRequest, NextResponse } from 'next/server'
import { medusa } from '@/lib/medusa'

export const dynamic = 'force-dynamic'

interface RouteContext {
  params: Promise<{ slug: string }>
}

/**
 * GET /api/category/[slug]?page=1&sort=relevance&rating=4&material=brass,copper&availability=in-stock&price_min=100&price_max=5000
 * Fetch category products from Medusa with filtering, sorting, pagination
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { slug } = await context.params
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = 12
    const offset = (page - 1) * limit
    const sort = searchParams.get('sort') || 'relevance'

    // Fetch category by handle/slug from Medusa
    // Note: Medusa v2 may use different API structure - using REST API directly
    let categoryId: string | null = null
    let categoryData: any = null

    try {
      const categoryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_API_URL}/store/product-categories?handle=${slug}`
      )
      if (categoryResponse.ok) {
        const data = await categoryResponse.json()
        if (data.product_categories?.length > 0) {
          categoryData = data.product_categories[0]
          categoryId = categoryData.id
        }
      }
    } catch (error) {
      console.log('Category fetch error:', error)
    }

    // If category not found, return 404
    if (!categoryId || !categoryData) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Build Medusa product query filters
    const filters: any = {
      category_id: [categoryId],
      limit,
      offset,
    }

    // Apply sort order
    switch (sort) {
      case 'price-asc':
        filters.order = 'variants.calculated_price.calculated_amount'
        break
      case 'price-desc':
        filters.order = '-variants.calculated_price.calculated_amount'
        break
      case 'newest':
        filters.order = '-created_at'
        break
      case 'rating':
        // TODO: Sort by rating when review integration is complete
        filters.order = '-created_at'
        break
      default:
        // Relevance - no specific order
        break
    }

    // Apply price filter if provided
    const priceMin = searchParams.get('price_min')
    const priceMax = searchParams.get('price_max')
    if (priceMin || priceMax) {
      // Note: Medusa v2 may need different price filtering syntax
      // For now, we'll filter after fetching
    }

    // Apply availability filter
    const availability = searchParams.get('availability')
    if (availability === 'in-stock') {
      // Only show products with inventory > 0
      // Note: May need to filter after fetching depending on Medusa API
    }

    // Fetch products from Medusa
    const { products = [], count = 0 } = await medusa.store.product
      .list(filters)
      .catch(() => ({ products: [], count: 0 }))

    // Apply client-side filters if needed (price range, material, rating, availability)
    let filteredProducts = products

    // Price filter
    if (priceMin || priceMax) {
      const min = priceMin ? parseFloat(priceMin) * 100 : 0 // Convert to smallest unit
      const max = priceMax ? parseFloat(priceMax) * 100 : Infinity
      filteredProducts = filteredProducts.filter((p: any) => {
        const price = p.variants?.[0]?.calculated_price?.calculated_amount || 0
        return price >= min && price <= max
      })
    }

    // Material filter (using product metadata or tags)
    const material = searchParams.get('material')
    if (material) {
      const materials = material.split(',')
      filteredProducts = filteredProducts.filter((p: any) => {
        const productMaterial = p.metadata?.material || p.material
        return materials.some(m =>
          productMaterial?.toLowerCase().includes(m.toLowerCase())
        )
      })
    }

    // Rating filter - TODO: Wire to Supabase reviews when available
    const rating = searchParams.get('rating')
    if (rating) {
      const minRating = parseFloat(rating)
      // For now, skip rating filter - will wire when reviews are integrated
    }

    // Availability filter
    if (availability === 'in-stock') {
      filteredProducts = filteredProducts.filter((p: any) => {
        const inventory = p.variants?.[0]?.inventory_quantity || 0
        return inventory > 0
      })
    }

    // Transform products to component format
    const transformedProducts = filteredProducts.map((p: any) => ({
      id: p.id,
      name: p.title,
      slug: p.handle,
      imageUrl: p.thumbnail || p.images?.[0]?.url || '',
      price: p.variants?.[0]?.calculated_price?.calculated_amount || 0,
      mrp: p.variants?.[0]?.calculated_price?.original_amount || 0,
      currency: 'INR',
      rating: 4.5, // TODO: Calculate from reviews
      reviewCount: 0, // TODO: Count from reviews table
      variantCount: p.variants?.length || 1,
      isNew: false, // TODO: Check created_at < 30 days
      inStock: (p.variants?.[0]?.inventory_quantity || 0) > 0,
    }))

    // Build filter options from actual product data
    const filterGroups = [
      {
        id: 'filter-price',
        label: 'Price Range',
        type: 'range',
        min: 99,
        max: 10000,
        options: [],
      },
      {
        id: 'filter-rating',
        label: 'Customer Rating',
        type: 'rating',
        options: [
          { label: '4★ & above', value: '4', count: 0 }, // TODO: Count from reviews
          { label: '3★ & above', value: '3', count: 0 },
          { label: '2★ & above', value: '2', count: 0 },
        ],
      },
      {
        id: 'filter-availability',
        label: 'Availability',
        type: 'toggle',
        options: [
          {
            label: 'In Stock Only',
            value: 'in-stock',
            count: products.filter((p: any) =>
              (p.variants?.[0]?.inventory_quantity || 0) > 0
            ).length
          }
        ],
      },
      {
        id: 'filter-material',
        label: 'Material',
        type: 'checkbox',
        options: [], // TODO: Extract unique materials from products
      },
    ]

    // Build category hero data
    const categoryHero = {
      name: categoryData.name,
      description: categoryData.description || '',
      imageUrl: categoryData.metadata?.image_url || categoryData.image?.url || '',
      slug: categoryData.handle,
      productCount: count,
    }

    // Calculate pagination
    const totalCount = filteredProducts.length
    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      categoryHero,
      products: transformedProducts,
      totalCount,
      totalPages,
      filterGroups,
    })
  } catch (error: any) {
    console.error('Error fetching category products:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch category' },
      { status: 500 }
    )
  }
}
