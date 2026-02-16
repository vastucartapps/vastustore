"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Homepage } from "@/components/storefront/Homepage"
import { useCartStore, useWishlistStore, useQuickViewStore } from "@/lib/store"
import { medusa } from "@/lib/medusa"
import type {
  HeroSlide,
  CategoryCard,
  ProductCard,
  DealProduct,
  Testimonial,
  TrustBadge,
} from "@/components/storefront/types"

// Trust badges are static UI elements
const TRUST_BADGES: TrustBadge[] = [
  {
    id: "1",
    label: "Free Shipping",
    sublabel: "On orders above ₹999",
    icon: "truck",
  },
  {
    id: "2",
    label: "100% Authentic",
    sublabel: "Certified products",
    icon: "badge-check",
  },
  {
    id: "3",
    label: "Easy Returns",
    sublabel: "7-day return policy",
    icon: "refresh",
  },
  {
    id: "4",
    label: "Secure Payments",
    sublabel: "SSL encrypted checkout",
    icon: "shield",
  },
]

// Testimonials - TODO: Fetch from Supabase reviews table
const TESTIMONIALS: Testimonial[] = []

export default function HomePage() {
  const router = useRouter()
  const { addItem, openCart } = useCartStore()
  const { toggleItem: toggleWishlist } = useWishlistStore()
  const { open: openQuickView } = useQuickViewStore()

  const [loading, setLoading] = useState(true)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [categories, setCategories] = useState<CategoryCard[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<ProductCard[]>([])
  const [newArrivals, setNewArrivals] = useState<ProductCard[]>([])
  const [bestsellers, setBestsellers] = useState<ProductCard[]>([])
  const [deals, setDeals] = useState<DealProduct[]>([])

  // Fetch all homepage data
  useEffect(() => {
    async function fetchHomepageData() {
      try {
        const response = await fetch('/api/homepage')
        if (response.ok) {
          const data = await response.json()
          setHeroSlides(data.heroSlides || [])
          setCategories(data.categories || [])
          setFeaturedProducts(data.featuredProducts || [])
          setNewArrivals(data.newArrivals || [])
          setBestsellers(data.bestsellers || [])
          setDeals(data.deals || [])
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching homepage data:', error)
        setLoading(false)
      }
    }

    fetchHomepageData()
  }, [])

  const handleHeroCtaClick = (link: string) => {
    router.push(link)
  }

  const handleCategoryClick = (slug: string) => {
    router.push(`/category/${slug}`)
  }

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`)
  }

  const handleQuickView = (productId: string) => {
    openQuickView(productId)
  }

  const handleAddToCart = async (productId: string) => {
    try {
      // Fetch product from Medusa to get variant info
      const { product } = await medusa.store.product.retrieve(productId)
      const defaultVariant = product.variants?.[0]

      if (product && defaultVariant) {
        addItem({
          id: `cart-${productId}-${defaultVariant.id}`,
          productId: product.id,
          variantId: defaultVariant.id,
          name: product.title,
          imageUrl: product.thumbnail || product.images?.[0]?.url || '',
          price: defaultVariant.calculated_price?.calculated_amount || 0,
          currency: defaultVariant.calculated_price?.currency_code?.toUpperCase() || 'INR',
        })
        openCart()
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const handleToggleWishlist = async (productId: string) => {
    try {
      // Fetch product from Medusa
      const { product } = await medusa.store.product.retrieve(productId)

      if (product) {
        toggleWishlist({
          id: product.id,
          productId: product.id,
          name: product.title,
          imageUrl: product.thumbnail || '',
          price: product.variants?.[0]?.calculated_price?.calculated_amount || 0,
          currency: 'INR',
          slug: product.handle,
        })
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error)
    }
  }

  const handleNewsletterSubscribe = async (email: string) => {
    try {
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
    } catch (error) {
      console.error('Newsletter subscribe error:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013f47] mx-auto mb-4"></div>
          <p className="text-[#75615a]">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Homepage
      heroSlides={heroSlides}
      categories={categories}
      featuredProducts={featuredProducts}
      newArrivals={newArrivals}
      bestsellers={bestsellers}
      deals={deals}
      testimonials={TESTIMONIALS}
      trustBadges={TRUST_BADGES}
      onHeroCtaClick={handleHeroCtaClick}
      onCategoryClick={handleCategoryClick}
      onProductClick={handleProductClick}
      onQuickView={handleQuickView}
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishlist}
      onNewsletterSubscribe={handleNewsletterSubscribe}
    />
  )
}
