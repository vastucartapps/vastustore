import { NextRequest, NextResponse } from "next/server"
import { medusa } from "@/lib/medusa"

export const dynamic = "force-dynamic"

interface SearchSuggestion {
  type: "product" | "category" | "query"
  label: string
  imageUrl?: string
  price?: number
  slug?: string
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  try {
    // TODO: Wire to Medusa search when available
    // const results = await medusa.store.product.search({ q: query, limit: 8 })

    // For now, return sample suggestions with proper types
    const SAMPLE_PRODUCTS: SearchSuggestion[] = [
      {
        type: "product",
        label: "Seven Chakra Crystal Tree",
        slug: "seven-chakra-crystal-tree",
        imageUrl: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=100",
        price: 1299,
      },
      {
        type: "product",
        label: "Brass Ganesha Idol — 8 inch",
        slug: "brass-ganesha-idol-8-inch",
        imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100",
        price: 2450,
      },
      {
        type: "product",
        label: "Vastu Pyramid Set — Rose Quartz",
        slug: "vastu-pyramid-set-rose-quartz",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100",
        price: 899,
      },
      {
        type: "product",
        label: "Copper Kalash with Coconut",
        slug: "copper-kalash-with-coconut",
        imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100",
        price: 1750,
      },
    ]

    const SAMPLE_CATEGORIES: SearchSuggestion[] = [
      {
        type: "category",
        label: "Crystals & Gems",
        slug: "crystals",
      },
      {
        type: "category",
        label: "Brass & Copper",
        slug: "brass-copper",
      },
      {
        type: "category",
        label: "Vastu Décor",
        slug: "vastu-decor",
      },
    ]

    const SAMPLE_QUERIES: SearchSuggestion[] = [
      { type: "query", label: "crystal healing" },
      { type: "query", label: "vastu items for home" },
      { type: "query", label: "brass pooja items" },
    ]

    const lowerQuery = query.toLowerCase()

    // Filter and combine suggestions
    const productSuggestions = SAMPLE_PRODUCTS.filter((s) =>
      s.label.toLowerCase().includes(lowerQuery)
    ).slice(0, 4)

    const categorySuggestions = SAMPLE_CATEGORIES.filter((s) =>
      s.label.toLowerCase().includes(lowerQuery)
    ).slice(0, 2)

    const querySuggestions = SAMPLE_QUERIES.filter((s) =>
      s.label.toLowerCase().includes(lowerQuery)
    ).slice(0, 2)

    const suggestions = [
      ...productSuggestions,
      ...categorySuggestions,
      ...querySuggestions,
    ]

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Search suggestions error:", error)
    return NextResponse.json({ suggestions: [] })
  }
}
