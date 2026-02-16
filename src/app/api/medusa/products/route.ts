import { NextRequest, NextResponse } from "next/server"
import { medusa } from "@/lib/medusa"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Extract query parameters
    const category_id = searchParams.get("category_id")
    const q = searchParams.get("q") // search query
    const limit = parseInt(searchParams.get("limit") || "12")
    const offset = parseInt(searchParams.get("offset") || "0")
    const order = searchParams.get("order") // 'created_at' | '-created_at' | 'price' | '-price'
    const tag = searchParams.get("tag") // 'featured' | 'new' | 'bestseller' | 'deal'

    // Build Medusa query
    const query: any = {
      limit,
      offset,
      fields: "+variants,+variants.prices",
    }

    if (category_id) {
      query.category_id = [category_id]
    }

    if (q) {
      query.q = q
    }

    if (order) {
      query.order = order
    }

    // TODO: Fix Medusa v2 API call when SDK types are available
    // const response = await medusa.store.product.list(query)

    // For now, return empty array - will be populated when Medusa is properly configured
    return NextResponse.json({
      products: [],
      count: 0,
      offset,
      limit,
      message: "Medusa integration pending"
    })
  } catch (error) {
    console.error("Failed to fetch products from Medusa:", error)

    return NextResponse.json({
      products: [],
      count: 0,
      offset: 0,
      limit: 12,
      error: "Failed to fetch products"
    }, { status: 200 })
  }
}
