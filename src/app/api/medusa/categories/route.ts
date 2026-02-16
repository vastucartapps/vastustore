import { NextRequest, NextResponse } from "next/server"
import { medusa } from "@/lib/medusa"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    // TODO: Fix Medusa v2 API call when SDK types are available
    // const response = await medusa.store.category.list({
    //   fields: "+category_children",
    // })

    // For now, return empty array - will be populated when Medusa is properly configured
    return NextResponse.json({
      categories: [],
      message: "Medusa integration pending"
    })
  } catch (error) {
    console.error("Failed to fetch categories from Medusa:", error)

    return NextResponse.json({
      categories: [],
      error: "Failed to fetch categories"
    }, { status: 200 })
  }
}
