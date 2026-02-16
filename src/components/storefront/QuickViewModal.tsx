"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X, Star, ShoppingBag, Heart, ArrowRight, Minus, Plus } from "lucide-react"
import { useQuickViewStore, useCartStore, useWishlistStore } from "@/lib/store"

const c = {
  primary500: "#013f47",
  primary400: "#2a7a72",
  primary50: "#e8f5f3",
  secondary500: "#c85103",
  secondary300: "#fd8630",
  bgPrimary: "#fffbf5",
  bgCard: "#ffffff",
  earth300: "#a39585",
  earth400: "#75615a",
  earth600: "#5a4f47",
  earth700: "#433b35",
}

interface Product {
  id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  mrp?: number
  currency: string
  rating: number
  reviewCount: number
  description?: string
  inStock: boolean
}

export function QuickViewModal() {
  const router = useRouter()
  const { productId, isOpen, close } = useQuickViewStore()
  const { addItem, openCart } = useCartStore()
  const { hasItem: isWishlisted, toggleItem } = useWishlistStore()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)

  // Fetch product details when productId changes
  useEffect(() => {
    if (productId && isOpen) {
      setLoading(true)
      // TODO: Fetch from Medusa API
      // For now, use mock data
      setTimeout(() => {
        setProduct({
          id: productId,
          name: "Sample Product",
          slug: "sample-product",
          imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
          price: 1299,
          mrp: 1899,
          currency: "INR",
          rating: 4.5,
          reviewCount: 42,
          description: "This is a sample product description. Replace with real data from Medusa.",
          inStock: true,
        })
        setLoading(false)
      }, 300)
    }
  }, [productId, isOpen])

  // Update wishlisted state
  useEffect(() => {
    if (productId) {
      setWishlisted(isWishlisted(productId))
    }
  }, [productId, isWishlisted])

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setQuantity(1)
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen || !product) return null

  const hasDiscount = product.mrp && product.mrp > product.price
  const discountPercent = hasDiscount && product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-default`,
      productId: product.id,
      variantId: "default",
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      currency: product.currency,
    })
    close()
    openCart()
  }

  const handleToggleWishlist = async () => {
    const added = await toggleItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      currency: product.currency,
      slug: product.slug,
    })
    setWishlisted(added)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 transition-opacity"
        onClick={close}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
          style={{ background: c.bgCard }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors bg-white/90 hover:bg-white"
          >
            <X className="w-5 h-5" style={{ color: c.earth700 }} />
          </button>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: c.primary500 }} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
              {/* Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {hasDiscount && (
                  <span
                    className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white"
                    style={{ background: c.secondary500 }}
                  >
                    {discountPercent}% Off
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                >
                  {product.name}
                </h2>

                {/* Rating */}
                {product.rating > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4"
                          fill={star <= Math.round(product.rating) ? "#F59E0B" : "none"}
                          stroke={star <= Math.round(product.rating) ? "#F59E0B" : "#d1c9c0"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    ₹{product.price.toLocaleString()}
                  </span>
                  {hasDiscount && product.mrp && (
                    <span
                      className="text-lg line-through"
                      style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      ₹{product.mrp.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {product.description}
                  </p>
                )}

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Quantity
                  </label>
                  <div className="flex items-center gap-3 border rounded-lg w-fit" style={{ borderColor: "#e8e0d8" }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" style={{ color: c.earth400 }} />
                    </button>
                    <span
                      className="min-w-[40px] text-center text-base font-medium"
                      style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" style={{ color: c.earth400 }} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>

                  <button
                    onClick={handleToggleWishlist}
                    className="p-3.5 rounded-xl border transition-all"
                    style={{
                      borderColor: wishlisted ? c.secondary500 : "#e8e0d8",
                      background: wishlisted ? c.secondary500 : "transparent",
                    }}
                  >
                    <Heart
                      className="w-5 h-5"
                      style={{ color: wishlisted ? "#fff" : c.earth400 }}
                      fill={wishlisted ? "#fff" : "none"}
                    />
                  </button>
                </div>

                {/* View Full Details */}
                <button
                  onClick={() => {
                    close()
                    router.push(`/product/${product.slug}`)
                  }}
                  className="text-sm font-medium flex items-center gap-1 transition-colors"
                  style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                >
                  View Full Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
