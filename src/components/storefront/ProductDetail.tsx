"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, ShoppingBag, Minus, Plus, Share2, Truck, Shield, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCartStore, useWishlistStore } from "@/lib/store"

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

interface ProductImage {
  id: string
  url: string
  alt?: string
}

interface ProductVariant {
  id: string
  title: string
  price: number
  mrp?: number
  inStock: boolean
  sku?: string
}

interface Review {
  id: string
  author: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

export interface ProductDetailProps {
  id: string
  name: string
  description: string
  images: ProductImage[]
  variants: ProductVariant[]
  price: number
  mrp?: number
  currency: string
  rating: number
  reviewCount: number
  inStock: boolean
  sku?: string
  category: string
  tags: string[]
  reviews?: Review[]
  relatedProducts?: Array<{
    id: string
    name: string
    slug: string
    imageUrl: string
    price: number
  }>
}

export function ProductDetail({
  id,
  name,
  description,
  images,
  variants,
  price,
  mrp,
  currency,
  rating,
  reviewCount,
  inStock,
  sku,
  category,
  tags,
  reviews = [],
  relatedProducts = [],
}: ProductDetailProps) {
  const router = useRouter()
  const { addItem, openCart } = useCartStore()
  const { hasItem: isWishlisted, toggleItem } = useWishlistStore()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(isWishlisted(id))

  const currentVariant = variants[selectedVariant]
  const hasDiscount = currentVariant.mrp && currentVariant.mrp > currentVariant.price
  const discountPercent = hasDiscount && currentVariant.mrp
    ? Math.round(((currentVariant.mrp - currentVariant.price) / currentVariant.mrp) * 100)
    : 0

  const handleAddToCart = () => {
    addItem({
      id: `${id}-${currentVariant.id}`,
      productId: id,
      variantId: currentVariant.id,
      name: variants.length > 1 ? `${name} - ${currentVariant.title}` : name,
      imageUrl: images[selectedImage]?.url || "",
      price: currentVariant.price,
      currency,
    })
    openCart()
  }

  const handleToggleWishlist = async () => {
    const added = await toggleItem({
      id,
      productId: id,
      name,
      imageUrl: images[0]?.url || "",
      price: currentVariant.price,
      currency,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    })
    setWishlisted(added)
  }

  return (
    <div style={{ background: c.bgPrimary, minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4" style={{ background: c.bgCard }}>
              <Image
                src={images[selectedImage]?.url || ""}
                alt={images[selectedImage]?.alt || name}
                fill
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <span
                  className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full text-white"
                  style={{ background: c.secondary500 }}
                >
                  {discountPercent}% Off
                </span>
              )}
              {!inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="px-6 py-3 rounded-xl text-lg font-bold text-white bg-stone-700">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(idx)}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 transition-all"
                    style={{
                      borderColor: selectedImage === idx ? c.primary500 : "transparent",
                      opacity: selectedImage === idx ? 1 : 0.6,
                    }}
                  >
                    <Image src={img.url} alt={img.alt || `${name} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category & Tags */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: c.secondary500, fontFamily: "'Open Sans', sans-serif" }}
              >
                {category}
              </span>
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full"
                  style={{ background: c.primary50, color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Product Name */}
            <h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
            >
              {name}
            </h1>

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5"
                      fill={star <= Math.round(rating) ? "#F59E0B" : "none"}
                      stroke={star <= Math.round(rating) ? "#F59E0B" : "#d1c9c0"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                >
                  {rating.toFixed(1)} ({reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span
                className="text-4xl font-bold"
                style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
              >
                ₹{currentVariant.price.toLocaleString()}
              </span>
              {hasDiscount && currentVariant.mrp && (
                <>
                  <span
                    className="text-xl line-through"
                    style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    ₹{currentVariant.mrp.toLocaleString()}
                  </span>
                  <span
                    className="px-3 py-1 text-sm font-bold rounded-full text-white"
                    style={{ background: c.secondary500, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
            >
              {description}
            </p>

            {/* Variants */}
            {variants.length > 1 && (
              <div className="mb-6">
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                >
                  Select Variant
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {variants.map((variant, idx) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(idx)}
                      disabled={!variant.inStock}
                      className="px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        borderColor: selectedVariant === idx ? c.primary500 : "#e8e0d8",
                        background: selectedVariant === idx ? c.primary50 : c.bgCard,
                        color: selectedVariant === idx ? c.primary500 : c.earth600,
                        fontFamily: "'Open Sans', sans-serif",
                      }}
                    >
                      {variant.title}
                      {!variant.inStock && <span className="block text-xs">Out of Stock</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
              >
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-xl" style={{ borderColor: "#e8e0d8" }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-5 h-5" style={{ color: c.earth400 }} />
                  </button>
                  <span
                    className="min-w-[50px] text-center text-lg font-semibold"
                    style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-5 h-5" style={{ color: c.earth400 }} />
                  </button>
                </div>
                {sku && (
                  <span className="text-sm" style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}>
                    SKU: {sku}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!currentVariant.inStock}
                className="flex-1 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
              >
                <ShoppingBag className="w-5 h-5" />
                {currentVariant.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                onClick={handleToggleWishlist}
                className="p-4 rounded-xl border-2 transition-all"
                style={{
                  borderColor: wishlisted ? c.secondary500 : "#e8e0d8",
                  background: wishlisted ? c.secondary500 : c.bgCard,
                }}
              >
                <Heart
                  className="w-6 h-6"
                  style={{ color: wishlisted ? "#fff" : c.earth400 }}
                  fill={wishlisted ? "#fff" : "none"}
                />
              </button>

              <button className="p-4 rounded-xl border-2" style={{ borderColor: "#e8e0d8" }}>
                <Share2 className="w-6 h-6" style={{ color: c.earth400 }} />
              </button>
            </div>

            {/* Trust Badges */}
            <div
              className="grid grid-cols-3 gap-3 p-4 rounded-xl mb-6"
              style={{ background: c.primary50 }}
            >
              {[
                { icon: Truck, label: "Free Shipping", sublabel: "On orders ₹999+" },
                { icon: Shield, label: "Secure Payment", sublabel: "100% Protected" },
                { icon: RefreshCw, label: "Easy Returns", sublabel: "7 Days Policy" },
              ].map((badge, idx) => (
                <div key={idx} className="text-center">
                  <badge.icon className="w-6 h-6 mx-auto mb-1" style={{ color: c.primary500 }} />
                  <p
                    className="text-xs font-semibold"
                    style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {badge.label}
                  </p>
                  <p className="text-[10px]" style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}>
                    {badge.sublabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-12">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
            >
              Customer Reviews
            </h2>
            <div className="space-y-4">
              {reviews.slice(0, 5).map((review) => (
                <div
                  key={review.id}
                  className="p-5 rounded-xl border"
                  style={{ background: c.bgCard, borderColor: "#f0ebe4" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p
                        className="font-semibold mb-1"
                        style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        {review.author}
                        {review.verified && (
                          <span
                            className="ml-2 text-xs px-2 py-0.5 rounded-full"
                            style={{ background: c.primary50, color: c.primary500 }}
                          >
                            Verified
                          </span>
                        )}
                      </p>
                      <p className="text-xs" style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}>
                        {review.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4"
                          fill={star <= review.rating ? "#F59E0B" : "none"}
                          stroke={star <= review.rating ? "#F59E0B" : "#d1c9c0"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
