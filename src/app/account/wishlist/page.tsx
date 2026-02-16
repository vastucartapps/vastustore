"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore, useCartStore, useWishlistStore } from '@/lib/store'
import { medusa } from '@/lib/medusa'
import { WishlistGrid } from '@/components/storefront/WishlistGrid'
import type { WishlistItem } from '@/components/storefront/types'

export default function WishlistPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { addItem: addToCart } = useCartStore()
  const { removeItem: removeFromWishlist } = useWishlistStore()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Fetch wishlist items from Supabase and enrich with Medusa product data
  useEffect(() => {
    if (!user) return

    async function fetchWishlist() {
      try {
        // Fetch wishlist from Supabase
        const response = await fetch('/api/wishlist')
        if (!response.ok) {
          setLoading(false)
          return
        }

        const data = await response.json()
        const wishlistData = data.wishlist || []

        if (wishlistData.length === 0) {
          setWishlistItems([])
          setLoading(false)
          return
        }

        // Enrich each wishlist item with current Medusa product data
        const enrichedItems = await Promise.all(
          wishlistData.map(async (item: any) => {
            try {
              // Fetch product from Medusa to get latest price, stock, images
              const { product } = await medusa.store.product.retrieve(item.product_id)

              if (!product) return null

              // Get default variant for pricing and stock
              const defaultVariant = product.variants?.[0]

              const transformedItem: WishlistItem = {
                id: item.id,
                productId: product.id,
                productName: product.title,
                productSlug: product.handle || '',
                imageUrl: product.thumbnail || product.images?.[0]?.url || '',
                price: Math.round((defaultVariant?.calculated_price?.calculated_amount || 0) / 100),
                mrp: Math.round((defaultVariant?.calculated_price?.original_amount || 0) / 100),
                currency: 'INR', // TODO: Get from user preferences or product
                inStock: (defaultVariant?.inventory_quantity || 0) > 0,
                rating: 4.5, // TODO: Calculate from reviews when available
                reviewCount: 0, // TODO: Get from reviews API when available
              }

              return transformedItem
            } catch (error) {
              console.error(`Error fetching product ${item.product_id}:`, error)
              return null
            }
          })
        )

        // Filter out any failed fetches
        const validItems = enrichedItems.filter((item): item is WishlistItem => item !== null)
        setWishlistItems(validItems)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching wishlist:', error)
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [user])

  const handleAddToCart = async (productId: string) => {
    try {
      // Fetch product to get default variant ID
      const { product } = await medusa.store.product.retrieve(productId)

      if (!product || !product.variants || product.variants.length === 0) {
        alert('Product not available')
        return
      }

      const defaultVariant = product.variants[0]

      // Add to cart using cart store
      await addToCart({
        id: defaultVariant.id,
        productId: product.id,
        variantId: defaultVariant.id,
        name: product.title,
        imageUrl: product.thumbnail || product.images?.[0]?.url || '',
        price: Math.round((defaultVariant.calculated_price?.calculated_amount || 0) / 100),
        currency: 'INR',
      })

      // Show success feedback
      alert('Added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add to cart. Please try again.')
    }
  }

  const handleRemoveFromWishlist = async (itemId: string) => {
    try {
      // Find the product ID from the item
      const item = wishlistItems.find(i => i.id === itemId)
      if (!item) return

      // Remove from wishlist using wishlist store
      await removeFromWishlist(item.productId)

      // Update local state
      setWishlistItems(prev => prev.filter(i => i.id !== itemId))
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      alert('Failed to remove from wishlist. Please try again.')
    }
  }

  const handleNotifyMe = async (productId: string) => {
    try {
      // Save stock alert to Supabase
      const response = await fetch('/api/stock-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId }),
      })

      if (response.ok) {
        alert('You will be notified when this item is back in stock!')
      } else {
        alert('Failed to set stock alert. Please try again.')
      }
    } catch (error) {
      console.error('Error setting stock alert:', error)
      alert('Failed to set stock alert. Please try again.')
    }
  }

  const handleViewProduct = (slug: string) => {
    router.push(`/product/${slug}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013f47] mx-auto mb-4"></div>
          <p className="text-[#75615a]">Loading wishlist...</p>
        </div>
      </div>
    )
  }

  return (
    <WishlistGrid
      items={wishlistItems}
      onAddToCart={handleAddToCart}
      onRemoveFromWishlist={handleRemoveFromWishlist}
      onNotifyMe={handleNotifyMe}
      onViewProduct={handleViewProduct}
    />
  )
}
