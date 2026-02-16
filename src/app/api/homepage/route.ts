import { NextRequest, NextResponse } from 'next/server'
import { medusa } from '@/lib/medusa'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/homepage
 * Fetch all homepage data in one request
 */
// Default hero slides when Supabase is not configured
const DEFAULT_HERO_SLIDES = [
  {
    id: 'default-1',
    image_url: '/hero-vastu-pyramids.jpg',
    heading: 'Transform Your Space with Vastu',
    subtext: 'Authentic Vastu products for harmony and prosperity',
    cta_label: 'Shop Now',
    cta_link: '/category/all',
    order: 1,
  },
  {
    id: 'default-2',
    image_url: '/hero-copper-items.jpg',
    heading: 'Pure Copper Collection',
    subtext: 'Handcrafted copper pyramids and vessels',
    cta_label: 'Explore',
    cta_link: '/category/all',
    order: 2,
  },
  {
    id: 'default-3',
    image_url: '/hero-spiritual.jpg',
    heading: 'Sacred Energy Tools',
    subtext: 'Wind chimes, crystals, and spiritual artifacts',
    cta_label: 'Discover',
    cta_link: '/category/all',
    order: 3,
  },
]

export async function GET(request: NextRequest) {
  try {
    // Fetch hero slides from Supabase
    let heroSlidesData = DEFAULT_HERO_SLIDES
    try {
      const { data: heroSlides } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true })

      if (heroSlides && heroSlides.length > 0) {
        heroSlidesData = heroSlides
      }
    } catch (error) {
      console.log('Using default hero slides (Supabase not configured)')
    }

    // Fetch categories from Medusa
    // TODO: Update when Medusa v2 SDK types are finalized
    // For now, categories are empty until SDK supports it
    let categories: any[] = []

    // Fetch featured products (tagged with 'featured')
    const { products: featuredProducts } = await medusa.store.product
      .list({ 
        tags: ['featured'],
        limit: 4,
      })
      .catch(() => ({ products: [] }))

    // Fetch new arrivals (sort by created_at desc)
    const { products: newArrivals } = await medusa.store.product
      .list({ 
        limit: 4,
        order: '-created_at',
      })
      .catch(() => ({ products: [] }))

    // Fetch bestsellers (tagged with 'bestseller')
    const { products: bestsellers } = await medusa.store.product
      .list({ 
        tags: ['bestseller'],
        limit: 4,
      })
      .catch(() => ({ products: [] }))

    // Fetch deal products (products with active promotions/discounts)
    const { products: dealProducts } = await medusa.store.product
      .list({ 
        tags: ['deal'],
        limit: 2,
      })
      .catch(() => ({ products: [] }))

    // Transform Medusa data to component format
    const transformProduct = (p: any) => ({
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
      isNew: false,
      inStock: (p.variants?.[0]?.inventory_quantity || 0) > 0,
    })

    return NextResponse.json({
      heroSlides: heroSlidesData.map(slide => ({
        id: slide.id,
        imageUrl: slide.image_url,
        heading: slide.heading,
        subtext: slide.subtext,
        ctaLabel: slide.cta_label,
        ctaLink: slide.cta_link,
        order: slide.order,
      })),
      categories: categories?.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        imageUrl: cat.image?.url || '',
        slug: cat.handle,
        productCount: cat.category_children?.length || 0,
      })) || [],
      featuredProducts: featuredProducts?.map(transformProduct) || [],
      newArrivals: newArrivals?.map(transformProduct) || [],
      bestsellers: bestsellers?.map(transformProduct) || [],
      deals: dealProducts?.map((p: any) => ({
        ...transformProduct(p),
        discountPercent: Math.round(
          ((p.variants?.[0]?.calculated_price?.original_amount - 
            p.variants?.[0]?.calculated_price?.calculated_amount) / 
            p.variants?.[0]?.calculated_price?.original_amount) * 100
        ),
        expiresAt: null, // TODO: Get from promotion end date
      })) || [],
    })
  } catch (error: any) {
    console.error('Error fetching homepage data:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch homepage data' },
      { status: 500 }
    )
  }
}
