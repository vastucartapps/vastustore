"use client"

import { useRouter } from "next/navigation"
import { ProductDetailEnhanced } from "@/components/storefront"
import { useCartStore, useWishlistStore, useAuthStore } from "@/lib/store"
import type { ProductDetailProps } from "@/components/storefront/types"

export function ProductDetailPageClient(props: ProductDetailProps) {
  const router = useRouter()
  const { addItem, openCart } = useCartStore()
  const { toggleItem: toggleWishlist } = useWishlistStore()
  const { user } = useAuthStore()

  const handleAddToCart = async (variantId: string, quantity: number) => {
    const variant = props.variants.find((v) => v.id === variantId)
    if (!variant) return

    // Add to Zustand + sync with Medusa Cart API (real-time sync!)
    await addItem({
      id: `${props.product.id}-${variantId}`,
      productId: props.product.id,
      variantId,
      name: `${props.product.name} - ${Object.values(variant.attributes).join(' ')}`,
      imageUrl: props.images[0]?.url || '',
      price: variant.price,
      currency: props.product.currency,
    })
    openCart()
  }

  const handleToggleWishlist = async () => {
    // Toggle in Zustand + sync with Supabase (real-time sync!)
    await toggleWishlist({
      id: props.product.id,
      productId: props.product.id,
      name: props.product.name,
      imageUrl: props.images[0]?.url || '',
      price: props.product.price,
      currency: props.product.currency,
      slug: props.product.slug,
    })
  }

  const handleShare = (channel: 'whatsapp' | 'facebook' | 'pinterest' | 'copy') => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const text = `Check out ${props.product.name} on VastuCart`

    switch (channel) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} - ${url}`)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'pinterest':
        window.open(
          `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}&media=${encodeURIComponent(props.images[0]?.url || '')}`,
          '_blank'
        )
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
        break
    }
  }

  const handleAskQuestion = async (question: string) => {
    try {
      const response = await fetch(`/api/questions/${props.product.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          asked_by: user?.name || 'Guest User',
        }),
      })

      if (response.ok) {
        alert('Thank you for your question! Our team will respond within 24 hours.')
        // Refresh the page to show the new question
        window.location.reload()
      } else {
        throw new Error('Failed to submit question')
      }
    } catch (error) {
      console.error('Error submitting question:', error)
      alert('Failed to submit your question. Please try again.')
    }
  }

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`)
  }

  const handleQuickView = (productId: string) => {
    // TODO: Open quick view modal with product from Medusa
    console.log('Quick view:', productId)
  }

  const handleBreadcrumbClick = (href: string) => {
    router.push(href)
  }

  const handleScrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section')
    reviewsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <ProductDetailEnhanced
      {...props}
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishlist}
      onShare={handleShare}
      onAskQuestion={handleAskQuestion}
      onProductClick={handleProductClick}
      onQuickView={handleQuickView}
      onBreadcrumbClick={handleBreadcrumbClick}
      onScrollToReviews={handleScrollToReviews}
    />
  )
}
