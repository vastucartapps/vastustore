import { medusa, type MedusaProduct } from './medusa'
import type {
  Product,
  ProductImage,
  ProductVariant,
  VariantAttribute,
  RelatedProduct,
  Breadcrumb,
} from '@/components/storefront/types'

/**
 * Fetch a single product by handle/slug from Medusa
 */
export async function getProductByHandle(handle: string): Promise<{
  product: Product
  images: ProductImage[]
  variants: ProductVariant[]
  variantAttributes: VariantAttribute[]
  breadcrumbs: Breadcrumb[]
} | null> {
  try {
    const response = await medusa.store.product.list({
      handle,
      fields: '+variants,+images,+tags,+metadata,+categories',
    })

    if (!response.products || response.products.length === 0) {
      return null
    }

    const medusaProduct = response.products[0] as any

    // Transform Medusa product to our Product type
    const product: Product = {
      id: medusaProduct.id,
      name: medusaProduct.title || '',
      slug: medusaProduct.handle || '',
      description: medusaProduct.description || '',
      shortDescription: medusaProduct.metadata?.short_description || medusaProduct.description?.slice(0, 200) || '',
      currency: 'INR', // TODO: Get from region/prices
      price: getVariantPrice(medusaProduct.variants?.[0]),
      mrp: getMRP(medusaProduct.variants?.[0]),
      discountPercent: calculateDiscount(medusaProduct.variants?.[0]),
      rating: parseFloat(medusaProduct.metadata?.rating || '0'),
      reviewCount: parseInt(medusaProduct.metadata?.review_count || '0', 10),
      inStock: isProductInStock(medusaProduct.variants || []),
      sku: medusaProduct.variants?.[0]?.sku || '',
      isNew: isNewProduct(medusaProduct.created_at),
      expressShipping: medusaProduct.metadata?.express_shipping === true,
      deliveryEstimate: medusaProduct.metadata?.delivery_estimate || 'Delivery by 3-5 days',
      returnPolicy: medusaProduct.metadata?.return_policy || '7 days return policy',
    }

    // Transform images
    const images: ProductImage[] = (medusaProduct.images || []).map((img: any, idx: number) => ({
      id: img.id,
      url: img.url,
      alt: `${medusaProduct.title} - Image ${idx + 1}`,
      type: idx === 0 ? 'primary' : 'gallery',
      order: idx + 1,
    }))

    // Add fallback image if none exist
    if (images.length === 0 && medusaProduct.thumbnail) {
      images.push({
        id: 'thumb',
        url: medusaProduct.thumbnail,
        alt: medusaProduct.title,
        type: 'primary',
        order: 1,
      })
    }

    // Transform variants
    const variants: ProductVariant[] = (medusaProduct.variants || []).map((variant: any) => ({
      id: variant.id,
      attributes: parseVariantAttributes(variant),
      sku: variant.sku || '',
      price: getVariantPrice(variant),
      mrp: getMRP(variant),
      inStock: variant.inventory_quantity > 0,
      stockCount: variant.inventory_quantity || 0,
      colorSwatch: variant.metadata?.color_swatch || null,
    }))

    // Extract variant attributes for the selector
    const variantAttributes = extractVariantAttributes(medusaProduct.variants || [])

    // Build breadcrumbs from categories
    const breadcrumbs = buildBreadcrumbs(medusaProduct.categories || [], medusaProduct.title)

    return {
      product,
      images,
      variants,
      variantAttributes,
      breadcrumbs,
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

/**
 * Fetch related products (same category, excluding current)
 */
export async function getRelatedProducts(
  productId: string,
  categoryIds: string[],
  limit: number = 4
): Promise<RelatedProduct[]> {
  try {
    if (categoryIds.length === 0) {
      return []
    }

    const response = await medusa.store.product.list({
      category_id: categoryIds,
      limit: limit + 5, // Fetch extra to filter out current product
      fields: '+variants,+images,+metadata',
    })

    if (!response.products) {
      return []
    }

    // Filter out current product and transform
    const related: RelatedProduct[] = (response.products as any[])
      .filter((p) => p.id !== productId)
      .slice(0, limit)
      .map((p) => ({
        id: p.id,
        name: p.title || '',
        slug: p.handle || '',
        imageUrl: p.thumbnail || p.images?.[0]?.url || '',
        price: getVariantPrice(p.variants?.[0]),
        mrp: getMRP(p.variants?.[0]),
        currency: 'INR',
        rating: parseFloat(p.metadata?.rating || '0'),
        reviewCount: parseInt(p.metadata?.review_count || '0', 10),
        variantCount: p.variants?.length || 0,
        isNew: isNewProduct(p.created_at),
        inStock: isProductInStock(p.variants || []),
      }))

    return related
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

// Helper functions

function getVariantPrice(variant: any): number {
  if (!variant?.prices?.[0]) return 0
  return variant.prices[0].amount / 100 // Medusa stores prices in cents
}

function getMRP(variant: any): number {
  // Check for MRP in metadata first
  if (variant?.metadata?.mrp) {
    return parseFloat(variant.metadata.mrp)
  }
  // Otherwise, use calculated_price if available, or regular price + 30%
  const price = getVariantPrice(variant)
  return Math.round(price * 1.3)
}

function calculateDiscount(variant: any): number {
  const price = getVariantPrice(variant)
  const mrp = getMRP(variant)
  if (mrp === 0) return 0
  return Math.round(((mrp - price) / mrp) * 100)
}

function isProductInStock(variants: any[]): boolean {
  return variants.some((v) => v.inventory_quantity > 0)
}

function isNewProduct(createdAt: string): boolean {
  const created = new Date(createdAt)
  const now = new Date()
  const daysDiff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  return daysDiff <= 30 // Product is "new" for 30 days
}

function parseVariantAttributes(variant: any): Record<string, string> {
  const attrs: Record<string, string> = {}

  // Parse from options (Medusa v2 uses options array)
  if (variant.options) {
    variant.options.forEach((opt: any) => {
      attrs[opt.option?.title || 'Option'] = opt.value
    })
  }

  // Fallback: parse from title if no options
  if (Object.keys(attrs).length === 0 && variant.title) {
    attrs['Variant'] = variant.title
  }

  return attrs
}

function extractVariantAttributes(variants: any[]): VariantAttribute[] {
  const attributesMap = new Map<string, Set<string>>()

  variants.forEach((variant) => {
    const attrs = parseVariantAttributes(variant)
    Object.entries(attrs).forEach(([key, value]) => {
      if (!attributesMap.has(key)) {
        attributesMap.set(key, new Set())
      }
      attributesMap.get(key)!.add(value)
    })
  })

  const variantAttributes: VariantAttribute[] = []

  attributesMap.forEach((values, key) => {
    // Check if this is a color attribute (should use swatches)
    const isColorAttribute = key.toLowerCase().includes('color') || key.toLowerCase().includes('colour')

    if (isColorAttribute) {
      // Try to extract color swatches from variant metadata
      const swatchValues = Array.from(values).map((value) => {
        const variant = variants.find((v) => parseVariantAttributes(v)[key] === value)
        return {
          value,
          color: variant?.metadata?.color_swatch || '#' + Math.floor(Math.random()*16777215).toString(16),
        }
      })

      variantAttributes.push({
        name: key,
        label: key,
        type: 'swatch',
        values: swatchValues,
      })
    } else {
      variantAttributes.push({
        name: key,
        label: key,
        type: 'dropdown',
        values: Array.from(values),
      })
    }
  })

  return variantAttributes
}

function buildBreadcrumbs(categories: any[], productTitle: string): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Home', href: '/' },
  ]

  if (categories.length > 0) {
    // Use the first category
    const category = categories[0]

    // Build category hierarchy
    const categoryChain: any[] = []
    let current = category
    while (current) {
      categoryChain.unshift(current)
      current = current.parent_category
    }

    // Add each category to breadcrumbs
    categoryChain.forEach((cat) => {
      breadcrumbs.push({
        label: cat.name,
        href: `/category/${cat.handle}`,
      })
    })
  }

  // Add current product (no href)
  breadcrumbs.push({
    label: productTitle,
    href: null,
  })

  return breadcrumbs
}
