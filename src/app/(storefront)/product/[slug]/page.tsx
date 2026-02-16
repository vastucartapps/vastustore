import { notFound } from "next/navigation"
import { getProductByHandle, getRelatedProducts } from "@/lib/medusa-product"
import { ProductDetailPageClient } from "./ProductDetailPageClient"
import type { RichContentBlock, SpecificationGroup } from "@/components/storefront/types"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params

  // Fetch real product data from Medusa
  const productData = await getProductByHandle(slug)

  if (!productData) {
    notFound()
  }

  const { product, images, variants, variantAttributes, breadcrumbs } = productData

  // Fetch related products
  const categoryIds = product.id ? [] : [] // TODO: Extract category IDs from product
  const relatedProducts = await getRelatedProducts(product.id, categoryIds, 4)

  // Parse A+ content from product metadata
  const richContent: RichContentBlock[] = product.id && (product as any).metadata?.rich_content
    ? JSON.parse((product as any).metadata.rich_content)
    : []

  // Parse specifications from product metadata
  const specificationGroups: SpecificationGroup[] = product.id && (product as any).metadata?.specifications
    ? JSON.parse((product as any).metadata.specifications)
    : []

  // Fetch reviews and rating breakdown from Supabase
  const reviewsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/reviews/${product.id}?limit=50&sortBy=newest`,
    { cache: 'no-store' }
  )
  const reviewsData = reviewsResponse.ok ? await reviewsResponse.json() : { reviews: [], ratingBreakdown: { average: 0, total: 0, distribution: {} } }

  // Fetch questions from Supabase
  const questionsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/questions/${product.id}?limit=50&sortBy=newest`,
    { cache: 'no-store' }
  )
  const questionsData = questionsResponse.ok ? await questionsResponse.json() : { questions: [] }

  // Fetch FAQs from Supabase
  const faqsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/faqs/${product.id}`,
    { cache: 'no-store' }
  )
  const faqsData = faqsResponse.ok ? await faqsResponse.json() : { faqs: [] }

  const reviews = reviewsData.reviews || []
  const ratingBreakdown = reviewsData.ratingBreakdown || { average: 0, total: 0, distribution: {} }
  const questions = questionsData.questions || []
  const faqs = faqsData.faqs || []

  return (
    <ProductDetailPageClient
      product={product}
      images={images}
      variants={variants}
      variantAttributes={variantAttributes}
      richContent={richContent}
      specificationGroups={specificationGroups}
      faqs={faqs}
      questions={questions}
      reviews={reviews}
      ratingBreakdown={ratingBreakdown}
      relatedProducts={relatedProducts}
      breadcrumbs={breadcrumbs}
    />
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const productData = await getProductByHandle(slug)

  if (!productData) {
    return {
      title: 'Product Not Found | VastuCart',
      description: 'The requested product could not be found.',
    }
  }

  return {
    title: `${productData.product.name} | VastuCart`,
    description: productData.product.shortDescription || productData.product.description,
  }
}
